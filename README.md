
<h1 align="center">
	<img width="360" src="https://cdn.rawgit.com/jodot/assets/v1.1/JodotLogoMedium.png" alt="chalk">
</h1>

> Jodot is your personal/team duty runner. Delegate software related duties to Jodot!

[![Build Status](https://travis-ci.org/jodot/jodot.svg?branch=master)](https://travis-ci.org/jodot/jodot)

Jodot
=====

[![Join the chat at https://gitter.im/jodot/jodot](https://badges.gitter.im/jodot/jodot.svg)](https://gitter.im/jodot/jodot?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Jodot is a long-running process that executes duties that are delegated to it.
The current version of Jodot supports scheduled duties. It should support event
based duties as well as one-off duties.

Jodot is suitable for all kinds of duties/tasks/workflows that you may wish to
automate. Jodot duties are essentially npm packages or Node.js modules. The idea
is to tap onto the massive npm repository of functions and modules to easily
assemble automation scripts (duties).

Run Jodot within your environment of choice. Since Jodot is open source and you
maintain complete control of how it is ran, duties delegated to it can be much
more personal/confidential than automation on hosted solutions.

Some ideas for duties:

* Turn e-mails where subject is prefixed with TODO into GitHub issues
* Send a Twitter DM whenever a website loads slower than a preset time
* Approve all leaves submitted by default as long as there are still days left
  for the year
* Gather additional info for a credit application from various sources before
  e-mailing complete set of information
* Send a message on next bus arrival for two nearest bus stops whenever I leave
  the house

Essentially, npm and Node.js is your limit! Duties can be for individuals or
entire organisations.

Well, at this point. You may think, I could do this with Node.js, npm and cron
or some other services? Well, you could, but in any case, Jodot provides you
with an easy framework to structure your automation duties. It:

 * Automatically installs any duty packages for you
 * Provides a single file (duties.hjson) that organizes all duties
 * Handles running the duties as child processes
 * Serves as the meeting point for all kinds of duty triggers (WIP)
 * Easily share useful duties with others and use shared duties (hopefully)

Installation
============
```
npm install -g jodot
```

How to use
==========

Create a duties.hjson file that list all the duties that you want Jodot to be
responsible for. See the sample duties.hjson for an example. Run Jodot where
duties.hjson reside.

Duties are essentially npm packages that comply to the way a Jodot duty should
be written. There isn't much to writing a duty really. See Writing a Jodot duty.

Writing a Jodot duty
====================

It is very easy to write Jodot duties. If you know how to code in Node.js, then
you will know how to write a Jodot duty. There's only thing that all Jodot duty
must have:

>It must implement the callback that the (child) process should call whenever
a message is received. The duty is performed within this callback function.
See [jodot-alive] for an example.

If you want to share your duty, there's two more things that you'll need to do.
See next section.

Sharing reusable duties
=======================

The more Jodot duties are shared by its users, the more useful it will become.
Help grow Jodot's usefulness by sharing duties that you had composed. You can
share a Jodot duty by specifying "jodot" as a dependency within its package.json.

Publicly available duties
=========================

Here's a list of [publicly available duties] that you can configure for your
own automation needs.

Temporarily caveats
===================

1. Jodot does not currently support one-off duties. This means that, duties that
 you compose should never exit intentionally.

[jodot-alive]: <https://github.com/jodot/jodot-alive>
[publicly available duties]:https://www.npmjs.com/browse/depended/jodot
