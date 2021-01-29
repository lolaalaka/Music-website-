const smallTrackArt = document.querySelector('.smalltrack-art');
const smallTrackArtist = document.querySelector('.smalltrack-artist');
const smallTrackName = document.querySelector('.smalltrack-name');

const modal = document.querySelector('.modal');

const trackArt = document.querySelector('.track-art');
const trackArtist = document.querySelector('.track-artist');
const trackName = document.querySelector('.track-name');

const prevBtn = document.querySelectorAll('.prev');
const nextBtn = document.querySelectorAll('.next');
const bigPlayBtn = document.querySelector('.bigplay');
const smallPlayBtn = document.querySelector('.smallplay');

const audio = document.createElement('audio');

const playlistBox = document.querySelectorAll('.playlist-box');


const bigText = document.querySelector('.bigtext');
const iconAndImage = document.querySelectorAll('.icon-and-image');

let slider = document.querySelector('.progress');
let curr_time = document.querySelector('.current-time');
let endTime = document.querySelector('.end-time');



let isPlaying = false;
let trackIndex = 0;
let updateTimer;

//Displaying Navbar

(function(){

    let ham = {
        nav: document.querySelector('.nav'),
        hamburger: document.querySelector('.hamburger'),
        text: document.querySelector('.bigtext'),
       
        initialize() {
            this.hamburger.addEventListener('click', ()=> {
               this.toggle();
            });
        },

        toggle(){
            this.hamburger.classList.toggle('expand');
            this.nav.classList.toggle('expand');
        },


    };
   
    ham.initialize();

}());


//Displaying player 

iconAndImage.forEach((item)=>{
     item.onclick = ()=>{
      modal.style.display = "block";
     };

     window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
});

//trackcontrol

let trackControl = [
    
    {   nameOfTrack: "MONDAY COMES",
        artistName:  "Late",
        imageUrl: "https://images.pexels.com/photos/3328337/pexels-photo-3328337.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        musicPath: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3"
    },

    {   nameOfTrack: "EXOTICA",
        artistName:  "Juan",
        imageUrl: "https://images.unsplash.com/photo-1600932717369-d507b606a25d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDl8fGFsYnVtJTIwYXJ0fGVufDB8MXwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        musicPath: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Oddio_Overplay/Juanitos/Exotica/Juanitos_-_06_-_Exotica.mp3"
    },

    {   nameOfTrack: "Frost Wire",
        artistName:  "Kirk",
        imageUrl: "https://images.unsplash.com/photo-1558114073-fd334d98bbc5?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzN8fGFsYnVtJTIwY292ZXJzfGVufDB8MXwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        musicPath: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/KIRK/FrostWire_Creative_Commons_Mixtape_Vol_5/KIRK_-_02_-_Dont_Go.mp3"
    },

    {   nameOfTrack: "SPRAY PAINT IT GOLD",
        artistName:  "Little Glass Men",
        imageUrl:"https://images.unsplash.com/photo-1556139943-4bdca53adf1e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
        musicPath: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Music_for_Video/Little_Glass_Men/The_Age_of_Insignificance/Little_Glass_Men_-_07_-_Spray_paint_it_Gold.mp3"
    },

    {   nameOfTrack: "SILLY BUS",
        artistName:  "Captive Portal",
        imageUrl:"https://images.unsplash.com/photo-1605798748793-afa30efa801e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OTR8fGFsYnVtJTIwYXJ0fGVufDB8MXwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        musicPath: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Captive_Portal/Somethign_Abbadat_-_EP/Captive_Portal_-_05_-_T-Shirts_Silly_Bus.mp3"
    },

    {
        nameOfTrack:"LONELY SPIDER" ,
        artistName:"Cullah" ,
        imageUrl:"https://images.unsplash.com/photo-1511867674775-1176e6174052?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fGFsYnVtJTIwY292ZXJzfGVufDB8MXwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" ,
        musicPath: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Music_for_Video/Cullah/Cullahmity/Cullah_-_04_-_Lonely_Spider.mp3?download=1",
    },

    {
        nameOfTrack:"FOG LAKE" ,
        artistName: "Kerosene",
        imageUrl:"https://images.unsplash.com/photo-1602283361240-15f7e18ccb87?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTQwfHxhbGJ1bSUyMGFydHxlbnwwfDF8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" ,
        musicPath: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Ziklibrenbib/Fog_Lake/Dragonchaser/Fog_Lake_-_04_-_kerosene.mp3?download=1",
    }

];


const loadTrack = (x) =>{
     //clearing and reseting seek timers. clearInterval is an inbuilt function
   
    resetTimer();
    clearInterval(updateTimer);
   

    //Loadding the music
   
     audio.src = trackControl[x].musicPath;
     audio.load();

   
    //this updates album art, artist name etc

    trackArt.style.backgroundImage = `url(${trackControl[x].imageUrl})`;
    trackName.textContent = trackControl[x].nameOfTrack;
    trackArtist.textContent = trackControl[x].artistName;
   
    //loads for smallTrack

    smallTrackArt.style.backgroundImage = `url(${trackControl[x].imageUrl})`;
    smallTrackName.textContent = trackControl[x].nameOfTrack;
    smallTrackArtist.textContent = trackControl[x].artistName;
   
    //set an interval for 1 milisecond this is for updating progress slider. seekUpdate is a function that will be written out below
   
    updateTimer = setInterval(seekUpdate, 1000);
    
    //moving to a new track after one finishes automatically
   
    audio.addEventListener("ended",  nextTrack);
   
   
}
   

//updates player
playlistBox.forEach( (box, index)=>{

   box.onclick = () => { loadTrack(index) }
});


//buttons

function playMusic() {
    audio.play();
    isPlaying = true;
    bigPlayBtn.innerHTML = `<i class="fas fa-pause"></i>`;
    smallPlayBtn.innerHTML = `<i class="fas fa-pause"></i>`;
}

function pauseMusic(){
    audio.pause();
    isPlaying = false;
    bigPlayBtn.innerHTML = `<i class="fas fa-play"></i>`;
    smallPlayBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

bigPlayBtn.onclick = ()=>{ 
    if(isPlaying === false){
         playMusic();
     }else{
         pauseMusic();
      }      
}
smallPlayBtn.onclick = ()=>{ 
    if(isPlaying === false){
        playMusic();
    }else{
        pauseMusic();
     }      
 }


const nextTrack =  () =>{

    if (trackIndex < trackControl.length - 1){
        trackIndex++
    }else{
        trackIndex = 0;   
     }
    // call the loadTrack funtion
    loadTrack(trackIndex);
     
    playMusic();
}

nextBtn.forEach( (nextbtn)=>{
    nextbtn.onclick = ()=>{ nextTrack()}
})

//prev button
const prevTrack =  () =>{

    if (trackIndex > 0){
        trackIndex--
    }else{
        trackIndex = trackControl.length;   
     }
    // call the loadTrack funtion
    loadTrack(trackIndex);
     
    playMusic();
}

prevBtn.forEach( (prevbtn)=>{
    prevbtn.onclick = ()=>{ prevTrack()}
})

//timer


const resetTimer = () =>{
    curr_time.textContent = "00:00";
    endTime.textContent = "00:00";
    slider.value = 0;
}

const seekTo = () =>{
   let seekto = audio.duration * (slider.value / 100);
    audio.currentTime = seekto;
}

function seekUpdate(){

    let seekPosition = 0;

    //check if audio.duration is a legitimate number

    if (!isNaN(audio.duration)){

        seekPosition = audio.currentTime * (100/audio.duration);
        slider.value = seekPosition;

        //calculate time left and total duration

        let currentMinutes = Math.floor(audio.currentTime / 60); 
       let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60); 
       let durationMinutes = Math.floor(audio.duration / 60); 
      let durationSeconds = Math.floor(audio.duration - durationMinutes * 60); 

      // Add a zero to the single digit time values 
     if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; } 
     if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; } 
     if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; } 
     if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; } 
     
     //set the display
     curr_time.textContent = currentMinutes + ":" + currentSeconds; 
     endTime.textContent = durationMinutes + ":" + durationSeconds; 
  
    }
}



loadTrack(trackIndex);


const centerplaybtn = document.querySelector('.playbtn');
const centerText = document.querySelector('.centertext');
const centerLine = document.querySelector('.centerline');
const circleContainer = document.querySelector('.circle-container');
const centerCircle = document.querySelector('.circle');
const wave = document.querySelector('.wavecontainer');


const centerOperation = ()=>{
    centerplaybtn.addEventListener('click', ()=>{
        centerText.style.display = 'none';
        centerLine.style.display = 'none';
        circleContainer.style.visibility = "visible";
        wave.style.display = "none";
    })
}

centerOperation();


