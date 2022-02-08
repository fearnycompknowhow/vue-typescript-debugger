# vue-typescript-debugger

## Project setup
If the codebase appears broken, try installing the packages using `npm ci` instead of `npm i`.

Almost all of the issues developers encounter when using this codebase stem from (sub)package versions that differ from the ones used in this project.
`npm ci` will ensure that only the exact package versions that are listed in the `package-lock.json` file are installed.

## Open Chrome in Debug Mode
There are two seperate launch configs based on which version of the Vue CLI you are using (this codebase uses Vue CLI v5).

While on the Debug screen, you can change which launch configuration you want to use with the dropdown that is adjacent to the `Start Debugging` button.

## Compile and hot-reload for development
```
npm run serve
```
```
npm run start
```

## Compile and minify for production
```
npm run build
```