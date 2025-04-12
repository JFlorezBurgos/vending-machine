const valorProductos = {
    A1 : 100,
    A2 : 200,
    A3 : 300,
    A4 : 400,
    B1 : 500,
    B2 : 600,
    B3 : 700,
    B4 : 800,
    C1 : 900,
    C2 : 1000,
    C3 : 1100,
    C4 : 1200,
    D1 : 1300,
    D2 : 1400,
    D3 : 1500,
    D4 : 1600,
}
const spans = document.querySelectorAll('#products > div span');

// Generar los códigos A1 a D4
const letras = ['A', 'B', 'C', 'D'];
const numeros = ['1', '2', '3', '4'];
const codigos = letras.flatMap(letra => numeros.map(num => letra + num));

// Asignar precio correspondiente a cada span
spans.forEach((span, index) => {
  const codigo = codigos[index];
  const precio = valorProductos[codigo];
  span.textContent = `${precio}$`;
});
let coins = 0

const insertCoin = document.querySelector('#insertCoin')

if (coins === 0) {
    document.querySelector('#panel').innerHTML = "Por favor, inserta uma moneda para comprar."
}

function insertarMoneda() {
    coins = 50000;
    document.querySelector('#coins').innerText = coins;
    document.querySelector('#panel').innerText = "Selecciona los productos que desees.";
}

insertCoin.addEventListener('click', insertarMoneda)
 
let letraSeleccionada = null;
let numeroSeleccionado = null;
let productoSeleccionado = null;

document.querySelectorAll('.button-select').forEach(button => {
  button.addEventListener('click', () => {
    const valor = button.innerText;

    if (['A', 'B', 'C', 'D'].includes(valor)) {
      letraSeleccionada = valor;
    } else if (['1', '2', '3', '4'].includes(valor)) {
      numeroSeleccionado = valor;
    }

    if (letraSeleccionada && numeroSeleccionado) {
      productoSeleccionado = letraSeleccionada + numeroSeleccionado;
      const precio = valorProductos[productoSeleccionado];
      document.querySelector('#panel').textContent = `Seleccionaste ${productoSeleccionado}. Precio: ${precio} coins.`;

      // Reiniciar selección para siguiente intento
      letraSeleccionada = null;
      numeroSeleccionado = null;
    }
  });
});

// Agregar el listener SOLO UNA VEZ
document.querySelector('#buy').addEventListener('click', () => {
  if (!productoSeleccionado) {
    document.querySelector('#panel').innerText = "Por favor selecciona un producto antes de comprar.";
    return;
  }

  const precio = valorProductos[productoSeleccionado];

  if (coins >= precio) {
    coins -= precio;
    document.querySelector('#coins').innerText = coins;
    document.querySelector('#panel').innerText = `Compraste ${productoSeleccionado}. Te quedan ${coins} coins.`;
  } else {
    document.querySelector('#panel').innerText = `No tienes suficientes coins para comprar ${productoSeleccionado}.`;
  }

  // Limpiar selección después de comprar
  productoSeleccionado = null;
});
