import classNames from 'classnames';
import type { ReactEventHandler, FC, MouseEventHandler } from 'react';
import { createRef, useEffect, useState } from 'react';
import { chip, chipIcon, chipLabel, chipLoading, chipRounded, chipSquared } from './Chip.module.css';

export const Chip: FC<{
  /**
   * Action that will be triggered after clicking the chip.
   */
  clickAction?: MouseEventHandler;

  /**
   * Fallback icon of the chip which will be used in case main icon won't load.
   * It may be an image URL or data URL, but it's recommended to use [data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
   */
  fallbackIconSrc?: string | undefined;

  /**
   * Should chip be focused automatically or not.
   *
   * @default false
   */
  focus?: boolean | undefined;

  /**
   * Main icon of the chip. It may be an image URL or [data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
   */
  iconSrc: string;

  /**
   * Show loading animation or not.
   *
   * @default false
   */
  isLoading?: boolean | undefined;

  /**
   * Label (name) of the chip shown next to its icon.
   */
  label: string;

  /**
   * Shape of the chip.
   */
  shape: 'rounded' | 'squared';

  /**
   * Tooltip will be shown when hovering with cursor.
   */
  tooltip?: string | undefined;

  /**
   * URL that will be opened after clicking the chip.
   */
  url?: string | undefined;
}> = (props) => {
  const [iconSrc, setIconSrc] = useState<string>(props.iconSrc);

  const buttonElementRef = createRef<HTMLButtonElement>();
  const anchorElementRef = createRef<HTMLAnchorElement>();

  useEffect(() => {
    if (props.focus === true) {
      buttonElementRef.current?.focus();
    }
  }, [buttonElementRef, props.focus]);

  useEffect(() => {
    if (props.focus === true) {
      anchorElementRef.current?.focus();
    }
  }, [anchorElementRef, props.focus]);

  const handleImageError: ReactEventHandler<HTMLImageElement> = (event) => {
    if (!(event.target instanceof HTMLImageElement)) {
      return;
    }

    if (props.fallbackIconSrc !== undefined) {
      console.warn('Could not load favicon %s, loading fallback icon instead', event.target.src);

      setIconSrc(props.fallbackIconSrc);
    }
  };

  const tooltip = props.tooltip !== undefined ? props.tooltip : props.label;

  const chipBody = (
    <>
      <img alt="Favicon" className={chipIcon} height="16" onError={handleImageError} src={iconSrc} width="16" />

      <span className={chipLabel}>{props.label}</span>
    </>
  );

  const chipClasses = classNames(chip, {
    [chipLoading]: props.isLoading === true,
    [chipSquared]: props.shape === 'squared',
    [chipRounded]: props.shape === 'rounded',
  });

  if (props.url !== undefined) {
    return (
      <a
        className={chipClasses}
        href={props.url}
        onClick={props.clickAction}
        ref={anchorElementRef}
        rel="noopener"
        target="_self"
        title={tooltip}
      >
        {chipBody}
      </a>
    );
  } else {
    return (
      <button className={chipClasses} onClick={props.clickAction} ref={buttonElementRef} title={tooltip} type="button">
        {chipBody}
      </button>
    );
  }
};
