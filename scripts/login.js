/*
const db = firebase.firestore();
const usersRef = db.collection('users');
*/


const login = document.querySelector('.logins');

login.addEventListener('submit', function(event){

    event.preventDefault();

    const email = login.email.value;
    const password = login.password.value;
    


    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(credentials){

       
            window.location.href='index.html'

    

        
    })
    
    
    .catch(function(error) {
        // Handle Errors here.
        console.log(error);

        login.querySelector('.form__error').classList.remove('hidden');
        // ...
      });

});
