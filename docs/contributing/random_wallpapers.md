# Random wallpapers

By default, when you install Camellia you have random background configured. Each day Camellia will load new background randomly picked from our curated pool of images. We store all images inside [public collection on free photo stock called Unsplash](https://unsplash.com/collections/10745553/camellia).

To add new images to curated collection, email us Unsplash links to petr@flaks.dev. Dark (means not bright), neutral and simple backgrounds are preferred, but you may try send us anything you think will be cool to see someday as background image.

If you have images that aren't uploaded to Unsplash, we can't accept them. We accept only images from Unsplash because this photo stock distributes them under [its own free license](https://unsplash.com/license). When you upload images there, you confirm that you are photo owner, and you allow distributing this photo under Unsplash's license.

If you want to remove some images from curated collection for some reason, you may also email us, but don't forget to describe why we should remove it.

## How it works inside Camellia

Camellia uses service called [Unsplash Source](https://source.unsplash.com). It's official Unsplash's service provides special link we may use inside `<img src="...">`. Camellia determines user's screen resolution and asks Unsplash to provide images with given size once a day from our curated collection.

Curated collection's ID stored inside environment variable, see [`.env`](../../.env) file.
