


const loginBtn = document.querySelector('#loginBtn');

let user={};

 window.addEventListener('DOMContentLoaded', async () => {
    user = await axios.get(`https://justdb-8a462-default-rtdb.europe-west1.firebasedatabase.app/data.json`)
})

loginBtn.addEventListener('click', async (e)=>{
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;


    const userData = user.data;
    console.log(userData);
    console.log(email);
    console.log(password);
    for (let userKey in userData) {
        if (userData[userKey].email == email && userData[userKey].password == password) {
            console.log('nice');
            localStorage.setItem('key', userKey);
            window.location.href = '../index.html';
        }
    }
})
