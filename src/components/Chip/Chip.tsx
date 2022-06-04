import type { ReactEventHandler, FC, MouseEventHandler } from 'react';
import { createRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import {
  chip,
  chipBody,
  chipBodyLoading,
  chipBodyRounded,
  chipBodySquared,
  chipIcon,
  chipLabel,
} from './Chip.module.css';

export enum ChipShape {
  Rounded,
  Squared,
}

type ChipProps = {
  fallbackIconSrc?: string | undefined;
  iconSrc: string;
  isLoading: boolean;
  label: string;
  shape: ChipShape;
  tooltip?: string | undefined;
};

const Chip: FC<ChipProps> = (props) => {
  const [iconSrc, setIconSrc] = useState<string>(props.iconSrc);

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

  return (
    <div
      className={classNames(chipBody, {
        [chipBodyLoading]: props.isLoading,
        [chipBodySquared]: props.shape === ChipShape.Squared,
        [chipBodyRounded]: props.shape === ChipShape.Rounded,
      })}
      title={tooltip}
    >
      <img alt="Favicon" className={chipIcon} height="16" onError={handleImageError} src={iconSrc} width="16" />

      <span className={chipLabel}>{props.label}</span>
    </div>
  );
};

export const ChipButton: FC<
  ChipProps & {
    clickAction: MouseEventHandler;
    focus: boolean;
  }
> = (props) => {
  const buttonElementRef = createRef<HTMLButtonElement>();

  useEffect(() => {
    if (props.focus) {
      buttonElementRef.current?.focus();
    }
  }, [buttonElementRef, props.focus]);

  return (
    <button className={chip} onClick={props.clickAction} ref={buttonElementRef} type="button">
      <Chip
        fallbackIconSrc={props.fallbackIconSrc}
        iconSrc={props.iconSrc}
        isLoading={props.isLoading}
        label={props.label}
        shape={props.shape}
        tooltip={props.tooltip}
      />
    </button>
  );
};

export const ChipLink: FC<
  ChipProps & {
    clickAction: MouseEventHandler;
    focus: boolean;
    url: string;
  }
> = (props) => {
  const anchorElementRef = createRef<HTMLAnchorElement>();

  useEffect(() => {
    if (props.focus) {
      anchorElementRef.current?.focus();
    }
  }, [anchorElementRef, props.focus]);

  return (
    <a
      className={chip}
      href={props.url}
      onClick={props.clickAction}
      ref={anchorElementRef}
      rel="noopener"
      target="_self"
    >
      <Chip
        fallbackIconSrc={props.fallbackIconSrc}
        iconSrc={props.iconSrc}
        isLoading={props.isLoading}
        label={props.label}
        shape={props.shape}
        tooltip={props.tooltip}
      />
    </a>
  );
};
