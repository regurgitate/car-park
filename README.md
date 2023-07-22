# car-park

A little, but yet fully operational car-park project.
This project was created for a local community.

Until recently, the situation was such that requests for borrowing a parking space in our neighborhood were posted on a Facebook group. Such posts would often get lost among the multitude of other unrelated messages. The same thing happened with posts where someone offered to lend their parking space.

With the help of this platform, all requests and offers come together in one place. The process of finding a parking space has been simplified, which makes life easier for residents of the neighborhood.

All back-end (database, authentication) works in Firebase environment.

You can find and play along with working test version here: https://car-park-dev.web.app/
Database linked with the test version is isolated from the production, thus feel free with signing up, adding new posts, deleting, loging out and in and whatever else you want to test.

In this repo Firebase config files have been removed. If you want to recreate working project, you must set up your own Firebase config (default location is src/firebase/init.js).


## Template for project recreation

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
