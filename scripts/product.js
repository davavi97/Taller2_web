window.addEventListener('load', function(){

    console.log(location.search);
    var storageRef = firebase.storage().ref();
    //seleccionar btn
    const btn = document.querySelector('.btn');

    //traer id del usuario
    var userData = JSON.parse(localStorage.getItem("userId"));

    var userId = userData.id; 



    const db = firebase.firestore();
    //instanciar coleccion del carrito en el usuario

    const carUser = db.collection('users').doc(userId).collection('shoppingCar');

    var newProduct = { };

    //partimos el location
    const parts = location.search.split('-');
    const uid = parts[0].replace('?','');
    //FIREBASEEE
 
    const productsRef = db.collection('products');

    //Referencia al producto
    productsRef.doc(uid).get().then(function(snapshot){

        const product =snapshot.data();

        const title = document.querySelector('h1');
        title.innerText = product.title;

        storageRef.child(product.storageImg).getDownloadURL().then(function(url) {
            // Or inserted into an <img> element:

            document.querySelector('.details__img').setAttribute('src', url);

            console.log(url)
          }).catch(function(error) {
            // Handle any errors
          });

        document.querySelector('img').setAttribute('src',product.img);
        document.querySelector('h2 span').innerText = product.price;
          document.querySelector('.details__text').innerText = product.details;
        document.querySelector('.details').classList.remove('hidden');
        
        console.log();


        newProduct = {
            title: product.title,
            price: product.price,
 
            storageImg: product.storageImg
          };

    })


    console.log(uid);

    btn.addEventListener('click',function(){


        carUser.add(newProduct).then(function(docRef) {
            alert("Agregado al carrito");
            
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
      })
    

});