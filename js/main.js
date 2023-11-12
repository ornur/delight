document.addEventListener('DOMContentLoaded', async function() {
    const key = localStorage.getItem('key');
    const isIndexPage = window.location.pathname.includes('index.html');
    console.log(key);

    if(key){
        const user = await axios.get(`https://justdb-fdea4-default-rtdb.europe-west1.firebasedatabase.app/data/${key}.json`)
        const userData = user.data;
        if(isIndexPage){
        const homeLink = document.querySelector('#homeLink');
        homeLink.innerHTML=`<a class="nav-link" href="user.html">${userData.userName}</a>`
        }

        const loginLink = document.querySelector('#loginLink');
        loginLink.innerHTML=`<a class="nav-link" href="../user.html">${userData.userName}</a>`

        localStorage.setItem('userInfo', key);
    }
});
