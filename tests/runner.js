const WebApi = require("../dist/webapi.umd") 

WebApi.mixin({
  hello: function() {
    return this.request()
      .withPath("http://stage.aptana.co.id:8056/ext/version")
      .build()
      .execute("GET")
  }
})

const exampleApi = new WebApi()

exampleApi.hello().then(console.log).catch(err => { console.log(err)
  console.log('err')
})