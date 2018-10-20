var results = document.querySelector('#results');
var modal = document.getElementById('songModal');
var songcontent = document.getElementById('songcontent');
var textInput = document.querySelector('#textInput');
    console.log(textInput);
	if(textInput){
    textInput.addEventListener('input', getItunesAjax);
	}

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  function getSongDetails(trackId){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://itunes.apple.com/lookup?id='+ trackId);
  
        xhr.onload = function(){
          if(this.status == 200){
            var dhtml = '';
            var par = JSON.parse(this.responseText);
            dhtml += '<img src='+par.results[0].artworkUrl100+' alt="" /><div><div class="SongTop"><strong>'+ par.results[0].trackName + '</strong></div><div class="AlbumArtistDetails"><p>'
            +par.results[0].collectionName + '</p><p>'+millisToMinutesAndSeconds(par.results[0].trackTimeMillis) +'</p><p>' +par.results[0].artistName + '</p></div><p>&#36;'
            +par.results[0].trackPrice +'</p></div>';
            console.log("par", par.results[0]);
            
            songcontent.innerHTML = dhtml;
          }
        }
  
        xhr.send(); 
  }

  
  function songDetails(trackId){
      modal.style.display = "block";
      getSongDetails(trackId);
  }

  var span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
      modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
  }

    // Fetch with XHR
    function getItunesAjax(){
      var text = textInput.value;
      console.log(text);
      if(text != ''){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://itunes.apple.com/search?term='+text+'&media=music&entity=song');
  
        xhr.onload = function(){
          if(this.status == 200){
            var shtml = '';
            var parsed = JSON.parse(this.responseText);
            for(var i=0; i < parsed.resultCount ; i++){
            shtml += '<div class="SongItem" onclick="songDetails('+parsed.results[i].trackId +')"><div class="LeftItem"><h2>' + parsed.results[i].trackName + 
            '<h2><div class="AlbumArtist"><p>' + parsed.results[i].collectionName+'</p><p> &#8226; </p> <p>' + parsed.results[i].artistName+ 
            '</p> </div></div><div class="RightItem"> <p>' + millisToMinutesAndSeconds(parsed.results[i].trackTimeMillis)+'</p><p><i class="far fa-heart"></i></p></div></div>';
            console.log("parsed", parsed.results[i]);
            }
            results.innerHTML = shtml;
          }
        }
  
        xhr.send(); 
        }
    }

    // Fetch with Fetch API
    function getFactFetch(){
      var text = textInput.value;
      
      if(text != ''){
        fetch('https://itunes.apple.com/search?term='+text+'&media=music&entity=song')
        .then(response => response.text())
        .then(data => {
          // fact.style.display = 'block';
          results.innerText = data;
        })
        .catch(err => console.log(err)); 
      }
    }