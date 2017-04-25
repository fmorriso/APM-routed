# APM-Routed

Deborak Kurata's Angular Routing APM-Final example used in her Pluralsight course converted to use Angular-CLI 1.0.0 and Angular 4.0.3

## References

[Angular-CLI WiKi](https://github.com/angular/angular-cli/wiki)

[Deborak Kurata's Angular Routing Problem Solver](http://blogs.msmvps.com/deborahk/angular-routing-problem-solver/)

[Deborah Kurata's original APM-Start](https://github.com/DeborahK/Angular-Routing)

## Other tools used

* [Angular-CLI 1.0.1](https://github.com/angular/angular-cli/wiki)
* [JetBrains WebStorm 2017.1.2](https://www.jetbrains.com/webstorm/)
* [npm-check-updates 2.11.0](https://www.npmjs.com/package/npm-check-updates)
* [TypeScript 2.2.2](https://www.npmjs.com/package/typescript)

## zone.js cautionary tale
As of April 24, 2017, zone.js 0.8.8 and Angular 4.0.3 __do not play nice togeher__, so you need to keep zone.js at 0.8.7 or earlier.

If you upgraded to zone.js 0.8.8 and want to avoid errors appearing in your browser's Developer Tools console window, downgrade to zone.js 0.8.7 or earlier by performing the following:
```angular2html
cd yourProjectDirectory
npm install -S zone.js@0.8.7
```

## ng build cautionary tale

I have learned the hard way to use the following for building the project:

```
ng build --verbose --progress --vendor-chunk --extract-css --prod
```

If you leave off `--prod`, your build may not spot all of the errors in your project.  

And yes, I will be the first to agree that putting `--prod` on `ng build` seems like overkill, but trust me, you want to find out from `ng build --prod` what is wrong with your project, not from `ng serve --prod`.

You will be amazed how many errors that `ng build --prod` uncovers that `ng build` remains blissfully unware of.
 
In fact, I routinely replace the default generated `scripts` in package.json with these:
```angular2html
    "build": "ng build --verbose --progress --vendor-chunk --extract-css",
    "build-prod": "ng build --verbose --progress --vendor-chunk --extract-css --prod",
    "start": "ng serve --open --verbose --vendor-chunk --extract-css",
    "start-prod": "ng serve --open --verbose --vendor-chunk --extract-css --prod",
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
