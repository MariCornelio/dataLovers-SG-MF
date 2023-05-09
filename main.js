import {
  filterByDecade,
  filterByDirector,
  sortAlphabetically,
  sortByRating,
  filterNameFilms,
  filterRandom,
} from "./data.js";
import studioGhibli from "./data/ghibli/ghibli.js";
import { renderFilters } from "./generateOptions.js";

const arrayGhibli = studioGhibli.films;
// header
const main = document.querySelector("main");
const footer = document.querySelector(".footer");
const headerInput = document.querySelector(".header-input");

// mostar tarjetas de films
const filmsContainer = document.querySelector(".films-grid__films-container");

// calculos
// menu de navegacion
main.addEventListener("click", () => {
  headerInput.checked = false;
});
footer.addEventListener("click", () => {
  headerInput.checked = false;
});

// muestra todos los films
const showFilms = (obj) => {
  const sectionFilms = document.createElement("section");
  sectionFilms.classList.add("films-grid__section");
  sectionFilms.innerHTML = `
          <div class="films-grid__section-card">
            <div class="films-grid__front-card">
              <img src=${obj.poster} alt=${obj.title}>
              <p>${obj.release_date}</p>
            </div>
            <div class="films-grid__back-card">
              <p>DESCRIPTION:</p>
              <p>
                ${obj.description}
              </p>
            </div>
          </div>
          <div class="films-grid__section-title">
            <p>&#9660 FILMOGRAPHY &#9660</p>
            <a href="filmography.html" >${obj.title}</a>
          </div>`;
  filmsContainer.appendChild(sectionFilms);
};

const arraySelectedFilms = (arrayFilms, texto) => {
  filmsContainer.textContent = "";
  arrayFilms.forEach((elemento) => showFilms(elemento));
  // elemento html para voltear tarjetas de films
  const backCard = document.querySelectorAll(".films-grid__back-card");
  const card = document.querySelectorAll(".films-grid__section-card");
  const frontCard = document.querySelectorAll(".films-grid__front-card");
  // elemento para mostrar la cantidad de peliculas
  const totalResultsfilms = document.querySelector(
    ".films-grid__results-films p"
  );
  // calculos para voltear tarjeta
  card.forEach((elemento, i) => {
    backCard[i].addEventListener("click", () => {
      elemento.style.transform = "rotateY(0)";
    });
    frontCard[i].addEventListener("click", () => {
      elemento.removeAttribute("style");
    });
  });
  // calculos para mostar la cantidad de peliculas
  totalResultsfilms.textContent = `There are ${arrayFilms.length} ${texto}`;
};

arraySelectedFilms(arrayGhibli, "total films");

// logica filtros opciones
renderFilters();

// Mostar por decada
const decadeAnchors = document.getElementsByName("decade-option");
decadeAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    arraySelectedFilms(
      filterByDecade(arrayGhibli, anchor.innerHTML),
      `films released in the ${anchor.innerHTML}`
    );
  });
});
// console.log(filterByDecade(studioGhibli.films, 1990));
// Mostrar por director
const directorAnchors = document.getElementsByName("director-option");
directorAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    arraySelectedFilms(
      filterByDirector(arrayGhibli, anchor.innerHTML),
      `films directed by ${anchor.innerHTML}`
    );
  });
});

// ordenar alfabeticamente

const alphabeticAnchors = document.querySelectorAll("#names-filter a");
alphabeticAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    arraySelectedFilms(
      sortAlphabetically(arrayGhibli, anchor.innerHTML),
      `films`
    );
  });
});

// ordenar por rating
const scoreAnchors = document.querySelectorAll("#rating-filter a");
scoreAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    arraySelectedFilms(
      sortByRating(arrayGhibli, anchor.innerHTML),
      `films, ordered by ${anchor.innerHTML} `
    );
  });
});

// Filtrar por input y mostrar aleatoriamente films si no encuentra resultados
const inputSearch = document.getElementById("search-input");
const totalResultsfilms = document.querySelector(
  ".films-grid__results-films p"
);

inputSearch.addEventListener("input", () => {
  arraySelectedFilms(
    filterNameFilms(arrayGhibli, inputSearch.value),
    `films found`
  );
  if (filterNameFilms(arrayGhibli, inputSearch.value).length === 0) {
    totalResultsfilms.style.color = "#d91414";
    arraySelectedFilms(filterRandom(arrayGhibli), "");
    totalResultsfilms.textContent =
      "NO RESULTS WERE FOUND, you can see other films";
  } else {
    totalResultsfilms.removeAttribute("style");
  }
});

// borrar input escrito por el usuario
const navBarMenu = document.querySelector(".navbar-menu");
navBarMenu.addEventListener("click", () => {
  inputSearch.value = "";
  totalResultsfilms.removeAttribute("style");
});

// background fade in & out
const images = document.querySelectorAll(".background-item");
let currentImageIndex = 0;

function updateBackground() {
  images.forEach((img) => {
    img.classList.remove("active");
  });
  images[currentImageIndex].classList.add("active");
}

setInterval(() => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateBackground();
}, 4000);

updateBackground();
