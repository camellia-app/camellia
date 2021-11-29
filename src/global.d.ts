declare module '*.svg' {
  const content: string;
  export default content;
}

declare namespace React {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    importance?: string;
  }
}
