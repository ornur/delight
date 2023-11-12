document.addEventListener('DOMContentLoaded', async function() {
    const key = localStorage.getItem('key');
    console.log(key);

    if(key){
        const user = await axios.get(`https://justdb-8a462-default-rtdb.europe-west1.firebasedatabase.app/data/${key}.json`)
        const userData = user.data;

        const loginLink = document.querySelector('#loginLink');
        loginLink.innerHTML=`<a class="nav-link" href="../user.html">${userData.userName}</a>`

        localStorage.setItem('userInfo', key);
    }
});
