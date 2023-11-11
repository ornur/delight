const userKey = localStorage.getItem('userInfo');
console.log(userKey);   

const infoCont = document.querySelector('#info');
const adminLink = document.querySelector('#admin');
window.addEventListener('DOMContentLoaded', async ()=>{
    const user = await axios.get(`https://justdb-fdea4-default-rtdb.europe-west1.firebasedatabase.app/data/${userKey}.json`)
    const link = document.querySelector('#link');
    const userData = user.data;
    infoCont.innerHTML=`<p>${userData.userName}</p>
    <p>${userData.surname}</p>
    <p>${userData.email}</p>
    <p>${userData.city}</p>
    <p>${userData.password}</p>`
    link.innerHTML=`<a disabled class="nav-link">${userData.userName}</a>`
    console.log(userData.admin);
    console.log(adminLink);
    if(userData.admin == 'admin'){
        adminLink.style.display='block'
    }
})
const logout = document.querySelector("#logout");
logout.addEventListener('click', ()=>{
    localStorage.removeItem('userInfo');
    localStorage.removeItem('key')
})