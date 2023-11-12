async function createUser(e){
    e.preventDefault();
    const isPassword = document.querySelector('#password')
    const isUserName = document.querySelector('#name')
    const isUserSurname = document.querySelector('#surname')
    const email = document.querySelector('#email')
    const city = document.querySelector('#city');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!isPassword.value && !isUserName.value && !isUserSurname.value && !email.value && !city.value){
        alert('Fill the form')
    }else{
        if(isPassword.value.length <= 5){
            alert('Password length should be more than 5')
          }
          else if(emailPattern.test(email)){
            alert('Write correctly an email')
          }else{
            await axios.post(
                "https://justdb-8a462-default-rtdb.europe-west1.firebasedatabase.app/data.json",
                {
                    "userName":isUserName.value,
                    "surName": isUserSurname.value,
                    "password":isPassword.value,
                    "email":email.value,
                    "city":city.value
                }
            )
            window.location.href = '../pages/login.html';
          }
        

    }
    

}


const addUser = document.querySelector('#createBtn');
addUser.addEventListener('click', createUser);
console.log(window.location);
