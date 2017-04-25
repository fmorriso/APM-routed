# APM-Routed

Deborah Kurata's Angular Routing APM-Final example used in her Pluralsight course converted to use Angular-CLI 1.0.1 and Angular 4.0.3.

I thought I knew a lot about Angular-CLI already, but learned quite a lot more by taking John Papa's Angular-CLI course on Pluralsight.

I also made a few other tweaks to the code, such as splitting off CSS into thier own component-specific .css files.

I also changed `package.json` to `ng build` and `ng serve` using my preferred parameters.

I regularly use npm-check-updates in the form of `ncu -a` to keep package.json up-to-date.

## References

[Angular-CLI WiKi](https://github.com/angular/angular-cli/wiki)

[Deborah Kurata's Angular Routing Problem Solver](http://blogs.msmvps.com/deborahk/angular-routing-problem-solver/)

[Deborah Kurata's original APM-Start and APM-Final](https://github.com/DeborahK/Angular-Routing)

## Other tools used

* [Angular-CLI 1.0.1](https://github.com/angular/angular-cli/wiki)
* [JetBrains WebStorm 2017.1.2](https://www.jetbrains.com/webstorm/) - has lots of built-in, out-of-box support for both Angular 4 and Angular-CLI that have to be added on to other IDE's such as Visual Studio Code.  WebStorm has a nice, built-in npm runner window and good GitHub.com source code control interaction.  If WebStorm has any short-comings, it's the lack of --dry-run support when using it's File / New / Angular-CLI capability, but that can be overcome using the built-in Terminal window.
* [npm-check-updates 2.11.0](https://www.npmjs.com/package/npm-check-updates) - no more manually updating package.json when something changes in one of the dependencies.  Saves a lot of time by just running `ncu -a` followed by `npm install`.
* [TypeScript 2.2.2](https://www.npmjs.com/package/typescript)

## zone.js cautionary tale
As of April 24, 2017, zone.js 0.8.8 and Angular 4.0.3 __do not play nice togeher__, so you need to upgrade zone.js to 0.8.9 as shown below:

```angular2html
cd yourProjectDirectory
npm install -S zone.js@0.8.9
```


## ng build cautionary tale

I have learned the hard way to use the following for building the project _before_ `ng serve`ing it:

```
ng build --verbose --progress --vendor-chunk --extract-css --prod
```

If you leave off `--prod`, your build may not spot all of the errors in your project.  

And yes, I will be the first to agree that putting `--prod` on `ng build` during development seems like overkill, but trust me, you want to find out from `ng build --prod` what is wrong with your project, not from `ng serve --prod`.

You will be amazed how many errors that `ng build --prod` uncovers that `ng build` remains blissfully unware of.
 
In fact, I routinely replace the default Angular-CLI generated `scripts` in package.json with these:
```json
    "build": "ng build --verbose --progress --vendor-chunk --extract-css",
    "build-prod": "ng build --verbose --progress --vendor-chunk --extract-css --prod",
    "start": "ng serve --open --verbose --vendor-chunk --extract-css",
    "start-prod": "ng serve --open --verbose --vendor-chunk --extract-css --prod",
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
