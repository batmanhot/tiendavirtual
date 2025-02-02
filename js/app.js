const agregar = document.querySelector('.card-compras-botonagregar')
const listaItems = document.querySelector('.contenido')
const contenedorCarrito = document.querySelector('#lista-carrito-cuerpo');

const contadoritems = document.querySelector('#contador-items')
const vercarrito = document.querySelector('.card-compras-botonvercarrito')
const listacarritoresumen  = document.querySelector('.lista-carrito-resumen')
const vaciarcarrito = document.querySelector('#vaciar-carrito')

listaItems.addEventListener('click', agregarItem );
vercarrito.addEventListener('click',carritoFormatoCuadradoHTML);
vaciarcarrito.addEventListener('click', vaciarCarrito );

document.addEventListener("DOMContentLoaded", load, false);

// --- boton de envio de formulario de contacto actualizad datos personales ---
const botonenvio = document.querySelector('#boton-envio')
botonenvio.addEventListener('click',SaveStorageDatosEnvio)


let articulosCarrito = [];
let InfoItem = {};

let nContarItems=0

// Cargar valores iniciales

function load(){
    muestra = document.querySelector("#contador-items")    
    muestra.style.cssText = 'display: none;'    
    console.log("El carrito se encuentra :  " + (muestra.textContent="( 0 )" ? "Vacio" : "con datos"))    
// }

}


function cierremodal(){
    document.getElementById('cerrarmodal').click();    
}

function cierremodalcierre(){
    vaciarCarrito()
    document.getElementById('cerrarmodalCierre').click();    
}



function cargadatoscierre(){   
    // RestoreStorageDatosEnvio()    
}

// Agrega Item Seleccionado al carrito de compras
function agregarItem(e){
    e.preventDefault();
    nContarItems = nContarItems + 1
    // console.log("Detecto que esta agregando un Item...", nContarItems) 
       
    // -- Me ubico en la zona de los datos del articulo 
    const Item = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
    leerItem(Item);    
    ActualizaCantidadItems(nContarItems);
}

    
function leerItem(Item){
    InfoItem = {
        Imagen   : Item.querySelector('.card-img > img').src,
        Titulo   : Item.querySelector('.card-texto > h4').textContent,
        Precio   : Item.querySelector('.card-precio >p').textContent,
        id       : Item.querySelector('.card-img > img').alt,
        Cantidad : 1 
    }
    console.log(InfoItem.Titulo);
    console.log(InfoItem.Precio);
    console.log(InfoItem.Imagen);
    console.log(InfoItem.Cantidad);
    console.log(InfoItem.id);

    // -- se verifica si el producto ya existe 
    const existe = articulosCarrito.some(product => product.Titulo === InfoItem.Titulo)

    if (existe){
            const products = articulosCarrito.map(product => {
            if(product.Titulo === InfoItem.Titulo){
                product.Cantidad = product.Cantidad + 1;
                return product;
            }
            else{
                return product;
            }
            });  
            articulosCarrito = [...products];  
        }         
        else {
            articulosCarrito = [...articulosCarrito, InfoItem];
        }
}

function vaciarCarrito() {

    articulosCarrito.length = 0
    InfoItem.length = 0
    nContarItems    = 0

    document.getElementById("lista-carrito-cuerpo").innerHTML = ""           
    ActualizaCantidadItems(nContarItems)
    ActualizaResumenItems( 0, 0)    
}

function ActualizaCantidadItems(contador) {
    document.getElementById('contador-items').innerHTML = '( '+`${contador}`+' )';

    if (contador<=0) {
        muestra.style.cssText = 'display: none;'
    } else {
        muestra.style.cssText = 'visibility: visible;'
    }            
}


function ActualizaResumenItems(totalItems, totalProductos) 
{         
    document.getElementById("lista-carrito-resumen-Pedido").innerHTML = `<h4>TOTAL PEDIDO: S/. ${totalProductos.toFixed(2)}</h4>`;
    document.getElementById('total').value = totalProductos.toFixed(2);
    document.getElementById('cantidaditems').value = totalItems;   

    // --- Verificando si los datos del contacto se habilitan         

    let elemento = document.querySelector(".contacto");

    if (totalItems<=0) {
        elemento.style.cssText = 'display: none;'
    } else {
        elemento.style.cssText = 'visibility: visible;'
    }            

}

function carritoFormatoCuadradoHTML() {

    let TotalProductos = 0;   
    let TotalItems     = 0;   
    let rowx = ""

    document.getElementById("lista-carrito-cuerpo").innerHTML = ""            

    articulosCarrito.forEach(product => {        
        TotalItems = TotalItems + 1;
        let rowx = document.createElement('div');
        rowx.classList.add("lista-carrito-div")

        rowx.innerHTML = `        
        <div id="lista-carrito-cuerpo-titulo-horizontal">
          <p id="lista-carrito-cuerpo-titulo">${TotalItems}</p>.- 
          <h4 id="lista-carrito-cuerpo-titulo">${product.Titulo.toUpperCase()}</h4>
         </div>

         <div id="lista-carrito-cuerpo-horizontal">
            <p id="lista-carrito-cuerpo-cantidad" >Und. ${product.Cantidad} </p>
            <p id="lista-carrito-cuerpo-precio">S/.${product.Precio}</p>         
            <p><a href="#" id="eliminar-carrito" class="button-carrito" onClick ="eliminarItemCarritoHTML(event, '${product.Titulo}')"> <i class="fa-solid fa-trash"></i> </a> </p>
         </div>        
         <br> 
         `;                 
        
        TotalProductos = TotalProductos + (product.Cantidad * product.Precio);
        // TotalItems = TotalItems + 1;

        contenedorCarrito.appendChild(rowx); 
        
    });
    
    ActualizaResumenItems(TotalItems, TotalProductos)    
    SaveStorageDatosCompra()
};


function eliminarItemCarritoHTML(e, titulo) {   

    e.preventDefault()
    
    // --- Eliminando un Item del Arreglo de objetos de Articulos del Carrito ---

    console.log("eliminanddo item", titulo)    

    let indice = articulosCarrito.findIndex(function(elemento){
        return elemento.Titulo == titulo
    });

    articulosCarrito.splice(indice, 1)
    nContarItems = nContarItems  - 1

    // --- Pintar la informacion restante del Carrito ---    
    carritoFormatoCuadradoHTML()
    ActualizaCantidadItems(nContarItems)
    return
}

function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }


function fechayhoraactual(){      
    let date = new Date();
    let now  = String(date.getDate()).padStart(2, '0') + '/' +
    String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
    
    const d = new Date();
    let h = addZero(d.getHours());
    let m = addZero(d.getMinutes());
    let s = addZero(d.getSeconds());
    let time = h + ":" + m + ":" + s;

    let horario= now+' '+time
    return horario;
}

function SaveStorageDatosTotal(vtotal,vtotalitems, items){      

    vfechayhora = fechayhoraactual()

    let TotalPedido=[{
        "totalpedido": vtotal,
        "fechayhora": vfechayhora,
        "totalitems": vtotalitems
    }]

    var jsonDatos = JSON.stringify(TotalPedido);
    let result = window.localStorage.setItem('TotalPedido', jsonDatos);
    
}         

function SaveStorageDatosCompra(){            
    
    let nTotalItems=0
    let nTotalProductos=0

    articulosCarrito.forEach(producto => {        
        nTotalProductos = nTotalProductos + (producto.Cantidad * producto.Precio);
        nTotalItems = nTotalItems + 1;

        console.log("cargando")

        console.log(producto.Cantidad)
        console.log(producto.Precio)
        console.log(producto.Titulo)
        console.log(producto.Imagen)
        console.log(nTotalProductos)        
        
    });

    var jsonDatos = JSON.stringify(articulosCarrito);
    var result = window.localStorage.setItem('ItemsVenta', jsonDatos);

    SaveStorageDatosTotal(nTotalProductos,nTotalItems)
};


function SaveStorageDatosEnvio(){      
    const vnombres =  document.querySelector("#first_name").value;
    const vapellidos =  document.querySelector("#last_name").value;
    const vdireccion =  document.querySelector("#direccion").value;
    const vphone =  document.querySelector("#phone").value;
    const vreferencia =  document.querySelector("#referencia").value;
    const vemail =  document.querySelector("#email").value;
    const vtotal =  document.querySelector("#total").value;
    const vcantidad =  document.querySelector("#cantidaditems").value;
    let now = new Date()    
    datosenvio =
        {        
            "nombres": vnombres.trim(),
            "apellido": vapellidos.trim(),
            "direccion":vdireccion.trim(),
            "phone":vphone.trim(),
            "referencia":vreferencia.trim(),
            "email":vemail.trim(),
            "totalPedido": parseFloat(vtotal),
            "fechaHora": now,
            "totalItems":parseInt(vcantidad),
            "pedidoatendido": false
        }

    var jsonDatos = JSON.stringify(datosenvio);    

    let result = window.localStorage.setItem('DatosCliente', jsonDatos);
    
    PostPedidoCliente(datosenvio)    
    RestoreStorageDatosEnvio();
    cierremodal();    
}

function RestoreStorageDatosTotal(){         
    
    let recogeInfo = JSON.parse(localStorage.TotalPedido);

    console.log(recogeInfo)

    recogeInfo.forEach(dato => {                
        console.log(dato.totalpedido);
        console.log(dato.fechayhora);
        console.log(dato.totalitems);       
        
        document.getElementById("datosenvio-totalpedido").innerHTML =  `<h1>TOTAL PEDIDO S/. ${(dato.totalpedido).toFixed(2)}</h1>`
        
    
    })};

function RestoreStorageDatosEnvio(){   

    let datosEnvioaMostrar = JSON.parse(localStorage.DatosCliente);

    const cliente = document.querySelector('.cliente')
    const direccion = document.querySelector('.directo')
    const hora = document.querySelector('.hora');
    const mail = document.querySelector('.mail');

    // cliente.innerHTML     =  `<p>${datosEnvioaMostrar.nombres+' '+datosEnvioaMostrar.apellido}</p>`
    // direccion.innerHTML   =  `<p>${datosEnvioaMostrar.direccion}</p>`
    // hora.innerHTML        =  `<p>${datosEnvioaMostrar.fechaHora}</p>`
    // mail.innerHTML        =  `<p>${datosEnvioaMostrar.email}</p>`    
};