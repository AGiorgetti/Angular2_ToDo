import {Component, View, bootstrap} from "angular2/angular2";

@Component( {
	selector: "my-app"
})
@View({
	template: "<h1>First Application</h1>"
})
class AppComponent {
	
}

bootstrap(AppComponent);