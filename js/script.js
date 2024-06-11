const people = [];
const species = [];
let content = '';
let movies = [];

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
        const result = await response.json();

        people.push({
            id: i,
            name: result.name,
            photo: `img/people-images/${i}.jpg`,
            birth_year: result.birth_year,
            hair_color: result.hair_color,
            height: result.height,
            eye_color: result.eye_color,
            films: result.films
        });
    }

    people.map(person => {
        addCard(person, 'people');
    })

}

async function loadCardsSpecies() {
    pageLoading();

    for(let i = 1; i <= 10; i++) {
        const response = await fetch(`https://swapi.dev/api/species/${i}`);
        const result = await response.json();

        species.push({
            id: i,
            name: result.name,
            photo: `img/species-images/${i}.jpg`
        })
    }

    species.map((specie) => addCard(specie));

}

async function addCard(item, contentList) {
    const {id, name, photo} = item;
    const divCards = document.querySelector(".cards");

    content += `
        <div class = "card" onclick="openInfoCard(${contentList}, ${id})">
            <img src= ${photo}>
            <p>${name}</p>
        </div>
    `
    divCards.innerHTML = content;
}

function openInfoCard(contentList, id) {
    const modal = document.querySelector(".modal");
    modal.style.display = 'flex';

    let cardInfo = document.querySelector(".cardInfo");

    contentList.map(item => {
        if(id === item.id) {
            cardInfo.innerHTML = `
                <img src = ${item.photo}>

                <div class = "item-info">
                    <p>${item.name}</p> 

                    <p class = "infoPerson">Birth Year: ${item.birth_year} <br><br>
                    Hair Color: ${item.hair_color} <br><br>
                    Height: ${item.height} <br><br>
                    Eye Color: ${item.eye_color} <br><br>
                    </p>        
                </div>
            `

            item.films.map(async film => {
                const response = await fetch(film);
                const moviePerson = await response.json();
            
                const imgMovie = `img/movies/${moviePerson.episode_id}.jpg`

                console.log(imgMovie)

                cardInfo.innerHTML += `
                    <img src = ${imgMovie}>
                `

            })
        }
    })
    
}

function closeInfoCard() {
    const modal = document.querySelector(".modal");

    modal.style.display = 'none'; 
}