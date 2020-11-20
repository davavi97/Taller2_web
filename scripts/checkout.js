const db = firebase.firestore();
  
const productsList = document.querySelector('.productslist');
var userData = JSON.parse(localStorage.getItem("userId"));

var userId = userData.id;
const productsRef = db.collection('users').doc(userId).collection('shoppingCar')
let totalPrice = 0;
const loader = document.querySelector(".loader");
const total =document.querySelector(".total");
const btn = document.querySelector(".btn");
const nameU =document.querySelector(".nameU");
const directionU =document.querySelector(".directionU");
const creditU =document.querySelector(".creditU");
let confirmarPedido = false;
let pedido=[];

        // Create a root reference
  var storageRef = firebase.storage().ref();

  var pedidosUsers = db.collection('orders');
  var userInfo = db.collection('users').doc(userId);
  if(userId!=null){
    var carritoUser = db.collection('users').doc(userId).collection('carrito');
  }

  function getUsers(){

    userInfo.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
          var user= doc.data();
          console.log(user.lastname)
        nameU.innerText =user.firstname+" "+user.lastname;
        directionU.innerText =user.direction;
        creditU.innerText =user.credit;

          var temp = {
        
            firstname: user.firstname,
            lastname :user.lastname,
            phone :user.phone
          }
         // userData.push(temp)
          console.log(temp.firstname)
          //nombre=userData[0].firstname;
         // name.innerText = temp.firstname;

      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });
  }

  getUsers();

  
  
  // creación de nuevos productos a partir de la lista
  function renderProducts (list) {
    productsList.innerHTML = '';
    list.forEach(function (elem) {
      const newProduct = document.createElement('div');
      newProduct.classList.add('carlist');
      const url =`producto.html?${elem.id}-${elem.title}`
      newProduct.setAttribute('href', url);
      
    
      newProduct.innerHTML = `
 
     
      
      <img class="carlist__img" src="${elem.img}" alt="">
      
      <div class="carlist__info">
        <h3 class="carlist__title">${elem.title}</h3>
        <p class="carlist__price">$ ${elem.price}</p>
        </div>

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
      
      productsList.appendChild(newProduct);

      totalPrice += parseInt(elem.price);

      total.innerText =totalPrice;

      var compra= {
        id:userId,
        firstname: userData.firstname,
        lastname: userData.lastname,
        credit: userData.credit,
        direction : userData.direction,
        email: userData.email,  
        title: elem.title,
       // img: form.image.value,
        price: elem.price,
        storageImg: elem.storageImg
      };

      
      pedido.push(compra)
    });
   
  }
 // console.log(elem.price)

    //leer los productos de firebase

  function getProducts(){

    productsRef.get().then((querySnapshot) => {
      var objects = [];
      querySnapshot.forEach((doc) => {
          const obj = doc.data();
          obj.id= doc.id;
          objects.push(obj);
          console.log(`${doc.id} => ${doc.data()}`);
      });
      renderProducts(objects);
     loader.classList.remove("loader--show")
  });

  }

  getProducts();

  var imagePath ='';

  btn.addEventListener('click',function(){
    //  location.href='perfil.html';
     });

 // agregar pedido

 btn.addEventListener('click',function(){
  //console.log('hola');
  console.log(confirmarPedido)
  confirmarPedido=true;

  pedido.forEach((doc) => {
    pedidosUsers.add(doc).then(function(docRef) {
      
      console.log("Document written with ID: ", docRef.id);
      alert("Compra realizada!")

  })
  .catch(function(error) {
      console.error("Error adding document: ", error);

  });
});

})

console.log(pedido)

btn.addEventListener('click',function(){
  //  location.href='perfil.html';
   });