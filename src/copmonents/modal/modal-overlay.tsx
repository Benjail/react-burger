import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

// @ts-ignore: suppress implicit any error
function ModalOverlay({ onClose, children }) {
    if (!modalRoot) {
        throw new Error('The element #modal-root was not found.');
      }

  useEffect(() => {
// @ts-ignore: suppress implicit any error
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        e.stopPropagation();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
// @ts-ignore: suppress implicit any error
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    e.stopPropagation(); 
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      {children}
    </div>,
    modalRoot
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ModalOverlay;