# Kace Webapi

## Installing 

Using npm:
```bash
$ npm install kace-webapi
``` 

Using yarn:
```bash
$ yarn add kace-webapi
```

## Example

In order to create your own Web Api SDK, you can make use of this library.
```javascript
// Import the webapi base class
const WebApi = require("kace-webapi") 

// Extends the Webapi methods using mixin with your own methods.
WebApi.mixin({
  hello: function() {
    return this.request()
      .withPath("http://google.com")
      .build()
      .execute("GET")
  }
})

// Create your webapi
const webApi = new WebApi()

webApi.hello()
    .then(console.log)
    .catch(console.error)
``` 