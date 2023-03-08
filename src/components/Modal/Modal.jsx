import css from './Modal.module.css'
import { createPortal } from 'react-dom'
import { Component } from 'react'
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root')

// export default function Modal({ largeImage, onCloseModal }) {

//     return createPortal(<div onClick={onCloseModal} className={css.Overlay}>
//         <div className={css.Modal}>
//             <img src={largeImage} alt="" />
//         </div>
//     </div>, modalRoot)
// }


class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = (evt) => {
        if (evt.code === 'Escape') {
            this.props.closeKeyDown()
        }
    }

    render() {
        const { largeImage, onCloseModal } = this.props

        return createPortal(<div onClick={onCloseModal} className={css.Overlay}>
            <div className={css.Modal}>
                <img src={largeImage} alt="" />
            </div>
        </div>, modalRoot)
    }
}

Modal.propTypes = {
    largeImage: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
}

export default Modal;

