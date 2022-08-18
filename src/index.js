import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const refs = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
let country = "";



refs.searchInput.addEventListener(
  'input',
  debounce(inputCounty, DEBOUNCE_DELAY)
);
function inputCounty(e) {
  deliteMarckupCountreis();
  country = e.target.value.trim();
  fetchCountries(country).then(marckup).catch(error);
} 
function marckup(data) {
  
  if (data.length >= 2 && data.length <= 10) {  
   
    countryList(data)
    } else if (data.length === 1) {
     countryInfo(data);
    } else
     {
     Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      
    }
  }
function countryList(data) {
  deliteMarckupCountreis();
  const marckupList = data
    .map(country => {
      return `<li ><img src=${country.flags.svg} width=40 ><h2 >${country.name.official}</h2></li>`;
    })
    .join('');
  refs.countryList.insertAdjacentHTML('afterbegin', marckupList);
}
function countryInfo(data) {
  
  deliteMarckupCountreis();
  const marckupCountryInfo = data
    .map(country => {

      return `<div><img  
      src=${country.flags.svg}
      alt='Flag of ${country.name}'
      width='45'
    /><h2>${country.name.official}</h2>
  </div>
  <ul >
    <li ><span class='inforamtion'>Capital:
      </span>${country.capital}</li>
    <li ><span class='inforamtion'>Population:
      </span>${country.population}</li>
    <li ><span class='inforamtion'>Languages:
      </span>${Object.values(country.languages).join(', ')}</li>
  </ul>`;
    })
    .join('');
  refs.countryInfo.insertAdjacentHTML('afterbegin', marckupCountryInfo);
}
function deliteMarckupCountreis() {
  refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML='';
}
function error (error) {
      if (error.message === '404') {       
        return Notiflix.Notify.failure(
          'Oops, there is no country with that name'
        );
      }
      return Notiflix.Notify.failure(`Oops, server error:"${error}"`);
    };