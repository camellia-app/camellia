import cn from 'classnames';
import type { ReactEventHandler, VFC } from 'react';
import s from './Chip.module.css';
import type { Favicon } from '../../faviconProcessor/favicon';
import { useState } from 'react';

export enum ChipShape {
  Rounded,
  Squared,
}

export const Chip: VFC<
  {
    label: string;
    loading: boolean;
    shape: ChipShape;
    tooltip?: string;
  } & (
    | {
        fallbackInlineIcon: string;
        favicon: Favicon;
      }
    | {
        inlineIcon: string;
      }
  )
> = (props) => {
  const initialIcon = 'inlineIcon' in props ? props.inlineIcon : props.favicon.default.url;

  const [icon, setIcon] = useState<string>(initialIcon);

  const handleImageError: ReactEventHandler<HTMLImageElement> = (event) => {
    if (!(event.target instanceof HTMLImageElement)) {
      return;
    }

    if ('fallbackInlineIcon' in props && icon !== props.fallbackInlineIcon) {
      console.warn('Could not load favicon %s, loading fallback icon instead', event.target.src);

      setIcon(props.fallbackInlineIcon);
    }
  };

  const tooltip = props.tooltip !== undefined ? props.tooltip : props.label;

  return (
    <div
      className={cn(s.chip, {
        [s.loading]: props.loading,
        [s.chipSquared]: props.shape === ChipShape.Squared,
        [s.chipRounded]: props.shape === ChipShape.Rounded,
      })}
      title={tooltip}
    >
      <img alt="Favicon" className={s.chipIcon} height="16" onError={handleImageError} src={icon} width="16" />

      <span className={s.chipLabel}>{props.label}</span>
    </div>
  );
};
