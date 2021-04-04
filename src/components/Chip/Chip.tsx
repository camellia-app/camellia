import cn from 'classnames';
import { h } from 'preact';
import { JSXInternal } from 'preact/src/jsx';
import { Favicon } from '../../bookmarks/Favicon';
import s from './Chip.css';

declare module 'preact' {
  namespace h {
    namespace JSX {
      interface HTMLAttributes {
        decoding?: string;
        importance?: string;
        referrerpolicy?: string;
      }
    }
  }
}

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
  const handleImageError = (event: JSXInternal.TargetedEvent<HTMLImageElement, Event>) => {
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
        '--inline-icon': `url("${props.icon}")`,
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
