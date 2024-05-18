// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  useEmulators: false, // do not use emulators in production build
  firebase: {
    apiKey: "AIzaSyCvIyotDj4Z49qUnlGKZEdH4ZLkTFg8XHQ",
    authDomain: "enigma-ef35a.firebaseapp.com",
    databaseURL: "https://enigma-ef35a-default-rtdb.firebaseio.com",
    projectId: "enigma-ef35a",
    storageBucket: "enigma-ef35a.appspot.com",
    messagingSenderId: "906797692956",
    appId: "1:906797692956:web:110b1ad7e62fd0065f07d9",
    measurementId: "G-W0NLQPYJRM"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
