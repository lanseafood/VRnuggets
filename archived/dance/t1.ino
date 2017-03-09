File Transfer: LEFT.TXT
File Transfer: LEFT.TXTFile Transfer: RIGHT.TXT
File Transfer: LEFT-1.TXTFile Transfer: RIGHT-1.TXT
File Transfer: LEFT-1.TXTFile Transfer: RIGHT-1.TXT
#include <SPI.h>
#include <SD.h>
#include "I2Cdev.h"
#include "MPU6050.h"
#include "Wire.h"
int leftFlex, rightFlex;
int16_t ax, ay, az, gx, gy, gz;
const int chipSelect = 10;
int timecount = 0;
String leftString="", rightString="";

void setup() {
  Wire.begin();
  Serial.begin(9600);
  Wire.begin();

  SD.begin(chipSelect);
  SD.remove("Left.txt");
  SD.remove("Right.txt");
}

void loop() {
  Flex();
  angleLeft();
  leftFile();
  delay(5);
  angleRight();
  rightFile();
  delay(5);
  timecount = timecount + 1;
}
void Flex() {
  leftFlex = analogRead(A0);
  delay(1);
  rightFlex = analogRead(A1);
  delay(1);
}

void angleLeft() {
  delay(2);
  MPU6050 accelgyro(0x69);
  delay(2);
  accelgyro.initialize();
  delay(2);
  accelgyro.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
  //Serial.print("Angles:\t");
  ax = ax / 100;
  //Serial.print(ax); Serial.print("\t");
  ay = ay / 100;
  //Serial.print(ay); Serial.print("\t");
  az = az / 100;
  //Serial.print(az); Serial.println("\t");
  gx = gx / 100;
  //Serial.print(gx); Serial.println("\t");
  gy = gy / 100;
  //Serial.print(gy); Serial.println("\t");
  gz = gz / 100;
  //Serial.print(gz); Serial.println("\t");
  accelgyro.resetGyroscopePath();
  accelgyro.resetAccelerometerPath();
}

void angleRight() {
  delay(2);
  MPU6050 accelgyro(0x68);
  delay(2);
  accelgyro.initialize();
  delay(2);
  accelgyro.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
  Serial.print("Angles:\t");
  ax = ax / 100;
  Serial.print(ax); Serial.print("\t");
  ay = ay / 100;
  Serial.print(ay); Serial.print("\t");
  az = az / 100;
  Serial.print(az); Serial.println("\t");
  gx = gx / 100;
  Serial.print(gx); Serial.println("\t");
  gy = gy / 100;
  Serial.print(gy); Serial.println("\t");
  gz = gz / 100;
  Serial.print(gz); Serial.println("\t");
  accelgyro.resetGyroscopePath();
  accelgyro.resetAccelerometerPath();
}

void leftFile() {
  leftString += String(timecount);
  leftString += ",";
  leftString += String(leftFlex);
  leftString += ",";
  leftString += String(ax);
  leftString += ",";
  leftString += String(ay);
  leftString += ",";
  leftString += String(az);
  leftString += ",";
  leftString += String(gx);
  leftString += ",";
  leftString += String(gy);
  leftString += ",";
  leftString += String(gz);
  File Left = SD.open("Left.txt", FILE_WRITE);
  Left.println(leftString);
  Left.close();
  leftString="";
}

void rightFile() {
  rightString += String(timecount);
  rightString += ",";
  rightString += String(rightFlex);
  rightString += ",";
  rightString += String(ax);
  rightString += ",";
  rightString += String(ay);
  rightString += ",";
  rightString += String(az);
  rightString += ",";
  rightString += String(gx);
  rightString += ",";
  rightString += String(gy);
  rightString += ",";
  rightString += String(gz);
  File Right = SD.open("Right.txt", FILE_WRITE);
  Right.println(rightString);
  Right.close();
  rightString="";
}

