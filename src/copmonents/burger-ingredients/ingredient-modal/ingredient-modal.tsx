import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './ingredient-modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('react-modals');

// @ts-ignore: suppress implicit any error 
function IngredientDetailsModal({ onClose, children}) {
  if (!modalRoot) {
    throw new Error('The element #modal-root was not found.');
  }
  // @ts-ignore: suppress implicit any error 
  const handleOverlayClick = (e) => {
    e.stopPropagation(); // остановка всплытия
    onClose();
  };
  
  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={onClose}>
      <div className={styles.header}>
          <span className="text_type_main-large mt-8">Детали ингредиента</span>
          <div className={styles.closeButton} onClick={onClose}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {children}
        </div>
    </div>,
    modalRoot
  );
}

IngredientDetailsModal.propTypes = {
  onClose: PropTypes.func,
};

export default IngredientDetailsModal;