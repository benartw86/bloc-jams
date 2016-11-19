// Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/19.png',
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

// My example album

var albumBeatles = {
    title: 'Hits',
    artist: 'Beatles',
    label: 'BS',
    year: '1969',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
         { title: 'Piggies', duration: '2:01' },
         { title: 'Taxman', duration: '5:01' },
         { title: 'Across the Universe', duration: '3:21'},
         { title: 'She Loves Me', duration: '5:14' },
         { title: 'Yellow Submarine', duration: '4:15'},
         { title: 'Here Comes the Sun', duration: '3:15'}
     ]
 };

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 };

// #1 pull variables out of function to get them in global scope, able to access //albumImage for listenere now.
    
 var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {

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
 
 window.onload = function() {
     setCurrentAlbum(albumPicasso);
     var albums = [albumPicasso, albumMarconi, albumBeatles];
             var index = 0; //start at first album outside function so that this value remains changed after function runs, if it is inside the function it will be reset each time the function is run
 
     albumImage.addEventListener('click', function(event) {
            setCurrentAlbum(albums[index]);
            index++;  //cycle through albums
            if (index == albums.length) { 
                index = 0; //once all albums cycled revert to first
            }

        });
};



//setting an event listener on the album property of the setCurrentAlbum object