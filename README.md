# APM-Routed

Deborah Kurata's Angular Routing APM-Final example used in her Pluralsight course converted to use Angular-CLI 1.2.0 and Angular 4.2.5.

I thought I knew a lot about Angular-CLI already, but learned quite a lot more by taking John Papa's Angular-CLI course on Pluralsight.

I also made a few other tweaks to the code, such as splitting off CSS into thier own component-specific .css files.

I also changed `package.json` to `ng build` and `ng serve` using my preferred parameters.

I regularly use npm-check-updates in the form of `ncu -a` to keep package.json up-to-date.

## References

[Angular-CLI WiKi](https://github.com/angular/angular-cli/wiki)

[Deborah Kurata's Angular Routing Problem Solver](http://blogs.msmvps.com/deborahk/angular-routing-problem-solver/)

[Deborah Kurata's original APM-Start and APM-Final](https://github.com/DeborahK/Angular-Routing)

## Tools used

* [Angular-CLI 1.2.0](https://github.com/angular/angular-cli/wiki)
* [Angular 4.2.5](http://angular.io)
* [JetBrains WebStorm 2017.2 EAP](https://www.jetbrains.com/webstorm/) - has lots of built-in, out-of-box support for both Angular 4 and Angular-CLI that have to be added on to other IDE's such as Visual Studio Code.  WebStorm has a nice, built-in npm runner window and good GitHub.com source code control interaction.  If WebStorm has any short-comings, it's the lack of --dry-run support when using it's File / New / Angular-CLI capability, but that can be overcome using the built-in Terminal window.
* [npm-check-updates 2.12.0](https://www.npmjs.com/package/npm-check-updates) - no more manually updating package.json when something changes in one of the dependencies.  Saves a lot of time by just running `ncu -a` followed by `npm install`.
* [TypeScript 2.4.0](https://www.npmjs.com/package/typescript)
* npm 5.0.4
* webpack 3.0.0
* [ng-bootstrap 1.7.1](https://ng-bootstrap.github.io/)
* [Bootstrap 3.3.7](http://getbootstrap.com/)

## Tips on using Bootstrap with Angular-CLI
 
 [Use Bootstrap with Angular-CLI](https://github.com/angular/angular-cli/wiki/stories-include-bootstrap)

## zone.js cautionary tale
As of April 24, 2017, zone.js 0.8.8 and Angular 4.x __do not play nice togeher__, so you need to upgrade zone.js to 0.8.9 (or higher) as shown below:
```
cd yourProjectDirectory
npm install -S zone.js@0.8.9
```

UPDATE: As of May 18, 2017, zone.js 0.8.10 seemed to have cleared up the above issue.

## ng build cautionary tale

I have learned the hard way to use the following for building the project _before_ `ng serve`ing it:

```
ng build --verbose --progress --vendor-chunk --extract-css --prod
```


If you leave off `--prod`, your build may not spot all of the errors in your project.  

And yes, I will be the first to agree that putting `--prod` on `ng build` during development seems like overkill, but trust me, you want to find out from `ng build --prod` what is wrong with your project, not from `ng serve --prod`.

You will be amazed how many errors that `ng build --prod` uncovers that `ng build` remains blissfully unaware of.
 
In fact, I routinely replace the default Angular-CLI generated `scripts` in package.json with these:
```
    "build": "ng build --verbose --progress --vendor-chunk --extract-css",
    "build-prod": "ng build --verbose --progress --vendor-chunk --extract-css --prod",
    "start": "ng serve --open --verbose --vendor-chunk --extract-css",
    "start-prod": "ng serve --open --verbose --vendor-chunk --extract-css --prod",
```

## Example of using Angular-CLI in APM

In module 6 of her Pluralsight course, Deborah patiently (one of the reasons I love her courses) explains how to create the _ProductResolver_ service.
The Angular-CLI way to scaffold tha service is shown below in multiple steps.  

The first one uses Angular-CLI's _dry run_ feature, something I learned from John Papa's excellent Pluralsight course on Angular-CLI, which I took just before taking Deborah's course.

`ng g s ProductResolver -d`

or, if you want the long version of the above:

`ng generate service ProductResolver --dryRun`

The result of the above is the following output:

```
installing service
You specified the dry-run flag, so no changes will be written.
  create src\app\product-resolver.service.spec.ts
  create src\app\product-resolver.service.ts
  WARNING Service is generated but not provided, it must be provided to be used
```

Notice the _WARNING_ about not updating any module(s) to make them aware of the proposed new service.
Also notice that the proposed new service will not be created in the correct directory.
Since Deborah's course narrative informs us that the proposed new `ProductResolver` service eventually needs to be imported into the `Product` module,
we add that to our dry run as shown below:

`ng g s products/ProductResolver -m products/product.module -d`


Notice how it tells us that, as part of generating the `ProductResolver` service, it will automatically update the correct module, `product.module.ts` that Deborah wants updated:
```
installing service
You specified the dry-run flag, so no changes will be written.
  create src\app\products\product-resolver.service.spec.ts
  create src\app\products\product-resolver.service.ts
  update src\app\products\product.module.ts
```


Finally, we run the command for real by removing the dry run option:

`ng g s products/ProductResolver -m products/product.module`

The results are shown below:

```
installing service
  create src\app\products\product-resolver.service.spec.ts
  create src\app\products\product-resolver.service.ts
  update src\app\products\product.module.ts
```

Now we can just change `product-resolver.service.ts` as instructed in Deborah's course video.

I try as much as possible to scaffold the code for what I refer to as "APM-Routed" the "Angular-CLI way" as much as possible.
I'm not saying you should avoid "hand wiring" things the way Deborah demonstrates in her course video.
What I am saying is that once you understand the "manual way", you can begin to appreciate the time-saving plus consistency that using `ng generate` provides.

I strongly encourage you to take John Papa's Pluralsight course about Angular-CLI. 
I thought I understood how to use Angular-CLI very well.
Boy, was I wrong.
John showed me things that saved me a lot of pain, especially `--dryRun`, which is the best take-away I received as a result of taking his course.


## Changes
<ol>
<li>

**preserveQueryParams deprecated in favor of queryParamsHandling**

In Angular 2.x, HTML anchor tags that need to specify that query parameters should be preserved used this syntax: 

`[preserveQueryParams]="true"` 

That syntax has been deprecated in Angular 4.x.  It has been replaced by:
 
 `queryParamsHandling="preserve"`
 
 __Please note how the replacement does not use []__

</li>
<li>

**Testing for numeric product id**

Here's how I check the incoming id in the Route Resolver resolve method:

 ```
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {

    const id: number = Number(route.paramMap.get('id')); 
    if (isNaN(id)) {
      console.log(`Product id was not a number: ${id}`);
      this.router.navigate(['/products']);
      return Observable.of(null);
    }
```
</li>
<li>

**Displaying Messages in sidebar**

I modified Deborah's original code as follows:
<ul>
<li>

To avoid `ExpresssionChangedAFterItHasBeenCheckedError` being displayed in the browser console,
I adapted what I learned from an [article](https://medium.com/@maximus.koretskyi/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4)
by changing direct calls to `messageService.isDisplayed` with the use of a Promise:
```
private updateDisplayStatus(status: boolean): void {
    Promise.resolve(null).then(() => this.messageService.isDisplayed = status);
}
``` 
which in turn caused me to replace calls such as this one:
```typescript
this.messageService.isDisplayed = true;
```
with this one:
```typescript
this.updateDisplayStatus(true);
```

It seems that HTML markup like the following does not like all the dynamic changes to `isDisplayed`
```html
<li  *ngIf="!isDisplayed()">
    <a [href]="" class="navbar-link" (click)="displayMessages()">Show Messages</a>
</li>
<li  *ngIf="isDisplayed()">
    <a [href]="" class="navbar-link" (click)="hideMessages()">Hide Messages</a>
</li>
```
</li>
<li>

Removed the inline CSS from `message.component.ts`.
Each message is displayed in its own Bootstrap `class="row"`.
</li>

<li>

Modified `message.component.ts` to provide a TypeScript property *getter* for accessing the messages.
</li>

<li>

Modified the `message.component.html` to get the messages from its own component rather than getting them directly from the message service.
I prefer to have the HTML be blissfully unaware of the services layer and talk __only__ to its own component.
</li>
<li>

Modified the `message.component.html` to use an `<ng-template>` with the newer `[ngForOf]` syntax to loop through the messages.
That template uses the previously discussed *getter* to access the messages.
I also replaced the `*ngIf` in a `<div>` with another `<ng-template>`.
Replacing those two what I will refer to as *pseudo-DIV's* that were merely *vessels* for `*ngFor` and `*ngIf` with `<ng-template>'s` helps make the *loop* and the *if* stand out better among all the other *genuine* `<div>` elements.
</li>


</ul>

</li>
<li>

Modified `app.component.html` to use an `ngSwitch` statement instead of two separate `ngIf` statements when
determining which navigation to display for Hide/Show messages as well as Log In vs. Log out.
This allows the expressions that control the "truthyness" to be used only once:
```html
<li [ngSwitch]="isDisplayed()">
    <a *ngSwitchCase="true" class="navbar-link" (click)="hideMessages()">Hide Messages</a>
    <a *ngSwitchDefault class="navbar-link" (click)="displayMessages()">Show Messages</a>
</li>

<li [ngSwitch]="isLoggedIn()">
    <a *ngSwitchCase="true" (click)="logOut()">Log Out</a>
    <a *ngSwitchDefault [routerLink]="['/login']">Log In</a>
</li>
```
</li>
</ol>
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


```
