import { onAppInstalled } from '../appEvents/onAppInstalled';
import { onAppUpdated } from '../appEvents/onAppUpdated';
import { migrateOptions, setDefaultOptionValues } from '../api/options';

onAppInstalled(async () => {
  console.group('App installed...');

  await setDefaultOptionValues();

  console.groupEnd();
});

onAppUpdated(async (previousVersion) => {
  console.group(`App updated from version ${previousVersion}...`);

  await setDefaultOptionValues();
  await migrateOptions();

  console.groupEnd();
});
