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

const addNewCardContent = (peopleList) => {
    const divCards = document.querySelector(".cards");
    
    content += `
        <div class = "card" onclick="openCreateNewCard(${peopleList})" id="addNewItem">
            <img src="img/add.png" style="width: 100px; height: 100px;">
        </div>
    `
    divCards.innerHTML = content;
}

const isPeople = (item) => {
    return item.birth_year !== undefined ? true : false;
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

    people.map((person) => addCard(person));
    addNewCardContent(true);
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

    species.map((specie) => addCard(specie));
    addNewCardContent(false);
}

async function addCard(item) {
    const {id, name, photo} = item;
    let peopleList;

    isPeople(item) ? peopleList = true : peopleList = false;

    content += `
        <div class = "card" id = card${id} onclick="openInfoCard(${peopleList}, ${id})">
            <img src= ${photo}>
            <p>${name}</p>
        </div>
    `
}

function openInfoCard(peopleList, id) {
    const contentList = peopleList ? people : species;

    const modal = document.querySelector(".modal");
    modal.style.display = 'flex';

    modal.innerHTML = `
        <main class="modal-content">
            <img src="img/close.png" style="width: 20px; height: 20px; cursor: pointer;" onclick="closeInfoCard()">

            <div class="cardInfo"> 

            </div>

            <h2 style="align-self: center; margin-bottom: 25px;">Movies</h2>
                
            <div class="cardMovies" id=cardMovies${id}>

            </div>

            <div class="modal-image">

            </div>
                    
        </main>
    `

    const cardInfo = document.querySelector(".cardInfo");
    let cardMovies = document.querySelector(".cardMovies");

    cardMovies.innerHTML = '';

    contentList.map(item => {        
        if(id === item.id) {
            peopleList ?
                cardInfo.innerHTML = `

                    <div class = "editItem" id = ${item.id}>
                        <img src = ${item.photo} class = "imgCard">

                        <img src="img/edit.png" style="width: 20px; height: 20px; cursor: pointer" onclick="openEditImage(${item.id}, ${peopleList})">
                    </div>

                    <div class = "item-info">
                        <p>${item.name}</p> 

                        <p class = "infoItem">Birth Year: ${item.birth_year} <br><br>
                        Hair Color: ${item.hair_color} <br><br>
                        Height: ${item.height}cm <br><br>
                        Eye Color: ${item.eye_color} <br><br>
                        </p>   
                    </div>

                    <div class = "buttons">
                        <button style="background-color: green;" onclick="openAddMovieModal(${item.id}, ${peopleList})">Add movie</button>
                        <button style="background-color: red;" onclick="deleteCard(${item.id})">Delete card</button>
                    </div>
                `
            :

            cardInfo.innerHTML = `
                <div class = "editItem" id = ${item.id}>
                    <img src = ${item.photo} class = "imgCard">

                    <img src="img/edit.png" style="width: 20px; height: 20px; cursor: pointer" onclick="openEditImage(${item.id}, ${peopleList})">
                </div>

                <div class = "item-info">
                    <p>${item.name}</p> 

                    <p class = "infoItem">Classification: ${item.classification} <br><br>
                    Designation: ${item.designation} <br><br>
                    Average Height: ${item.average_height}cm <br><br>
                    Eye Colors: ${item.eye_colors} <br><br>
                    </p>   
                </div>

                <div class = "buttons" style = "align-self: center;">
                    <button style="background-color: green;" onclick="openAddMovieModal(${item.id}, ${peopleList})">Add movie</button>
                    <button style="background-color: red;" onclick="deleteCard(${item.id})">Delete card</button>
                </div>
            `

            item.films.forEach(async film => {
                if(film !== undefined) {
                    const response = await fetch(film);
                    const movieItem = await response.json();
                
                    const imgMovie = `img/movies/${movieItem.episode_id}.jpg`
    
                    cardMovies.innerHTML += `                    
                        <div class = "movie-info">
                            <img src = ${imgMovie}>
                            <p>${movieItem.title}</p>
                        </div>
                    `
                }
            });

            if(item.newMovies !== undefined) {

                item.newMovies.forEach((movie) => {
                    cardMovies.innerHTML += `                    
                        <div class = "movie-info">
                            <img src = ${movie.imgMovie}>
                            <p>${movie.titleMovie}</p>
                        </div>
                    `
                })
            }
        }
    })
    
}

function openCreateNewCard(peopleList) {
    const modal = document.querySelector(".modal");
    modal.style.display = 'flex';

    modal.innerHTML = `
        <main class="modal-content">
            <img src="img/close.png" style="width: 20px; height: 20px; cursor: pointer;" onclick="closeInfoCard()">

            <div class="newCard">
                <h2>Create new card</h2>
            </div>
        </main>
    `

    const newCard = document.querySelector(".newCard");

    if(peopleList) {
        newCard.innerHTML += `
            <form onsubmit="createCard(event)">
                <div id="form-create">

                    <div id="input-text">
                        <div>
                            <label for="name">Name: </label>
                            <input type="text" placeholder="ex: Han Solo" id="name" name="name">
                        </div>

                        <div>
                            <label for="photo">Photo: </label>
                            <input type="text" placeholder="type the photo url" id="photo" name="photo">
                        </div>

                        <div>
                            <label for="birth_year">Birth Year: </label>
                            <input type="text" placeholder="ex: 19BBY" id="birth_year" name="birth_year">
                        </div>

                        <div>
                            <label for="hair_color">Hair color: </label>
                            <input type="text" placeholder="ex: black" id="hair_color" name="hair_color">
                        </div>

                        <div>
                            <label for="heigth">Heigth: </label>
                            <input type="text" placeholder="ex: 180" id="height" name="height">
                        </div>

                        <div>
                            <label for="eye_color">Eye color: </label>
                            <input type="text" placeholder="ex: blue" id="eye_color" name="eye_color">
                        </div>
                    </div>

                    <div id="checkbox">
                        <p style="font-weight: 600;">Select the movies that this character appeared in:</p>

                        <div>
                            <input type="checkbox" name="ep1" id="ep1" value="https://swapi.dev/api/films/4/">
                            <label for="ep1">The Phantom Menace</label>
                        </div>

                        <div>
                            <input type="checkbox" name="ep2" id="ep2" value="https://swapi.dev/api/films/5/">
                            <label for="ep2">Attack of the Clones</label>
                        </div>

                        <div>
                            <input type="checkbox" name="ep3" id="ep3" value="https://swapi.dev/api/films/6/">
                            <label for="ep3">Revenge of the Sith</label>
                        </div>

                        <div>
                            <input type="checkbox" name="ep4" id="ep4" value="https://swapi.dev/api/films/1/">
                            <label for="ep4">A New Hope</label>
                        </div>

                        <div>
                            <input type="checkbox" name="ep5" id="ep5" value="https://swapi.dev/api/films/2/">
                            <label for="ep5">The Empire Strikes Back</label>
                        </div>

                        <div>
                            <input type="checkbox" name="ep6" id="ep6" value="https://swapi.dev/api/films/3/">
                            <label for="ep6">The Return of the Jedi</label>
                        </div>
                    </div>
                </div>

                <button style="background-color: green; margin-top: 65px;">Create</button>
            </form>
        `
    }else {
        newCard.innerHTML += `
            <form onsubmit="createCard(event)">
                <div id="form-create">
                    <div id="input-text">
                        <div>
                            <label for="name">Name of specie: </label>
                            <input type="text" placeholder="ex: wookie" id="name" name="name">
                        </div>

                        <div>
                            <label for="photo">Photo: </label>
                            <input type="text" placeholder="type the photo url" id="photo" name="photo">
                        </div>

                        <div>
                            <label for="classification">Classification: </label>
                            <input type="text" placeholder="ex: mammal" id="classification" name="classification">
                        </div>

                        <div>
                            <label for="designation">Designation: </label>
                            <input type="text" placeholder="ex: sentient" id="designation" name="designation">
                        </div>

                        <div>
                            <label for="average_height">Average Heigth: </label>
                            <input type="text" placeholder="ex: 210" id="average_height" name="average_height">
                        </div>

                        <div>
                            <label for="eye_colors">Eye colors: </label>
                            <input type="text" placeholder="ex: blue; brown" id="eye_colors" name="eye_colors">
                        </div>
                    </div>

                    <div id="checkbox">
                        <p style="font-weight: 600;">Select the movies that this character appeared in:</p>

                        <div>
                            <input type="checkbox" name="ep1" id="ep1" value="https://swapi.dev/api/films/4/">
                            <label for="ep1">The Phantom Menace</label>
                        </div>

                        <div>
                            <input type="checkbox" name="ep2" id="ep2" value="https://swapi.dev/api/films/5/">
                            <label for="ep2">Attack of the Clones</label>
                        </div>

                        <div>
                            <input type="checkbox" name="ep3" id="ep3" value="https://swapi.dev/api/films/6/">
                            <label for="ep3">Revenge of the Sith</label>
                        </div>

                        <div>
                            <input type="checkbox" name="ep4" id="ep4" value="https://swapi.dev/api/films/1/">
                            <label for="ep4">A New Hope</label>
                        </div>

                        <div>
                            <input type="checkbox" name="ep5" id="ep5" value="https://swapi.dev/api/films/2/">
                            <label for="ep5">The Empire Strikes Back</label>
                        </div>

                        <div>
                            <input type="checkbox" name="ep6" id="ep6" value="https://swapi.dev/api/films/3/">
                            <label for="ep6">The Return of the Jedi</label>
                        </div>
                    </div>
                </div>

                <button style="background-color: green; margin-top: 65px;">Create</button>
            </form>
        `
    }
}

function createCard(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const item = Object.fromEntries(formData);
    const addItemButton = document.getElementById("addNewItem");

    let contentList;

    isPeople(item) ? contentList = people : contentList = species;

    addItemButton.remove();
    content = document.querySelector(".cards").innerHTML;

    item.films = [];
    item.films.push(item.ep1, item.ep2, item.ep3, item.ep4, item.ep5, item.ep6);
    item.id = contentList.length + 1;

    contentList.push(item);

    addCard(item);
    addNewCardContent(isPeople(item));

    closeInfoCard();
}

function openEditImage(idItem, peopleList) {
    const modal = document.querySelector(".modal-image");
    
    modal.innerHTML = `
        <img src="img/close.png" style="width: 15px; height: 15px; cursor: pointer;" onclick="closeModalImage()">

        <form onsubmit="editImage(event, ${idItem}, ${peopleList})">
            <label for="newImg">Insert new image: </label>
            <input type="text" placeholder="type the url of the new image" id="newImg" name="newImg">

            <button type="submit" style="background: green; margin-top: 45px">Save</button>
        </form>
    `;

    modal.style.display = 'flex';
}

function editImage(event, id, peopleList) {
    event.preventDefault();

    const contentList = peopleList ? people : species;
    const formData = new FormData(event.target);
    const newImg = Object.fromEntries(formData);

    const imgCard = document.getElementById(`${id}`).querySelector('.imgCard');
    imgCard.src = newImg.newImg;

    contentList.map((item) => {
        if(item.id === id) {
            item.photo = newImg.newImg
        }
    });

    const cardSelected = document.getElementById(`card${id}`).querySelector('img');
    cardSelected.src = newImg.newImg;

    closeModalImage();
}

function closeModalImage() {
    const modal = document.querySelector(".modal-image");
    modal.style.display = 'none';
}

function openAddMovieModal(idItem, peopleList) {
    const modal = document.querySelector(".modal-image");

    modal.innerHTML = `
        <img src="img/close.png" style="width: 15px; height: 15px; cursor: pointer;" onclick="closeModalImage()">

        <form onsubmit="addMovie(event, ${idItem}, ${peopleList})" style="align-items: flex-start;">
            <label for="titleMovie">Insert the title of the movie: </label>
            <input type="text" placeholder="Ex: The Force Awakens" id="titleMovie" name="titleMovie">

            <label for="imgMovie" style="margin-top: 5px;">Insert the image of the movie: </label>
            <input type="text" placeholder="type the url of the image of the movie" id="imgMovie" name="imgMovie">

            <button type="submit" style="background: green; margin-top: 10px; align-self: center">Save</button>
        </form>
    `

    modal.style.display = 'flex';
}

function addMovie(event, idItem, peopleList) {
    event.preventDefault();

    const contentList = peopleList ? people : species;

    const formData = new FormData(event.target);
    const newMovie = Object.fromEntries(formData);

    const cardMovies = document.getElementById(`cardMovies${idItem}`);
    cardMovies.innerHTML += `
    <div class = "movie-info">
        <img src = ${newMovie.imgMovie}>
        <p>${newMovie.titleMovie}</p>
    </div>
    `

    contentList.map((item) => {
        if(item.id == idItem) {
            item.newMovies === undefined ? 
            item.newMovies = [{'titleMovie': newMovie.titleMovie, 'imgMovie': newMovie.imgMovie}] : 
            item.newMovies.push({'titleMovie': newMovie.titleMovie, 'imgMovie': newMovie.imgMovie});
        }
    });

    closeModalImage();
}

function deleteCard(id) {
    const card = document.getElementById(`card${id}`);
    card.remove();

    const modal = document.querySelector(".modal");
    modal.style.display = 'none';

}
function closeInfoCard() {
    const modal = document.querySelector(".modal");

    modal.style.display = 'none'; 
}