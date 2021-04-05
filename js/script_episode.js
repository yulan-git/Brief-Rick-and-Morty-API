import { _fetchData, _fetchDataAll } from "/js/functions.js";

//----------------Debut partie Bamba------------------------
function pageEpisode() {
  let container = document.querySelector(".container_episode");
  let persso = document.querySelector(".page_perso");
  let back = document.querySelector(".back");

  back.addEventListener("click", function () {
    persso.classList.remove("descend");
    back.classList.remove("none");
    container.classList.remove("displayNone");
    pages.classList.remove("displayNone");
    persso.innerHTML = "";

    // location.reload();
  });
  let pages = document.querySelector(".pages");
  console.log(pages);

  pages.addEventListener("click", (e) => {
    let episode = document.querySelector(".container_episode");
    episode.innerHTML = "";
    let idPage = e.target.getAttribute("id");

    let url = "https://rickandmortyapi.com/api/episode?page=" + idPage;
    console.log(url);
    _fetchData(url).then((data) => {
      // console.log(data);

      for (let i = 0; i < data.results.length; i++) {
        firstfontion(data, i);
        let dives = document.querySelectorAll(".dives");
        newFunctionpage1(dives, data);
      }
    });

    /*----------------------page 1------------------------*/
    function newFunctionpage1(dives, data) {
      for (let a = 0; a < dives.length; a++) {
        dives[a].addEventListener("click", function () {
          container.classList.add("displayNone");
          persso.classList.add("descend");
          back.classList.add("none");
          pages.classList.add("displayNone");

          for (let ch = 0; ch < data.results[a].characters.length; ch++) {
            // console.log(data.results[a].characters[ch]);
            fetch(data.results[a].characters[ch])
              .then((res) => res.json())

              .then((data) => {
                // console.log(data);
                persso.innerHTML += ` 
                    <div class="episode__content">
                        <div class="image">
                        <img src="${data.image}" alt="">
                        </div>
                        <div class="info_pers">
                            <p>Nom : ${data.name}</p> 
                            <p>Genre : ${data.genre}</p>
                            <p>Species : ${data.species}</p> 
                            <p>Type : ${data.type}</p>
                        </div>
                    </div>`;
              });
          }
        });
      }
    }

    function firstfontion(data, i) {
      container.innerHTML += `<div class="dives">
            <h1 class="name_episode">Nom episode : <span class="nom-epis"> ${data.results[i].name}</span></h1> 
            <h2>${data.results[i].episode}</h2>

        </div>`;
    }
  });
}
pageEpisode();
