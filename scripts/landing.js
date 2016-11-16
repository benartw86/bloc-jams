var pointsArray = document.getElementsByClassName('point');   //establish node list

var revealPoint = function(index) {  
                point.style.opacity = .5;
                point.style.transform = "scaleX(1) translateY(0)";
                point.style.msTransform = "scaleX(1) translateY(0)";
                point.style.WebkitTransform = "scaleX(1) translateY(0)";
        };
    

var animatePoints = function(points) {  
               
            forEach(points, revealPoint);  //points is paramater of animatePoints  which will use revealPoint as callback to animate since it    
        
        }
};


 

 window.onload = function() {
     
      if (window.innerHeight > 950) {
         animatePoints(pointsArray);
     }
     
     var sellingPoints = document.getElementsByClassName('selling-points')[0];
     var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

     window.addEventListener("scroll", function(event) { //listener, event, handler
         if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
             animatePoints(pointsArray);   
         }
     });
 }
 
 
 
 //the listener is activated by the event which also triggers the event