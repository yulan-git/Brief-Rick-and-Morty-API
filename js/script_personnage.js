import { _fetchData, _fetchDataAll } from "/js/functions.js";

//-----------Debut Maelys-------------------------
function pagePersonnages() {
  function pagination() {
    let pages = document.querySelector(".pagination");
    pages.addEventListener("click", (e) => {
      let nomPersonnage = document.querySelector(".container__personnages");
      nomPersonnage.innerHTML = "";
      let idPage = e.target.getAttribute("id");
      let url = "https://rickandmortyapi.com/api/character?page=" + idPage;

      _fetchData(url).then((personnages) => {
        const { results } = personnages;
        createPersonnages(results);
      });
    });
  }

  function pikcSpeciesInfos() {
    let containerSpecies = document.querySelector(".container__species");
    // tableau pour récupérer les url de toutes les pages
    let uriS = [];

    // tableau dans lequel sera insérer les différents types de lieux
    let listSpecies = [];

    //boucles sur les uri de tous les pages qu'on insère dans le tableau uriS
    for (let index = 0; index < 18; index++) {
      uriS.push("https://rickandmortyapi.com/api/character?page=" + index);
    }

    _fetchDataAll(uriS).then((personnages) => {
      personnages.forEach((personnage) => {
        personnage.results.forEach((res) => {
          listSpecies.push(res.species);
        });
      });
      //console.log([...new Set(listSpecies)]);
      createListspecies();
    });

    function createListspecies() {
      let speciesArray = [...new Set(listSpecies)];
      speciesArray.sort();
      for (let i = 0; i < speciesArray.length; i++) {
        let radioButton = speciesArray[i];
        containerSpecies.appendChild(createLabel(radioButton));
      }
    }
  }

  function createInput(radioButton) {
    let input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("id", radioButton);
    input.setAttribute("value", radioButton);
    input.setAttribute("name", "typeSpecies");
    input.addEventListener("change", showSpecies);
    return input;
  }

  function createLabel(radioButton) {
    let label = document.createElement("label");
    label.setAttribute("class", "species__label");
    label.textContent = radioButton;
    label.appendChild(createInput(radioButton));
    return label;
  }

  function createPersonnages(personnages) {
    let containerPersonnages = document.querySelector(
      ".container__personnages"
    );
    //console.log(personnages);
    personnages.forEach((personnage) => {
      containerPersonnages.innerHTML += createPersonnage(personnage);
    });
    eventClickTitle();
  }

    function createPersonnage(personnage) {
    return `<div class="personnage">
                <h2 class="personnage__name" data-url="${personnage.url}">${personnage.name}</h2>
                <p class="personnage__status">Status : ${personnage.status}</p>
                <p class="personnage__species">Species : ${personnage.species}</p>
                <p class="personnage__type">Type : ${personnage.type}</p>
                <p class="personnage__gender">Gender : ${personnage.gender}</p>
            </div>`;
  }

  function personnages() {
    let url = "https://rickandmortyapi.com/api/character?page=1";
    _fetchData(url).then((personnages) => {
      const { results } = personnages;
      createPersonnages(results);
    });
  }

  function showSpecies(e) {
    let nomPersonnage = document.querySelector(".container__personnages");
    nomPersonnage.innerHTML = "";
    let species = e.target.value;
    console.log(e.target);
    let url = "https://rickandmortyapi.com/api/character?species=" + species;
    fetch(url)
      .then(function (resp) {
        return resp.json();
      })
      .then(function (character) {
        let personnages = character.results;
        console.log(character.results);
          let str = personnages.forEach((personnage) => {
            console.log(personnage);
          nomPersonnage.innerHTML += `<div class="personnage">
                <h2 class="personnage__name" data-url="${personnage.url}">${personnage.name}</h2>
                <p class="personnage__status">Status : ${personnage.status}</p>
                <p class="personnage__species">Species : ${personnage.species}</p>
                <p class="personnage__type">Type : ${personnage.type}</p>
                <p class="personnage__gender">Gender : ${personnage.gender}</p>
            </div>`;
        });
        eventClickTitle();
        return str;
      })
      .catch(function (error) {
        console.error(error);
      });
  }

    function showInfosPersos(event) {
    console.log(event.target.dataset.url)
    _fetchData(event.target.dataset.url)
      .then(function (personnages) {
        console.log(personnages);
        _fetchDataAll(personnages.episode).then((episodes) => {
          let modalPersonnages = document.querySelector(".modal__personnages");
          console.log(episodes);
          modalPersonnages.innerHTML = createEpisode(episodes);
          let modal = document.querySelector("#myModal");

          if (episodes.length == 0) {
            modal.innerHTML = "Aucun personnage dans cette épisode";
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

  function createEpisode(episodes) {
    let str = `
                <div id="myModal" class="modal"><span class="close">&times;</span>
                    <!-- Modal content -->
                <div class="modal__content">`;
      episodes.forEach((episode) => {
      str += `<div class="modal__container">
                            <div class="modal__card">
                                <p>Episode : ${episode.episode}</p>
                                <a class="card__name">Name : ${episode.name}</a>
                                <p>released date : ${episode.air_date}</p>
                            </div>
                        </div>`;
    });
    str += `</div>
                </div>`;
    return str;
  }

  function eventClickTitle() {
    let titles = document.querySelectorAll(".container__personnages .personnage__name");
    titles.forEach((title) => {
      title.addEventListener("click", showInfosPersos);
    });
  }

  pikcSpeciesInfos();
  personnages();
  pagination();
}

pagePersonnages();