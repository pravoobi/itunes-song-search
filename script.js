let results = document.querySelector('#results');

let textInput = document.querySelector('#textInput');
    console.log(textInput);
	if(textInput){
    textInput.addEventListener('input', getItunesAjax);
	}

  function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

    // Fetch with XHR
    function getItunesAjax(){
      let text = textInput.value;
      console.log(text);
      if(text != ''){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://itunes.apple.com/search?term='+text+'&media=music&entity=song');
  
        xhr.onload = function(){
          if(this.status == 200){
            // fact.style.display = 'block';
            let parsed = JSON.parse(this.responseText);
            let shtml = '<div class="SongItem"><div class="LeftItem"><h2>' + parsed.results[0].trackName + 
            '<h2><div class="AlbumArtist"><p>' + parsed.results[0].collectionName+'</p><p> &#8226; </p> <p>' + parsed.results[0].artistName+ 
            '</p> </div></div><div class="RightItem"> <p>' + millisToMinutesAndSeconds(parsed.results[0].trackTimeMillis)+'</p><p><i class="fas fa-heart"></i></p>';
            console.log("parsed", parsed.results[0]);
            results.innerHTML = shtml;
          }
        }
  
        xhr.send(); 
        }
    }

    // Fetch with Fetch API
    function getFactFetch(){
      let text = textInput.value;
      
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