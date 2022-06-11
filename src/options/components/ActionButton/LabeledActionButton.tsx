import type { FC, ButtonHTMLAttributes } from 'react';
import { ActionButton } from './ActionButton';
import { Paragraph } from '../Paragraph/Paragraph';
import { labeledActionButton } from './LabeledActionButton.module.css';

export const LabeledActionButton: FC<{
  buttonHtmlType: NonNullable<ButtonHTMLAttributes<HTMLButtonElement>['type']>;
  clickHandler?: (() => void) | undefined;
  description: string;
  disabled: boolean;
  label: string;
  loading: boolean;
}> = (props) => {
  return (
    <div className={labeledActionButton}>
      <ActionButton
        buttonHtmlType={props.buttonHtmlType}
        clickHandler={props.clickHandler}
        disabled={props.disabled}
        label={props.label}
        loading={props.loading}
      />

      <Paragraph>{props.description}</Paragraph>
    </div>
  );
};
