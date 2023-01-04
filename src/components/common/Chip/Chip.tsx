import classNames from 'classnames';
import type { ReactEventHandler, FC, MouseEventHandler, ReactElement } from 'react';
import { createRef, useEffect, useState } from 'react';
import {
  chip,
  chipBlurred,
  chipIcon,
  chipIconEllipse,
  chipIconInlinedSvg,
  chipIconRemoteRasterImage,
  chipIconRemoteRasterImageLoading,
  chipLabel,
  chipLoading,
  chipRounded,
  chipSquared,
} from './Chip.module.css';

export const Chip: FC<
  {
    /**
     * Should chip background be blurred.
     *
     * @default false
     */
    blurred?: boolean | undefined;

    /**
     * Action that will be triggered after clicking the chip.
     */
    clickAction?: MouseEventHandler | undefined;

    /**
     * Should chip be focused automatically or not.
     *
     * @default false
     */
    focus?: boolean | undefined;

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
  } & (
    | {
        /**
         * Fallback icon of the chip which will be used in case main icon won't load.
         */
        fallbackSvg: ReactElement;

        /**
         * Should icon be circled or not.
         *
         * @default false
         */
        iconEllipse?: boolean | undefined;

        /**
         * Main icon of the chip. It may be an image URL or [data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
         */
        iconSrc: string;
      }
    | {
        /**
         * Icon of the chip as SVG element.
         */
        svg: ReactElement;
      }
  )
> = (props) => {
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

  const tooltip = props.tooltip !== undefined ? props.tooltip : props.label;

  const chipBody = (
    <>
      <span className={chipIcon}>
        {'svg' in props ? (
          <ChipIconInlineVectorImage svg={props.svg} />
        ) : (
          <ChipIconRemoteRasterImage ellipse={props.iconEllipse} fallbackSvg={props.fallbackSvg} src={props.iconSrc} />
        )}
      </span>
      <span className={chipLabel}>{props.label}</span>
    </>
  );

  const chipClasses = classNames(chip, {
    [chipBlurred]: props.blurred === true,
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

const ChipIconRemoteRasterImage: FC<{
  /**
   * Should icon be circled or not.
   *
   * @default false
   */
  ellipse?: boolean | undefined;

  /**
   * Fallback icon of the chip which will be used in case main icon won't load.
   */
  fallbackSvg: ReactElement;

  /**
   * Main icon of the chip. It may be an image URL or [data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs).
   */
  src: string;
}> = (props) => {
  const [shouldUseFallbackIcon, setShouldUseFallbackIcon] = useState<boolean>(false);
  const [iconIsLoading, setIconLoading] = useState<boolean>(!props.src.startsWith('data:'));

  const chipIconClasses = classNames(chipIconRemoteRasterImage, {
    [chipIconRemoteRasterImageLoading]: iconIsLoading,
    [chipIconEllipse]: props.ellipse === true,
  });

  const handleImageError: ReactEventHandler<HTMLImageElement> = (event) => {
    if (!(event.target instanceof HTMLImageElement)) {
      return;
    }

    console.warn('Could not load favicon %s, loading fallback icon instead', event.target.src);

    setShouldUseFallbackIcon(true);
  };

  const handleIconLoaded: ReactEventHandler<HTMLImageElement> = () => {
    setIconLoading(false);
  };

  if (shouldUseFallbackIcon) {
    return <ChipIconInlineVectorImage svg={props.fallbackSvg} />;
  }

  return (
    <img
      alt="Favicon"
      className={chipIconClasses}
      height="16"
      onError={handleImageError}
      onLoad={handleIconLoaded}
      src={props.src}
      width="16"
    />
  );
};

const ChipIconInlineVectorImage: FC<{
  /**
   * Icon of the chip as SVG element.
   */
  svg: ReactElement;
}> = (props) => {
  return <span className={chipIconInlinedSvg}>{props.svg}</span>;
};
