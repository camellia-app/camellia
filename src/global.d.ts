declare module '*.svg' {
  const content: string;
  export default content;
}

declare namespace React {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    importance?: string;
  }
}
