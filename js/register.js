function validateAndAddUser() {
  // Add your logic to check if all fields are valid
  // If yes, proceed to add the user, otherwise show an error message
  const usernameValid = !document.getElementById("name").classList.contains("invalid");
  const surnameValid = !document.getElementById("surname").classList.contains("invalid");
  const emailValid = !document.getElementById("email").classList.contains("invalid");
  const passwordValid = !document.getElementById("password").classList.contains("invalid");
  const cityValid = !document.getElementById("city").classList.contains("invalid");

  const allValid = usernameValid && surnameValid && emailValid && passwordValid && cityValid;

  if(allValid){
    return true;
  }else{
    return false;
  }
}

async function createUser(e){
    e.preventDefault();
    const isPassword = document.querySelector('#password')
    const isUserName = document.querySelector('#name')
    const isUserSurname = document.querySelector('#surname')
    const email = document.querySelector('#email')
    const city = document.querySelector('#city');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //check if valid
    if(!isPassword.value && !isUserName.value && !isUserSurname.value && !email.value && !city.value){
      alert('Fill the form')
    }else if(validateAndAddUser()){
      await axios.post(
          "https://justdb-fdea4-default-rtdb.europe-west1.firebasedatabase.app/data.json",
          {
              "userName":isUserName.value,
              "surName": isUserSurname.value,
              "password":isPassword.value,
              "email":email.value,
              "city":city.value
          }
      )
      window.location.href = '../pages/login.html';
    }else{
      Swal.fire({
        title: "Error!",
        text: "Please check if the entered information is correct!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
}

const addUser = document.querySelector('#createBtn');
addUser.addEventListener('click', createUser);
console.log(window.location);
