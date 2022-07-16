export type UnsplashImage = {
  resolution: {
    height: number;
    width: number;
  };
  url: string;
};

export type UnsplashPhoto = {
  image: UnsplashImage;
  photographer: {
    avatar: {
      large: UnsplashImage;
      medium: UnsplashImage;
      small: UnsplashImage;
    };
    name: string;
  };
  webPageUrl: string;
};
