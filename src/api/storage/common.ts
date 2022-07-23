export type StorageKeyChangeHandler<TValue> = (newValue: TValue, oldValue: TValue) => void;
export type StorageKeyChangeHandlerDestructor = () => void;

export type Storage = {
  delete: (key: string) => Promise<void>;
  exists: (key: string) => Promise<boolean>;
  get: <TValue>(key: string) => Promise<TValue>;
  getAllKeys: () => Promise<Array<string>>;
  set: <TValue>(key: string, value: TValue) => Promise<void>;
  subscribeToKeyChanges: <TValue>(
    key: string,
    handler: StorageKeyChangeHandler<TValue>,
  ) => StorageKeyChangeHandlerDestructor;
};

export enum StorageType {
  Local = 'local',
  Synchronizable = 'synchronizable',
}

export class StorageError extends Error {}

export class StorageKeyDoesNotExist extends StorageError {
  constructor(public readonly storageType: StorageType, public readonly key: string) {
    super(`Key "${key}" not found in storage with type "${storageType}"`);
  }
}
