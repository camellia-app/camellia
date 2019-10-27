# Camellia

It's 1.x branch which will not be supported anymore. Only bugs will be fixed until version 2.0 release.

## About Camellia 2.0

### Design

This is how Camllia probably will look after update. This is just design prototype and something may change.

![Design prototype](https://user-images.githubusercontent.com/12474739/67635361-3279a200-f8d7-11e9-9113-bac1c3c0a83d.png)

### When will it be released?

In Q2-Q3 of 2020.

### What's new planned?

Initial release will cover the same features as those in the latest 1.x version but with a brand new design and a performance boost. At this moment this is what's planned for initial release:

* New design.
* Absolutely new code base. At this moment Camellia works on Vue.js without any optimizations under the hood. It's planned to rewrite everything using Svelte and Webpack to provide fastest possible user experience. Extension's size will be reduced from 800 KB to 100-300 KB. 
* Bootstrap project to make it possible to port it to other browsers.
* Write comprehensive user manual.
* Create Camellia's landing page.
* Write continuous integration scripts and tests.

After Camellia 2.0 will be released, we will start working on brand new features (they're randomly ordered, not by priority):

* Video wallpapers.
* Slideshow wallpapers.
* Google Drive (and other popular cloud storage solutions) integration.
* Ability to manage bookmarks via Camellia interface without using browser's Bookmarks Manager.
* Official Mozilla Firefox port (if it supports custom newtab pages, I'm not sure).
* Web version of Camellia for browsers which do not support customizing new tab page. Camellia will be touch and mobile friendly by design, so I hope it will be possible to launch it for smartphones too.
* Web accessibility support for blind and disabled people. 
* More flexible settings.
* Customization features: bookmark shapes, colors, fonts.
* Light and dark modes.
* Assistant. It's like notifications hub where the extension will tell you some recommendations, hints, release notes and other stuff.

But that's not the end of the list. There are a few more mad ideas in my head, but I'm not ready to say anything about them yet.

### Why is Camellia 1.x not supported anymore?

It has very bad architecture and code under the hood which makes it painful to support.

### Will my Camellia 1.x be automatically updated to 2.0?

Yes. There are no ways to evade auto-update. However, if you prefer a 1.x version, we will provide an option to install it separately via CRX-file.

### How can I help in development?

#### Code

I'm not looking for additional help while I will write 2.0 version, but you're welcome to contribute after initial release.

#### Logo

Camellia needs new logo. It should be an image in SVG (vector) format. If you have any ideas and you know how to draw vector logos, you're welcome.

#### Translations

At initial release Camellia will support only English and Russian languages. If you know any other language and you're ready to provide us support any time I will release new features (which will require new translations), you're welcome. 
