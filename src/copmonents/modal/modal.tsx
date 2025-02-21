import { PropsWithChildren, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById("react-modals") as HTMLElement;

type Props = {
  onClose: () => void;
  header: string,
};

export const Modal = ({children, onClose, header}: PropsWithChildren<Props>): React.JSX.Element =>  {
  useEffect(() => {
    const onEscape = (event :KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keyup", onEscape, false);

    return () => {
      document.removeEventListener("keyup", onEscape, false);
    };
  }, [onClose, header]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose}>
        <article className={styles.modal} data-testid='modal'>
          <div className={styles.content}>
            <div className={styles.header}>
              <h1 className="text text_type_main-large">{header}</h1>
            </div>
            {children}
            <span className={styles.close} data-testid='modal-close'>
              <CloseIcon type = "primary" onClick={onClose}/>
            </span>
          </div>
        </article>
      </ModalOverlay>
    </>,
    modalRoot
  );
}
