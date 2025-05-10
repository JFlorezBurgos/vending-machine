// Valores de los productos
const valorProductos = {
  A1: 250,
  A2: 350,
  A3: 450,
  B1: 500,
  B2: 500,
  B3: 500,
  C1: 900,
  C2: 900,
  C3: 50000,
};

// Variables globales
let coins = 0;
let letraSeleccionada = null;
let numeroSeleccionado = null;
let productoSeleccionado = null;

// Elementos del DOM
const spans = document.querySelectorAll('#products > div button > span');
const insertCoin = document.querySelector('#insertCoin');
const panel = document.querySelector('#panel');
const coinsDisplay = document.querySelector('#coins');
const buyButton = document.querySelector('#buy');

// Generar los códigos A1 a C3
const letras = ['A', 'B', 'C'];
const numeros = ['1', '2', '3'];
const codigos = letras.flatMap((letra) => numeros.map((num) => letra + num));

// Asignar precio correspondiente a cada span
spans.forEach((span, index) => {
  const codigo = codigos[index];
  const precio = valorProductos[codigo];
  span.textContent = `${precio}`;
});

// Inicializar monedas desde localStorage
if (localStorage.getItem('coins')) {
  coins = parseInt(localStorage.getItem('coins'), 10);
} else {
  coins = 0;
}
coinsDisplay.innerText = coins;
panel.innerText = coins === 0 ? "Inserta una moneda para comprar." : "Selecciona los productos que desees.";

// Función para insertar moneda
function insertarMoneda() {
  const audio = new Audio('assets/sound/coin-insert.mp3');
  audio.play();
  coins = 50000;
  localStorage.setItem('coins', coins);
  coinsDisplay.innerText = coins;
  panel.innerText = "Selecciona los productos que desees.";
}

// Evento para insertar moneda
insertCoin.addEventListener('click', insertarMoneda);

// Evento para seleccionar producto
document.querySelectorAll('.button-select').forEach((button) => {
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
      panel.textContent = `Seleccionaste ${productoSeleccionado}. Precio: ${precio} coins.`;

      const index = codigos.indexOf(productoSeleccionado);
      if (index !== -1) {
        const productoDiv = document.querySelectorAll('#products > div')[index];
        const img = productoDiv.querySelector('img');

        // Añadir la clase 'bounce'
        img.classList.add('bounce');

        // Removerla después para poder repetir el efecto en próximos clics
        setTimeout(() => {
          img.classList.remove('bounce');
        }, 400);
      }

      letraSeleccionada = null;
      numeroSeleccionado = null;
    }
  });
});

// Evento para comprar producto
buyButton.addEventListener('click', () => {
  if (!productoSeleccionado) {
    panel.innerText = "Por favor selecciona un producto antes de comprar.";
    return;
  }

  const precio = valorProductos[productoSeleccionado];

  if (coins >= precio) {
    coins -= precio;
    localStorage.setItem('coins', coins);
    coinsDisplay.innerText = coins;
    panel.innerText = `Compraste ${productoSeleccionado}. Te quedan ${coins} coins.`;

    const index = codigos.indexOf(productoSeleccionado);
    if (index !== -1) {
      const productoDiv = document.querySelectorAll('#products > div')[index];
      const img = productoDiv.querySelector('img');

      // Clonar la imagen para simular que cae
      const imgClone = img.cloneNode(true);
      imgClone.classList.add('fall');
      imgClone.style.position = 'absolute';
      imgClone.style.top = productoDiv.getBoundingClientRect().top + 'px';
      imgClone.style.left = productoDiv.getBoundingClientRect().left + 'px';
      imgClone.style.width = img.offsetWidth + 'px';
      imgClone.style.height = img.offsetHeight + 'px';
      imgClone.style.zIndex = 9999;
      document.body.appendChild(imgClone);

      // Eliminar la imagen clonada después de la animación
      setTimeout(() => {
        imgClone.remove();
      }, 800);
    }

    // Emitir un sonido
    const audio = new Audio('assets/sound/buying.mp3');
    audio.play();
  } else {
    panel.innerText = `No tienes suficientes coins para comprar ${productoSeleccionado}.`;
  }

  // Limpiar selección después de comprar
  productoSeleccionado = null;
});
