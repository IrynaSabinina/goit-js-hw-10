export function fetchCountries(name) {
  const options = '?fields=name,capital,flags,languages,population';
  const BASE_URL = 'https://restcountries.com/v2/name/';
  const itemToFind = `${BASE_URL}${name}${options}`;
  return fetch(itemToFind).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
  // return fetch(
  //   `https://restcountries.com/v2/${country}?fields=name.official,capital,population,flags.svg,languages`
  // ).then(response => {
  //   return response.json();
  // });
}

// https://restcountries.com/v2/{service}?fields=name.official,capital,population,flags.svg,languages
