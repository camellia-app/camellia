export type OptionChangeHandler<TValue> = (newValue: TValue) => void;
export type OptionChangeHandlerDestructor = () => void;

export class OptionsError extends Error {}

export class OptionIsNotSetError extends OptionsError {
  constructor(public readonly optionKey: string) {
    super(`Option with key "${optionKey}" is not set`);
  }
}
