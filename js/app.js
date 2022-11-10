let articulosCarrito = [];
const carrito = document.querySelector("#carrito");
const vaciarcarrito = document.querySelector("#vaciar-carrito");
const divCarrito = document.querySelector("#lista-carrito tbody");
const listaArticulos = document.querySelector("#lista-articulos");
const precioTotal = document.querySelector("#total");

let precios = document.querySelector(".info-card .precio span");
console.log(precios.textContent)
// const removeCharacterFromString = (position) => { 
//     precios = removeCharacterFromString.slice(position, 0)
//     console.log(removeCharacterFromString)
// } 

const contadorCarrito = document.querySelector("#contadorCarrito");
document.addEventListener("DOMContentLoaded",()=>{
    guardarLocalStorage = JSON.parse(localStorage.getItem(articulosCarrito)) || [];
    carritoHTML()
});

registrarEventListeners()

//----------------------FUNCIONES---------------------------
//CAPTURAMOS LOS EVENTOS CON ESTA FUNCION
function registrarEventListeners(){
    listaArticulos.addEventListener("click", agregarArticulo);
    //eleiminar todos los articulos (vaciar todo)
    carrito.addEventListener("click", eliminarArticulo);
    vaciarcarrito.addEventListener("click", ()=>{
        articulosCarrito = [];
        limpiarHTML();
    });
}
//AGREGAMOS LOS ARTICULOS AL CARRITO
function agregarArticulo(e){
    e.preventDefault()//previene que el boton precargue la pagina
    if(e.target.classList.contains("agregar-carrito")){
        const articulosSeleccionados = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        leerDatosArticulos(articulosSeleccionados);
    }
}

//funcion para eliminar articulos
function eliminarArticulo(e){
    e.preventDefault()//previene que el boton precargue la pagina
    if(e.target.classList.contains("borrar-articulo")){
        const articuloID = e.target.getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter(articulo=>articulo.id !== articuloID);
        carritoHTML();
        // console.log(e.target.getAttribute("data-id"))
    }
}
 
//FUNCION QUE LEA EL HTML DONDE SE DA CLICK Y LO EXTRAEMOS
function leerDatosArticulos(articulo){
    //creemos un objeto con los datos de card
    const infoArticuloimg = {
        imagen:articulo.querySelector(".card img").src,
        titulo:articulo.querySelector("h4").textContent,
        precio:articulo.querySelector(".precio span").textContent,
        id:articulo.querySelector("a").getAttribute("data-id"),
        cantidad:1,

        
    }
    //revisemos si el articulo ya esta en el array y si esta, solo actualizo la cantidad
    //sino adiciono el nuevo articulo
    const existeArticulo = articulosCarrito.some(articulo => articulo.id === infoArticuloimg.id);
    if(existeArticulo){
        const articulo = articulosCarrito.map(articulo=>{
            if(articulo.id === infoArticuloimg.id){
                articulo.cantidad++;
                return articulo;
            }else{
                return articulo;
            }
        })
        articulosCarrito =[...articulo];
    }else{
        //sino existe agregamos el producto al carrito
        articulosCarrito = [...articulosCarrito,infoArticuloimg];
    }
    carritoHTML();
}

//INYECTAR LOS ARTICULOS DEL ARRAY EN EL HTML DEL CARRITO (tbody)
function carritoHTML(){
    localStorages();
    //llama la funcion que limpia el carrito
    limpiarHTML();
    articulosCarrito.forEach((articulo)=>{
        const {imagen,titulo,precio,cantidad,id} = articulo;//destructuring

       const row = document.createElement("tr");
       row.innerHTML = `
       <td>
       <img src="${articulo.imagen}" width="100%"">
       </td>
        <td>
        ${titulo}
        </td>
        <td>
        ${precio}
        </td>
        <td>
        ${cantidad}
        </td>
        <td>
        <a href="#" class="borrar-articulo" data-id="${articulo.id}"><img class="borrar-articulo" src="./img/eliminar-png.png" alt="eliminar.png" data-id="${articulo.id}" width="30px""></a>
        </td>
        `;
        //console.log(row)
        divCarrito.appendChild(row);
    })
    //contador de articulos agregados al carrito
    contadorCarrito.textContent = articulosCarrito.length
    //calculcar precio total
    precioTotal.innerText = articulosCarrito.reduce((acumulador, prod)=> acumulador + prod.cantidad * prod.precio, 0)
}

//crear una funcion que nos limpie el html del carrito cuando demos click
function limpiarHTML(){
    //esta forma es lenta y sirve para aplicativos pequeños
    // divCarrito.innerHTML = "";

    //esta forma es mucho mejor para limpiar el html
    while(divCarrito.firstChild){
        divCarrito.removeChild(divCarrito.firstChild);
    }
}

//funcion de localStorage para no perder los articulos agregados al carrito
function localStorages(){
    window.localStorage.setItem("guardarLocalStorage", JSON.stringify(articulosCarrito))
 }