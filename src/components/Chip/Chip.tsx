import { h } from 'preact';
import * as classnames from 'classnames';
import * as s from './Chip.css';
import { Favicon } from '../../bookmarks/Favicon';

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

export const Chip = (props: ChipProps) => {
  const icon = props.icon instanceof Favicon ? (
    <img className={s.chipIcon} src={props.icon.getDefaultFavicon().url} srcSet={props.icon.getSrcSetString()} alt="Favicon" height="16" width="16" />
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
