---
title: Making Astro asset images work in RSS
description: And taking the picturesque route to solve this
date: 2026-02-08
---

NB: Everything below was done over a year ago at the time of publishing. There's probably better ways to do this now (like the experimental [Astro container](https://docs.astro.build/en/reference/container-reference/) API).

---

The Markdown content (as in the blog posts and site updates) on my website is organized in `src/content` like this:

```
src/content
├── blog
│   ├── post-without-images.md
│   └── post-with-images
│       ├── img
│       │   ├── something.webp
│       │   └── otherthing.webp
│       └── index.md
└── updates
    ├── 1.md
    └── 2.md
```

Posts with images are given their own folder, with an `index.md` file for the content, and an `img/` subfolder for media. This lets me keep images local to the post they're being used in, and I can just use a relative link like `![nice caption](img/something)` to insert an image while writing (which VSCode can autocomplete, and even show a tooltip with the image if you hover after inserting).

When the site is built, Astro processes these to give them a unique filename (with a hash of the content), puts them all in a flat directory, and makes the image links in each rendered Markdown page point to this new name. It works great when Astro is fully in control of the rendering, but-

## The problem with RSS

Astro takes a hands-off approach to content in RSS feeds. Their [official documentation](https://docs.astro.build/en/guides/rss/#including-full-post-content) on including content just says to use a standard markdown renderer if you'd like to include post content when using Content Collections.

> When using content collections, render the post `body` using a standard Markdown parser like [`markdown-it`](https://github.com/markdown-it/markdown-it) and sanitize the result, including any extra tags (e.g. `<img>`) needed to render your content.

That's unfortunate. Using a standard markdown parser means the RSS feed will contain the image sources copied verbatim, where Astro would replace it with the actual asset URL. It's not all bad though, since I also want to be able to use Remark plugins that only apply to RSS.

## What is Astro doing to my images?

When you put an image in 'src/', Astro will bundle the image - it will put it in a flat directory where all of your other client-side assets will live, including CSS and bundled JS files. It will also optimize the image for size if enabled (but will include the source image too).

Astro uses Vite to build, which in turn uses Rollup as a bundler. Rollup takes a file name template (in Astro's case, `/_astro/[name].[hash][extname]`) where it substitutes each item in `[]`. Since Astro needs to include the file in the client bundle for the web side of the blog post, we can be guaranteed that the file is present. So, if we figure out how the new file name (in particular the hash) is being generated, we can manually substitute it in the rendered content when generating the RSS feed.

## How Rollup generates hashes

Rollup uses xxhash3-128 on the content of a file to generate its hash. xxhash is a set of very fast non-cryptographic hash functions, perfect for use cases like this where one just needs to determine the 'identity' of some content. It then truncates this to 8 characters by default.

## The actual fix

I made a Rehype plugin that finds every `<img>` node in the HTML tree, reads the content of the image, generates the hash (and consequently the new file name), and replaces it in the element.
```js
function fixImages(collection: string, slug: string) {
	return async (tree: Root) => {
		const imgs: HastElement[] = [];

		visit(tree, 'element', (node) => {
			if (node.tagName === 'img' && node.properties?.src) {
				imgs.push(node);
			}
		});

		await Promise.all(
			imgs.map(async (e) => {
				const filePath = `./src/content/${collection}/${slug}/${e.properties.src}`;
				const parsedPath = path.parse(filePath);

				const data = (await fs.readFile(filePath)) as unknown as Uint8Array;
				let hash = xxh3.xxh128(data).toString(16).match(/.{2}/g)!.reverse().join(''); // weird way to turn it into little endian

				e.properties.src = `/_astro/${parsedPath.name}.${hash.slice(0, 8)}${parsedPath.ext}`;
			})
		);
	};
}
```

This uses `@node-rs/xxhash` to generate hashes from each read file. Also worth noting is that it uses the Vite option `build.rollupOptions.hashCharacters` set to `hex`, though you could use base64 or base36 as well if you decoded it appropriately.

## This didn't work (at the time)

If you were me, a long time ago, trying out the snippet above, it wouldn't have worked. The hash just never seemed to match. This almost always means different data was being hashed, but this didn't seem to be the case this time. There had to be some transformation in the middle that changed the data.

I spent many days trying to figure out what was going on. Hours of going through the source code of Astro, Vite, Rollup and possibly more, code from my package install directory (adding logging in various places that seemed appropriate), issue threads, and anything else that even kind of mentioned this problem. This got me nowhere.

Here's some code from [(this file)](https://github.com/rollup/rollup/blob/0f4676d9316a6eb4ec6715097d4d47455e9937ef/rust/xxhash/src/lib.rs) in the Rollup GitHub repository. It's straightforward, just a thin wrapper to generate xxhash3 hashes for whatever bytes are passed in. Put yourself in my shoes at the time, and see if you can figure out the issue.

```rust
use base_encode::to_string;
use xxhash_rust::xxh3::xxh3_128;

const CHARACTERS_BASE64: &[u8; 64] =
  b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

const CHARACTERS_BASE36: &[u8; 36] = b"abcdefghijklmnopqrstuvwxyz0123456789";

const CHARACTERS_BASE16: &[u8; 16] = b"abcdef0123456789";

pub fn xxhash_base64_url(input: &[u8]) -> String {
  to_string(&xxh3_128(input).to_le_bytes(), 64, CHARACTERS_BASE64).unwrap()
}

pub fn xxhash_base36(input: &[u8]) -> String {
  to_string(&xxh3_128(input).to_le_bytes(), 36, CHARACTERS_BASE36).unwrap()
}

pub fn xxhash_base16(input: &[u8]) -> String {
  to_string(&xxh3_128(input).to_le_bytes(), 16, CHARACTERS_BASE16).unwrap()
}
```

The problem is this line:

```rust
const CHARACTERS_BASE16: &[u8; 16] = b"abcdef0123456789"
```

It took an embarassingly long time to realize that this should have been `0123456789abcdef`. Base16 encoding is the last place you'd think to look for problems.

I opened an [issue](https://github.com/rollup/rollup/issues/5710) about this. It was fixed in the next release and I was able to use the Remark plugin from above.

Let me know if you find this useful for your own website (or anything I could improve) with any of the contact info on the [homepage](/home).