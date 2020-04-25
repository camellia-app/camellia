import { h } from 'preact';
import * as classnames from 'classnames';
import * as s from './Chip.css';
import Favicon from '../../bookmarks/Favicon';

export enum ChipShape {
  Rounded,
  Squared,
}

interface ChipProps {
  label: string;
  tooltip?: string;
  icon: string | Favicon;
  shape: ChipShape;
}

export default (props: ChipProps) => {
  const icon = props.icon instanceof Favicon ? (
    <picture className={s.chipIcon}>
      <source srcSet={props.icon.getSrcSetString()} />
      <img src={props.icon.getDefaultFavicon().url} alt="Favicon" height="16" width="16" />
    </picture>
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
      {icon}

      <span className={s.chipLabel}>{props.label}</span>
    </div>
  );
};
