import { h } from 'preact';
import * as s from './IndeterminateIndicator.css';

export default () => (
  <div className={s.track}>
    <progress className={s.progress} />
  </div>
);
