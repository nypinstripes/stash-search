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
  <img src="https://cl.ly/561925f735af/sample-1-2.gif" alt="Mcconaughey" valign="top" />
  <img src="https://cl.ly/86f924946e61/sample-2-2.gif" alt="Murray" valign="top" />
  <img src="https://cl.ly/49aed9cdebbc/sample-3-2.gif" alt="Murphy Aykroyd" valign="top" />
</p>

<h2></h2>

1. [Setting up Stashy](#setting-up-stashy)
1. [Specifications Checklist](#specifications-checklist)
1. [Application Architecture](#application-architecture)
1. [Pages & Previews](#pages-&-previews)
1. [TODOs](#todos)


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

<h2></h2>

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
- [x] Have Fun doing what we do best.

<h2></h2>

<a name="application-architecture"></a>
## Application Architecture

... More to follow

##### Sync Favorites with Redux <> Local Storage

<p align="center">
  <img src="https://cl.ly/adad5a34f0bb/sync-redux-with-local-storage.png" alt="local storage favorites" />
</p>

<h2></h2>

<a name="pages-&-previews"></a>
## Pages & Previews

### Previews

#### Search

<p align="center">
  <img valign="top" src="/server/assets/images/search-preview.gif" alt="404" />
</p>

#### Favorite

<p align="center">
  <img valign="top" src="/server/assets/images/favorite-preview.gif" alt="404" />
</p>

### Pages

##### &nbsp;&nbsp;&nbsp;404

<p align="left">
  <a href="https://cl.ly/2e75f79aff49/404.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="178" valign="top" src="https://cl.ly/27b426a75bed/thumb-404.png" alt="404" />
  </a>
  <a href="https://cl.ly/cce6410c91ed/404.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="66%" valign="top" src="https://cl.ly/ca104fe57357/thumb-404.png" alt="404" />
  </a>
</p>

##### &nbsp;&nbsp;&nbsp;Favorites

<p align="left">
  <a href="https://cl.ly/650e03eeddf6/favorites.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="178" valign="top" src="https://cl.ly/0ae82d85afae/thumb-favorites.png" alt="favorites" />
  </a>
  <a href="https://cl.ly/1b0f3aa02a40/%255B4c07d7c1664d1ef7391c587eb38ae613%255D_favorites.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="66%" valign="top" src="https://cl.ly/b41fb475e6a9/thumb-favorites.png" alt="favorites" />
  </a>
</p>

###### &nbsp;&nbsp;&nbsp;Favorites Empty

<p align="left">
  <a href="https://cl.ly/329ce9236c96/favorites-none.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="178" valign="top" src="https://cl.ly/a1ab4f4e964b/thumb-favorites-none.png" alt="favorites none" />
  </a>
  <a href="https://cl.ly/d63addd5437b/favoritres-none.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="66%" valign="top" src="https://cl.ly/748fcd7c237f/thumb-favorites-none.png" alt="favorites none" />
  </a>
</p>

##### &nbsp;Item

<p align="center">
  <a href="https://cl.ly/b08e717186a9/item.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img valign="top" src="https://cl.ly/ac1a85f06716/thumb-item.png" alt="item" />
  </a>
</p>

##### &nbsp;&nbsp;&nbsp;Landing

<p align="left">
  <a href="https://cl.ly/8c5dee674697/landing.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="178" valign="top" src="https://cl.ly/62e75caa8ced/thumb-landing.png" alt="landing" />
  </a>
  <a href="https://cl.ly/9ef60bc15ae0/landing.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="66%" valign="top" src="https://cl.ly/fe1fb99fc37b/thumb-landing.png" alt="landing" />
  </a>
</p>


##### &nbsp;&nbsp;&nbsp;Results

<p align="left">
  <a href="https://cl.ly/e27c3fb3555e/results.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="178" valign="top" src="https://cl.ly/e029a26a6ef4/thumb-results.png" alt="results" />
  </a>
  <a href="https://cl.ly/43442f0a89a5/results.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="66%" valign="top" src="https://cl.ly/1df19e929951/thumb-results.png" alt="results" />
  </a>
</p>

###### &nbsp;&nbsp;&nbsp;No Results

<p align="left">
  <a href="https://cl.ly/50da52914757/results-none.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="178" valign="top" src="https://cl.ly/8e3e170ed8b6/thumb-results-none.png" alt="results none" />
  </a>
  <a href="https://cl.ly/fb578bcc3d61/results-none.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="66%" valign="top" src="https://cl.ly/e66ba9e62d63/thumb-results-none.png" alt="results none" />
  </a>
</p>

##### &nbsp;&nbsp;&nbsp;Unsupported

<p align="left">
  <a href="https://cl.ly/e744aaec6eb5/unsupported.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="178" valign="top" src="https://cl.ly/7e965bf4e049/thumb-unsupported.png" alt="unsupported" />
  </a>
  <a href="https://cl.ly/2564ab479a6c/unsupported.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="66%" valign="top" src="https://cl.ly/d9ac8dc842be/thumb-unsupported.png" alt="unsupported" />
  </a>
</p>

##### &nbsp;&nbsp;&nbsp;Legal

<p align="left">
  <a href="https://cl.ly/f5a2d05588ef/legal.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="178" valign="top" src="https://cl.ly/81af12ce6f40/thumb-legal.png" alt="legal" />
  </a>
  <a href="https://cl.ly/ef2de2d8ad81/%255B5bc296270152c1488c5e8b7e9d6fcee5%255D_legal.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="66%" valign="top" src="https://cl.ly/1c56e644d982/thumb-legal.png" alt="legal" />
  </a>
</p>

##### &nbsp;&nbsp;&nbsp;Privacy

<p align="left">
  <a href="https://cl.ly/7b3202ae9200/privacy.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="178" valign="top" src="https://cl.ly/91c966059c00/thumb-privacy.png" alt="privacy" />
  </a>
  <a href="https://cl.ly/a2534033f1e8/%255Be7f0304c2ae69967ef21b71c0c16d787%255D_privacy.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="66%" valign="top" src="https://cl.ly/ed96af0024d3/thumb-privacy.png" alt="privacy" />
  </a>
</p>

##### &nbsp;&nbsp;&nbsp;Terms

<p align="left">
  <a href="https://cl.ly/0b5a413b3a80/terms.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="178" valign="top" src="https://cl.ly/0f9bebd973fa/thumb-terms.png" alt="terms" />
  </a>
  <a href="https://cl.ly/a67ea86757c8/terms.png" rel="noopener noreferrer" role="Link" target="_blank">
    <img width="66%" valign="top" src="https://cl.ly/74d7491d8aaa/thumb-terms.png" alt="terms" />
  </a>
</p>

<h2></h2>

<a name="todos"></a>
## TODOs

- [ ] On List/Grid views, remove custom pagination & add Infinite (Fetch &) Scroll, using [React-Virtualized](https://bvaughn.github.io/react-virtualized/#/components/Collection).
- [ ] Complete adding `< Prev` & `Next >` navigation controls on Item detail (ImageItemOverlay) view.
- [ ] Handle item image load & access errors gracefully.
- [ ] Make navigating between items in Item detail (ImageItemOverlay) views "perma-linkable" & update url on navigating.
- [ ] Add tap, touch & swipe controls for mobile devices.
- [ ] Add more tests & increase coverage & reliability.
- [ ] Add Documentation!!
- [ ] Perform more x-browser/device/OS UI/UX QA sanity checking (currently only verified in Chrome/Chromium).
- [ ] Do a full performance (loading, updating & painting) audit, including choosing network optimized media sizes.
- [ ] Fix occasional flickers & jumps on toggling ListItem GIF Stills & MP4s.
- [ ] Fix occasional double render issues for lists on search.
- [ ] Mock item share controls on the ListItem component and on the Item detail (ImageItemOverlay) view.
- [ ] Use one of the [ejs-loader](https://github.com/okonet/ejs-loader) variants, in webpack, in place of [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin), or switch from ejs to Jade, haml, handlebars or dotJS etc. for clearer server-side markup that permits using partials, yet still minifies markup when built with webpack.
- [ ] Make use of some of the deeper webpack optimization features like Tree-Shaking, CommonsChunking and make use of lazy component loading with System.import();
