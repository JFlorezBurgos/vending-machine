const coins = document.querySelector('#coins').innerText = "0"
const insertCoin = document.querySelector('#insertCoin')

if (coins === "0") {
    document.querySelector('#panel').innerHTML = "Por favor, inserta uma moneda para comprar."
}

function insertarMoneda() {
    document.querySelector('#coins').innerText = "2000"
    
}

insertCoin.addEventListener('click', insertarMoneda)
