const auth=document.querySelector('.auth');
const authWhit=auth.querySelector('.auth__with');
const authWhitout=auth.querySelector('.auth__without');
const authProfileSpan=auth.querySelector('.auth__profile span');

//console.log(auth, authWhit, authWhitout);



firebase.auth().onAuthStateChanged(function(user) {
    console.log(user);
    //si el usuario existe quiere decir que inició sesión o se registró
    if(user){
        authWhit.classList.remove('hidden');
        authWhitout.classList.add('hideen');



        const db = firebase.firestore();
        const usersRef = db.collection('users'); 
        usersRef.doc(user.uid).get().then(function(doc){
            if(doc.exists){
                const data=doc.data();
                authProfileSpan.innerText =data.firstname;

            }
            
        });

    } else {
    //si no existe quiere decir que inició sesión o se registró
    authWhit.classList.add('hidden');
    authWhitout.classList.remove('hideen');

    }
    /*
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
    }
    */
  });