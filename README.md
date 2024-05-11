<p align="center" width="100%">
    <img width="33%" src="https://img.shields.io/badge/ENOUGH-BOT-red">
</p>
# Enough Discord Bot

All features in one bot

## Acknowledgements

- [Discord JS](https://https://discord.js.org/)

## Authors

- [@hasirciogli](https://github.com/hasirciogli)

## Run Locally

Clone the project

```bash
  git clone https://github.com/hasirciogli/enough-discord-bot
```

Go to the project directory

```bash
  cd enough-discord-bot
```

Install dependencies

```bash
  npm install
```

Start the bot

```bash
  node server
```

# CANVAS INSTALLATION (IMPORTANT)

## Installation

```BASH
npm install canvas
```

By default, binaries for macOS, Linux and Windows will be downloaded. If you want to build from source, use npm install --build-from-source and see the Compiling section below.

### The minimum version of Node.js required is 6.0.0.

## Compiling
If you don't have a supported OS or processor architecture, or you use --build-from-source, the module will be compiled on your system. This requires several dependencies, including Cairo and Pango.

For detailed installation information, see the wiki. One-line installation instructions for common OSes are below. Note that libgif/giflib, librsvg and libjpeg are optional and only required if you need GIF, SVG and JPEG support, respectively. Cairo v1.10.0 or later is required.

OS Command
OS X Using Homebrew:
brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
Ubuntu sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
Fedora sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
Solaris pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
OpenBSD doas pkg_add cairo pango png jpeg giflib
Windows See the wiki
Others See the wiki
Mac OS X v10.11+: If you have recently updated to Mac OS X v10.11+ and are experiencing trouble when compiling, run the following command: xcode-select --install. Read more about the problem on Stack Overflow. If you have xcode 10.0 or higher installed, in order to build from source you need NPM 6.4.1 or higher.

## Quick Example

```js
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')

// Write "Awesome!"
ctx.font = '30px Impact'
ctx.rotate(0.1)
ctx.fillText('Awesome!', 50, 100)

// Draw line under text
var text = ctx.measureText('Awesome!')
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.lineTo(50 + text.width, 102)
ctx.stroke()

// Draw cat with lime helmet
loadImage('examples/images/lime-cat.jpg').then((image) => {
ctx.drawImage(image, 50, 0, 70, 70)

console.log('<img src="' + canvas.toDataURL() + '" />')
})

```