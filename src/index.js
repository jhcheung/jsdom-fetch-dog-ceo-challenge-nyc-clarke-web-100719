console.log('%c HI', 'color: firebrick')

function fetchDogPics() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    return fetch(imgUrl)
      .then(resp => resp.json())
      .then(json => renderDogPics(json["message"]))
}

function fetchDogBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    return fetch(breedUrl)
      .then(resp => resp.json())
      .then(json => {
          breeds = Object.keys(json["message"]);
          renderDogBreeds(breeds)
      })
}

function updateColor(event) {
    event.target.style.color = 'red';
}

function breedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
        newBreeds = breeds.filter(breed => breed.startsWith(event.target.value));
        renderDogBreeds(newBreeds);
    });
}

  
function renderDogPics(json) {
    const main = document.querySelector('#dog-image-container');
    json.forEach(image => {
        const container = document.createElement('div');
        const img = document.createElement('img');
        img.src = image;
        container.appendChild(img);
        main.appendChild(container);
    });
}

function renderDogBreeds(breeds) {
    updateDogBreedList(breeds);
    breedSelectListener();
}

function updateDogBreedList(breeds) {
    const dogBreedList = document.querySelector('#dog-breeds');
    removeChildren(dogBreedList);
    breeds.forEach(function(dogBreed) {
        const breedItem = document.createElement('li');
        breedItem.innerText = dogBreed;
        breedItem.addEventListener('click', updateColor);
        dogBreedList.appendChild(breedItem);
    });
}

function removeChildren(list) {
    let child = list.lastElementChild;
    while (child) {
      list.removeChild(child);
      child = list.lastElementChild;
    }
  }

document.addEventListener('DOMContentLoaded', function() {
    fetchDogPics();
    fetchDogBreeds();
})