var points = document.getElementsByClassName('point');

var animatePoints = function(points) {
    
    
    for (var i = 0; i < points.length; i++) {
        
                points[i].style.opacity = .5;
                points[i].style.transform = "scaleX(1) translateY(0)";
                points[i].style.msTransform = "scaleX(1) translateY(0)";
                points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
           
        }
        
    
};


 window.onload = function() {
     var sellingPoints = document.getElementsByClassName('selling-points')[0];
     var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
     
     
     window.addEventListener("scroll", function(event) { //listener, event, handler
         if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
             animatePoints(points);   
         }
     });
 }
 
 
 
 //the listener is activated by the event which also triggers the event