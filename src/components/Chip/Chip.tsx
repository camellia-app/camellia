import cn from 'classnames';
import type { ReactEventHandler, VoidFunctionComponent } from 'react';
import s from './Chip.module.css';
import type { Favicon } from '../../faviconProcessor/favicon';
import type * as CSS from 'csstype';

export enum ChipShape {
  Rounded,
  Squared,
}

type ChipProps = {
  handleFaviconLoadingError?: () => void;
  icon: Favicon | string;
  label: string;
  loading: boolean;
  shape: ChipShape;
  tooltip?: string;
};

export const Chip: VoidFunctionComponent<ChipProps> = (props) => {
  const handleImageError: ReactEventHandler<HTMLImageElement> = (event) => {
    if (!(event.target instanceof HTMLImageElement)) {
      return;
    }

    console.warn('Could not load faviconProcessor %s, loading fallback icon instead', event.target.src);

    if (props.handleFaviconLoadingError !== undefined) {
      props.handleFaviconLoadingError();
    }
  };

  const styles: CSS.ChipProperties = {
    ['--inline-icon']: `url("${props.icon}")`,
  };

  const iconElement =
    typeof props.icon === 'string' ? (
      <span className={cn(s.chipIcon, s.chipIconInline)} style={styles} />
    ) : (
      <img
        alt="Favicon"
        className={s.chipIcon}
        height="16"
        onError={handleImageError}
        src={props.icon.variants[0]?.url}
        width="16"
      />
    );

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
      {iconElement}

      <span className={s.chipLabel}>{props.label}</span>
    </div>
  );
};
