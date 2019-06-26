const IMG_PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iMjk2IiBoZWlnaHQ9IjI5NiIgc3R5bGU9ImZpbGw6I2RlZGVkZTtzdHJva2U6I2VlZWVlZTtzdHJva2Utd2lkdGg6MiIvPjwvc3ZnPg==";

const createCardImg = (name, src) => {
  const img = document.createElement('img');
  img.classList.add('homeCard-img');
  img.alt = `${name} photo`;
  img.src = src;
  return img
}

const createCardTitle = (name, id) => {
  const div = document.createElement('div'),
  h2 = document.createElement('h2'),
  p = document.createElement('p');

  div.classList.add('homeCard-title');
  h2.innerText = name;
  p.innerText = `ID: ${id}`;
  div.appendChild(h2).appendChild(p);

  return div
}

const createCardImgWrapper = (data) => {
  const name = data && data.name || 'No Name',
  image =  data && data.image || IMG_PLACEHOLDER,
  id = data && data.id || '',
  cardImg = createCardImg(name, image),
  cardTitle = createCardTitle(name, id),
  div = document.createElement('div');

  div.classList.add('homeCard-imgWrapper');
  div.appendChild(cardImg)
  div.appendChild(cardTitle)

  return div
}

const createCardInfoWrapper = (datas) => {
  const data = datas || {},
  status = data.status || 'No status',
  species = data.species || 'No species',
  gender = data.gender || 'No gender',
  origin = data.origin && data.origin.name || 'No origin',
  location = data.location && data.location.name || 'No location',
  information = [
    { info: 'STATUS', data: status },
    { info: 'SPECIES', data: species },
    { info: 'GENDER', data: gender },
    { info: 'ORIGIN', data: origin },
    { info: 'LAST LOCATION', data: location},
  ],
  cardInfoWraper = document.createElement('div'),
  infoDivs = information.map(e => {
    const div = document.createElement('div'),
      span = document.createElement('span'),
      p = document.createElement('p');
    
    div.classList.add('homeCard-text');
    span.innerText = e.info;
    p.innerText = e.data;

    div.appendChild(span)
    div.appendChild(p)

    return div
  });

  cardInfoWraper.classList.add('homeCard-info');
  infoDivs.forEach(div => cardInfoWraper.appendChild(div))

  return cardInfoWraper
}

const createHomeCard = (data) => {
  const card = document.createElement('article'),
  imgWrapper = createCardImgWrapper(data),
  infoWrapper = createCardInfoWrapper(data);

  card.classList.add('homeCard');  
  card.appendChild(imgWrapper)
  card.appendChild(infoWrapper)

  return card
}