export const logHttpRequest = (url: string): void => {
  log('debug', '🌍', 'http_request', `Sent HTTP request to URL: ${url}`, {
    url,
  });
};

export const logHttpResponse = (url: string, status: number): void => {
  log('debug', '🌍', 'http_response', `Received HTTP response with status code ${status} from URL: ${url}`, {
    url,
    status,
  });
};

export const logOptionsSet = (optionKey: string, value: unknown): void => {
  log('debug', '🛠', 'option_set', `Setting option "${optionKey}" to new value`, {
    optionKey,
    value,
  });
};

export const logOptionsSubscribe = (optionKey: string): void => {
  log('debug', '🛠', 'option_subscribe', `Subscribing to changes of option "${optionKey}"`, {
    optionKey,
  });
};

export const logOptionsSubscribedChanged = (optionKey: string): void => {
  log('debug', '🛠', 'option_subscribe_changed', `Option "${optionKey}" changed`, {
    optionKey,
  });
};

const log = (
  level: 'debug' | 'error' | 'info' | 'warn',
  emoji: string,
  category: string,
  message: string,
  context?: unknown,
): void => {
  const logMessage = `${emoji} ${message}`;

  switch (level) {
    case 'debug':
      console.debug(logMessage);

      break;

    case 'info':
      console.info(logMessage);

      break;

    case 'warn':
      console.warn(logMessage);

      break;

    case 'error':
      console.error(logMessage);

      break;
  }
};
