import axios from 'axios';

export const fetch = async (page, query) => {
  const key = '27831105-5e5b5e1ddfe0fd39cdbde4893';
  const URL = `https://pixabay.com/api/`;
  const per_page = 12;
  const option = {
    params: {
      key: `${key}`,
      q: `${query}`,
      image_type: 'photo',
      orientation: 'horizontal',
      page: `${page}`,
      per_page: `${per_page}`,
    },
  };
  return await axios.get(URL, option);
};
