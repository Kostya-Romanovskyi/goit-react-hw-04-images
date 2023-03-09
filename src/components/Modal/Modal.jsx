import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types';
import css from './Modal.module.css'

const modalRoot = document.querySelector('#modal-root')

const Modal = ({ closeKeyDown, onCloseModal, largeImage }) => {


    useEffect(() => {
        const handleKeyDown = (evt) => {
            if (evt.code === 'Escape') {
                closeKeyDown()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [closeKeyDown])


    return createPortal(<div onClick={onCloseModal} className={css.Overlay}>
        <div className={css.Modal}>
            <img src={largeImage} alt="" />
        </div>
    </div>, modalRoot)
}

Modal.propTypes = {
    closeKeyDown: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
}

export default Modal;

