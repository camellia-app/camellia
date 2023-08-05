import type { FC, ReactNode } from 'react';

import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { t } from '../../../api/i18n/translate';
import { Header } from '../Header/Header';
import {
  modalDialog,
  modalDialogBackdrop,
  modalDialogBody,
  modalDialogCloseButton,
  modalDialogContent,
  modalDialogHeader,
  modalDialogTitle,
} from './ModalDialog.module.css';

export const ModalDialog: FC<{
  children: ReactNode;
  isOpen: boolean;
  onClosePopup: () => void;
  title: string;
}> = (props) => {
  const backdropClickHandler = useCallback(() => {
    props.onClosePopup();
  }, [props]);

  useEffect(() => {
    const popupEscapeKeyPressHandler = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        props.onClosePopup();
      }
    };

    document.addEventListener('keydown', popupEscapeKeyPressHandler);

    return (): void => {
      document.removeEventListener('keydown', popupEscapeKeyPressHandler);
    };
  }, [props]);

  if (!props.isOpen) {
    return null;
  }

  const modalRoot = document.getElementById('modal-root');

  if (modalRoot === null) {
    throw new Error('Element with ID `modal-root` not found in DOM');
  }

  return createPortal(
    <div className={modalDialog}>
      <div className={modalDialogBody}>
        <header className={modalDialogHeader}>
          <div className={modalDialogTitle}>
            <Header level={1}>{props.title}</Header>
          </div>

          <button
            onClick={(): void => {
              props.onClosePopup();
            }}
            className={modalDialogCloseButton}
            title={`${t('popup_closeButton_label')} [Escape]`}
            type="button"
          >
            {t('popup_closeButton_label')}
          </button>
        </header>

        <div className={modalDialogContent}>{props.children}</div>
      </div>

      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={modalDialogBackdrop} onClick={backdropClickHandler} />
    </div>,
    modalRoot,
  );
};
