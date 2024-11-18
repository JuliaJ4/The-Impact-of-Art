  // showing video and photos
let showImage = false;
let showVideo = false;
let showPoem = false;
// Song
let songArray = [];
let songIndex = 0;

// Image
let picArray = [];
let picIndex = 0;

// Video
let vidArray = [];
let vidIndex = 0;

//Homepage
let overlay;
let descText;


// Poetry
let poemIndex = 0;
let poemArray = [
  {
    title: "Nellie Clark",
    lines: [
"I was only eight years old,",
"And before I grew up and knew what it meant,",
"I had no words for it, except,",
"That I was frightened and told my,",
"Mother; And that my Father got a pistol,",
"And would have killed Charlie, who was a big boy,",
"Fifteen years old, except for his Mother.",
"Nevertheless the story clung to me.",
"But the man who married me, a widower of thirty-five,",
"Was a newcomer and never heard it,",
"’Till two years after we were married.",
"Then he considered himself cheated,",
"And the village agreed that I was not really a virgin.",
"Well, he deserted me, and I died,",
"The following winter.",
      ]  
      }, 
  {
     title: "Julia Miller",
    lines: [
"We quarreled that morning,",
"For he was sixty—five, and I was thirty,",
"And I was nervous and heavy with the child",
"Whose birth I dreaded.",
"I thought over the last letter written me",
"By that estranged young soul",
"Whose betrayal of me I had concealed",
"By marrying the old man.",
"Then I took morphine and sat down to read.",
"Across the blackness that came over my eyes",
"I see the flickering light of these words even now:",
"“And Jesus said unto him, Verily",
"I say unto thee, To-day thou shalt",
"Be with me in paradise.”",
      ]  
  },
  {
   title: "Amanda Barker",
    lines: [
"Henry got me with child,",
"Knowing that I could not bring forth life",
"Without losing my own.",
"In my youth therefore I entered the portals of dust.",
"Traveler, it is believed in the village where I lived",
"That Henry loved me with a husband’s love",
"But I proclaim from the dust",
"That he slew me to gratify his hatred.",
      ]   
  },
  {
    lines: [
"XIX. THE MYSTERY OF PAIN.",
      "",
"Pain has an element of blank;",
"It cannot recollect",
"When it began, or if there were",
"A day when it was not.",
     "", //pause
"It has no future but itself,",
"Its infinite realms contain",
"Its past, enlightened to perceive",
"New periods of pain.",
      ]   
  }
    ];
// text rescription for all the media
let audioDescriptions = [
 { title: "Someone to Watch Over Me", description: " Released: 1959 <br> Artist: Ella Fitzgerald <br> Genre: Jazz" },
  { title: "Heroes", description: "Album: Heroes <br> Released: 1977 <br> Artist: David Bowie <br> Genres: Pop, Rock" },
  { title: "Thinkin Bout You", description: "Released: 2012 <br> Album: Channel Orange <br> Artist: Frank Ocean<br>Genres:R&B/Soul" },
  { title: "Album: American Psycho (Original Motion Picture Score)", description: "Released: 2000 <br> Track: The Men's Room <br> Composed by John Cale." }
];


let imageDescriptions = [
 { title: "The Light", description: "Photography and editing by Julia Johansson." },
  { title: "High", description: "Photography and editing by Julia Johansson." },
  { title: "At Night", description: "Photography and editing by Julia Johansson." },
  { title: "Point of No Return", description: "Photography and editing by Julia Johansson." },
  { title: "Through the Leaves, Hitting the Bars", description: "Photography and editing by Julia Johansson." }
];


let videoDescriptions = [
  { title: "Say My Name", description: "Released: 1999 <br>Artists: Destiny's Child, Korma <br> Album: The Writing's on the Wall<br> Genre: R&B/Soul" },
  { title: "Paparazzi", description: "Released: 2008 <br> Artist: Lady Gaga<br> Genres: Dance-pop, Synth-pop <br> Album: The Fame" },
  { title: "Paper Bag", description: "Released: 1999 <br>Artist: Fiona Apple <br>Album: When the Pawn..." }
];


let poemDescriptions = [
 { title: "Spoon River Anthology", description: "Author: Edgar Lee Masters <br> Release date: April 1, 1998" },
   { title: "Spoon River Anthology", description: "Author: Edgar Lee Masters <br>Release date: April 1, 1998" },
   { title: "Spoon River Anthology", description: "Author: Edgar Lee Masters <br>Release date: April 1, 1998" },
   { title: "Poems by Emily Dickinson, Three Series, Complete", description: "Author: Emily Dickinson <br>Release date: May 1, 2004 <br>Credits: Produced by Jim Tinsley" }
];

function preload() {
  for (let i = 0; i < 4; i++) {
    songArray[i] = loadSound("assets/audio/song-" + i + ".mp3");
  }
  for (let i = 0; i < 5; i++) {
    picArray[i] = loadImage("assets/pics/pics-" + i + ".jpg");
  }
  for (let i = 0; i < 3; i++) {
    vidArray[i] = createVideo("assets/vids/vid-" + i + ".mp4");
    vidArray[i].hide(); // hide it in the beginning
  }
}

function setup() {
  //canvas stuff
  createCanvas(900,600);
  let canvas = createCanvas(windowWidth*1, windowWidth*1);
  canvas.parent('sketch-holder');
  changeSize();
  
  // Button for song
  let button1 = createButton("Play Audio");
  button1.parent("button-holder");
  button1.mousePressed(changeSong);

  // Button for pics
  let button2 = createButton("Show Photo");
  button2.parent("button-holder");
  button2.mousePressed(changePhoto);

  // Button for video
  let button3 = createButton("Play Video");
  button3.parent("button-holder");
  button3.mousePressed(changeVideo);
  
// Button for video
  let button4 = createButton("Show Poem");
  button4.parent("button-holder");
  button4.mousePressed(changePoem);
  
   //webpage 
  overlay = createDiv('Welcome!<br>This is a study to see how people respond to different mediums of art. Please use the buttons to start viewing, and take the survey after you are finished with each individual piece. ');
  overlay.position(0,0);
  overlay.class('overlay');
  overlay.mousePressed(startPage);
  //descText to select the descriptions in html
   descText = select('#media-description');
  
  // randomize index
  songIndex = int(random(songArray.length));
  picIndex = int(random(picArray.length));
  vidIndex = int(random(vidArray.length));
  poemIndex = int(random(poemArray.length));
}

function startPage() {
  console.log('click');
  overlay.style("visibility", "hidden");
}

function changeSize() {
 /* canvas = resizeCanvas(windowWidth*0.7, windowWidth*0.7);*/
   let canvasSize = min(windowWidth, windowHeight); 
  canvas = resizeCanvas(canvasSize, canvasSize * 0.7);
  let aspectRatio = 20/13; // so it doesn't warp
  let canvasWidth =  canvasSize; 
  let canvasHeight = canvasWidth / aspectRatio; 
  resizeCanvas(canvasWidth, canvasHeight);  
}
function draw() {
  background(0);
  
  if (showImage) {
    image(picArray[picIndex],0, 0, 856, 556);
  }

  if (showVideo) {
    /*vidArray[vidIndex].position(width/2, 75);
    vidArray[vidIndex].size(895, 600);
    vidArray[vidIndex].show(); // show one at a time*/
    
    vidArray[vidIndex].hide();
    image(vidArray[vidIndex], -15, -5, 895, 585);
  }
  //poem
  if (showPoem){
  stroke(255);
  fill(255);
  textSize(20);
  textAlign(CENTER);
  //text("Spoon River Anthalogy: Nellie Clark", width/2, height*0.4);
  //text(poemArray[poemIndex], width/2, height*0.5);
  
  // poem title
  text(poemArray[poemIndex].title, width / 2, height * 0.15);

  // poem lines
  let currentPoem = poemArray[poemIndex].lines;
  for (let i = 0; i < currentPoem.length; i++) {
    text(currentPoem[i], width / 2, height * 0.25 + (i * 25)); //vertical space
  }
  }
}

function changeSong() {
  //video control
   for (let i = 0; i < vidArray.length; i++) {
    vidArray[i].stop(); // stop the vids
    vidArray[i].hide(); // hide vids
  } 
  for (let i = 0; i < songArray.length; i++) {
      songArray[i].stop();
    }
  //play random song
    songIndex = int(random(songArray.length));
  //play chosen song
   songArray[songIndex].play();
  
  //description of the song 
   descText.html('<strong>' + audioDescriptions[songIndex].title + '</strong><br>' + audioDescriptions[songIndex].description);
}

function changePhoto() {
  showImage = true;
  showVideo = false; // hide video when showing photo
  showPoem = false;
  picIndex = int(random(picArray.length));
  
  // Stop all videos and hide them during photo
  for (let i = 0; i < vidArray.length; i++) {
    vidArray[i].stop();
    vidArray[i].hide(); // hide video 
  }
  descText.html('<strong>' + imageDescriptions[picIndex].title + '</strong><br>' + imageDescriptions[picIndex].description);
}

function changeVideo() {
  for (let i = 0; i < songArray.length; i++) {
    songArray[i].stop(); // stop all songs during video
  }
  showVideo = true;
  showImage = false; // hide photos when showing video
  showPoem = false;
  vidIndex = int(random(vidArray.length));
  
  // Stop all other videos and hide them
  for (let i = 0; i < vidArray.length; i = i + 1) {
    if (i === vidIndex) {
      vidArray[i].play(); // play chosen video
      vidArray[i].show(); // show it
    } else {
      vidArray[i].stop(); // stop other videos
      vidArray[i].hide(); // hide others
    }
  }
  descText.html('<strong>' + videoDescriptions[vidIndex].title + '</strong><br>' + videoDescriptions[vidIndex].description);
  //vidArray[vidIndex].show();
  //vidArray[vidIndex].play();
}
function changePoem() {
  poemIndex++;
  if(poemIndex > poemArray.length-1) {
    poemIndex = 0;
  }
  showPoem = true;
  showVideo = false;
  showImage = false;
  poemIndex = int(random(poemArray.length));
  
   // Stop all videos and hide them during poem
  for (let i = 0; i < vidArray.length; i++) {
    vidArray[i].stop();
    vidArray[i].hide(); // hide video 
  }
  descText.html('<strong>' + poemDescriptions[poemIndex].title + '</strong><br>' + poemDescriptions[poemIndex].description);
}
