const people = [];
let content = '';

async function loadCards() {
    const divCards = document.querySelector(".cards");

    divCards.innerHTML += `
        <div id="loading">
            <img src='img/loading.gif'>
        </div>
    `

    for(let i = 1; i <= 10; i++) {
        const response = await fetch(`https://swapi.dev/api/people/${i}`);
        const result = await response.json();

        people.push({
            name: result.name,
            photo: `img/people-images/${i}.jpg`
        });
    }

    people.map(person => addCard(person))
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
