// setSong function takes one argument, songNumber, and assigns currentlyPlayingSongNumber and currentSongFromAlbum a new value based on the new song number.  
//getSongNumberCell takes one argument, number, and returns the song number element that corresponds to that song number. 

var setSong = function(songNumber) {
    if (currentSoundFile) { //If we click to play a different song before a the current song is finished, we need to stop the current song before we set a new one.
         currentSoundFile.stop();
    }
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1]; 
        //1 At #1, we assign a new Buzz sound object. We've passed the audio file via the audioUrl property on the currentSongFromAlbum object.
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
         // #2  we've passed in a settings object that has two properties defined, formats and preload. formats is an array of strings with acceptable audio formats. We've only included the 'mp3' string because all of our songs are mp3s. Setting the preload property to true tells Buzz that we want the mp3s loaded as soon as the page loads.
         formats: [ 'mp3' ],
         preload: true
     });
     
     setVolume(currentVolume);
};

var seek = function(time) {
     if (currentSoundFile) {
         currentSoundFile.setTime(time);
     }
 }

var setVolume = function(volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
       }
};


var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="'+number+'"]');
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

    var $row = $(template);
    
    var clickHandler = function() {
	       var songNumber = parseInt($(this).attr('data-song-number'));
        

	       if (currentlyPlayingSongNumber !== null) {
		  // Revert to song number for currently playing song because user started playing new song.  
                var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
                currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
		        currentlyPlayingCell.html(currentlyPlayingSongNumber);      
	      }
	       if (currentlyPlayingSongNumber !== songNumber) {
		      // Switch from Play -> Pause button to indicate new song is playing.  In the second conditional statement, when the user clicks a song that is not the currently playing song, we need to play the currentSoundFile after calling setSong().
               setSong(songNumber);
               currentSoundFile.play(); 
               updateSeekBarWhileSongPlays();
               currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
               
               var $volumeFill = $('.volume .fill');
               var $volumeThumb = $('.volume .thumb');
               $volumeFill.width(currentVolume + '%');
               $volumeThumb.css({left: currentVolume + '%'});
               
               $(this).html(pauseButtonTemplate);
               updatePlayerBarSong();
               
	       } else if (currentlyPlayingSongNumber === songNumber) {
		      // Switch from Pause -> Play button to pause currently playing song.
		        if(currentSoundFile.isPaused()) {
                   $(this).html(pauseButtonTemplate);
                   $('.main-controls .play-pause').html(playerBarPauseButton);
                   currentSoundFile.play();
                   updateSeekBarWhileSongPlays();
                } else {
                   $(this).html(playButtonTemplate); 
                   $('.main-controls .play-pause').html(playerBarPlayButton);  
                   currentSoundFile.pause();
                }
	       }
      };
     
var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
         
    if (songNumber !== currentlyPlayingSongNumber) {
        songNumberCell.html(playButtonTemplate);
    }
};
         
var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
    }
        
 };
         $row.find('.song-item-number').click(clickHandler);
         $row.hover(onHover, offHover);
         console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
         return $row;
        
};

var setCurrentAlbum = function(album) {
     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
    
     $albumTitle.text(album.title); // We call jQuery's text() method to replace the content of the text nodes, instead of setting firstChild.nodeValue.
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     // #3
     $albumSongList.empty();
 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
};

 var updateSeekBarWhileSongPlays = function() {
     if (currentSoundFile) {
         // #10
         currentSoundFile.bind('timeupdate', function(event) {
             // #11
             var seekBarFillRatio = this.getTime() / this.getDuration();
             var $seekBar = $('.seek-control .seek-bar');
 
             updateSeekPercentage($seekBar, seekBarFillRatio);
         });
     }
 };

 var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    // #1   At #1, we use the built-in JavaScript Math.max() function to make sure our percentage isn't less than zero and the Math.min() function to make sure it doesn't exceed 100.
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
 
    // #2  t #2, we convert our percentage to a string and add the % character. When we set the width of the .fill class and the left value of the .thumb class, the CSS interprets the value as a percent instead of a unit-less number between 0 and 100
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 };

 var setupSeekBars = function() {
     var $seekBars = $('.player-bar .seek-bar');  //we are using jQuery to find all elements in the DOM with a class of "seek-bar" that are contained within the element with a class of "player-bar". This will return a jQuery wrapped array containing both the song seek control and the volume control.
 
     $seekBars.click(function(event) {
         // #3  At #3, we see a new property on the event object called pageX. This is a jQuery-specific event value, which holds the X (or horizontal) coordinate at which the event occurred
         
         
         var offsetX = event.pageX - $(this).offset().left;
         var barWidth = $(this).width();
         // #4
         var seekBarFillRatio = offsetX / barWidth;
         
         if($(this).parent().attr('class') == '.seek-control') {
             seek(seekBarFillRatio * currentSoundFile.getDuration());
         } else {
             setVolume(seekBarFillRatio * 100);
         }
 
         // #5
         updateSeekPercentage($(this), seekBarFillRatio);
     });
     
     $seekBars.find('.thumb').mousedown(function(event) {
         // #8
         var $seekBar = $(this).parent();
 
         // #9
         $(document).bind('mousemove.thumb', function(event){       //using bind as an event handler we attach mousemove to document so even if your mouse leaves                                                                   the seek bar it will still be able to move the ball
             var offsetX = event.pageX - $seekBar.offset().left;
             var barWidth = $seekBar.width();
             var seekBarFillRatio = offsetX / barWidth;
             
             if($(this).parent().attr('class') == '.seek-control') {
             seek(seekBarFillRatio * currentSoundFile.getDuration());
             } else {
             setVolume(seekBarFillRatio * 100);
         }
 
             updateSeekPercentage($seekBar, seekBarFillRatio);
         });
 
         // #10
         $(document).bind('mouseup.thumb', function() {
             $(document).unbind('mousemove.thumb');
             $(document).unbind('mouseup.thumb');
         });
     });
 }; 



var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
 };


var trackIndex = function(album, song) {
    return album.songs.indexOf(song);   
};

var nextSong = function() {
    
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    
        currentSongIndex++;     //get index of current song and increment
        
        if (currentSongIndex >= currentAlbum.songs.length) {
            currentSongIndex = 0;
    }
        
        setSong(currentSongIndex + 1);  //set a new current song
        currentSoundFile.play();
        updateSeekBarWhileSongPlays();
        currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
        
            //updating info on the player bar
        $('.currently-playing .song-name').text(currentSongFromAlbum.title);
        $('.currently-playing .artist-name').text(currentAlbum.artist);
        $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
        $('.main-controls .play-pause').html(playerBarPauseButton);
        
        $('.currently-playing .artist-name').text(currentAlbum.artist);
        $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
        $('.main-controls .play-pause').html(playerBarPauseButton);
        
        var lastSongNumber = getLastSongNumber(currentSongIndex);
        var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
        var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
        
        $nextSongNumberCell.html(pauseButtonTemplate);
        $lastSongNumberCell.html(lastSongNumber);
        
    };


var previousSong = function() {
    
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum); 
    
        currentSongIndex--;     //get index of current song and increment
        
        if (currentSongIndex < 0) {
            currentSongIndex = currentAlbum.songs.length - 1;
    }
        
        setSong(currentSongIndex + 1);  //set a new current song, 
        currentSoundFile.play();
        updateSeekBarWhileSongPlays();
        currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
        
            //updating info on the player bar
        $('.currently-playing .song-name').text(currentSongFromAlbum.title);
        $('.currently-playing .artist-name').text(currentAlbum.artist);
        $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
        $('.main-controls .play-pause').html(playerBarPauseButton);
        
        $('.currently-playing .artist-name').text(currentAlbum.artist);
        $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
        $('.main-controls .play-pause').html(playerBarPauseButton);
        
        var lastSongNumber = getLastSongNumber(currentSongIndex);
        var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
        var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
        
        $previousSongNumberCell.html(pauseButtonTemplate);
        $lastSongNumberCell.html(lastSongNumber);
        
    };

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
      var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
      var playerBarPlayButton = '<span class="ion-play"></span>';
      var playerBarPauseButton = '<span class="ion-pause"></span>';
      var currentAlbum = null;
      var currentlyPlayingSongNumber = null;
      var currentSongFromAlbum = null;
      var currentSoundFile = null;
      var currentVolume = 80;


      var $previousButton = $('.main-controls .previous');
      var $nextButton = $('.main-controls .next');
 
    $(document).ready(function(){
        setCurrentAlbum(albumPicasso);
        setupSeekBars();
        $previousButton.click(previousSong);
        $nextButton.click(nextSong);
 });
                                   