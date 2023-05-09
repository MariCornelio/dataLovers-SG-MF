import ghibliData from "./data/ghibli/ghibli.js";

// generar opciones por decada
const generateDecadesOptions = () => {
  const parseToDecade = (year) => Math.floor(Number.parseInt(year) / 10) * 10;
  const decadesFilter = document.getElementById("decades-filter");
  const decadesUniq = [];
  ghibliData.films.forEach((film) => {
    const decade = parseToDecade(film.release_date);
    if (!decadesUniq.includes(decade)) {
      decadesUniq.push(decade);
      decadesFilter.innerHTML += `<a id="decade-${decade}" class="menu-option" name="decade-option">${decade}'s</a>`;
    }
  });
};

//generar opciones por director
const generateDirectorsOptions = () => {
  const directorsFilter = document.getElementById("directors-filter");
  const directorsUniq = [];
  ghibliData.films.forEach((film) => {
    if (!directorsUniq.includes(film.director)) {
      directorsUniq.push(film.director);
      directorsFilter.innerHTML += `<a id="director"-${film.director}" class="menu-option" name="director-option">${film.director}</a>`;
    }
  });
};

export const renderFilters = () => {
  generateDecadesOptions();
  generateDirectorsOptions();
};
