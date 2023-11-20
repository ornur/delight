


const loginBtn = document.querySelector('#loginBtn');

let user={};

 window.addEventListener('DOMContentLoaded', async () => {
    user = await axios.get(`https://justdb-fdea4-default-rtdb.europe-west1.firebasedatabase.app/data.json`)
})

loginBtn.addEventListener('click', async (e)=>{
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const userData = user.data;
    let foundUser = false;
    console.log(userData);
    console.log(email);
    console.log(password);
    for (let userKey in userData) {
        console.log(userKey);
        if (userData[userKey].email == email && userData[userKey].password == password) {
            console.log('nice');
            localStorage.setItem('key', userKey);
            window.location.href = '../index.html';
            foundUser = true;
            break;
        }  
    }
    const emailValid = !document.getElementById("email").classList.contains("invalid");
    const passwordValid = !document.getElementById("password").classList.contains("invalid");
    if (!foundUser && emailValid && passwordValid) {
        Swal.fire({
            title: "Error!",
            text: "User not found! Try again!",
            icon: "error",
            confirmButtonText: "OK",
          });
    }
})
