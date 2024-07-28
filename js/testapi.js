 //const API_URL = 'https://pokeapi.co/api/v2/berry/1/'
 const API_URL = 'http://127.0.0.1:8000/api/v1/Producto';
 const API_URL2 = 'http://localhost:8000/api/v1/DatosPedido/';
 const API_URL3 = 'http://localhost:8000/api/v1/ItemsPedido/';
 

// --------------------------------------------------------------------------------------------

//  fetch(API_URL, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//        'Access-Control-Allow-Origin': '*'
//     },
//     body: JSON.stringify({ key: 'value' })   
//   })
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));

// --------------------------------------------------------------------------------------------  

// const xhr = new XMLHttpRequest();

// console.log(xhr)

//  function onRequestHandler(){
//     console.log(this.readyState)
//      if(this.readyState==4 && this.status == 200){

//          const data = JSON.parse(this.response);

//          console.log(data)
//      }
//   }
//  xhr.addEventListener("load",onRequestHandler);
//  xhr.open("GET", `${API_URL}`);
//  xhr.send();
 

// --------------------------------------------------------------------------------------------

// function GetDatosProductos(done){
//      const results = fetch(API_URL);

//      results
//          .then(response => response.json())
//          .then(data => { 
//              done(data) 
//          });
//  };


//  GetDatosProductos(datos =>{
//      console.log(datos)
//  }) 

 

// --------------------------------------------------------------------------------------------
// let bd = ""
//  async function GetCaracteres(){
//      try{
//          const response = await fetch(API_URL);
//          const datos = await response.json();
//          let bd = datos;
//          console.log(datos);
//         //  const {results} = await response.json();
//         //  console.log(results);

//      } catch (error){
//          console.error(error);
//      }
//      console.log(bd)
//  }

//GetCaracteres();


// FUNCIONA BIEN
//  async function GetProductos(){
//     try {
//         const response = await fetch(API_URL);        
//         const bd = await response.json();
//         console.log(bd)
        
//         for (let key of bd){
//              console.log(key.id, key.titulo, key.descripcion, key.precio, key.imagen)
//         }


//     }catch(error){
//         console.error("Ha ocurrido un error en el backend")
//     }}
 
// GetProductos()


//--------- FUNCIONA BIEN 
// async function GetDatos(){
//     fetch(API_URL, {
//         method: "GET",
//         headers: {"Content-type": "application/json;charset=UTF-8"}
//     })
//     .then(response => response.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(err))
// }
// debugger
// GetDatos() 

//--------- FUNCIONA BIEN 

// async function PostDatos(){
//  let horactual = new Date()
//  let datos = 
//          {
//              "nombres": "Augusto",
//              "apellido": "Ferrando",
//              "direccion": "Av Las Casuarinas 1796 - Cercado de Lima",
//              "phone": "123456789",
//              "referencia": "no indica dato alguno, no tiene direccion especifica",
//              "email": "afujimori@sudintec.com",
//              "totalPedido": 28.50,
//              "fechaHora": horactual,
//              "totalItems": 4,
//              "pedidoatendido": false
//         }   

//      opciones = {
//         method:"POST",
//         body: JSON.stringify(datos),
//         headers: {"Content-type": "application/json"}
//      }

     
//      fetch(API_URL3, opciones)
//         .then(response => response.json())
//         .then(json => console.log(json,"Se ejecuto bien !!"))
//         .catch(err => console.log(err))    
//  }

// PostDatos() 

async function PostItems(){
  let datos = 
          {
              "cantidad": 4,
              "precio": 18.0,
              "total": 33.0,    
              "productoId": 10,
              "datosPedidoId": 9    
         }   

      opciones = {
         method:"POST",
         body: JSON.stringify(datos),
         headers: {"Content-type": "application/json"}
      }
     
      fetch(API_URL3, opciones)
         .then(response => response.json())
         .then(json => console.log(json,"Se ejecuto bien !!"))
         .catch(err => console.log(err))    
  }

  PostItems()

//  for (let i=0; i < bd.length; i++){
//     console.log(bd[i].id, bd[i].first_name, bd[i].last_name, bd[i].email, bd[i].gender, bd[i].ip_address)
//  }



