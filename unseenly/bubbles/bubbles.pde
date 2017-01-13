import ddf.minim.*;

//classes

public class Bubble {
  private int x;
  private int y;
  private float r;
  private color c;
  private float a;
  
  public Bubble(int xcoord, int ycoord, float radius, color col) {
    this.x = xcoord;
    this.y = ycoord;
    this.r = radius;
    this.c = col;
    this.a = 100;
  }
  
  public float getOpacity() {
    return this.a;
  }
  
  public void setOpacity(float opacity) {
    this.a = opacity;
  }
  
  public float getRadius() {
    return this.a;
  }
  
  public void setRadius(float radius) {
    this.r = radius;
  }
  
  public void drawBubble() {
    fill(this.c, this.a);
    //fill(this.c);
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);
  }
}

//// functions
//void mouseClicked() {
//  song.pause();
//}


//globals
int windowWidth = 800;
int windowHeight = 800;

Minim minim;
AudioPlayer song;

ArrayList<Bubble> bubbles = new ArrayList<Bubble>();
color[] colors = {color(66,133,244), color(234,67,53), color(251,188,5), color(52,168,83)};

void setup() {
  size(800, 800);
  colorMode(RGB);
  smooth();
  
  minim = new Minim(this);
  song = minim.loadFile("/Users/lpolepeddi/Desktop/opus.mp3");
  song.play();
}
 
void draw() {
  background(0);
  
  // get n random numbers between [0,1]
  int n = 10;
  float[] randomNums = new float[n];
  for(int i=0; i<n; i++) {
     randomNums[i] = random(0.1,1); // threshold
  }
  
  // get the RMS of the current audio frame
  float rms = song.mix.level();
  
  // if RMS is greater than one random number, create a bubble
  for(int i=0; i<n; i++) {
    if(rms > randomNums[i]) {
      int maxSize = int(random(100, 300));
      int bubbleSize = int(map(rms, 0, 1, 50, maxSize)) * 5;
      color bubbleColor = colors[int(random(colors.length))];
      
      Bubble b = new Bubble(int(random(windowWidth)), int(random(windowHeight)), bubbleSize, bubbleColor);
      bubbles.add(b);
    }
  }
  
  // for each bubble, decrease its opacity and its radius
  for(int i=0; i<bubbles.size(); i++) {
    // decrease opacity
    float a = bubbles.get(i).getOpacity();
    a -= 0.5;
    bubbles.get(i).setOpacity(a);
    
    //decrease radius
    float r = bubbles.get(i).getRadius();
    r -= 0.5;
    bubbles.get(i).setRadius(r);
  }
  
  // for each bubble, if opacity is 0, delete from array
  int counter = bubbles.size();
  for(int i=0; i<counter; i++) {
    if((bubbles.get(i).getOpacity() <=0) || (bubbles.get(i).getRadius() <=0)) {
      bubbles.remove(i);
      counter -= 1;
    }
  }
  
  // draw everything
  for(int i=0; i<bubbles.size(); i++) {
    bubbles.get(i).drawBubble();
  }
}

void mousePressed() {
  // choose a position to cue to based on where the user clicked.
  // the length() method returns the length of recording in milliseconds.
  int position = int( map( mouseX, 0, width, 0, song.length() ) );
  song.cue( position );
}