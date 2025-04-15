const valorProductos = {
    A1 : 100,
    A2 : 200,
    A3 : 300,
    B1 : 500,
    B2 : 600,
    B3 : 700,
    C1 : 900,
    C2 : 1000,
    C3 : 1100
}
const spans = document.querySelectorAll('#products > div button > span');

// Generar los códigos A1 a C3
const letras = ['A', 'B', 'C'];
const numeros = ['1', '2', '3'];
const codigos = letras.flatMap(letra => numeros.map(num => letra + num));

// Asignar precio correspondiente a cada span
spans.forEach((span, index) => {
  const codigo = codigos[index];
  const precio = valorProductos[codigo];
  span.textContent = `${precio}`;
});
let coins = 0

const insertCoin = document.querySelector('#insertCoin')

if (coins === 0) {
    document.querySelector('#panel').innerHTML = "Inserta una moneda para comprar."
}

function insertarMoneda() {
    // Emitir un sonido
    const audio = new Audio('assets/sound/coin-insert.mp3');
    audio.play();
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
    // emitir un sonido
    const audio = new Audio('assets/sound/buying.mp3');
    audio.play();
    
  } else {
    document.querySelector('#panel').innerText = `No tienes suficientes coins para comprar ${productoSeleccionado}.`;
  }
  // Limpiar selección después de comprar
  productoSeleccionado = null;
});
