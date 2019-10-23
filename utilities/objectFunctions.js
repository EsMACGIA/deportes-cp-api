'use strict'

// function that takes two objects and checks if both have exactly the same keys
function compareObjects(obj1, obj2){
    var equal = true;
    for (var i in obj1)
        if (!obj2.hasOwnProperty(i))
            equal = false;
    for (var k in obj2)
        if (!obj1.hasOwnProperty(k))
            equal = false;
    
    return equal;
}

// function that checks if the format for an object is that of a user, 
// if not return an array of the form [false, error], else [true, 'Valid user body']
function compareUserObject(obj1){
    
  // model of object for a user to compare
  var model_body = {
    email: '',
    name: '',
    lastname: '',
    password: '',
    ci: 0,
    type: 0
  }

  var error = "Valid user body"
  var answer = true;
  var rightKeys = compareObjects(obj1, model_body)

  if (!rightKeys) {

    answer = false
    error = "Wrong body keys"
    
  }
 
  return [answer, error]

}

// function that takes a user body and checks if is correct returning a 
// data object, if is not correct the data object will have the 'error' key
function checkUserBody(body){

    var rightBody = compareUserObject(body)
    var data = {}
    // error in the body
    if(!rightBody[0]){
      data = {
        error: rightBody[1],
        code: 400
      }
    }
    return data;
}

module.exports = {
    compareObjects,
    compareUserObject,
    checkUserBody
}