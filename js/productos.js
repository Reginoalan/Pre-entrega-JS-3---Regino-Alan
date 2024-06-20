const productos = [{
        id: 1,
        nombre: "Iono",
        precio: 2500,
    },
    {
        id: 2,
        nombre: "Boss Order",
        precio: 1000,
    },
    {
        id: 3,
        nombre: "Carmine Full Art Rare",
        precio: 50000,
    },
    {
        id: 4,
        nombre: "Professor's Research",
        precio: 900,
    },
    {
        id: 5,
        nombre: "Arven",
        precio: 2300,
    },
    {
        id: 6,
        nombre: "Lana's Aid",
        precio: 600,
    },
    {
        id: 7,
        nombre: "Irida",
        precio: 4000,
    },
    {
        id: 8,
        nombre: "Volkner",
        precio: 13000,
    },
    {
        id: 9,
        nombre: "Guzma",
        precio: 20000,
    }
]



function agregarAlCarrito(productoId, cantidad) {
    const producto = productos.find(p => p.id === productoId);
    if (!producto) {
        Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "No se encontro el producto",
        });
        return;
    }

    const itemCarrito = carrito.find(i => i.id === productoId);
    if (itemCarrito) {
        itemCarrito.cantidad += cantidad;
        itemCarrito.subTotal = itemCarrito.cantidad * producto.precio;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: cantidad,
            subTotal: cantidad * producto.precio
        })
    }

    guardarCarritoLocalStorage();
    renderCarrito(); //Para que se vea en el DOM
}

function renderProductos() {
    const listaDeProductos = document.getElementById('listaProductos');
    listaDeProductos.innerHTML = ``;
    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `<p>${producto.nombre} || $${producto.precio}</p>
        <button onclick = "agregarAlCarrito(${producto.id},1)" class = "boton">Agregar al carrito</button>`;
        listaDeProductos.appendChild(productoDiv);
        productoDiv.className = 'caja'; //Para agregar un poco de estilos
    })
}

function renderCarrito() {
    const carritoLista = document.getElementById('carrito');
    carritoLista.innerHTML = ``;
    carrito.forEach(item => {
        const carritoListaDiv = document.createElement('div');
        carritoListaDiv.innerHTML = `<p>Carta: ${item.nombre}<br> Cantidad: ${item.cantidad}<br> Precio: $${item.subTotal} </p><br>`;
        carritoLista.appendChild(carritoListaDiv);
    })
}

function guardarCarritoLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarDesdeLocalStorage() {
    const dataCarrito = localStorage.getItem('carrito');
    return dataCarrito ? JSON.parse(dataCarrito) : [];
}



let carrito = cargarDesdeLocalStorage();


document.addEventListener('DOMContentLoaded', () => {
    renderProductos();
    renderCarrito();
})

function compraOK() {
    Swal.fire({
        title: "Desea finalizar la compra?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Comprar",
        denyButtonText: `Atras`
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Muchas gracias por tu compra!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Por favor volver a intentar", "", "error");
        }
    });
}