# Camellia

It's Camellia 2.0's source code. It's under active development now. It's not recommended to use early development builds for anything but development and testing.

## About Camellia 2.0

### Design

This is how Camellia probably will look after update. This is just design prototype and something may change.

![Design prototype](https://user-images.githubusercontent.com/12474739/67635361-3279a200-f8d7-11e9-9113-bac1c3c0a83d.png)

### When will it be released?

In Q2-Q3 of 2020.

### What's new planned?

Initial release will cover the same features as those in the latest 1.x version but with a brand new design and a performance boost. The main goal for 2.0 release is to rewrite Camellia from scratch to prepare comfortable codebase for new awesome features.

### Why is Camellia 1.x not supported anymore?

It has very bad architecture and code under the hood which makes it painful to support.

### Will my Camellia 1.x be automatically updated to 2.0?

Yes. There are no ways to evade auto-update. However, if you prefer a 1.x version, we will provide an option to install it separately via CRX-file.

## How to get Camellia 2.0

### Camellia Canary

Camellia Canary is special version of Camellia for beta testers. Each commit to master branch will update Canary build, so it's on the bleeding edge of new features and fixes. But it may be kinda unstable. Canary version always newer than regular version. It's distributed via private Chrome Web Store entry, so it supports automatic updates.

To become beta tester, you should be Camellia contributor. Send your Google Account's email address to petr@flaks.dev and after approve [Camellia Canary will be available for you in Chrome Web Store](https://chrome.google.com/webstore/detail/dadaaofggncbhcmekkijnadeffpcblib). At this moment Canary version only available in Chrome Web Store.

Canary version and regular one can't work simultaneously, you should disable or remove stable version first.

### Building Camellia locally

To run project locally:

1. Clone it.
2. Run `npm install`.
3. Run `npm start`.
4. Now you have `/dist` folder where extension locates. Check out instructions about installing local (unpacked) extensions to your browser: [Chrome](https://developer.chrome.com/extensions/getstarted), [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#Trying_it_out).

Each time Webpack rebuilds the app, newtab and options pages will be reloaded automatically. However if your `dist/manifest.json` file, any extension icon or translation file will be modified, you will have to reload the extension manually (via refresh button in your browser's extensions settings) to see these changes.

Before sending pull requests make sure your changes match project's code style requirements otherwise CI will fail. Run `npm run-script fix-cs` to fix most of code style issues automatically.

If you want to help with development, check out [issues with "help wanted" label](https://github.com/neluzhin/camellia/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22).
