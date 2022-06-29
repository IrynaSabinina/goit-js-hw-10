import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries.js';
const DEBOUNCE_DELAY = 300;
const userCountry = document.querySelector('input');
const countryList = document.querySelector('.country-list');
let userInput;

// console.log(userInput);
userCountry.addEventListener(
  'input',
  debounce(fetchCountries => {
    userInput = userCountry.formTarget.trim();
    fetchCountries(userInput)
      .then(countrys => renderCountryList(countrys))
      .catch(error => {
        if (countrys.length > 9) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      });
  }, DEBOUNCE_DELAY)
);

function renderCountryList(countrys) {
  const markup = countrys
    .map(country => {
      return `<li>
          <p><b>Назва</b>: ${country.name.official}</p>
          <p><b>Столиця</b>: ${country.capital}</p>
          <p><b>Населення</b>: ${country.population}</p>
          <p><b>Прапор</b>: ${country.flags.svg}</p>
          <p><b>Мова</b>: ${country.languages}</p>
        </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
// https://restcountries.com/v2/{service}?fields=name.official,capital,population,flags.svg,languages
