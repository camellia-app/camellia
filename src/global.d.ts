declare module '*.module.css' {
  const classes: { readonly [key: string]: string };

  /// eslint-disable-next-line import/no-default-export
  export default classes;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare namespace React {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    importance?: string;
  }
}
