import { Component } from 'react';
import { animateScroll } from 'react-scroll';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import css from './App.module.css';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import fetchGallery from './FetchGallery';

class App extends Component {
  state = {
    gallery: {},
    page: 1,
    collection: [],
    loading: false,
  };

  componentDidUpdate(_, prevState) {
    const { search, page, collection } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ loading: true });

      fetchGallery(search, page)
        .then(response =>
          this.setState(prevState => {
            return {
              gallery: response,
              collection: [...prevState.collection, ...response.hits],
            };
          })
        )
        .finally(() => this.setState({ loading: false }));
    }

    if (prevState.collection !== collection && collection.length > 12) {
      return animateScroll.scrollMore(650);
    }
  }

  handleSearchSubmit = keyWords => {
    this.setState({ search: keyWords, collection: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  render() {
    const { loading, collection, page, gallery } = this.state;

    return (
      <div className={css.App}>
        <Searchbar keyWords={this.handleSearchSubmit} />

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

        {collection.length !== 0 &&
          page < Math.ceil(gallery.totalHits / 12) && (
            <Button incrimentPage={this.handleLoadMore} />
          )}
      </div>
    );
  }
}

App.propTypes = {
  keyWords: PropTypes.func.isRequired,
  collection: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  incrimentPage: PropTypes.func.isRequired,
};

export default App;
