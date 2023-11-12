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

async function createUser(e){
    e.preventDefault();
    const isPassword = document.querySelector('#password')
    const isUserName = document.querySelector('#username')
    const isUserSurname = document.querySelector('#surname')
    const email = document.querySelector('#email')
    const city = document.querySelector('#city');
    const selectedRadio = document.querySelector('input[name="isAdmin"]:checked');
    if(!isPassword.value && !isUserName.value && !isUserSurname.value && !email.value && !city.value && !selectedRadio.value){
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
              "city":city.value,
              "admin":selectedRadio.value
          }
        )
        location.reload()
      }
      
    }
    
  }

const addUser = document.querySelector('#addUser');
addUser.addEventListener('click', createUser);

let data = {};

window.addEventListener('DOMContentLoaded', async ()=>{
    const response = await axios.get("https://justdb-8a462-default-rtdb.europe-west1.firebasedatabase.app/data.json")
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
        await axios.delete(`https://justdb-8a462-default-rtdb.europe-west1.firebasedatabase.app/data/${userId}.json`)
        location.reload()
    } else if (event.target.classList.contains('edit')) {
        const userId = event.target.getAttribute('data-target');

        const user = await axios.get(`https://justdb-8a462-default-rtdb.europe-west1.firebasedatabase.app/data/${userId}.json`)
        const userData = user.data;
        console.log(userData);
        displayEditForm(userData);

        const editBtn = document.querySelector('#editBtn');
        editBtn.addEventListener('click', async ()=>{
            await axios.put(
                `https://justdb-8a462-default-rtdb.europe-west1.firebasedatabase.app/data/${userId}.json`,  
                {
                    "userName":document.getElementById('editUserName').value,
                    "surName": document.getElementById('editSurName').value,
                    "password":document.getElementById('editPassword').value,
                    "email":document.getElementById('editEmail').value,
                    "city":document.getElementById('editCity').value
                }
            )
            location.reload()
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
