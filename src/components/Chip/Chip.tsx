import { h } from 'preact';
import * as classnames from 'classnames';
import * as s from './Chip.css';
import Favicon from '../../bookmarks/Favicon';

interface ChipProps {
  label: string;
  tooltip?: string;
  icon: string | Favicon;
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

  return (
    <div className={s.chip} title={tooltip}>
      {icon}

      <span className={s.chipLabel}>{props.label}</span>
    </div>
  );
};
