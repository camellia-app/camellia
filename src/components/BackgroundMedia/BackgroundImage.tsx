import {
  Component, h,
} from 'preact';
import * as classnames from 'classnames';
import * as s from './BackgroundMedia.css';

interface BackgroundImageProps {
  url: string;
}

export interface BackgroundImageState {
  loaded: boolean;
}

export default class BackgroundImage extends Component<BackgroundImageProps, BackgroundImageState> {
  constructor() {
    super();

    this.handleImageLoaded = this.handleImageLoaded.bind(this);

    this.state = {
      loaded: false,
    };
  }

  handleImageLoaded() {
    this.setState({
      loaded: true,
    });
  }

  render(props: BackgroundImageProps, state: BackgroundImageState) {
    const classes = state.loaded === false
      ? classnames(s.backgroundMedia, s.loading)
      : s.backgroundMedia;

    return (
      <div className={s.backgroundMediaContainer}>
        <img
          className={classes}
          src={props.url}
          alt=""
          onLoad={this.handleImageLoaded}
        />
      </div>
    );
  }
}
