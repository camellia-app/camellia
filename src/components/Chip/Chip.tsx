import { h } from 'preact';
import * as classnames from 'classnames';
import { JSXInternal } from 'preact/src/jsx';
import * as s from './Chip.css';
import { Favicon } from '../../bookmarks/Favicon';

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
  shape: ChipShape;
  tooltip?: string;
}

export const Chip = (props: ChipProps) => {
  const handleImageError = (event: JSXInternal.TargetedEvent<HTMLImageElement, Event>) => {
    if (!(event.target instanceof HTMLImageElement)) {
      return;
    }

    console.warn('Could not load favicon %s, loading fallback icon instead', event.target.src);

    props.handleFaviconLoadingError(); // TODO: It may be undefined!
  };

  const iconElement = props.icon instanceof Favicon ? (
    <img className={s.chipIcon} src={props.icon.getDefaultFavicon().url} srcSet={props.icon.getSrcSetString()} onError={handleImageError} alt="Favicon" height="16" width="16" />
  ) : (
    <span className={classnames(s.chipIcon, s.chipIconInline)} style={`--inline-icon: url("${props.icon}");`} />
  );

  const tooltip = props.tooltip || props.label;

  let shapeClass;

  switch (props.shape) {
    case ChipShape.Rounded:
      shapeClass = s.chipRounded;

      break;

    case ChipShape.Squared:
      shapeClass = s.chipSquared;

      break;

    default:
      throw Error('Unsupported chip shape');
  }

  return (
    <div className={classnames(s.chip, shapeClass)} title={tooltip}>
      {iconElement}

      <span className={s.chipLabel}>{props.label}</span>
    </div>
  );
};
