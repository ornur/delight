var modal = document.getElementById("myModal");
var btn = document.getElementById("createBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

function validateAndAddUser() {
  // Add your logic to check if all fields are valid
  // If yes, proceed to add the user, otherwise show an error message
  const usernameValid = !document.getElementById("username").classList.contains("invalid");
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

function validateAndEditUser() {
  // Add your logic to check if all fields are valid for editing
  // If yes, proceed to edit the user, otherwise show an error message
  const editUserNameValid = !editUserName.classList.contains("invalid");
  const editSurNameValid = !editSurName.classList.contains("invalid");
  const editEmailValid = !editEmail.classList.contains("invalid");
  const editPasswordValid = !editPassword.classList.contains("invalid");
  const editCityValid = !editCity.classList.contains("invalid");

  const allValid = editUserNameValid && editSurNameValid && editEmailValid && editPasswordValid && editCityValid;

  if (allValid) {
      // Edit user logic here
      return true;
  } else {
      return false;
  }
}

async function createUser(e){
    e.preventDefault();
    const isPassword = document.querySelector('#password')
    const isUserName = document.querySelector('#username')
    const isUserSurname = document.querySelector('#surname')
    const email = document.querySelector('#email')
    const city = document.querySelector('#city');
    const selectedRadio = document.querySelector('input[name="isAdmin"]:checked');
    //check if valid
    if(!isPassword.value && !isUserName.value && !isUserSurname.value && !email.value && !city.value && !selectedRadio.value){
      alert("Fill the form");
    }else if(validateAndAddUser()){
      await axios.post(
        "https://justdb-fdea4-default-rtdb.europe-west1.firebasedatabase.app/data.json",
        {
            "userName":isUserName.value,
            "surName": isUserSurname.value,
            "password":isPassword.value,
            "email":email.value,
            "city":city.value,
            "admin":selectedRadio.value
        }
      )
      location.reload()
    }else{
      alert("Please check if the entered information is correct!");
    }
  }

const addUser = document.querySelector('#addUser');
addUser.addEventListener('click', createUser);

let data = {};

window.addEventListener('DOMContentLoaded', async ()=>{
    const response = await axios.get("https://justdb-fdea4-default-rtdb.europe-west1.firebasedatabase.app/data.json")
    data = response.data;
    console.log(data);
})


const usersContainer = document.querySelector('#users');


setTimeout(() => {
    usersContainer.innerHTML += Object.entries(data).map(([key, value]) => {

        return `
        <tr>
            <td>${value.userName}</td>
            <td>${value.surName}</td>
            <td>${value.email}</td>
            <td>${value.city}</td>
            <td>${value.password}</td>
            <th><button class="edit" data-target="${key}">Edit</button></th>
            <th><button class="delete" data-target="${key}">Delete</button></th>
        </tr>`;
    }).join('');
}, 1500);





usersContainer.addEventListener('click', async (event) => {
    
    
    if (event.target.classList.contains('delete')) {
        const userId = event.target.getAttribute('data-target');
        await axios.delete(`https://justdb-fdea4-default-rtdb.europe-west1.firebasedatabase.app/data/${userId}.json`)
        location.reload()
    } else if (event.target.classList.contains('edit')) {
        const userId = event.target.getAttribute('data-target');

        const user = await axios.get(`https://justdb-fdea4-default-rtdb.europe-west1.firebasedatabase.app/data/${userId}.json`)
        const userData = user.data;
        console.log(userData);
        displayEditForm(userData);

        const editBtn = document.querySelector('#editBtn');
        editBtn.addEventListener('click', async ()=>{

          const isPassword = document.querySelector('#editPassword')
          const isUserName = document.querySelector('#editUserName')
          const isUserSurname = document.querySelector('#editSurName')
          const email = document.querySelector('#editEmail')
          const city = document.querySelector('#editCity');

          if(!isPassword.value && !isUserName.value && !isUserSurname.value && !email.value && !city.value){
            alert("Fill the form");
          }else if(validateAndEditUser()){
            await axios.put(
              `https://justdb-fdea4-default-rtdb.europe-west1.firebasedatabase.app/data/${userId}.json`,  
              {
                  "userName":document.getElementById('editUserName').value,
                  "surName": document.getElementById('editSurName').value,
                  "password":document.getElementById('editPassword').value,
                  "email":document.getElementById('editEmail').value,
                  "city":document.getElementById('editCity').value
              }
            )
            location.reload()
          }else{
            alert("Please check if the entered information is correct!");
          }
        })
    }
});


function displayEditForm(userData) {
    document.getElementById('editForm').style.display = 'block';

    var editFormModal = document.getElementById("editForm");
    var close = document.querySelector("#closeBtn");


    close.onclick = function() {
        editFormModal.style.display = "none";
    }
    
    window.onclick = function(event) {
        console.log(event.target);
        if (event.target == editFormModal) {
            editFormModal.style.display = "none";
        }
    }



    document.getElementById('editUserName').value = userData.userName;
    document.getElementById('editSurName').value = userData.surName;
    document.getElementById('editEmail').value = userData.email;
    document.getElementById('editPassword').value = userData.password;
    document.getElementById('editCity').value = userData.city
    
}



const mainBtn = document.querySelector("#main");
const faqBtn = document.querySelector('#faq');

const mainCont = document.querySelector('#admin-main');
const faqCont = document.querySelector("#admin-faq");

mainBtn.onclick = function(){
  console.log('helo');
  mainCont.style.display = 'block';
  faqCont.style.display = 'none';
}

faqBtn.onclick = function(){
  console.log('helo');
  mainCont.style.display = 'none';
  faqCont.style.display = 'block';
  for(i=0; i<acc.length; i++){
    acc[i].style.display = 'block'
  }
}


var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");

    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
