# Infinite Garden Site

Infinite Garden is a collaborative project which seeks to give visitors a refuge away from online noise, and to observe the organic processes encoded in the environmental flora. Procedural algorithms, such as Perlin Noise, are used to generate the scene.

This repo manages the full stack website that the Unity project is hosted on.  

Live site: [infinite garden site](https://infinite-garden.herokuapp.com)
Link to Unity repo: [infinite garden Unity project](https://github.com/derzorngottes/infinite_garden)

## Tech Stack

### Front-End
+ WebGL
+ AngularJS
+ Turn.js
+ jQuery
+ Bootstrap
+ Pug templating

### Back-End
+ NodeJS
+ ExpressJS
+ JWT
+ PostgreSQL
  + KnexJS as query builder


## Thoughts/Concerns/Challenges
+ Challenges
  + The Unity project had to be embedded as an iframe in the window.  When a screenshot is taken through the program I needed to send the photo via XML request to imgur and then have the response sent back to the parent window and made accessible to Angular.  I had to create a JavaScript plugin that used a sendMessage event to the parent window in order to access imgur's response.
  + Turn.js destroyed Angular directives.  This meant writing a whole lot of jQuery in the journal directive which I then had to pass dynamically created images back and forth to Angular and jQuery.
+ Concerns
  + Turn.js still seems to break a lot of jQuery events when the pages are turned.  I need to really dig into the docs for this.
+ Thoughts
  + Super fun! Super challenging!  There are a lot of features I didn't get a chance to implement - most of them social. TBC...
