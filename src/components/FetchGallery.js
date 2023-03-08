const APIKEY = '32654742-e9cf5ff441fe0e6054809dea8';
const BASE_URL = 'https://pixabay.com/api/';

export default function fetchGallery(search, page) {
  const url = `${BASE_URL}?q=${search}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('No response from server'));
  });
}
