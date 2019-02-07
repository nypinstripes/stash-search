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
  <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fnypinstripes%2Fstash-search&via=nypinstripes&text=Stashy%20Search%20-%20Ignite%20Your%20GIF%20Game%20&hashtags=giphy%20%23interview%20%23stash%20%23invest" rel="noopener noreferrer">
    <img src="https://cl.ly/ba452d5610b9/tweet-shields.svg" alt="Tweet Stashy" />
  </a>
  <img src="https://cl.ly/480d790a560b/prs-welcome.svg" alt="Open Stashy" />
  <a href="/docs/code-of-conduct.md" rel="noopener noreferrer">
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
&nbsp;(or compatible Node installing package manager, mac-ports?)

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

#### Step 2: Clone the "Stashy" (stash-search) repo & cd into the directory.

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
Individual build (dev/prod), test & server start commands can be found in the `scripts` hash in <a href="/package.json" rel="noopenner noreferrer">package.json</a>.

```bash
$ yarn launch
```

or

```bash
$ npm start
```

#### Step 5: Running Tests
There are a few ways to run the Stashy test suite. Presently, only tests for renderring routes & persistant layout elements.

* `yarn/npm test` to execute the test suite in single run mode & generate Jest snapshots.
* `yarn/npm test:update` to execute the test suite in single run mode & update Jest snapshots that have changed.
* `yarn/npm test:watch` to execute the test suite in constant watch mode & update Jest snapshots as they're changed.
* `yarn/npm test:coverage` to view code coverage (lcov) & render performance reports using the built-in react tool (formerly Istanbul).

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

#### Favorites Storage Strategy
In place of a database/api backend, I decided to use local storage to write favorite selections to and read them back from.

__When you select a gif to add as a favorite:__
  - A copy of the item's data is first written to LocalStorage.
  - It is also then added to the redux store.

__When you deselect a gif to remove it from your favorites:__
  - The LocalStorage favorites object is retrieved.
  - The item removed.
  - Then the modified favorites object is written back to LocalStorage.
  - Then LocalStorage is read from again which updates the favorites redux state and ensures the action's integrity.

##### Sync Favorites with Redux <> Local Storage

<p align="center">
  <img src="https://cl.ly/adad5a34f0bb/sync-redux-with-local-storage.png" alt="local storage favorites" />
</p>

_The actions can be found in <a href="/src/actions/actionRequests.js">Action Requests</a>._

#### Web Backend

##### NodeJS
The runtime environment (rte) is <a href="https://nodejs.org" rel="noopener noreferrer">NodeJS</a> and was written on v11.2.0, however it should be able to run without issue on any NodeJS version higher than 8.0.0.

_In Lieu of not requiring the ability to load env/shell/docker variables, the launch/start commands will pass the GIPHY_API key to the server on start as a CLI parameter._

##### Express
The webserver is <a href="https://expressjs.com/" rel="noopener noreferrer">ExpressJS</a> as it continues to be the more popular of the choices for running web backends on Node, Hapi would be a suitable alternative.

##### EJS
The server-side markup is renderred using the EJS templating engine, which has a high degree of reliability with build tools like <a href="http://webpackjs.org" rel="noopener noreferrer">Webpack</a> however does have some drawbacks (with webpack), like not permitting the use of partials. Many suitable alternatives exist (Jade, Haml, Handlebars, dotJS etc.) and may be worth trying out next time.

##### UAParser
As a simple alternative to polyfilling with a library like modernizr, there's also a JS library I used called UAParserJS, which detects & extracts loads of useful info about the client machine upon the first request. With this info we can look at things like the client's user-agent to determine if their browser is among the ones that are supported.

The list of supported browsers can be found in the server helper utils file under <a href="/server/utils/helper-utils.js" rel="noopener noreferrer">agents</a>.

In addition to helper functions, <a href="https://github.com/faisalman/ua-parser-js" rel="noopener noreferrer">UAParserJS</a> also offers fine-grain access to:

```
ua,
browser: { name, version },
engine: { name, version },
os: { name, version },
device: { model, type, vendor },
cpu: { architecture }
```

### Build & Transpiler Tools

- [Webpack 4](https://webpack.js.org)

- [Babel 7](https://babeljs.io)

### Frontend Application

##### React/Redux

###### Component Architecture

<p align="left">
  <img src="https://cl.ly/5ccc2df41a82/%255Bccafa5077bbf25b0b42fc41b4f1b2a5e%255D_Screen%252520Shot%2525202019-02-06%252520at%2525207.29.13%252520PM.png" alt="jsx structures" />
</p>

##### Sass (SCSS syntax)

###### The 7-1 Pattern

- [The 7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern)
- [Aesthetic Sass 1: Architecture and Style Organization](https://scotch.io/tutorials/aesthetic-sass-1-architecture-and-style-organization)

<p align="left">
  <img src="https://cl.ly/7ca7a594b119/stash-sass.jpg" alt="scss structures" />
</p>

_App Styles_

Folder           | Description
---------------- | -----------
`/base/..`       | Styles applicable globally, throughout the app, like browser resets/normalize files.
`/common/..`     | Styles for visual elements with specific classes, but do not have components attached to them (e.g., `.overlays`, `.animations`). Files should be separated by their purpose.
`/components/..` | Styles applicable to individual components (these files are appended near the end and are overridden only by vendor styles).
`/layout/..`     | Styles for standard elements that are *persistent* throughout the experience & on every page. Files should be separated by elements.
`/vendor/..`     | Styles for elements that are particular to 3rd party plugin libraries and secondary browser type & version support. These styles load last and have the highest precedence.

_Shared Sass Helpers_ `/shared/data` `/shared/scss`

Folder           | Description
---------------- | -----------
`_breakpoints`   | Definition of app wide media query breakpoint rules, logic & utility.
`_colors`        | All colors should be predefined named variables sourced from the [sip](https://sipapp.io/) or [swatches](https://swatchesapp.io) OSX apps, or similar interface (based on Chirag Mehta's famous "name that color" tool), or from formal design guides except those inherent to browsers [W3 Color Names](http://www.w3schools.com/colors/colors_names.asp), which will not appear in this list. Please keep them alpha sorted, use all lower-case dasherized variable names.
`_functions`     | Sass helper functions - Things like custom short hand utilities for fonts, colors, borders etc.
`_mixins`        | Sass mixins

###### Vendor Libraries

- [Bourbon Sass](https://www.bourbon.io/docs/latest/)

- [Breakpoint Sass](http://breakpoint-sass.com/)

###### Naming Colors Resources

- [Swatches](https://swatchesapp.io)

- [Sip](https://sipapp.io/)

- [Colblindor](https://www.color-blindness.com/color-name-hue/)

- [Name That Color](http://chir.ag/projects/name-that-color/#6195ED)

##### Testing with Jest

<p align="left">
  <img src="https://cl.ly/eb63c571c7fd/jest-stash-still.png" alt="jest structures" />
</p>

_Snapshots are generated using the jest testing library, at present there are only basic Route/Layout load & render tests in the suite._

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

... Descriptions to follow

##### &nbsp;&nbsp;&nbsp;404

<p align="left">
  <img width="22%" valign="top" src="https://cl.ly/27b426a75bed/thumb-404.png" alt="404" />
  <img width="77%" valign="top" src="https://cl.ly/ca104fe57357/thumb-404.png" alt="404" />
</p>

##### &nbsp;&nbsp;&nbsp;Favorites

<p align="left">
  <img width="22%" valign="top" src="https://cl.ly/0ae82d85afae/thumb-favorites.png" alt="favorites" />
  <img width="77%" valign="top" src="https://cl.ly/b41fb475e6a9/thumb-favorites.png" alt="favorites" />
</p>

###### &nbsp;&nbsp;&nbsp;Empty Favorites

<p align="left">
  <img width="22%" valign="top" src="https://cl.ly/a1ab4f4e964b/thumb-favorites-none.png" alt="favorites none" />
  <img width="77%" valign="top" src="https://cl.ly/748fcd7c237f/thumb-favorites-none.png" alt="favorites none" />
</p>

##### &nbsp;Item Detail Overlay

<p align="center">
  <img width="100%" valign="top" src="https://cl.ly/ac1a85f06716/thumb-item.png" alt="item" />
</p>

##### &nbsp;&nbsp;&nbsp;Landing

<p align="left">
  <img width="22%" valign="top" src="https://cl.ly/62e75caa8ced/thumb-landing.png" alt="landing" />
  <img width="77%" valign="top" src="https://cl.ly/fe1fb99fc37b/thumb-landing.png" alt="landing" />
</p>

##### &nbsp;&nbsp;&nbsp;Stashy Search Results

<p align="left">
  <img width="22%" valign="top" src="https://cl.ly/e029a26a6ef4/thumb-results.png" alt="results" />
  <img width="77%" valign="top" src="https://cl.ly/1df19e929951/thumb-results.png" alt="results" />
</p>

###### &nbsp;&nbsp;&nbsp;No Results

<p align="left">
  <img width="22%" valign="top" src="https://cl.ly/8e3e170ed8b6/thumb-results-none.png" alt="results none" />
  <img width="77%" valign="top" src="https://cl.ly/e66ba9e62d63/thumb-results-none.png" alt="results none" />
</p>

##### &nbsp;&nbsp;&nbsp;Unsupported Browser

<p align="left">
  <img width="22%" valign="top" src="https://cl.ly/7e965bf4e049/thumb-unsupported.png" alt="unsupported" />
  <img width="77%" valign="top" src="https://cl.ly/d9ac8dc842be/thumb-unsupported.png" alt="unsupported" />
</p>

##### Filler Docs Type Pages
###### (for wrangling text properties with new fonts)

- (Open) License

  - [Portrait - ~Mobile](https://cl.ly/f5a2d05588ef/legal.png) 400x800

  - [Landscape - ~Desktop](https://cl.ly/ef2de2d8ad81/%255B5bc296270152c1488c5e8b7e9d6fcee5%255D_legal.png) 1280x800

- (faux) Privacy

  - [Portrait - ~Mobile](https://cl.ly/7b3202ae9200/privacy.png) 400x800

  - [Landscape - ~Desktop](https://cl.ly/a2534033f1e8/%255Be7f0304c2ae69967ef21b71c0c16d787%255D_privacy.png) 1280x800

- (faux) Terms/Conditions

  - [Portrait - ~Mobile](https://cl.ly/0b5a413b3a80/terms.png) 400x800

  - [Landscape - ~Desktop](https://cl.ly/a67ea86757c8/terms.png) 1280x800

<h2></h2>

<a name="todos"></a>
## TODOs

- [ ] On List/Grid views, remove custom pagination & add Infinite (Fetch &) Scroll, with [React-Virtualized](https://bvaughn.github.io/react-virtualized/#/components/Collection).
- [ ] Complete adding `< Prev` & `Next >` navigation controls on Item detail (ImageItemOverlay) view.
- [ ] Handle item image (load & access) errors gracefully.
- [ ] Make navigating between items in Item detail (ImageItemOverlay) views "perma-linkable" & update url on navigating.
- [ ] Add tap, touch & swipe controls for mobile devices.
- [ ] Add more tests & increase coverage & reliability.
- [ ] Performance (loading, updating & painting) audit, with network optimized media sizes.
- [ ] More inline Documentation!!
- [ ] Perform more x-browser/device/OS UI/UX sanity/QA checking (currently only verified with Chrome).
- [ ] Fix occasional flickers & jumps on toggling states in ListItem Stills & MP4s.
- [ ] Fix occasional double render issues for lists on search.
- [ ] Mock item share controls on the ListItem component and on the Item detail (ImageItemOverlay) view.
- [ ] Make use of some of the deeper webpack optimization features like Tree-Shaking, CommonsChunking.
- [ ] Attempt lazy component loading with System.import();
- [ ] Use system memory / database to store favorites as opposed to LocalStorage.
