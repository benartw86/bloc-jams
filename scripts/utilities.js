 function forEach(array, callback) {   //create function to iterate over array
    for (var i = 0; i<array.length; i++) {     // this function will replace
           callback(array[i]);
    }
}     // invoke the callback to run code on the different elements that will be               iterated over in the array  





var pointsArray = document.getElementsByClassName('point');

var myFunc = function(text, callback) {
    alert(text);
    console.log(callback)
}

var forEach = function(pointsArray) {
    
    for (var i = 0; i < pointsArray.length; i++) {
        
    }
    
}



myFunc("This is a point", forEach);