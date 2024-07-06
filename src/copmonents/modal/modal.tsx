import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay';

const modalRoot = document.getElementById('react-modals');

// @ts-ignore: suppress implicit any error
function Modal({ onClose, children, title }) {
  useEffect(() => {
    
// @ts-ignore: suppress implicit any error
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return modalRoot ? ReactDOM.createPortal(
    <div className={styles.modalContainer}>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          {title && <span className="text_type_main-large mt-8">{title}</span>}
          <div className={styles.closeButton} onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}>
            <CloseIcon type="primary" />
          </div>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>



    </div>,
    modalRoot
  ) : null;
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal;
