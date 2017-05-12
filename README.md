OpenTrivia API
===============

[![Build Status](https://travis-ci.org/sbardian/openTriviaAPI.svg?branch=master)](https://travis-ci.org/sbardian/openTriviaAPI)

### File structure: 
```
    ./src
        index.js
        openTrivia.js
        responses.js
    ./test
        tbd...
```

#### index.js
    Application entry point. 

#### openTrivia.js
##### Core Functions: 


 Function | Description 
  --- | ---
_axios()  | Create axios instance
_fetchFromAPI() | Makes our calls to API 
options() | Sets our options for calls to API



```
fn: _axios()                    // Create axios instance
fn: _fetchFromAPI()             // Makes our calls to API
fn: options()                   // Sets our options for calls to API
    options = {
        number: {Number}        // Number of questions, null=10,
        category: {Number}      // use category.js, null=any,
        difficulty: {String}    // (easy, medium, hard), null=any,
        type: {String}          // (multiple, boolean), null=any,
        encode: {string}        // (url3986, base64), null=default encoding
    }
```

##### Helper functions:
```
fn: listCategories()            // lists Category options to console.
fn: listDifficulty()            // lists Difficulty options to console.
fn: listTypes()                 // lists Type options to console.
fn: listEncoding()              // lists Encoding options to console.

```

#### responses.js
```
    Exposes the API response values to our app.
```

