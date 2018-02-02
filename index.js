/*
 * Usage:
 *   npm start -- --src=./test --dest=./test_square
 *
 */

const squareImage = require('./square_image')
const fs = require('fs')
const Canvas = require('canvas')
const path = require('path')

const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name: 'src', alias: 's', type: String },
  { name: 'dest', alias: 'd', type: String },
]

const options = commandLineArgs(optionDefinitions)

if (!fs.existsSync(options.dest)){
  fs.mkdirSync(options.dest);
}

fs.readdir(options.src, function(err, items) {
  Promise.all(items.map(item => {
    return squareImage({
      source: path.join(options.src, item),
      padding: 0,
    }).then(stream => {
      var out = fs.createWriteStream(path.join(options.dest, item.split('.')[0] + '.jpg'))
      return stream.pipe(out)
    })
  }))
})

