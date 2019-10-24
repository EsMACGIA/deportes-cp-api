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

// function that checks if the format for an object is that of the kind of the 
//argument type_obj(can be "user", "discipline_update" or "discipline"), 
// if not return an array of the form [false, error], else [true, 'Valid body']
function compareTypeObject(obj1, type_obj){
    
  // creating the respective model
  var model_body = {}
  if( type_obj == "user"){
    model_body = {
        email: '',
        name: '',
        lastname: '',
        password: '',
        ci: 0,
        type: 0
      }
  }else if(type_obj =="discipline"){
    model_body = {
        name: ''
    }
  }else if(type_obj == "discipline_update"){
    model_body = {
        id: 0,
        name: ''
    }
   
  }
  
  var error = "Valid body"
  var answer = true;
  var rightKeys = compareObjects(obj1, model_body)

  if (!rightKeys) {

    answer = false
    error = "Wrong body keys"
    
  }
 
  return [answer, error]

}

// function that takes a  body and a type (a string 
// that represents the kind of object to compare to, 
// can be "user" or "discipline"
//) and checks if is correct returning a 
// data object, if is not correct the data object will have the 'error' key
function checkBody(body, type){

    var rightBody = compareTypeObject(body, type)
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
    compareTypeObject,
    checkBody
}