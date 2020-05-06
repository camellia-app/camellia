import {
  Component, h,
} from 'preact';
import * as classnames from 'classnames';
import * as s from './BackgroundMedia.css';

interface BackgroundImageProps {
  url: string;
  dimensions?: ImageDimensions;
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

  render(props: BackgroundImageProps, state: BackgroundImageState) {
    const classes = state.loaded === false
      ? classnames(s.backgroundMedia, s.loading)
      : s.backgroundMedia;

    return (
      <div className={s.backgroundMediaContainer}>
        <img className={classes} src={props.url} alt="" onLoad={this.handleImageLoad} height={props.dimensions?.height} width={props.dimensions?.width} crossOrigin="anonymous" />
      </div>
    );
  }
}
