const register = document.querySelector('.register');

register.addEventListener('submit', function(event){
    event.preventDefault();

    const email = register.email.value;
    const password = register.password.value;


    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });

});

