

//REFERENCIA DEL FIREBASE
const db = firebase.firestore();

const productsRef = db.collection("products");

const loader = document.querySelector('.loader');

const adminview =document.querySelector('.adminview')

let selectedItem = null;


var storageRef = firebase.storage().ref();


const productsList = document.querySelector('.productslist');

var userData = JSON.parse(localStorage.getItem("userId"));

if(userData!=null){
  var userId = userData.id;
}









// creación de nuevos productos a partir de la lista
function renderProducts(list) {
  productsList.innerHTML = '';
  list.forEach(function (elem) {
    const newProduct = document.createElement('div');
    newProduct.classList.add('product');

    const url = `producto.html?${elem.id}-${elem.title}`;
    newProduct.setAttribute('href',url);



    newProduct.innerHTML = `
    <a href="${url}" class="link">
      <img class="product__img" src="${elem.img}" alt="">
      <div class="product__info">
        <h3 class="product__title">${elem.title}</h3>
        <p class="product__price">$ ${elem.price}</p>
        </div>
        </a>
        <button class="product__delete hidden showadmin"> Eliminar </button>
        <button class="product__edit hidden showadmin"> Editar </button>
  
      `;

      if(elem.storageImg) {
        storageRef.child(elem.storageImg).getDownloadURL().then(function(url) {
          // Or inserted into an <img> element:
          var img = newProduct.querySelector('img');
          img.src = url;
        }).catch(function(error) {
          // Handle any errors
        });
     
    }   




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
      //form.image.value = elem.img;
      form.price.value = elem.price;
      selectedItem = elem;

    });

    productsList.appendChild(newProduct);
  });

}


//LEER DE FIRESTORE, visible
let objectsList
function getProducts() {
  productsRef.get().then((querySnapshot) => {
     objectsList = [];
    querySnapshot.forEach((doc) => {
      const obj = doc.data();
      obj.id = doc.id;
      objectsList.push(obj);
      console.log(`${doc.id} => ${doc.data()}`);
    });
    renderProducts(objectsList);
    loader.classList.remove('loader--show');


  });

}

getProducts();

var imagePath='';

// render inicial con todos los productos
//renderProducts(products);


const filterBtn = document.querySelector('.filterbtn');
/*
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
*/


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
    //img: form.image.value,
    price: form.price.value,
    details: form.details.value,
    soil: form.soil.value,
    container:form.container.value,
    plant:form.plant.value,
    //category:form.category.value
    storageImg : imagePath,
  };

  loader.classList.add('loader--show');

  function handleThen (docRef){
    //console.log("Document written with ID: ", docRef.id);
    getProducts();
    form.title.value = '';
    //form.image.value = '';
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



var newImageRef = storageRef.child(`products/${Math.floor(Math.random()*9999999)}.png`);

var file =form.imageFile.files[0];
newImageRef.put(file).then(function(snapshot){
  console.log(snapshot);
  console.log('Uploaded a blob or file');
  imagePath=snapshot.metadata.fullPath;
});



});

//filtros
const filterForm = document.querySelector('.filterform');
filterForm.addEventListener('input', function() {

  let copy = objectsList.slice();

  const order = filterForm.order.value;
  switch(order){
    case 'price_asc':
      copy.sort(function(a, b){
        return a.price - b.price;
      });
      break;
    case 'price_desc':
      copy.sort(function(a, b){
        return b.price - a.price;
      });
      break;
      case 'alfabeticA':
          copy.sort(function (a, b) {
            return a.title.localeCompare(b.title);
          });
          break;

          case 'alfabeticZ':
            copy.sort(function (a, b) {
              return b.title.localeCompare(a.title);
            });
            break;
  }

  const soilFilter = filterForm.soil.value;
  if(soilFilter != '') {
    copy = copy.filter(function(elem){
      if(elem.soil===soilFilter) {
        return true;
      }
      return false;
    });
  }


  const containerFilter = filterForm.container.value;
  if(containerFilter != '') {
    copy = copy.filter(function(elem){
      if(elem.container===containerFilter) {
        return true;
      }
      return false;
    });
  }

  const plantFilter = filterForm.plant.value;
  if(plantFilter != '') {
    copy = copy.filter(function(elem){
      if(elem.plant===plantFilter) {
        return true;
      }
      return false;
    });
  }
 


  renderProducts(copy);
});



