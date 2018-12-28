import { GIPHY_KEY, GIPHY_API_URL } from '../api';
import { setReqOptions } from '../utils/reqHelpers';

export const imageSearchReq = async params => {
  const { query } = params;
  let limit = 'limit=100';
  let phrase = `q=${encodeURIComponent(query)}`;
  let searchUrl = `${GIPHY_API_URL}?api_key=${GIPHY_KEY}&${phrase}&${limit}`;

  return await fetch(searchUrl, setReqOptions({}))
    .then(res => res.json())
    .then(res => {
      console.log(res);

      return res.data;
    }).catch(err => console.log(err));
};
