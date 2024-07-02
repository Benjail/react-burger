import PropTypes from 'prop-types';
import styles from './modal.module.css';

// @ts-ignore: suppress implicit any error
function ModalOverlay({ onClose }) {
// @ts-ignore: suppress implicit any error
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    e.stopPropagation(); 
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
    </div>
  )}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default ModalOverlay;