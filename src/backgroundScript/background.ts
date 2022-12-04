import { migrateOptions } from '../api/options';
import { storage } from '../api/storage';
import { onAppInstalled } from '../appEvents/onAppInstalled';
import { onAppUpdated } from '../appEvents/onAppUpdated';

onAppInstalled(async () => {
  await storage.synchronizable.set('installation_date', Date.now());
});

onAppUpdated(async (previousVersion) => {
  console.info(`App updated from version ${previousVersion}...`);

  await migrateOptions();
});
