const videoCards = document.querySelector('.videos-card');
const trackCards = document.querySelector('.tracks-card');
const media =document.querySelector('.media-play');
const searchInput = document.getElementById('search');
const videosContainer = document.querySelector('.videos');
const tracksContainer = document.querySelector('.tracks');
const mediaPlayer = document.querySelector('.media-play');
const loader = document.getElementById('loading');
const bodyContainer = document.querySelector('.container');


let matchResult = window.matchMedia("(min-width: 1024px)");


   function isSmallScreen(matchResult){
       if(matchResult.matches){
               bodyContainer.style.display.visibility = "visible";
        } else {

                bodyContainer.style.display.visibility = "hidden";
                let bodymessage = `
                  <div class= "mobile-view"> Please view on a pc or mac :)</div>
                `
                  bodyContainer.innerHTML = bodymessage;
            }
 }
 isSmallScreen(matchResult);

 window.addEventListener('resize', ()=>isSmallScreen(matchResult));


videosContainer.style.opacity = 0;
tracksContainer.style.opacity = 0;
mediaPlayer.style.display= "none";

function displayLoading(){
    loader.classList.add("display");
    videosContainer.style.opacity = 0;
    tracksContainer.style.opacity = 0;

    setTimeout( ()=>{
        loader.classList.remove("display");
    }, 5000 );
}

function hideLoading(){
    loader.classList.remove("display");
    videosContainer.style.opacity = 1;
    tracksContainer.style.opacity = 1
}

const getContent = (search) =>{
    displayLoading();
         //const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
         // proxyUrl +
    const url= new URL(' https://itunes.apple.com/search ');
    const params = {term: search, media:'music', entity: 'musicTrack', limit:100};
    url.search = new URLSearchParams(params);
    fetch( url, {method: 'POST'})
    .then( results => results.json())
    .then( data =>{
           hideLoading();
           console.log(data)
       
        data.results.map((result) =>{

            let kind =  `${result.kind}`;
        
                if(kind === "music-video"){
                    let contentHTML = `
                    <div class ="v-cards" onclick ="playVideo('${result.previewUrl}', '${result.trackName}', '${result.artistName}')">
                    <div class="video-art" style ="background-image: url(${result.artworkUrl100})"></div>
                    <p class="video-title">${result.trackCensoredName}</p>
                    <p class="album-name">Album: ${result.collectionName}</p>
                    </div>
                    
                    `
                    videoCards.innerHTML += contentHTML;        
                }else if(kind === "song"){
                    let contentHTML = `
                    <div class ="songcards" onclick="playMusic('${result.previewUrl}', '${result.artworkUrl100}', '${result.trackName}', '${result.artistName}')">
                    <div class="song-art" style ="background-image: url(${result.artworkUrl100})"></div> 
                    <div class="text">
                        <div class="song-title">${result.trackName}</div>
                        <div class="artistname">${result.artistName}</div>
                    </div>
                    <div class="song-album"> ${result.collectionName}</div>
                  </div>
                    
                    `
                 trackCards.innerHTML += contentHTML;
                }

            })
       })
}


const playMusic = (url,image, title, artist)=>{

       media.innerHTML = `
       <audio controls autoplay src="${url}" id="audio"></audio>
       <div class="track-image" style ="background-image: url('${image}');"></div>
       <p class="music-title"> ${title}</p>
       <p class="music-artistName">${artist}</p>

       `
       mediaPlayer.style.display= "block";
       mediaPlayer.style.backgroundColor = " rgba(0, 0, 0, 0.719)"
     
}



const playVideo = (url,title,artist)=>{
    media.innerHTML = `
    <video controls autoplay src="${url}" id="video"></video> 
    <p class="media-text">${title} - <span class="video-artistName"> ${artist}</span></p>
    `
    mediaPlayer.style.display= "block"; 
    mediaPlayer.style.backgroundColor = "inherit"

  }

searchInput.addEventListener('keydown', (event)=>{
    if(event.key === 'Enter'){
        getContent(searchInput.value);
        videoCards.innerHTML = '';
        trackCards.innerHTML = '';
       
    } 

})
