import styles from "./modal-overlay.module.css";

export default function ModalOverlay(props) {
  function onOverlayClick(e) {
    if (e.target === e.currentTarget) {
      props.onClick();
    }
  }

  return (
    <div className={styles.overlay} onClick={onOverlayClick}>
      {props.children}
    </div>
  );
}
