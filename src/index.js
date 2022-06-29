import './css/styles.css';
import lodash from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';
const DEBOUNCE_DELAY = 300;
const userCountry = document.querySelector('input');
const countryList = document.querySelector('.country-list');

userCountry.addEventListener('input', () => {
  fetchCountries()
    .then(countrys => renderCountryList(countrys))
    .catch(error => console.log(error));
});

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
