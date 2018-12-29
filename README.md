<h1 align="center">
  <img src="https://cl.ly/7f39c2308508/stashy-logo-mkd.png" alt="Stashy Logo" />
</h1>

<h2 align="center">
  <img src="https://cl.ly/d1154018a3ac/md-title.png" alt="Stashy Tagline" />
</h2>

<h6 align="center">
  (aka stash-search)
</h6>

<p align="center">
  <img width="250" src="https://cl.ly/8175f1d0ddf6/rocket-mkd.svg" alt="Stashy Launch" />
</p>

<p align="center">
  <img src="https://cl.ly/d77940dbd6c8/version-2.svg" alt="Stashy Version 2.0.0" />
  <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fnypinstripes%2Fstash-search&via=nypinstripes&text=Stashy%20Search%20-%20Ignite%20Your%20GIF%20Game%20&hashtags=giphy%20%23interview%20%23stash%20%23invest" rel="noopener noreferrer">
    <img src="https://cl.ly/ba452d5610b9/tweet-shields.svg" alt="Tweet Stashy" />
  </a>
  <img src="https://cl.ly/480d790a560b/prs-welcome.svg" alt="Open Stashy" />
  <a href="https://github.com/nypinstripes/stash-search/tree/master/docs/code-of-conduct.md" rel="noopener noreferrer">
    <img src="https://cl.ly/8654c8edbc1b/conduct.svg" alt="Code of Conduct" />
  </a>
</p>

<p align="center">
  <img src="https://cl.ly/561925f735af/sample-1-2.gif" alt="Mcconaughey" />
  <img src="https://cl.ly/86f924946e61/sample-2-2.gif" alt="Murray" />
  <img src="https://cl.ly/49aed9cdebbc/sample-3-2.gif" alt="Murphy Aykroyd" />
</p>

<h2></h2>

1. [Setting up Stashy](#setting-up-stashy)
1. [Specifications Checklist](#specifications-checklist)
1. [Application Architecture](#application-architecture)
1. [Pages & Previews](#pages-&-previews)
1. [TODOs](#todos)

<br />

<a name="setting-up-stashy"></a>
## Setting up Stashy

### Prerequisites

You will need the following things properly installed on your computer.
* [Homebrew](https://github.com/Homebrew/brew)
* [Node.js](http://nodejs.org/) (with Yarn or NPM)

#### Step 1: Check your node version & upgrade if needed.

```bash
$ node -v
v8.0.0 # if you see this or higher, you're good!
```

If not:

```bash
$ brew update
$ brew upgrade node
```

#### Step 2: Clone the Stashy (stash-search) repo & cd into the directory.

```bash
$ git clone git@github.com:nypinstripes/stash-search.git
$ cd stash-search
```

#### Step 3: Install App Dependencies with yarn or npm.
The app was initialized & built using [Yarn](https://yarnpkg.com/en/), however it has been tested & confirmed to work with npm.

```bash
$ yarn install
```

or

```bash
$ npm install
```

#### Step 4: Build & Start the App (in Production Mode)
Individual build (dev/prod), test & server start commands can be found in the `scripts` hash in `package.json`.

```bash
$ yarn launch
```

or

```bash
$ npm start
```

#### Step 5: Running Tests
There are a few ways to run the tests for Stashy. Presently there are only tests for renderring routes & persistant layout elements.

* `yarn/npm test` to execute the test suite in single run mode & generate Jest snapshots.
* `yarn/npm test:update` to execute the test suite in single run mode & update Jest snapshots that have changed.
* `yarn/npm test:watch` to execute the test suite in constant watch mode & update Jest snapshots as they're changed.
* `yarn/npm test:coverage` to view code coverage (lcov) & render performance reports using the built-in tool (formerly Istanbul).



<a name="specifications-checklist"></a>
## Specifications Checklist

- [x] The app serves a page consisting of a simple form with a text field and a button.
- [x] When the user enters text, use Javascript to request some GIFs from the Giphy API.
- [x] A user can click a GIF to add it to their "favorites".
- [x] A user can view another page which displays their favorite GIFs.
- [x] The GIPHY url used in the async operations, appears as `https://api.giphy.com/v1/gifs/search` with query params, api_key & q.
- [x] Use of the latest ES2017 (ES6) JS standard throughout the app.
- [x] Follow React, JSX, SASS, SVG, SSR & Accessibility Patterns, Best Practices & Platform Conventions.
- [x] Careful attention payed to UI/UX details, including responsive layout paradigms for use on multiple sized devices.
- [x] Install dependencies on `yarn/npm install`.
- [x] Build App & Start Server on `http://localhost:3000/` with `yarn launch` or `npm start`.
- [x] Do what we do best.



<a name="application-architecture"></a>
## Application Architecture




<a name="pages-&-previews"></a>
## Pages & Previews



<a name="todos"></a>
## TODOs

- [ ] On List/Grid views, remove custom pagination & add Infinite (Fetch and) Scroll using an old fav lib [React-Virtualized](https://bvaughn.github.io/react-virtualized/#/components/Collection).
- [ ] Complete adding `< Prev` & `Next >` navigation controls on Item detail (overlay) View.
- [ ] Make navigating between items in Item detail (overlay) Views "perma-linkable" & update url on navigating.
- [ ] Test & Add tap, touch & swipe controls for mobile browsers.
- [ ] Add more tests & increase coverage & reliability.
- [ ] Perform more x-browser/device/OS UI/UX sanity checking (currently only verified in Chrome/Chromium).
- [ ] Do a full performance (loading, updating & painting) audit, including choosing network optimized media sizes.
- [ ] Fix occasional flickers & jumps on toggling ListItem GIF Stills & MP4s.
- [ ] Fix occasional double render issues for lists on search.
- [ ] Mock item share controls on ListItem and in details overlay.
- [ ] Use ejs-loader, in webpack, in place of [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin), or switch from ejs to haml, handlebars or dtoJS etc. for cleaner server-side markup allowing for use of partials with webpack.
- [ ] Use some more advanced webpack features such as Tree-Shaking, CommonsChunking and make use of ES6 component lazy-loading with System.import();
