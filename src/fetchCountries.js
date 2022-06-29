export function fetchCountries(country) {
  return fetch('https://restcountries.com/v3.1/name/{name}').then(response => {
    return response.json;
  });
}

// https://restcountries.com/v2/{service}?fields=name.official,capital,population,flags.svg,languages
