import { useState, useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import fetchGallery from './FetchGallery';

const App = () => {
  const [gallery, setGallery] = useState({});
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search === '') {
      return;
    }

    setLoading(true);

    fetchGallery(search, page)
      .then(response => {
        setGallery(response);
        setCollection(prevCollection => [...prevCollection, ...response.hits]);
      })
      .finally(() => setLoading(false));
  }, [search, page]);

  const handleSearchSubmit = keyWords => {
    setSearch(keyWords);
    setCollection([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    animateScroll.scrollMore(650);
  };

  return (
    <div className={css.App}>
      <Searchbar keyWords={handleSearchSubmit} search1={search} />

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {collection && <ImageGallery collection={collection} />}

      {loading && <Loader />}

      {collection.length !== 0 && page < Math.ceil(gallery.totalHits / 12) && (
        <Button incrimentPage={handleLoadMore} />
      )}
    </div>
  );
};

export default App;
