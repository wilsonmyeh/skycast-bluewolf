# Skycast Bluewolf

Simple weather app that allows users to retrieve current and historic data about any location that the users search.

Coding sample for Developer I position

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.9.

## Features

* Search locations and addresses with autocomplete
* Retrieve location's relevant weather data
* Charts of historic weather data
* Search locations saved across sessions

## Technologies

* Google Places JavaScript API
* Dark Sky API
* Node
	* npm
* Angular
	* Jasmine (JavaScript Unit Testing Framework)
	* Karma (JavaScript Test Runner)
	* Protractor (JavaScript E2E Testing Framework)
	* Webpack (JavaScript Resource Precompiler)
	* ng-bootstrap (Twitter Bootstrap for Angular)
* Chart.js
* Express

## Frontend Setup (/public/)

### Installation

1. Install Node.js® and npm if they are not already on your machine.
2. Clone the repository to your desired location on your host server
3. Change directory into the newly cloned repository's public folder
4. Run 'npm install' to install all package dependencies

### Configuration

1. Edit public/.angular-cli.json
2. Uncomment the "serve" field under "defaults", replacing PORT_HERE and "IP_HERE" with your server's port and host
3. Edit public/src/environments/environment.ts
4. Uncomment the GOOGLE_MAPS_API_KEY field and replace "API_KEY_HERE" with your google maps api key
5. Uncomment the REST_HOST field and replace "REST_HOST_HERE" with your api endpoint, e.g. http://localhost:3000

## Development server

Run `npm start` for a dev server. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Backend Setup