document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    verifyUserCredentials(email, password);
});
function verifyUserCredentials(username, password) {
    
    const apiEndpoint = 'https://delight-fdea4-default-rtdb.europe-west1.firebasedatabase.app/data.json';

  
    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
         
            const email = data.find(email => email.email === email && email.password === password);

            if (email) {
               
                window.location.href = 'index.html';
            } else {

                console.error('Invalid credentials');
            }
        })
        .catch(error => {
            
            console.error('Error:', error);
        });
}
