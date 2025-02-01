import styles from "./modal-overlay.module.css";
import { PropsWithChildren, MouseEvent } from "react";

type Props = {
  onClick: () => void;
}

export const ModalOverlay = ({ onClick, children }: PropsWithChildren<Props>): React.JSX.Element  => {
  function onOverlayClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClick();
    }
  }

  return (
    <div className={styles.overlay} onClick={onOverlayClick}>
      {children}
    </div>
  );
}

