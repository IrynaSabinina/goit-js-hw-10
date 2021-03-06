import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries.js';
const DEBOUNCE_DELAY = 300;
const countryList = document.querySelector('.country-list');
const inputEl = document.querySelector('input');

const elem = {
  counrty: document.querySelector('input'),
};

// fetchCountries().then(data => console.log(data));
// let userCounrty;
console.log(elem);
inputEl.addEventListener('input', debounce(inputIn, DEBOUNCE_DELAY));

function inputIn(event) {
  countryList.innerHTML = '';
  const current = event.target.value.trim();
  if (!current) {
    return;
  }
  fetchCountries(current)
    .then(data => {
      if (data.length > 9) {
        return Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length > 2 && data.length < 9) {
        return renderCountryCard(data);
      } else if (data.length === 1) {
        return renderCountryList(data);
      }
    })
    .catch(() => {
      Notify.warning('Oops, there is no country with that name');
    });
}

// (users))
//     .catch((error) => console.log(error));
// });
function renderCountryCard(counrtys) {
  const markup = counrtys
    .map(country => {
      return `<li>
            <img src="${country.flags.svg}" alt="Прапор" width = 60, heigth = 60/>
      <p><b>Назва</b>: ${country.name}</p>
              </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderCountryList(counrtys) {
  const markup = counrtys
    .map(country => {
      return `<li>
            <img src="${
              country.flags.svg
            }" alt="Прапор" width = 60, heigth = 60/>
      <p><b>Назва</b>: ${country.name}</p>
          <p><b>Столиця</b>: ${country.capital}</p>
          <p><b>Населення</b>: ${country.population}</p>
          <p><b>Мова</b>: ${country.languages.map(i => i.name).join(', ')}</p>
        </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
