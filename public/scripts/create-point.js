//console.log() - colocar informações no log do navegador
//console.log("Hello World")
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) //arrow function ex.: (res) => {return res.json()}
    .then( states => {
        for ( const state of states ) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //2 linhas abaixo pra corrigir o erro de ficar acumulando as cidades quando muda o estado
    citySelect.innerHTML = "<option>Selecione a Cidade</option>"
    citySelect.disabled = true


    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for ( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de coleta
//pegar todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li")
//verificar se foi selecionado
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

// let - permite mudar os valores da variavel const - constante
let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    //adicionar ou remover uma classe no JS
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    console.log("ITEM ID:", itemId)
    //verificar se o item esta selecionado
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // True ou False
        return itemFound
    })
    //se ja estiver selecionado, tirar da seleção
    if ( alreadySelected >= 0){
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })
        
        selectedItems = filteredItems
    } else {
        // se não está selecionado, add
        selectedItems.push(itemId)
    }
    console.log("selectedItems: ", selectedItems)
    collectedItems.value = selectedItems
    
}