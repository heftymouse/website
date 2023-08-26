---
title: Tiling desktops are the future
description: No more fighting it — I'm now convinced.
date: 2023-08-27
---

The 'desktop metaphor' in GUI computing is as old as GUIs themselves. It was part of the Xerox Alto, the original Macintosh, and the majority of desktop OSes since then. We've always had overlapping windows in arbitrary positions on a desktop with icons. However, in a world where computers are ubiquitous and real-life metaphors like a literal desktop are unnecessary, I've realized that this is no longer what I want.

I used to vehemently defend the status quo of stacking desktops like the ones found in Windows, macOS, and most mainstream \*nix desktops. My reasons were that it was pointless to give up the flexibility of being able to move windows wherever you want, that manually tiling/snapping was always an option when you needed it, and that tiling desktops required you to memorize too many keyboard shortcuts and are difficult to learn.

After some introspection, I realized I was using a tiling desktop all along — I just never noticed. The vast majority of my work (and play) happens in a maximized window. This is almost essential for laptop use, where space is at a premium, and the extra screen real estate is always welcome on a large monitor. When multitasking, I tile two or three windows side-by-side.

I rarely use floating windows for extended periods, only when using 'ad-hoc' programs like the file browser, terminal, and occasionally chat apps that are secondary to your actual task. I believe most peoples' workflow also looks like this — floating windows are rarely used compared to the maximized browser window or Word document, yet they are the norm.

I decided to give [Hyprland](https://hyprland.org/) on [Linux](/blog/arch-linux-from-windows-no-usb) a try, and I was surprised by how easy it was to pick up and how productive I was with it. Windows automatically tiling feels so natural and intuitive — I didn't know what I was missing on Windows until I tried it. You can set up keybinds to open 'ad-hoc' programs as floating by default, and you can, of course, float windows at any time should you need to. All my screen real estate always feels judiciously used. I don't want to go back to the regular Windows desktop now.

Tiling has some flaws though. By design, it contorts windows into a shape controlled by the window manager. This can lead to 'primary' apps like browsers getting squished to uncomfortably small sizes, and tiny utility apps being expanded far beyond their content. There needs to be a protocol for apps to communicate how they want to be displayed in a tiling setup. You can set up custom window rules to do some of that yourself, but it's cumbersome and will never reach mass adoption.

Additionally, having more windows open than your monitor can accomodate requires windows to span multiple workspaces. This can be problematic when you're using multiple large windows simultaneously, since switching workspaces results in a major context switch each time, increasing cognitive load. I'm no UX designer, so I'll leave coming up with a solution to the professionals. Maybe the answer is to use brain-computer interfaces to put the windows you're currently thinking of on screen :p

I've tried stuff like [Komorebi](https://github.com/LGUG2Z/komorebi) on Windows, but it feels a little jank since it can't integrate with Windows' own window management features and windows occasionally misbehave with the forced size setting. For the moment, I will begrudgingly return to my good old slightly anachronistic Windows desktop. At least there's some solace in that it has the second-best tiling support out of all the major desktops.
