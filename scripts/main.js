

//REFERENCIA DEL FIREBASE
const db = firebase.firestore();

const productsRef = db.collection("products");

const loader = document.querySelector('.loader');

let selectedItem = null;





const productsList = document.querySelector('.productslist');


// creación de nuevos productos a partir de la lista
function renderProducts(list) {
  productsList.innerHTML = '';
  list.forEach(function (elem) {
    const newProduct = document.createElement('a');
    newProduct.classList.add('product');

    const url = `producto.html?${elem.id}-${elem.title}`;
    newProduct.setAttribute('href',url);



    newProduct.innerHTML = `
      <img class="product__img" src="${elem.img}" alt="">
        <h3 class="product__title">${elem.title}</h3>
        <p class="product__price">$ ${elem.price}</p>
        <button class="product__delete"> Eliminar </button>
        <button class="product__edit"> Editar </button>
  
      `;

    //aqui se ELIMINA el producto
    const deleteBtn = newProduct.querySelector('.product__delete');
    deleteBtn.addEventListener('click', function () {
      loader.classList.add('loader--show');
      productsRef.doc(elem.id).delete().then(function () {
        console.log("Document successfully deleted!");
        getProducts(); //Traiga los productos cuando ya se elimino
      }).catch(function (error) {
        console.error("Error removing document: ", error);

      });

    });

    //al seleccionar el boton editar
    const editBtn = newProduct.querySelector('.product__edit');
    editBtn.addEventListener('click', function () {

      form.title.value = elem.title;
      form.image.value = elem.img;
      form.price.value = elem.price;
      selectedItem = elem;

    });

    productsList.appendChild(newProduct);
  });

}


//LEER DE FIRESTORE, visible

function getProducts() {
  productsRef.get().then((querySnapshot) => {
    const objects = [];
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      obj.id = doc.id;
      objects.push(obj);
      console.log(`${doc.id} => ${doc.data()}`);
    });
    renderProducts(objects);
    loader.classList.remove('loader--show');


  });

}

getProducts();

var imagePath='';

// render inicial con todos los productos
//renderProducts(products);


const filterBtn = document.querySelector('.filterbtn');

filterBtn.addEventListener('click', function () {
  // función slice para tomar una sección de la lista
  // const filtered = products.slice(1, 3);

  // función filter para filtrar con una condición específica
  const filtered = products.filter(function (elem) {
    if (elem.price > 50000) {
      return true;
    } else {
      return false;
    }
  });

  // render solo con los productos filtrados
  renderProducts(filtered);
});



//Aqui es donde AGREGAMOS el producto
const form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
  event.preventDefault();

 // console.log(form.category1.value);
 // return;

//checkbox
console.log();





  const newProduct = {
    title: form.title.value,
    img: form.image.value,
    price: form.price.value,
    //category:form.category.value
    storageImg : imagePath,
  };

  loader.classList.add('loader--show');

  function handleThen (docRef){
    //console.log("Document written with ID: ", docRef.id);
    getProducts();
    form.title.value = '';
    form.image.value = '';
    form.price.value = '';
    selectedItem=null;
  }

  function handleCatch (error) {
    console.error("Error adding document: ", error);
  }

  if (selectedItem) {

    //si existe seletedItem->Va a editar
    productsRef.doc(selectedItem.id).set(newProduct).then(function (handleThen) {
     
    })
      .catch(handleCatch) ;

  } else {
    //si no existe es porque es un nuevo producto
    productsRef.add(newProduct)
      .then(handleThen) 
      .catch(handleCatch);


  }




});

form.imageFile.addEventListener('change', function(){
  //Storage

var storageRef = firebase.storage().ref();

var newImageRef = storageRef.child(`products/${Math.floor(Math.random()*9999999)}.jpg`);

var file =form.imageFile.files[0];
newImageRef.put(file).then(function(snapshot){
  console.log(snapshot);
  console.log('Uploaded a blob or file');
  imagePath=snapshot;
});



});



