const VERSION = "v3.1";
const BASE_URL = `https://restcountries.com/${VERSION}`;

const getCountry = (name: string) => {
  const url = `${BASE_URL}/`
}

const getAllCountryNames = async () => {
  const url = `${BASE_URL}/all`
  const response = await fetch(url)
  if(response.ok) {
    const resul = await response.json();
  }
}
