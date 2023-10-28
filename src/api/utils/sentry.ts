import type { BrowserOptions } from '@sentry/react';

import { BrowserTracing, getCurrentHub, init, startTransaction } from '@sentry/react';

import { config } from '../../config';

export const SENTRY_SPAN_STATUS_OK = 'ok';
export const SENTRY_SPAN_STATUS_UNKNOWN_ERROR = 'unknown_error';

export const initializeSentry = (): void => {
  if (config.sentry.dsn === undefined) {
    return;
  }

  const sentryOptions: BrowserOptions = {
    dsn: config.sentry.dsn,
    environment: config.sentry.environment,
    integrations: [new BrowserTracing()],
    tracesSampleRate: config.sentry.tracing.sampleRate,
  };

  if (config.sentry.release !== undefined) {
    sentryOptions.release = config.sentry.release;
  }

  if (config.sentry.dsn !== undefined) {
    init(sentryOptions);
  }
};

export const createTracingTransaction = (transactionName: string): ReturnType<typeof startTransaction> => {
  const transaction = startTransaction({
    name: transactionName,
  });

  getCurrentHub().configureScope((scope) => scope.setSpan(transaction));

  return transaction;
};
