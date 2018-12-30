import { GIPHY_KEY, GIPHY_API_URL } from '../components/Config/api';
import { setReqOptions } from '../utils/reqHelpers';

export const imageSearchReq = async params => {
  const { query } = params;
  let limit = 'limit=200';
  let phrase = `q=${encodeURIComponent(query)}`;
  let searchUrl = `${GIPHY_API_URL}?api_key=${GIPHY_KEY}&${phrase}&${limit}`;

  return await fetch(searchUrl, setReqOptions({}))
    .then(res => res.json())
    .then(res => {
      console.log(res);

      return res.data;
    }).catch(err => console.log(err));
};

export const retrieveFavorites = () => {
  let favorites = JSON.parse(localStorage.getItem('favorites'));
  let items = [];

  if (Object.keys(favorites).length > 0) {
    items = Object.keys(favorites).map(key => favorites[key]);
  }

  return { favorites, items };
};

export const setupFavorites = params => {
  const { favorites } = params;

  localStorage.setItem('favorites', JSON.stringify(favorites));

  return favorites;
};

export const syncFavorites = async params => {
  const { action, item } = params;
  let favorites = JSON.parse(localStorage.getItem('favorites'));

  if (action === 'add') {
    favorites = Object.assign({ [item.id]: item }, favorites);
  } else {
    delete favorites[item.id];
  }

  await setupFavorites({ favorites });
  return await JSON.parse(localStorage.getItem('favorites'));
};
