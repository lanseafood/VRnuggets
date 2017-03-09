# boilerplate

This code creates a Three.js scene with rotating cubes that is ready for export as a 360 video.

From [this post](https://hackernoon.com/capture-facebook-compatible-4k-360-videos-of-3d-scenes-in-your-browser-788226f2c75f#.w7xipsh3t).

1. In **index.html** between `// start world` and `// end world` create your scene.
1. Once your scene is ready, click the **Record** button. There are 25 frames per second, so for a 30s video, capture 750 frames. Save the **.tar** files along the way.
1. Click **Stop** to stop recording. Save the last **.tar** fil.
1. Extract each **.tar** file. Each **.tar** file contains several **.jpg** images.
1. Move all jpg images into one main folder.
1. `cd` into the main folder, and use [FFMPEG](https://ffmpeg.org/) to stitch all of the images together into a video named **video.mp4**.
    ```
    ffmpeg -i %07d.jpg video.mp4
    ```
1. Add metadata for a 360 video
  1. Download [Google’s Spatial Media Metadata Injector](https://github.com/google/spatial-media/releases)
  1. Run the program and open your video
  1. Select **My video is spherical (360)**
  1. Click **Inject Metadata**, and save the injected file
1. Add 360 audio to the video
1. Upload to Facebook or YouTube. Here's a [YouTube video](https://youtu.be/_DBGY-U4BMY) of this boilerplate.