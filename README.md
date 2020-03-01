# Camellia

It's Camellia 2.0's source code. It's under active development now. It's not recommended to use early development builds for anything but development and testing.

To run project locally:

1. Clone it.
2. Run `npm install`.
3. Run `npm start`.
4. Now you have `/dist` folder where extension locates. Check out instructions about installing local (unpacked) extensions to your browser: [Chrome](https://developer.chrome.com/extensions/getstarted), [Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension#Trying_it_out).

Before sending pull requests make sure your changes match project's code style requirements otherwise CI will fail. Run `npm run-script fix-cs` to fix most of code style issues automatically.

If you want to help with development, check out [issues with "help wanted" label](https://github.com/neluzhin/camellia/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22).
