var points = document.getElementsByClassName('point');   //establish node list

var animatePoints = function(points) {  
                 
                points.style.opacity = .5;
                points.style.transform = "scaleX(1) translateY(0)";
                points.style.msTransform = "scaleX(1) translateY(0)";
                points.style.WebkitTransform = "scaleX(1) translateY(0)";
        }
        
        points.forEach(animatePoints); //use forEach block, callback animate points
};

 
    
/*    for (var i = 0; i < points.length; i++) {
        
                points[i].style.opacity = .5;
                points[i].style.transform = "scaleX(1) translateY(0)";
                points[i].style.msTransform = "scaleX(1) translateY(0)";
                points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
           
        }
        
    
};  */
 

 window.onload = function() {
     
      if (window.innerHeight > 950) {
         animatePoints(points);
     }
     
     var sellingPoints = document.getElementsByClassName('selling-points')[0];
     var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

     window.addEventListener("scroll", function(event) { //listener, event, handler
         if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
             animatePoints(points);   
         }
     });
 }
 
 
 
 //the listener is activated by the event which also triggers the event