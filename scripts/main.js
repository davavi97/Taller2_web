  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDrJkH0hSZ0s2AvGT-H8Ja9a2NPmHrIqHQ",
    authDomain: "taller2-web.firebaseapp.com",
    databaseURL: "https://taller2-web.firebaseio.com",
    projectId: "taller2-web",
    storageBucket: "taller2-web.appspot.com",
    messagingSenderId: "838195254932",
    appId: "1:838195254932:web:20f39ebdecfe375ff9c681",
    measurementId: "G-WGH7G5D0FF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //REFERENCIA DEL FIREBASE
  var db = firebase.firestore();




const products = [
    {
      title: 'Pachira, árbol del dinero',
      img: 'https://d26lpennugtm8s.cloudfront.net/stores/331/296/products/web_habibi_pachira_buenasuerte4_regalosenmedellin_plantasenmedellin_plantas_domicilio_naturaleza1-9fedf344fce906b2b715932740215636-320-0.jpg',
      price: 75900,
      // HACERLOOOOOOO tipe: 'planta con matera',
    },
    {
      title: 'Decobag Amarilla Con Planta',
      img: 'https://d26lpennugtm8s.cloudfront.net/stores/331/296/products/web_decobag_amarilla1-9bbb9e8460f87d4f8015850897130612-320-0.jpg',
      price: 54800,
    },
    {
      title: 'Decobag Beige Con Planta Purificadora',
      img: 'https://d26lpennugtm8s.cloudfront.net/stores/331/296/products/web_habibi_decobag_beige_regalosmedellin_dimicilio_plantasadomicilio_ideasderegalo_cumpleanos_regalo_aniversario_plantasnaturales1-23028a12286802e8b715742671200894-320-0.jpg',
      price: 54800,
    },
    {
      title: 'Planta Miami Pothos',
      img: 'https://d26lpennugtm8s.cloudfront.net/stores/331/296/products/web_habibi_miami_photosplant_plantaspurifcadoras_vivero_medellin_plantasadomicilio-4ceb14f622d0845ccf15646154418651-320-0.jpg',
      price: 19900,
    },
  ]; 
  
  const productsList = document.querySelector('.productslist');
 
  
  // creación de nuevos productos a partir de la lista
  function renderProducts (list) {
    productsList.innerHTML = '';
    list.forEach(function (elem) {
      const newProduct = document.createElement('article');
      newProduct.classList.add('product');
    
      newProduct.innerHTML = `
      <img class="product__img" src="${elem.img}" alt="">
      <div class="product__info">
        <h3 class="product__title">${elem.title}</h3>
        <p class="product__price">$ ${elem.price}</p>
      </div>
      `;
    
      productsList.appendChild(newProduct);
    });
  }
  
  
  // render inicial con todos los productos
  renderProducts(products);
  
  
  const filterBtn = document.querySelector('.filterbtn');

  filterBtn.addEventListener('click', function () {
    // función slice para tomar una sección de la lista
    // const filtered = products.slice(1, 3);
  
    // función filter para filtrar con una condición específica
    const filtered = products.filter(function (elem) {
      if(elem.price > 50000) {
        return true;
      } else {
        return false;
      }
    });
  
    // render solo con los productos filtrados
    renderProducts(filtered);
  });
  
  
  
 //Aqui es donde agregamos el producto
  const form = document.querySelector('.form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();


    const newProduct = {
      title: form.title.value,
      img: form.image.value,
      price: form.price.value
    };

    db.collection("products").add(newProduct)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  

    //products.push(newProduct);
    renderProducts(products);

  
 
  });
  

   /*
  form.addEventListener('submit', function (event) {
    event.preventDefault();
  
    const newProduct = {
      title: form.title.value,
      img: form.image.value,
      price: form.price.value
    };
 
    products.push(newProduct);
  
    renderProducts(products);
  });
   */