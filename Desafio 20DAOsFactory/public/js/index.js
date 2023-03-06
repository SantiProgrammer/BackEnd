/* Declaración de constructor objeto Producto */
class Producto {
  constructor(producto) {
    this.id = producto._id;
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.descripcion = producto.descripcion;
    this.thumbnail = producto.thumbnail;
    this.stock = producto.stock;
    this.cantidad = 1;
  }
  sumar1ACantidad() {
    this.cantidad++;
  }
  TotalDelCarrito() {
    this.totalPrecio = this.precio * this.cantidad;
  }

}

const cantidadTotal = document.getElementById('cantidadTotal')

/* Array carrito */
let carrito = [];

/* LocalStorage.getItem */
carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* Fetch renderiza productos de stock en el DOM */
const productosWrapper = document.getElementById("productos-wrapper")
const printProductos = async () => {
  const respuesta = await fetch("/api/product/stock");
  const data = await respuesta.json();
  stockProductos = data;
  stockProductos.forEach((producto) => {
    let card = document.createElement("div");
    card.innerHTML = `
         <figure class="card m-2 list-group-item">
               <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.nombre}">
               <p class="card-title">${producto.nombre} </p>
               <p class="card-description">(${producto.descripcion})</p>
               <p class="card-text">$ ${producto.precio}</p>

               <button class="btn btn-primary" id="p${producto._id}">Agregar al Carrito</button>
         </figure> `;
    productosWrapper.appendChild(card);
    const boton = document.getElementById(`p${producto._id}`)
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto._id)
    })
  })
}

printProductos()

/*  Funcion argegar al carrito sumar producto */
const agregarAlCarrito = (productoId) => {
  const item = carrito.find((producto) => producto.id === productoId);
  if (item) {
    function sumar1ACantidad() {
      item.cantidad++;
    }
    sumar1ACantidad();

    function TotalDelCarrito() {
      item.totalPrecio = item.precio * item.cantidad;
    }
    TotalDelCarrito()

    Swal.fire({
      position: 'center',
      icon: 'success',
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutTopRight'
      },
      title: `${item.nombre} sumado!`,
      imageUrl: `${item.thumbnail}`,
      imageHeight: 100,
      imageWidth: 100,
      text: `${item.cantidad}  ${item.nombre}s en el carrito`,
      showConfirmButton: false,
      timer: 900
    });
    /*  Funcion argegar al carrito por primera vez */
  } else {
    let newProducto = stockProductos.find((producto) => producto._id === productoId);
    carrito.push(new Producto(newProducto));
    carrito[carrito.length - 1].TotalDelCarrito()

    Swal.fire({
      position: 'center',
      icon: 'success',
      showClass: {
        popup: 'animate__animated animate__zoomIn'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutTopRight'
      },
      title: `${newProducto.nombre}`,
      imageUrl: `${newProducto.thumbnail}`,
      imageHeight: 100,
      imageWidth: 100,
      text: "Se agrego correctamente al carrito",
      showConfirmButton: false,
      timer: 900
    })
  }
  actualizarCarrito()
}

const deleteCart = (productoId) => {
  const item = carrito.find((producto) => producto.id === productoId);
  const index = carrito.indexOf(item);
  carrito.splice(index, 1);
  actualizarCarrito()
}

/*  Vaciar el array del carrito */
const vaciarCarrito = document.getElementById('vaciarCarrito')
vaciarCarrito.addEventListener('click', () => {
  carrito.length = 0
  actualizarCarrito()
})

/*  Funcion pagar total del carrito*/
const pagarTotal = document.getElementById('pagarTotal')
pagarTotal.addEventListener('click', () => {
  Swal.fire({
    title: `Total: $${totalCarrito} `,
    text: 'Se enviara un correo con los productos de tu pedido',
    showClass: {
      popup: 'animate__animated animate__fadeInTopRight'
    },
    hideClass: {
      popup: 'animate__animated animate__bounceOutRight'
    },
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/9720/9720629.png',
    imageHeight: 40,
    confirmButtonText: 'Pagar',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    /* Aqui irira una confirmacion de pago (otro sweet alert) */
  })

  /*  function sentCarrito() {
     socket.emit("carritoUser", carrito);
   }
   sentCarrito() */
  carrito.length = 0;
  actualizarCarrito()
})

/*  Renderizar productos en carrito */

const carritoWrapper = document.getElementById("carrito-wrapper")
const actualizarCarrito = () => {
  console.log('Carrito:', carrito);
  carritoWrapper.innerHTML = "";
  if (carrito.length === 0) {
    let aviso = document.createElement("div");
    aviso.innerHTML =
      `<p class="carritoVacio"> El carrito de compras está vacío </p>`
    carritoWrapper.appendChild(aviso);
  } else {
    carrito.forEach((producto) => {
      let card = document.createElement("div")
      card.innerHTML = `
    <figure class="card mb-4 ">
      <div class="row g-0">
          <div class="col-md-3 img-carrito">
              <img src="${producto.thumbnail}" class="img-fluid rounded-start" alt="${producto.nombre}">
          </div>
          <div class="col-md-6">
             <div class="card-detalle">
                <p class="card-title">${producto.nombre} </p>
                <p class="card-text">Cant: ${producto.cantidad}</p>
                <p class="card-text">Total: $ ${producto.totalPrecio}</p>
             </div>
          </div>
          <div class="col-md-3 d-flex">
                <button class="btn btn-primary eliminar" id="eliminar${producto.id}">Eliminar</button>
          </div>
      </div>
    </figure
    `
      carritoWrapper.appendChild(card);

      const botonDelete = document.getElementById(`eliminar${producto.id}`)
      botonDelete.addEventListener('click', () => {
        deleteCart(producto.id)
      })
    })
  }

  /* Guardar en localStorage.setItem el array del carrito */
  localStorage.setItem('carrito', JSON.stringify(carrito))

  const productosCounter = document.getElementById("productosCounter")

  productosCounter.innerText = carrito.reduce((acumulador, elemento) => acumulador + elemento.cantidad, 0);

  console.log('carrito', carrito);

  const totalPrecioCarrito = document.getElementById('totalPrecioCarrito')

  totalPrecioCarrito.innerText = carrito.reduce((total, elemento) => total + elemento.totalPrecio, 0);
  totalCarrito = carrito.reduce((total, elemento) => total + elemento.totalPrecio, 0);
}

actualizarCarrito()

/* Buscar productos */

document.querySelector('#serch-input').addEventListener('input', filterList)

function filterList() {
  const serchInput = document.querySelector('#serch-input');
  const filter = serchInput.value.toLowerCase();
  const listItems = document.querySelectorAll('.list-group-item');

  listItems.forEach((item) => {
    let text = item.textContent;
    if (text.toLowerCase().includes(filter.toLowerCase())) {
      item.style.opacity = 1;
      item.style.zIndex = 1;
    } else {
      item.style.opacity = .1;
      item.style.zIndex = -1;
    }
  });
}

/* Fin */
