import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css'
import Modal from '../Modal/Modal'

const ImageGalleryItem = ({ image, id, largeImage, alt }) => {

    const [showModal, setShowModal] = useState(false)

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const handleCloseModal = (evt) => {
        if (evt.currentTarget === evt.target) {
            toggleModal()
        }
    }

    return (

        <li className={css.ImageGalleryItem}>
            <img onClick={toggleModal} src={image} id={id} className={css.ImageGalleryItem__image} alt={alt} />
            {showModal && <Modal onCloseModal={handleCloseModal} closeKeyDown={toggleModal} largeImage={largeImage} />}
        </li >

    )

}

ImageGalleryItem.propTypes = {
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,

}


export default ImageGalleryItem;