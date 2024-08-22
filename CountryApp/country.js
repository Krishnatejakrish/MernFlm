const apiUrl = " https://restcountries.com/v3.1/all";
const showdata = document.getElementById("cardItems");
const countryInput = document.getElementById("country-input");
const sortByAlphbet = document.getElementById("sort");
const sortByContinent = document.getElementById("continent");

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const countries = data;
    displayCountries(countries);

    countryInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm));
        displayCountries(filteredCountries);
      });
  
      sortByAlphbet.addEventListener('change', (e) => {
        const sortBy = e.target.value;
        countryInput.value = ''
        let sortedCountries;
        if (sortBy === 'a-z') {
          sortedCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
          
          
        } else if (sortBy === 'z-a') {
          sortedCountries = countries.sort((a, b) => b.name.common.localeCompare(a.name.common));
        } 
        
        else {
          sortedCountries = countries;
        }
        displayCountries(sortedCountries);
      });
  
      sortByContinent.addEventListener('change', (e) => {
        countryInput.value = ''
        const continent = e.target.value;
        const filteredCountries = continent === '' ? countries : countries.filter(country => country.continents.includes(continent));
        displayCountries(filteredCountries);
      });
  })

  .catch((error) => console.error("Error:", error));

function displayCountries(countries) {
  showdata.innerHTML = "";
  countries.forEach((country) => {
    let card = document.createElement("div");
    card.className = "card";
    const countryName = document.createElement("h3");
    countryName.textContent = country.name.common;
    const imgflag = document.createElement("img");
    imgflag.src = country.flags.png;
    imgflag.alt = `Flag of ${country.name.common}`;
    const population = document.createElement('p')
    population.textContent = `Population: ${country.population}`
    const region = document.createElement('p')
    region.textContent = `Region: ${country.region}`
    const capital = document.createElement('p')
    capital.textContent = `Capital: ${country.capital}`

    card.appendChild(countryName)
    card.appendChild(imgflag)
    card.appendChild(  population )
    card.appendChild(region)
    card.appendChild(capital)

    showdata.appendChild(card)
  });
}
