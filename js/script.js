const people = [];
const species = [];
let content = '';

const pageLoading = () => {
    const divCards = document.querySelector(".cards");

    divCards.innerHTML += `
        <div id="loading">
            <img src='img/loading.gif'>
        </div>
    `;
}
async function loadCardsPeople() {
    pageLoading();

    for(let i = 1; i <= 10; i++) {
        const response = await fetch(`https://swapi.dev/api/people/${i}`);
        const result = await response.json()

        people.push({
            name: result.name,
            photo: `img/people-images/${i}.jpg`
        });
    }

    people.map(person => addCard(person))
}

async function loadCardsSpecies() {
    pageLoading();

    for(let i = 1; i <= 10; i++) {
        const response = await fetch(`https://swapi.dev/api/species/${i}`);
        const result = await response.json();

        species.push({
            name: result.name,
            photo: `img/species-images/${i}.jpg`
        })
    }

    species.map((specie) => addCard(specie));

}

async function addCard(item) {
    const {name, photo} = item;
    const divCards = document.querySelector(".cards");

    content += `
        <div class = "card">
            <img src= ${photo}>
            <p>${name}</p>
        </div>
    `
    divCards.innerHTML = content;
}
