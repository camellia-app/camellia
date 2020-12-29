# Camellia

Camellia is a browser extension that helps you access hundreds of bookmarks on the page that appears when you open new tab in your browser.

![Second generation's interface](https://user-images.githubusercontent.com/12474739/84573023-abfecb80-ada6-11ea-8b69-ef39955ef4fd.png)

First generation of Camellia has very bad architecture and code under the hood which makes it painful to make significant changes, so I've decided to stop its support. At this moment second generation of Camellia is in active development.

## What to expect from Camellia 2.0?

Second generation is creating from scratch: new codebase, new technologies (move from Vue.js to Preact), new architecture, only project's goals remained the same. It will be the same Camellia you loved some day, but better. It will also finally support Firefox.

### New design

Look at the screen shot attached above (please note that it's early build, something may change). We are focusing on first-class support of touch interfaces, high DPG displays (such as Retina) and screens with various sizes. It will also look more modern, cleaner and more organic.

### When will it be released?

It's planned to release is Q2-Q3 of 2021. Initial release will cover the same features as those in the latest version of first generation, but with new design, new codebase and performance improvements. Nothing new to expect at this time.

Your 1st gen Camellia will automatically update to 2nd gen, so no additional actions required. However, if you'll prefer 1st gen version for some reason, we'll provide an option to install it separately via CRX-file.

## How to get 2nd gen Camellia right now

### Camellia Canary

Camellia Canary is the special version of Camellia for beta testers. Each commit to master branch will update Canary build, so it's on the bleeding edge of new features and fixes. It may be kinda unstable. The Canary version is always newer than regular one. It's distributed via private Chrome Web Store entry, so it supports automatic updates.

To become beta tester, you should be Camellia contributor. Send your Google Account's email address you use in Google Chrome to petr@flaks.dev and after approve [Camellia Canary will be available for you in Chrome Web Store](https://chrome.google.com/webstore/detail/dadaaofggncbhcmekkijnadeffpcblib). At this moment Canary version only available in Chrome Web Store.

### Building Camellia locally

It's also possible to touch it without becoming beta tester. Due to the fact that Camellia is an open source project, you can download its source code and build locally.

To run project locally:

1. Clone it.
2. Run `npm install`.
3. Run `npm start`.
4. Now you have `/dist` folder where extension locates. Check out instructions about installing local (unpacked) extensions to your browser: [Chrome](https://developer.chrome.com/extensions/getstarted), [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#Trying_it_out).

Each time Webpack rebuilds the app, newtab and options pages will be reloaded automatically. However if your `dist/manifest.json` file, any extension icon or translation file will be modified, you will have to reload the extension manually (via refresh button in your browser's extensions settings) to see these changes.
