# Preparing the app
Let's continue with setting up our app.

## Add @eo-sdk/core

To be able to interact with enaio, we need to add `@eo-sdk/core` package to our application.

- Run `npm i --save @eo-sdk/core` to add `@eo-sdk/core` package to our app
- Import `EoCoreModule` in our apps root module

```ts
...
import {EoCoreModule} from '@eo-sdk/core';

@NgModule({
    imports: [
        ...
        EoCoreModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

As we do not provide a custom configuration to EoCoreModule, we'll go with the default settings. 
This means that you have to:

- add enaios main configuration file `main.json` to `src/assets/_default/config`
- add translation files `de.json` and `en.json` file to `src/assets/_default/i18n` (although we will not use 
them, but it will avoid ugly error messages in the console).

## Add 3rd-Party library
We are going to create an app that you can drop a local file to. Therefore we'll use `ngx-file-drop`:
- Run `npm i --save ngx-file-drop`
- Import `FileDropModule` in our apps root module

## Add some constants
Because we are going to use some constant values, let's add a file `app.constants.ts` that will provide them.
We'll also use some constants for our styling, so we add `styles.vars.scss` to our `src` folder.
