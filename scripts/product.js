window.addEventListener('load', function(){

    console.log(location.search);

    //partimos el location
    const parts = location.search.split('-');
    const uid = parts[0].replace('?','');
    //FIREBASEEE
    const db = firebase.firestore();
    const productsRef = db.collection('products');

    //Referencia al producto
    productsRef.doc(uid).get().then(function(snapshot){

        const product =snapshot.data();

        const title = document.querySelector('h1');
        title.innerText = product.title;

        document.querySelector('img').setAttribute('src',product.img);
        document.querySelector('h2 span').innerText = product.price;

        document.querySelector('.details').classList.remove('hidden');
        
        console.log();

    })

    console.log(uid);

});