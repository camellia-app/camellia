import cn from 'classnames';
import { ReactEventHandler } from 'react';
import { Favicon } from '../../bookmarks/Favicon';
import s from './Chip.module.css';

export enum ChipShape {
  Rounded,
  Squared,
}

interface ChipProps {
  handleFaviconLoadingError?: () => void;
  icon: string | Favicon;
  label: string;
  loading: boolean;
  shape: ChipShape;
  tooltip?: string;
}

export const Chip = (props: ChipProps) => {
  const handleImageError: ReactEventHandler<HTMLImageElement> = (event) => {
    if (!(event.target instanceof HTMLImageElement)) {
      return;
    }

    console.warn('Could not load favicon %s, loading fallback icon instead', event.target.src);

    if (props.handleFaviconLoadingError !== undefined) {
      props.handleFaviconLoadingError();
    }
  };

  const iconElement = props.icon instanceof Favicon ? (
    <img alt="Favicon" className={s.chipIcon} height="16" onError={handleImageError} src={props.icon.getDefaultFavicon().url} srcSet={props.icon.getSrcSetString()} width="16" />
  ) : (
    <span
      className={cn(s.chipIcon, s.chipIconInline)}
      style={{
        ['--inline-icon' as any]: `url("${props.icon}")`,
      }}
    />
  );

  const tooltip = props.tooltip || props.label;

  return (
    <div
      className={cn(s.chip, {
        [s.loading]: props.loading,
        [s.chipSquared]: props.shape === ChipShape.Squared,
        [s.chipRounded]: props.shape === ChipShape.Rounded,
      })}
      title={tooltip}
    >
      {iconElement}

      <span className={s.chipLabel}>{props.label}</span>
    </div>
  );
};
