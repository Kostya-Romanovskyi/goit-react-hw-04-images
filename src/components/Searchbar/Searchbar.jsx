import { Component } from 'react';
import { ReactComponent as SearchIcon } from '../../icons/Search-icon.svg'
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css'

export default class Searchbar extends Component {
    state = {
        search: ''
    }

    handleSearch = event => {
        this.setState({ search: event.currentTarget.value.toLowerCase() })
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.search.trim() === '') {
            return toast.error("Write a keywords for search images")
        }
        this.props.keyWords(this.state.search);

        this.setState({ search: '' });
    }

    render() {
        return <header className={css.Searchbar}>
            <form onSubmit={this.handleSubmit} className={css.SearchForm}>
                <button type="submit" className={css.SearchForm__button}>
                    <SearchIcon width="20" height="20" />
                    <span className={css.SearchForm__button_label}>Search</span>
                </button>

                <input
                    onChange={this.handleSearch}
                    className={css.SearchForm__input}
                    type="text"
                    autoComplete="off"
                    value={this.state.search}
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
}