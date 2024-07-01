import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './order-modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById('react-modals');
// @ts-ignore: suppress implicit any error for side
function OrderModal({onClose, children}) {
  if (!modalRoot) {
    throw new Error('The element #modal-root was not found.');
  }
  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal}>
        <div className={styles.closeButton} onClick={onClose}><CloseIcon type="primary" /></div>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

OrderModal.propTypes = {
  onClose: PropTypes.func,
};

export default OrderModal;