import type { BrowserOptions } from '@sentry/browser';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import type { Transaction } from '@sentry/types/types/transaction';
import { config } from '../../config';

export const SENTRY_SPAN_STATUS_OK = 'ok';
export const SENTRY_SPAN_STATUS_UNKNOWN_ERROR = 'unknown_error';

export const initializeSentry = (): void => {
  if (config.sentry.dsn === undefined) {
    return;
  }

  const sentryOptions: BrowserOptions = {
    dsn: config.sentry.dsn,
    integrations: [new BrowserTracing()],
    tracesSampleRate: config.sentry.tracing.sampleRate,
    environment: config.sentry.environment,
  };

  if (config.sentry.release !== undefined) {
    sentryOptions.release = config.sentry.release;
  }

  if (config.sentry.dsn !== undefined) {
    Sentry.init(sentryOptions);
  }
};

export const createTracingTransaction = (transactionName: string): Transaction => {
  const transaction = Sentry.startTransaction({
    name: transactionName,
  });

  Sentry.getCurrentHub().configureScope((scope) => scope.setSpan(transaction));

  return transaction;
};
