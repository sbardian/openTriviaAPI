OpenTrivia API
===============

[![Build Status](https://travis-ci.org/sbardian/openTriviaAPI.svg?branch=dev)](https://travis-ci.org/sbardian/openTriviaAPI) [![Coverage Status](https://coveralls.io/repos/github/sbardian/openTriviaAPI/badge.svg?branch=dev)](https://coveralls.io/github/sbardian/openTriviaAPI?branch=dev)

### File structure: 
```
    ./src
        index.js
        openTrivia.js
        responses.js
    ./test
        tbd...
```

### index.js
    Application entry point. 

### openTrivia.js
##### Core Functions: 
 Function | Description 
  --- | ---
_axios()  | Create axios instance
_fetchFromAPI() | Makes our calls to API 
options() | Sets our options for calls to API

##### Helper functions:
 Function | Description
 listCategories() | Lists Category options to console.
 listDificulty()  | Lists Difficulty options to console.
 listTypes()      | Lists Type options to console.
 listEncoding()   | Lists Encoding options to console.

### responses.js
```
    Exposes the API response values to our app.
```


### API query specifics: 
```
    options = {
        number: {Number}        // Number of questions, null=10,
        category: {Number}      // use category.js, null=any,
        difficulty: {String}    // (easy, medium, hard), null=any,
        type: {String}          // (multiple, boolean), null=any,
        encode: {string}        // (url3986, base64), null=default encoding
    }
```