import {
  Component, createRef, h,
} from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import * as s from './BackgroundMedia.css';
import { BackgroundMediaVisibility } from './BackgroundMedia';

enum ProgressionDirection {
  Increacing = 1,
  Decreacing = -1,
}

const getRandomDirection = (): ProgressionDirection => (Math.random() > 0.5 ? -1 : 1);

// based on https://codepen.io/desandro/pen/BzJkQv
class Pixel {
  private readonly x: number;

  private readonly y: number;

  private hue: number;

  private saturation: number;

  private brightness: number;

  private saturationDirection: ProgressionDirection;

  private brightnessDirection: ProgressionDirection;

  private readonly velocity: number;

  constructor(
    x: number,
    y: number,
  ) {
    this.x = x;
    this.y = y;

    this.hue = Math.floor(Math.random() * 360);
    this.saturation = Math.floor(Math.random() * 75);
    this.brightness = Math.floor(Math.random() * 75);

    this.velocity = (Math.random() * 30 + 20) * 0.01 * getRandomDirection() / 5;
  }

  update = () => {
    this.hue += this.velocity;

    const absoluteVelocity = Math.abs(this.velocity);

    if (this.saturationDirection === ProgressionDirection.Increacing) {
      if (this.saturation + absoluteVelocity < 75) {
        this.saturation += absoluteVelocity;
      } else {
        this.saturationDirection = ProgressionDirection.Decreacing;
      }
    } else if (this.saturation - absoluteVelocity > 0) {
      this.saturation -= absoluteVelocity;
    } else {
      this.saturationDirection = ProgressionDirection.Increacing;
    }

    if (this.brightnessDirection === ProgressionDirection.Increacing) {
      if (this.brightness + absoluteVelocity < 75) {
        this.brightness += absoluteVelocity;
      } else {
        this.brightnessDirection = ProgressionDirection.Decreacing;
      }
    } else if (this.brightness - absoluteVelocity > 0) {
      this.brightness -= absoluteVelocity;
    } else {
      this.brightnessDirection = ProgressionDirection.Increacing;
    }
  };

  render = (ctx: CanvasRenderingContext2D) => {
    const hue = Math.round(this.hue);
    const { saturation } = this;
    const { brightness } = this;

    ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
    ctx.fillRect(this.x, this.y, 1, 1);
  };
}

const animateCanvasGradient = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d');

  const pixels = [
    new Pixel(0, 0),
    new Pixel(1, 0),
    new Pixel(0, 1),
    new Pixel(1, 1),
  ];

  const animate = () => {
    pixels.forEach((pixel) => {
      pixel.update();
      pixel.render(ctx);
    });

    requestAnimationFrame(animate);
  };

  animate();
};

const canvasElement = createRef();

export default () => {
  useEffect(() => {
    animateCanvasGradient(canvasElement.current);

    const context = useContext(BackgroundMediaVisibility);
    context.makeVisible();
  }, []);

  return <canvas ref={canvasElement} className={s.backgroundMedia} width="2" height="2" />;
};
