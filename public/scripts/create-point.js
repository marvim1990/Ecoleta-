
const populateUfs = () => {
    const ufselect = document.querySelector('select[name = uf')
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then(res => res.json())
        .then( states => {
            for( let state of states){
                ufselect.innerHTML +=`<option value ="${state.id}">${state.nome}`
            }
        })

}
populateUfs()

const getCities = (event) => {
    const citySelect = document.querySelector("select[name = city]")
    const stateInput = document.querySelector("input[name = state]")
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState    ].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/distritos`
    
    citySelect.innerHTML = "<option value> Selecione a Cidade</option>"
    citySelect.disabled = true;

    fetch(url)
    .then(res => res.json())
    .then( cities => {
        for( let city of cities) {
            citySelect.innerHTML += `<option value = "${city.nome}">${city.nome}` 
        }
        citySelect.disabled = false
    })

}

document
    .querySelector("select[name = uf]")
    .addEventListener("change", getCities)

//itens de coleta 

// pegar todos os li´s

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handSelectedItem)
}
const collectedItems = document.querySelector("input[name=items")
let selectedItems =[]

function handSelectedItem(event) {
    const itemLi = event.target;

    //adicionar ou remover uma classe
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    console.log("item id:",itemId)


    //verificar se existem itens selecionados 
    //pegar os itens

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId 
        return itemFound
    })

    //se já estiver selecionado tirar da seleção 
    if (alreadySelected >= 0 ) {
        //tire da seleção
        const filteredItems = selectedItems.filter( item =>{
            const itemIsDiferent = item != itemId
            return itemIsDiferent
        })
        selectedItems = filteredItems
    }else {
        selectedItems.push(itemId)
    }
    console.log("selected items:", selectedItems)
    collectedItems.value = selectedItems
    //atualizar o campo escondido "hidden"
    
} 

