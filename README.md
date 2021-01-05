# eKart

[![Travis](https://img.shields.io/travis/rust-lang/rust.svg)]()

eKart is an online grocery store. Anonymous users can look through, filter, and add items to a shopping cart. Authentication (currently via Google OAuth api) is necessary to "check-out," as well as see previous orders. Only Admin can create,edit,delete and upload photos of items. He can access all orders. All site, user, and product info is stored in a Firebase database which serves as the backend.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

The following must be installed in your computer
* Node.js
* Angular CLI 10 or above

### To run the project

Before running this application on your machine, create a Firebase project ([Firebase Console](https://console.firebase.google.com/) > + add project) . You need to replace the Firebase settings in /src/environments with the settings of your own Firebase project. Then follow the steps below:
```
$ npm install
$ ng serve
```
This starts a development server. Navigate to `http://localhost:4200/` to see the app running.

## Technologies

* TypeScript 4.0.2
* Angular 10
* Bootstrap 4
* Firebase Realtime Database 
