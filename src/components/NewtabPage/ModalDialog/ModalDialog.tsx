import type { FC, ReactNode } from 'react';
import { createRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { t } from '../../../api/i18n/translate';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { Header } from '../Header/Header';
import {
  modalDialog,
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
  const ref = createRef<HTMLDivElement>();

  const outsideClickHandler = useCallback(() => {
    props.onClosePopup();
  }, [props]);

  useOnClickOutside(ref, outsideClickHandler);

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
      <div className={modalDialogBody} ref={ref}>
        <header className={modalDialogHeader}>
          <div className={modalDialogTitle}>
            <Header level={1}>{props.title}</Header>
          </div>

          <button
            className={modalDialogCloseButton}
            onClick={(): void => {
              props.onClosePopup();
            }}
            title={`${t('popup_closeButton_label')} [Escape]`}
            type="button"
          >
            {t('popup_closeButton_label')}
          </button>
        </header>

        <div className={modalDialogContent}>{props.children}</div>
      </div>
    </div>,
    modalRoot,
  );
};
