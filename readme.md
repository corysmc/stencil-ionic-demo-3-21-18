# Simple Stencil Ionic 4 and Firebase Auth Example

This was code made for a presentation 3/21/18 https://www.youtube.com/watch?v=z5aSCg-mWeg&index=3&list=PLK0YxsI--ERg5zEE0EtC0ROkBtdrOzub3&t=0s


***Note: This project is a beta and uses an early release of Ionic 4.***

## Features Included in this file

basics from https://github.com/ionic-team/ionic-pwa-toolkit

- Stencil for easily building and loading standardized Web Components
- Ionic Framework
- Routing
- Push Notifications setup
- Showing a toast when a new version of the PWA is available
- Unit Tests
- Pre-rendering
- zero config lazy loading
- zero config code splitting
- Polyfills selectively loaded depending on the browser support
- ES6 by default for new browsers, ES5 for older browsers
- Everything needed for an add to homescreen PWA (service worker, web manifest and iOS meta tags)
- lazy-img component for lazy loading below the fold images

Specific to this repo
- Ionic 4 Router and components
- Authentication using Firebase
- login page, dashboard page, and firestore basic and complex query demos.

## Getting Started

To start building a PWA with the Ionic PWA Toolkit, clone this repo to a new directory:

```bash
git clone https://github.com/corysmc/stencil-ionic-demo-3-21-18.git my-pwa
cd my-pwa
git remote rm origin
```

and run:

```bash
npm install
npm start
```

Be sure to update your firebase credentials, so that you can read/write to your own firebase database.

## More information on Stencil

Head over to this repo: https://github.com/ionic-team/ionic-pwa-toolkit


