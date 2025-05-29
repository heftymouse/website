---
layout: '@/layouts/ContentLayout.astro'
title: Tech I use
---

# Tech I Use

## Computers

### ROG Zephyrus G14 2023

The only computer I use daily. Slight hardware and QA issues aside, it's been a great experience, and in my opinion one of the best all-round gaming laptops you could buy at the time.  
I really like the idea of gaming laptops - even though it may not be the best at anything, it means you can take your entire digital life wherever you go. I rarely ever plan in advance to do things (and when I do, it seldom actually happens), so I appreciate being able to plop down my laptop and do whatever, wherever I am.

### Lenovo Yoga 730-15IKB

My previous laptop and current home server, from back when you could reliably expect a Lenovo Yoga to actually do Yoga. The tiny 15W CPU used to feel like a bottleneck (especially in games that should easily be able to run on a 1050), but it's now a very efficient yet powerful server. The 4K touchscreen was beautiful when it worked, but always had hardware issues (even after a replacement device), and ended up being the reason I had to get a new device.

## Phones

### Pixel 6a

This is a boring phone, in the best way possible. It doesn't have amazing specs or crazy features, but it has an incredibly clean, if sometimes buggy, Android experience, updates as soon as they come out for as long as it's supported, and once Google drops support for it, it's the easiest phone to install a custom ROM on.
The occasional Pixel goodies like Magic Eraser (without Google One) and Circle to search are also super useful. It's also a phone you can actually hold unlike many of today's behemoths.
Last but absolutely not least, the camera is genuinely as good as everyone says it is - no wonder it won MKBHD's blind smartphone camera test.

### Lumia 650

I'm not sure why I have this. I barely use it. It's an awesome device though. It looks sleek, has a great display, and the camera holds up incredibly well for its age. The Windows Phone home screen is a gift I believe humanity as a whole lost. RIP Windows Phone. Unfortunately, it's mostly useless in `currentYear`. It doesn't support VoLTE making it unusable even as a 'dumbphone'.

## Audio

### Tanchjim ONE DSP

I lost my previous Moondrop Chu 2 when it fell out of my bag's side pocket while I was outside, likely into an open gutter. I replaced it with the Tanchjim ONE DSP, a sub-₹2000 bullet-style IEM (regular earphones with extra steps?). It sounds great and is incredibly tiny and lightweight - you can slip it into your pocket and completely forget it's there. It also comes with an inline mic, though it's nigh-unusable since there's loud static if the cable is coiled in the wrong way. The experience is less premium than the Chu, but it's not bad by any means.

## Media

### Apple Music

Apple Music is quite reasonably priced, especially in a family plan. Lossless audio is great to have. By far the best part of Apple Music is how library-oriented it is - despite being a streaming service with infinite algorithmic content, it encourages you to curate your own library, and gives you all the powerful library management tools from iTunes. It's easy to add external songs, edit metadata, and even create crazy rule-based smart playlists. The editorial content is also great, and every platform gets beautiful native apps. Account management is buggy or impossible on non-Apple devices though. 

## Software

I have a list of App Defaults (yes, that one) over [here](/app-defaults). The apps below are ones that wouldn't fit in that list, or ones I have something to say about.

### [Vaultwarden](https://github.com/dani-garcia/vaultwarden)

A self-hosted Bitwarden server implementation that lets you use Premium features like TOTP.

### [Stirling PDF](https://github.com/Stirling-Tools/Stirling-PDF)

An amazing self-hosted PDF manipulation web app that can replace any number of sketchy websites.

### [DevToys](https://devtoys.app)

A local, private app with a ton of useful developer utilities.

### [Nightingale](https://nightingale.rest/)

A nice native REST client for Windows. It's supremely ironic that [the HTTP client most people use](https://www.postman.com/) is effectively a web browser. Though I am impressed because they were able to turn `curl` into a SaaS platform.

### Zoho Mail

Great enterprise mail solution that's free for up to 5 users. It's what powers hello@heftymouse.me. I also have a ton of respect for Zoho as one of the rare product-based companies to make it big outside India.

### Tailscale

Tailscale is networking made magical. Every time I SSH into my server from my phone on a bus or whatever, I sympathize with the poor souls who have to deal with a corporate VPN, or worse, expose sensitive ports to the internet.

Honourable mention to everything by [sharkdp](https://github.com/sharkdp) - I don't use *all* of these but they're all amazing command-line programs.

## Developer

My developer choices are pretty boring so I'll just mention names here. You probably know all of these already.
- Visual Studio for C# and C++, IntelliJ for JVM, VSCode for everything else
- Whatever the OS' native stack is for native apps
- Astro, SvelteKit, Next.js (begrudgingly), Tailwind for frontend web
- Cloudflare Pages/Workers, Vercel
- Postgres, SQLite
- ASP.NET Core and Actix for backend

I don't use an ORM, I like writing SQL by hand and knowing that my queries perform adequately, as well as being able to use unique database features without having to 'drop down' from the abstraction. Object mappers, though, are something I'm a huge fan of, since parsing an SQL result is just difficult busy work.

I'm also very interested in graph databases. It feels like a way more natural way to model most problems than a normalized SQL database.