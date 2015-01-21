# Clay App Receipt
A receipt for an HTML5 - we use it in 3VOT for our projects and use clay to publish

```npm install```

Development Environment runs on Gulp

## Commands
gulp - runs server
dist - builds for distributions

## Using with Clay
server - clay

## Publish with Clay

```clay create APP_NAME```

```clay preview```


```clay publish```


## Architecture

All assets are in src folder

Static Documents like html, fonts and such are in src/htdocs

Images in src/images

Both images and everything in htdocs is placed in the root. link with /images/FILE.png, etc

javascript in src/javascript 

css is located in ./css folder


## Tasks
Browserify - automatically use .eco templates 
Css - add browser prefixes, inline @imports 

Live Realoading - Watch and all other goodies.

## Dev Enviroment is 100% customizable
All gulp tasks are located in /gulp folder
