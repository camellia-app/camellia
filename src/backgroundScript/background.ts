import { migrateOptions, setDefaultOptionValues } from '../api/options';
import { onAppInstalled } from '../appEvents/onAppInstalled';
import { onAppUpdated } from '../appEvents/onAppUpdated';

onAppInstalled(async () => {
  await setDefaultOptionValues();
});

onAppUpdated(async (previousVersion) => {
  console.info(`App updated from version ${previousVersion}...`);

  await setDefaultOptionValues();
  await migrateOptions();
});
