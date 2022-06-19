import '../src/reset.css';
import '../src/variables.css';
import '../src/commons.module.css';
import { addDecorator } from '@storybook/react';
import { withProvider } from './ProviderWrapper';

addDecorator(withProvider);
