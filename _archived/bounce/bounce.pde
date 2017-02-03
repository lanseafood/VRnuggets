import ddf.minim.*;

//globals
Minim minim;
AudioPlayer song;

int WIDTH = 800;
int HEIGHT = 400;

int max = 0;
float sColor = map(HEIGHT,0,HEIGHT,0,100);

void setup() {
  size(800, 400);
  colorMode(HSB, 100);
  smooth();
  
  minim = new Minim(this);
  song = minim.loadFile("/Users/lpolepeddi/Desktop/opus.mp3");
  song.play();
}
 
void draw() {
  background(0);
  
  // get the RMS of the current audio frame
  float rms = song.mix.level();
  
  int r = int(map(rms, 0, 1, 10, 100));
  int y = int(map(rms, 0, 1, 30, 600));
  if(y >= max) {
    max = y;
    float x = random(0, HEIGHT);
    sColor = map(x,0,HEIGHT,0,100);
  }
  
  fill(sColor,80,90);
  ellipse(500, HEIGHT-y, r, r);
}

void mousePressed() {
  // choose a position to cue to based on where the user clicked.
  // the length() method returns the length of recording in milliseconds.
  int position = int( map( mouseX, 0, width, 0, song.length() ) );
  song.cue( position );
}