// Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
            //To revert the play button back to the song's number, we need to store the number before the user gets a chance to mouse over the row. Use HTML5 data attributes. HTML data attributes allow us to store information in an attribute on an HTML element.
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 };

var setCurrentAlbum = function(album) {
     // #1
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
     // #2
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     // #3
     albumSongList.innerHTML = '';
 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };

var findParentByClassName = function(element, targetClass) { 
    if (element) {
    var currentParent = element.parentElement;       //grab the parentElement of element
    while(currentParent.className != targetClass && currentParent.className !== null) {  // while the className isn't the target we are looking for and the className isn't                                                                                             returning null, move up the DOM getting the parentElement of each subsequent element.
        currentParent = currentParent.parentElement;   
    }
  return currentParent;    // if the element remaining when exiting the while loop is null, you traversed the document and found nothing. If it is something other than null, you found the element with the target className.
 }
};

var getSongItem = function (element) {   //establish function with switch 
    switch(element.className){ 
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
             return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
        }
 //get back the variable with the correct .song-item-number class
};

    //should take an element and, based on that element's class name(s), use a switch statement that returns the element with the .song-item-number class.v 

 var clickHandler = function(targetElement) {
     var songItem = getSongItem(targetElement);
     if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }

 };

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;

 window.onload = function() {
     setCurrentAlbum(albumPicasso);
     
songListContainer.addEventListener('mouseover', function(event) {
    // console.log(event.target);
             // Only target individual song rows during event delegation
    if (event.target.parentElement.className === 'album-view-song-item') {
             // Change the content from the number to the play button's HTML
        event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
    var songItem = getSongItem(event.target);
        
        if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {  //if you mouseover the row that is not the currently playing song, it will display play button
            songItem.innerHTML = playButtonTemplate;
        }
    }
});             

// We use the querySelector() method because we only need to return a single element with the .song-item-number class.

//The target property on the event object stores the DOM element                      where the event occurred.

 for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             // Revert the content back to the number
              // Selects first child element, which is the song-item-number element and makes it equal to the original value that is stored with datasongnumber
        var songItem = getSongItem(event.target);                                
        var songItemNumber = songItem.getAttribute('data-song-number');
 
             // #2
             if (songItemNumber !== currentlyPlayingSong) {    //check to see if parent of song number is the row it is in, if so, when you mouseleave, revert back to song #
                 songItem.innerHTML = songItemNumber; //  added the conditional that checks that the item the mouse is leaving is not the current song, and we only change the content if it isn't.
                   }
         });
             
        songRows[i].addEventListener('click', function(event) {
          clickHandler(event.target); 
         });
     }

 }
                                   