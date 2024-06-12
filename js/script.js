const people = [];
const species = [];
let content = '';
let moviesContent = '';
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

    people.map((person) => addCard(person, 'people'));
}

async function loadCardsSpecies() {
    pageLoading();

    for(let i = 1; i <= 10; i++) {
        const response = await fetch(`https://swapi.dev/api/species/${i}`);
        const result = await response.json();

        species.push({
            id: i,
            name: result.name,
            photo: `img/species-images/${i}.jpg`,
            classification: result.classification,
            designation: result.designation,
            eye_colors: result.eye_colors,
            average_height: result.average_height,
            films: result.films
        })
    }

    species.map((specie) => addCard(specie, 'species'));
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
    console.log(contentList)

    const modal = document.querySelector(".modal");
    modal.style.display = 'flex';

    const cardInfo = document.querySelector(".cardInfo");
    let cardMovies = document.querySelector(".cardMovies");

    cardMovies.innerHTML = '';

    contentList.map(item => {
        console.log(item)
        
        if(id === item.id) {
            item.birth_year !== undefined ?
                cardInfo.innerHTML = `
                    <img src = ${item.photo}>

                    <div class = "item-info">
                        <p>${item.name}</p> 

                        <p class = "infoItem">Birth Year: ${item.birth_year} <br><br>
                        Hair Color: ${item.hair_color} <br><br>
                        Height: ${item.height}cm <br><br>
                        Eye Color: ${item.eye_color} <br><br>
                        </p>   
                    </div>

                    <div class = "buttons">
                        <button style="background-color: green;">Save updates</button>
                        <button style="background-color: red;">Delete card</button>
                    </div>
                `

            :

            cardInfo.innerHTML = `
                <img src = ${item.photo}>

                <div class = "item-info">
                    <p>${item.name}</p> 

                    <p class = "infoItem">Classification: ${item.classification} <br><br>
                    Designation: ${item.designation} <br><br>
                    Average Height: ${item.average_height}cm <br><br>
                    Eye Colors: ${item.eye_colors} <br><br>
                    </p>   
                </div>

                <div class = "buttons" style = "align-self: center;">
                    <button style="background-color: green;">Save updates</button>
                    <button style="background-color: red;">Delete card</button>
                </div>
            `

            item.films.map(async film => {
                const response = await fetch(film);
                const movieItem = await response.json();
            
                const imgMovie = `img/movies/${movieItem.episode_id}.jpg`

                cardMovies.innerHTML += `
                    <div class = "movie-info">
                        <img src = ${imgMovie}>
                        <p>${movieItem.title}</p>
                    </div>
                `
            })

        }
    })
    
}

function closeInfoCard() {
    const modal = document.querySelector(".modal");

    modal.style.display = 'none'; 
}