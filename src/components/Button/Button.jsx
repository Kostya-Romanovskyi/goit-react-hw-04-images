import css from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ incrimentPage }) {
    return (
        <button onClick={incrimentPage} className={css.Button} type="button">
            Load more
        </button>
    );
}

Button.propTypes = {
    incrimentPage: PropTypes.func.isRequired,
}