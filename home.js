const homeShowcase = document.getElementById('homeShowcase')

function getUrlParameter(parameter, url) {
  let param = parameter.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]'),
  regex = new RegExp('[\\?&]' + param + '=([^&#]*)'),
  results = regex.exec(url);

  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const getCharacters = (count, numberCharact) => {
  const characters = [],
  randoms = [];

  while(randoms.length < numberCharact){
    let random = Math.floor(Math.random() * count);
    if(randoms.indexOf(random) === -1) 
      randoms.push(random);
  }
  for(let index = 0; index < numberCharact; index++){
    const character = {
      id: randoms[index], 
      url: `https://rickandmortyapi.com/api/character/?page=${Math.ceil(randoms[index] / 20)}`,
      position: randoms[index] % 20 ? randoms[index] % 20 - 1 : 19
    }
    characters.push(character)
  }

  return characters
}

const getCharacterData = (character) => {
  fetch(character.url)
  .then(response => {
    if(response.ok)
      return response.json()
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    if(Object.keys(data).length === 0){
      throw new Error('Empty object response');
    }
    console.log(`Character ${character.id} data:`, data.results[character.position])
    homeShowcase.appendChild(createHomeCard(data.results[character.position]))
  })
  .catch(error => console.log('There has been a problem with fetch operation: ', error.message));
}

const getRandomCharacters = (numberCharact) => {
  fetch('https://rickandmortyapi.com/api/character/?page=1')
  .then(response => {
    if(response.ok)
      return response.json()
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    if(Object.keys(data).length === 0){
      throw new Error('Empty object response');
    }
    let info = data.info;
    let characterCount = info.count || 0;
    let randomCharacters = getCharacters(characterCount, numberCharact);
    
    console.log('Random characters', randomCharacters)
    randomCharacters.forEach(character => getCharacterData(character))
  })
  .catch(error => console.log('There has been a problem with fetch operation: ', error.message));
}

// Esto es lo que se ejecuta al final
const runPage = () => {
  getRandomCharacters(3);
}

window.onload = runPage;