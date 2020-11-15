const auth=document.querySelector('.auth');
const authWhit=auth.querySelector('.auth__with');
const authWhitout=auth.querySelector('.auth__without');
const authProfileSpan=auth.querySelector('.auth__profile span');
const authSignout = auth.querySelector('.auth__signout')

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
                const data = doc.data();
                //console.log(doc.data());
                authProfileSpan.innerText = data.firstname;

            }
            

            
            
        });

    } else {
    //si no existe quiere decir que inició sesión o se registró
    authWhit.classList.add('hidden');
    authWhitout.classList.remove('hidden');

    }
   
  });




  //METODO PARA CERRAR SESION
  authSignout.addEventListener('click', function(event){
      event.preventDefault();
      firebase.auth().signOut();
  });

