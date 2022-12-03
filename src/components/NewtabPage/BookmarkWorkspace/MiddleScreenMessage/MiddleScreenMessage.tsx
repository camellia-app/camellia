import type { FC, ReactElement } from 'react';
import { ChipList } from '../../../common/ChipList/ChipList';
import {
  middleScreenMessage,
  middleScreenMessageMessage,
  middleScreenMessageActions,
} from './MiddleScreenMessage.module.css';

export const MiddleScreenMessage: FC<{
  chips: Array<ReactElement>;
  message: string;
}> = (props) => {
  return (
    <div className={middleScreenMessage}>
      <div className={middleScreenMessageMessage}>{props.message}</div>

      {props.chips.length > 0 ? (
        <div className={middleScreenMessageActions}>
          <ChipList chips={props.chips} type={'inline'} />
        </div>
      ) : undefined}
    </div>
  );
};
