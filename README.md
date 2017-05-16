OpenTrivia API
===============

[![Build Status](https://travis-ci.org/sbardian/openTriviaAPI.svg?branch=dev)](https://travis-ci.org/sbardian/openTriviaAPI) [![Coverage Status](https://coveralls.io/repos/github/sbardian/openTriviaAPI/badge.svg?branch=dev)](https://coveralls.io/github/sbardian/openTriviaAPI?branch=dev)

#### Special thanks to [wKovacs64](https://github.com/wKovacs64 "wKovacs64"), he saved me hours of google time!

### File structure: 
```
    ./src
        index.js
        openTriviaAPI.js
        responses.js
    ./test
        test.js
```

### index.js
    Application entry point. 

### openTrivia.js
##### Core Functions: 
 Function | Description 
 --- | ---
 _axios()  | Create axios instance. (Not for General use)
 _fetchFromAPI() | Makes our calls to API. (Not for General use)
 getQuestions() | Get questions from API.

##### Helper functions:
 Function | Description
 --- | ---
 getToken()       | Get a token from API.
 resetToken()     | Reset token.
 *listCategories() | Lists Category options to console.
 *listDificulty()  | Lists Difficulty options to console.
 *listTypes()      | Lists Type options to console.
 *listEncoding()   | Lists Encoding options to console.
     * - Not yet implemented. . .

### responses.js
```
    Exposes the API response values to our app.
```


### API query specifics: 
```
    options = {
        amount: {Number}        // Amount of questions, null=10,
        category: {Number}      // use category.js, null=any,
        difficulty: {String}    // (easy, medium, hard), null=any,
        type: {String}          // (multiple, boolean), null=any,
        encode: {string}        // (url3986, base64), null=default encoding
    }
```