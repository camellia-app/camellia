import cn from 'classnames';
import { ReactEventHandler, VoidFunctionComponent } from 'react';
import s from './Chip.module.css';
import { Favicon } from '../../faviconProcessor/favicon';

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

  const iconElement =
    typeof props.icon === 'string' ? (
      <span
        className={cn(s.chipIcon, s.chipIconInline)}
        style={{
          ['--inline-icon' as string]: `url("${props.icon}")`,
        }}
      />
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
