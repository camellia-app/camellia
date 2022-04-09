import s from './LabeledActionButton.module.css';
import type { VFC, ButtonHTMLAttributes } from 'react';
import { ActionButton } from './ActionButton';
import { Paragraph } from '../Paragraph/Paragraph';

export const LabeledActionButton: VFC<{
  buttonHtmlType: NonNullable<ButtonHTMLAttributes<HTMLButtonElement>['type']>;
  clickHandler?: (() => void) | undefined;
  description: string;
  disabled: boolean;
  label: string;
  loading: boolean;
}> = (props) => {
  return (
    <div className={s.labeledActionButton}>
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
