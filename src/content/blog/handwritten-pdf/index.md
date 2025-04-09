---
title: Writing PDF files by hand
description: Ethically sourced small data is in your hands.
date: 2025-03-15
---

## The PDF spec

PDF is more formally known as [ISO 32000](https://www.iso.org/standard/75839.html). Being an ISO standard, you have to pay 221 CHF(!) for even a digital copy. I thought the darkest secrets of the PDF format were hidden behind a paywall forever. However, this is apparently not the case, since you can just download a copy [here](https://www.iso.org/standard/75839.html).

I'd only ever heard bad things about the PDF format before - how they're unreasonably hard to edit in-place, the cursed extensions to the standard, JavaScript of all things. I assumed PDF was an opaque format to anyone but people working on PDF libraries themselves. From a cursory read through the standard, it has a neat and uncomplicated core that's not impossible to work with yourself.

## What a PDF file even is

*insert nice diagram from standard*

PDF is an object-oriented system for building documents. There's a handful of basic data types and the document is defined by a tree of objects starting from a root 'document catalog'. Objects can also have 'streams' that contain arbitrary bytes - this is how things like images and font files are embedded in the file. Other than streams, a PDF consists of readable text.

A special type of stream is Content Streams. These contain drawing commands in a postfix-notation language that resembles PostScript (what an apt name). This is what defines all of the content in the document.

## The smallest PDF file that opens

