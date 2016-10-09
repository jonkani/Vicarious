# Vicarious

<img src="https://github.com/jcquery/vicarious/raw/master/demo.gif" height="250">

Vicarious is a location-based search and 360 wrapper for equirectangular images. It uses the Google Maps API to provide coordinates to Flickr for an image search, then renders them using the A-Frame library.

### What's equirectangular?

In short, it's a fancy panorama with a 2:1 width-to-heigh ratio that's wrap-able into a "photo sphere" of sorts.

## Tech

* React & associated libraries: React Google Maps, React Notification, A-Frame React, React Router
* A-Frame
* Sass
* Node.js
* ExpresJS
* PostgreSQL

### What're the different pieces doing?

The UI is made in React and styled with Sass, but A-Frame's the real star here. With surprisingly little work, one can put together a 3D VR environment and populate it with whatever. In this case, the environment consists solely of a large sphere that the camera sits inside. The chosen image is used as the background material for the sphere, and stretched/skewed to fit.

There's also an ExpressJS server living on Node that allows users to create accounts and save images to a PostgreSQL database.

## To do:

The time it takes to do the wrapping depends on the dimensions of the image and the device that's doing the rendering, so there's a certain amount of variance. A better equirectangular classification by Flickr would help speed things up, but in the meantime, some tweaking of A-Frame could help.

A-Frame has a built-in VR view for smartphone viewers like Google Cardboard, but it has a few compatibility issues with larger phones, and the site design conflicts with it in certain cases. 
