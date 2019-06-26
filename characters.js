const charactersShowcase = document.getElementById('charactersShowcase');
console.log(charactersShowcase)

const getAllCharacters = (page) => {
  fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
  .then(response => {
    if(response.ok)
      return response.json()
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    if(Object.keys(data).length === 0){
      throw new Error('Empty object response');
    }
    let results = data.results || [];
    console.log('Result', results)
    let characters = results.map(result => {
      return {
        id: result.id, 
        url: `https://rickandmortyapi.com/api/character/?page=${Math.ceil(result.id / 20)}`,
        position: result.id % 20 ? result.id % 20 - 1 : 19
      }
    })
    console.log('Characters', characters)
    characters.forEach(character => getCharacterData(character))
  })
  .catch(error => console.log('There has been a problem with fetch operation: ', error.message));
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
    charactersShowcase.appendChild(createHomeCard(data.results[character.position]))
  })
  .catch(error => console.log('There has been a problem with fetch operation: ', error.message));
}

const runPage = () => {
  getAllCharacters(1);
}

window.onload = runPage;
