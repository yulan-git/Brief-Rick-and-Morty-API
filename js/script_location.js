import { _fetchData, _fetchDataAll } from "/js/functions.js";

//----------------Partie Flora-----------------
function pageLocation() {


  function pikcTypeInfos() {
    let containerLocation = document.querySelector(".container__location");
    // tableau pour récupérer les url de toutes les pages
    let uriS = [];

    // tableau dans lequel sera insérer les différents types de lieux
    let listTypes = [];

    //boucles sur les uri de tous les pages qu'on insère dans le tableau uriS
    for (let index = 0; index < 7; index++) {
      uriS.push("https://rickandmortyapi.com/api/location?page=" + index);
    }

    _fetchDataAll(uriS).then((locations) => {
      locations.forEach((location) => {
        location.results.forEach((res) => {
          listTypes.push(res.type);
        });
      });
      createListType();
    });

    function createListType() {
      let typeArray = [...new Set(listTypes)];
      typeArray.sort();
      for (let i = 0; i < typeArray.length; i++) {
        let radioButton = typeArray[i];
        containerLocation.appendChild(createLabel(radioButton));
      }
    }
  }

  function createLabel(radioButton) {
    let label = document.createElement("label");
    label.setAttribute("class", "type__label");
    label.textContent = radioButton;
    label.appendChild(createInput(radioButton));
    return label;
  }

  function createInput(radioButton) {
    let input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("id", radioButton);
    input.setAttribute("value", radioButton);
    input.setAttribute("name", "typeLocation");
    input.addEventListener("change", showPlanets);
    return input;
  }

    function showPlanets(e) {
    let lieux = document.querySelector(".container__planets");
    lieux.innerHTML = "";
    let type = e.target.value;
    let url = "https://rickandmortyapi.com/api/location?type=" + type;
    fetch(url)
      .then(function (resp) {
        return resp.json();
      })
      .then(function (planets) {
        let locations = planets.results;
        let str = locations.forEach((location) => {
          lieux.innerHTML += `<div class="planet">
                <h2 class="planet__name" data-url="${location.url}" >${location.name}</h2>
                <p class="planet__type">${location.type}</p>
                <p class="planet__dimension">${location.dimension}</p>
            </div>`;
        });
        eventClickTitle();
        return str;
      })
      .catch(function (error) {
        console.error(error);
      });
  }


  function locations() {
    let url = "https://rickandmortyapi.com/api/location?page=";
    _fetchData(url).then((locations) => {
      const { results } = locations;
      createLocations(results);
    });
  }

  function createLocations(locations) {
    let containerPlanets = document.querySelector(".container__planets");
    console.log(locations);
    locations.forEach((location) => {
      containerPlanets.innerHTML += createLocation(location);
    });
    eventClickTitle();
  }

  function createLocation(location) {
    return `<div class="planet">
                    <h2 class="planet__name" data-url="${location.url}" >${location.name}</h2>
                    <p class="planet__type">${location.type}</p>
                    <p class="planet__dimension">${location.dimension}</p>
                </div>`;
  }


  function eventClickTitle() {
    let titles = document.querySelectorAll(".container__planets .planet__name");
    titles.forEach((title) => {
      title.addEventListener("click", showResidents);
    });
  }

  function showResidents(event) {
    console.log(event.target.dataset.url);
    _fetchData(event.target.dataset.url)
      .then(function (locations) {
        console.log(locations);
        _fetchDataAll(locations.residents).then((residents) => {
          let modalResident = document.querySelector(".modal__resident");
          console.log(residents);
          modalResident.innerHTML = createResident(residents);
          let modal = document.querySelector("#myModal");

          if (residents.length == 0) {
            modal.innerHTML = "Aucun habitant sur cette planète";
            let span = document.createElement("span");
            span.setAttribute("class", "close");
            span.innerHTML = "&times;";
            modal.appendChild(span);
          }

          modal.style.display = "block";
          let closeButton = document.querySelector(".close");
          closeButton.addEventListener("click", () => {
            modal.style.display = "none";
          });
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function createResident(residents) {
    let str = `
                    <div id="myModal" class="modal"><span class="close">&times;</span>
                    <h2 class="title__secondaire"> Les habitants</h2>
                    <div class="modal__content">`;
    residents.forEach((resident) => {
      str += `<div class="modal__container">
                                <div class="modal__img">
                                    <img src="${resident.image}" alt="image">
                                </div>
                                <div class="modal__card">
                                    <a class="card__name" >Name : ${resident.name}</a>
                                    <p>Status : ${resident.status}</p>
                                    <p>Species : ${resident.species}</p>
                                </div>
                            </div>`;
    });
    str += `</div>
                    </div>`;
    return str;
  }


  function pagination() {
    let pages = document.querySelector(".pagination");
    pages.addEventListener("click", (e) => {
      let lieux = document.querySelector(".container__planets");
      lieux.innerHTML = "";
      let idPage = e.target.getAttribute("id");
      let url = "https://rickandmortyapi.com/api/location?page=" + idPage;

      _fetchData(url).then((locations) => {
        const { results } = locations;
        createLocations(results);
      });
    });
  }

  
  pikcTypeInfos();
  locations();
  pagination();
}

pageLocation();

