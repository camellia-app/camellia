import classNames from 'classnames';
import type * as CSS from 'csstype';
import { createRef, useEffect } from 'react';
import type { FC, MouseEventHandler, ReactNode } from 'react';
import { t } from '../../../api/i18n/translate';
import {
  popup,
  popupCloseButton,
  popupContent,
  popupHeader,
  popupScrollableContainer,
  popupTitle,
} from './Popup.module.css';
import { PopupNestingLevelContext } from './PopupNestingLevelContext';

export const Popup: FC<{
  /**
   * Content of the popup.
   */
  children: ReactNode;

  height?: number | undefined;

  /**
   * Unique popup ID.
   */
  id: string;

  /**
   * Current nesting level. Used for representation of popups as a stack inside Redux store.
   */
  nestingLevel: number;

  onBodyClick: () => void;

  onClose: () => void;

  onRenderChildren: (popupWidth: number, popupHeight: number) => void;

  /**
   * Popup title.
   */
  title: string;

  x: number;

  y: number;
}> = (props) => {
  const popupElement = createRef<HTMLDialogElement>();

  useEffect(() => {
    const element = popupElement.current;

    if (element === null) {
      return;
    }

    const rect = element.getBoundingClientRect();

    props.onRenderChildren(rect.width, rect.height);
  }, [popupElement, props]);

  const handleCloseButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    props.onClose();
  };

  const headerId = `popup-header-${props.id}`;

  const styles: CSS.PopupProperties = {
    '--popup-position-x': `${props.x}px`,
    '--popup-position-y': `${props.y}px`,
    '--popup-height': props.height === undefined ? 'auto' : `${props.height}px`,
  };

  const handleClickingPopupBody: MouseEventHandler<HTMLDialogElement> = () => {
    props.onBodyClick();
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <dialog
      aria-labelledby={headerId}
      className={classNames(popup)}
      onClick={handleClickingPopupBody}
      open={true}
      ref={popupElement}
      style={styles}
    >
      <div className={popupContent} role="presentation">
        <header className={popupHeader}>
          <h2 className={popupTitle} id={headerId}>
            {props.title}
          </h2>
          <button
            className={popupCloseButton}
            onClick={handleCloseButtonClick}
            title={`${t('popup_closeButton_label')} [Escape]`}
          >
            {t('popup_closeButton_label')} [Escape]
          </button>
        </header>

        <div className={popupScrollableContainer}>
          <PopupNestingLevelContext.Provider value={props.nestingLevel + 1}>
            {props.children}
          </PopupNestingLevelContext.Provider>
        </div>
      </div>
    </dialog>
  );
};
