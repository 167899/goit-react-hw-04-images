import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClick, children }) => {
  useEffect(() => {
    const hendlKeyDown = e => {
      if (e.code === 'Escape') {
        onClick();
      }
    };
    window.addEventListener('keydown', hendlKeyDown);
    return () => window.removeEventListener('keydown', hendlKeyDown);
  }, [onClick]);

  const hendlBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={hendlBackdropClick}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
