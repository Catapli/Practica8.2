'use strict'

const arrayInputs = document.getElementsByTagName('input');

const form  = document.getElementById("formulario")
const nombre = document.getElementById('name')
const nombreError = document.querySelector('span#name.error');
const originalPrice = document.getElementById('originalPrice');
const originalPriceError = document.querySelector('span#originalPrice.error');
const priceDiscount = document.getElementById('discountPrice');
const priceDiscountError = document.querySelector('span#discountPrice.error');
const stars = document.getElementById('stars');
const starsError = document.querySelector('span#stars.error');
const manualGear = document.getElementById('cambio');
const manualGearError = document.querySelector('span#cambio.error');
const km = document.getElementById('km');
const kmError = document.querySelector('span#km.error');
const fuel = document.getElementById('opciones');
const fuelError = document.querySelector('span#fuel.error');
const acept = document.getElementById('acept');
const aceptError = document.querySelector('span#acept.error');
const foto = document.getElementById('foto');
const fotoError = document.querySelector('span#foto.error');

window.addEventListener("load", function () {
    document.getElementById('newCar').addEventListener('click', function () {
        document.getElementById("productos").classList.add("hide")
        document.getElementById("formulario").classList.remove("hide")

    });
    document.getElementById('home').addEventListener('click', function () {
        document.getElementById("formulario").classList.add("hide")
        document.getElementById("productos").classList.remove("hide")

    });
    
    form.addEventListener('submit', (event) => {
        if(!form.checkValidity()) {
            nombreError.innerHTML = nombre.validationMessage;
            originalPriceError.innerHTML = originalPrice.validationMessage;
            priceDiscountError.innerHTML = priceDiscount.validationMessage;
            starsError.innerHTML = stars.validationMessage;
            kmError.innerHTML = km.validationMessage;
            fuelError.innerHTML = fuel.validationMessage;
            aceptError.innerHTML = acept.validationMessage;
            fotoError.innerHTML = foto.validationMessage;
        }else{
            let nombreCoche = nombre.value;
            let precioOriginal = Number(originalPrice.value)
            let precioDescuento =  Number(priceDiscount.value)
            let kilom =  Number(km.value)
            let estars =  Number(stars.value)
            let combus = Number(fuel.value) 
            let camb = manualGear.value
            let photo = foto.value
            let coche = {
                name:nombreCoche,
                km:kilom,
                original_price:precioOriginal,
                discount_price:precioDescuento,
                stars:estars,
                sale: true,
                fuel:combus,
                manual_gear:camb,
                img:photo
            }
            createProducts(coche)
        }
        
      });


    nombre.addEventListener("focus", (event) => {
          event.target.style.background = "pink"
    }, true)
    nombre.addEventListener("blur", ( event ) =>{
        event.target.style.background = "";
        nombreError.innerHTML = nombre.validationMessage;
      },true);
    
    originalPrice.addEventListener("focus", (event) => {
        event.target.style.background = "pink"
        
    }, true)
    originalPrice.addEventListener("blur", (event) =>{
      event.target.style.background = "";
      originalPriceError.innerHTML = originalPrice.validationMessage;
    
    }, true);

    priceDiscount.addEventListener("focus", (event) => {
        event.target.style.background = "pink"
    }, true)
    priceDiscount.addEventListener("blur", (event) => {
      event.target.style.background = "";
      priceDiscountError.innerHTML = priceDiscount.validationMessage;
    
    }, true);

    stars.addEventListener("focus" , (event) =>{
        event.target.style.background = "pink";
    }, true)
    stars.addEventListener("blur", (event) => {
        event.target.style.background = "";
        starsError.innerHTML = stars.validationMessage;
      }, true);  

    km.addEventListener("focus" , (event) =>{
        event.target.style.background = "pink";
    }, true)
    km.addEventListener("blur", (event) => {
        event.target.style.background = "";
        kmError.innerHTML = km.validationMessage;
    }, true);   
    fuel.addEventListener("focus" , (event) =>{
        event.target.style.background = "pink";
    }, true)
    fuel.addEventListener("blur", (event) => {
        event.target.style.background = "";
        fuelError.innerHTML = fuel.validationMessage;
    }, true); 
    foto.addEventListener("focus" , (event) =>{
        event.target.style.background = "pink";
    }, true)
    foto.addEventListener("blur", (event) => {
        var allowedExtensions = /(.jpg|.jpeg|.png|.webp)$/i;
        foto.setCustomValidity('Debes de elegir un formato adecuado')
        event.target.style.background = "";
        fotoError.innerHTML = foto.validationMessage;
    }, true); 
    insertarOption()
 
})
iniciarTodo()




function insertarOption(){
    let select = document.getElementById("opciones")
    for (let index = 0; index <= typesOfFuel.length; index++) {
        let option = document.createElement('option')
        option.textContent=typesOfFuel[index].fuel
        option.value=typesOfFuel[index].id
        select.appendChild(option)
        
    }
}


function iniciarTodo() {
    for (let index = 0; index <= products.length; index++) {
        createProducts(products[index])
    }
}


function tipoCambio(cadena) {
    if (cadena) {
        return "YES"
    } else {
        return "NO"
    }
}

function tipoCombustible(cadena) {
    let combustible = typesOfFuel.find(combustible => combustible.id === cadena);
    return combustible.fuel
}

function numCombustible(num){
    let combustible = typesOfFuel.find(combustible => combustible.fuel === num);
    return combustible.id
}

function descuento(cadena) {
    if (cadena == null) {
        return ""
    } else {
        return cadena.toFixed(2) + " €"
    }
}

function comprobar(original_price, discount_price) {
    let span = ""
    if (discount_price) {
        span = `<span class="text-muted text-decoration-line-through">` + original_price + `€ </span> ` + discount_price + `€`
    } else {
        span = original_price + " €"
    }
    return span

}

function sale(cadena) {
    let estado = ""
    if (cadena) {
        estado = "Sale"
    } else {
        estado = ""
    }
    return estado
}


function estrellas(cadena) {
    let puntos = ""
    for (let index = 0; index < cadena; index++) {
        puntos += ` <div class="bi-star-fill"></div>`
    }
    return puntos
}






function createProducts(producto) {
    let div1 = document.createElement('div')
    div1.className = 'col mb-5'
    div1.innerHTML = ` <div class="card h-100">
        <!-- Sale badge, sólo si está vendido-->
  <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem" id="precio">${sale(producto.sale)}</div>
  <!-- Product image-->
  <img class="card-img-top" src="media/photos/${producto.img}" alt="Imagen de _nombre_del_producto_" />
  <!-- Product details-->
  <div class="card-body p-4">
      <div class="text-center">
          <!-- Product name-->
          <h5 class="fw-bolder" id="model">${producto.name}</h5>
          <!-- Product reviews, un div bi-star para cada estrella a pintar-->
          <div class="d-flex justify-content-center small text-warning mb-2" id="estrellas">
              ${estrellas(producto.stars)}
          </div>
          <!-- Product price-->
          ${comprobar(producto.original_price, producto.discount_price)}
          <!-- Product details -->
          <p id="combustible">
              ${tipoCombustible(producto.fuel)}
              ${tipoCambio(producto.manual_gear)}
              <br>${producto.km + "km"}
          </p>
      </div>
  </div>
  <!-- Product actions-->
  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
      <div class="text-center"><a class="mostrarform btn btn-outline-dark mt-auto" href="#">Mostrar</a></div>
  </div>
</div>`
    document.getElementById('products').appendChild(div1)
    div1.querySelector('.mostrarform').addEventListener('click', () => {showProduct(producto)})
    

}

function showProduct(producto){
    document.getElementById("productos").classList.add("hide")
    document.getElementById("formulario").classList.remove("hide")
    document.getElementById("model").value = producto.name
    document.getElementById('model').setAttribute('readonly',true)
    document.getElementById('estrellas').value = estrellas(producto)
    document.getElementById('estrellas').setAttribute('readonly',true)
    document.getElementById('precio').value = sale(producto)
    document.getElementById('precio').setAttribute('readonly',true)
    document.getElementById('combustible').value = tipoCombustible(producto)
    document.getElementById('combustible').setAttribute('readonly',true)
    document.getElementById('kilometros').value = producto.km
    document.getElementById('kilometros').setAttribute('readonly',true)
}