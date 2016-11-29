 var buildCollectionItemTemplate = function() {
   var template = 
     '<div class="collection-album-container column fourth">'
   + '  <img src="assets/images/album_covers/01.png"/>'
   + '  <div class="collection-album-info caption">'
   + '    <p>'
   + '      <a class="album-name" href="/album.html"> The Colors </a>'
   + '      <br/>'
   + '      <a href="/album.html"> Pablo Picasso </a>'
   + '      <br/>'
   + '      X songs'
   + '      <br/>'
   + '    </p>'
   + '  </div>'
   + '</div>'
   ;
     
     return $(template);  //Although we don't use any jQuery methods, we may later. To support that, we wrap template in a jQuery object to future-proof it.
 };

  $(window).load(function() {
    
      var $collectionContainer = $('.album-covers');
      $collectionContainer.empty();
 
     // #3
     for (var i = 0; i < 12; i++) {
         var $newThumbnail = buildCollectionItemTemplate();
         $collectionContainer.append($newThumbnail);
     }
  });