# GSMapServer
Server app written in Node.js to store and manage tile maps


## Roadmap

Things to do, not in any particular order...

### Server side

* Get caching of images working
* BUG - Cache folder should be created if not present
* Define "tile" end point that serves up meta data for tiles
  * Name, Default Size, Image(s)...
  * Do we have alternates to images (e.g.shapes)
  * Open question - what other information do we need? Light maps, navigation etc?
* Define "world" endpoint that contains sets of tiles with orientation, position etc
* Add login / authentication
* Investigate hosting options:
  * AWS?
  * Deployment from GitHub
* Add concept of a group
* End point to let user issue commands (e.g. move token)

### Client side

* Create basic Swift project, get an image on screen
* Simple connection to server, download and display map data
* Download tile data and display as rectangles on screen
* Download images and display
* Selecting tiles
* Moving tiles
* Saving changes to server
* Add login support to app
* Download / update player tokens etc based on player commands


