import {
  Component, h,
} from 'preact';
import * as classnames from 'classnames';
import * as s from './BackgroundMedia.css';

declare module 'preact' {
  namespace h {
    namespace JSX {
      interface HTMLAttributes {
        decoding?: string;
        importance?: string;
        referrerpolicy?: string;
      }
    }
  }
}

interface BackgroundImageProps {
  url: string;
  dimensions?: ImageDimensions;
  imageLoadingFailureHandler: () => void;
}

export interface ImageDimensions {
  height: number;
  width: number;
}

export interface BackgroundImageState {
  loaded: boolean;
}

export default class BackgroundImage extends Component<BackgroundImageProps, BackgroundImageState> {
  state = {
    loaded: false,
  };

  handleImageLoad = () => {
    this.setState({
      loaded: true,
    });
  };

  handleImageError = () => {
    console.warn('Failed to load background image, falling back to animated gradient');

    this.props.imageLoadingFailureHandler();
  };

  render(props: BackgroundImageProps, state: BackgroundImageState) {
    const classes = state.loaded === true
      ? classnames(s.backgroundMedia, s.loaded)
      : s.backgroundMedia;

    return (
      <div className={s.backgroundMediaContainer}>
        <img className={classes} src={props.url} alt="" onLoad={this.handleImageLoad} onError={this.handleImageError} height={props.dimensions?.height} width={props.dimensions?.width} crossOrigin="anonymous" referrerpolicy="no-referrer" importance="low" decoding="async" />
      </div>
    );
  }
}
