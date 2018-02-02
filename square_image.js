const Canvas = require('canvas')
const fs = require('fs')

const PARAMS = [
  { field: 'source', required: true },
  { field: 'padding', default: 0 },
  { field: 'backgroundColor', default: '#fff' },
]

function getImage(src) {
  return new Promise((resolve, reject) => {
    fs.readFile(src, (err, value) => {
      if (err) {
        reject(new Error(`Could not load file source: ${src}`))
      } else {
        resolve(value)
      }
    })
  })
}

function squareImage(options) {

  const padding = options.padding || 0

  return getImage(options.source).then(imageBuffer => {
    const img = new Canvas.Image()
    img.src = imageBuffer

    const imageWiderThanTall = img.width >= img.height
    const maxDimension = Math.max(img.width, img.height)
    const canvasWidth = maxDimension + 2 * padding
    const canvasHeight = canvasWidth

    const canvas = new Canvas(canvasWidth, canvasHeight)
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    if (imageWiderThanTall) {
      ctx.drawImage(img, padding, padding + (img.width - img.height)/2)
    } else {
      ctx.drawImage(img, padding + (img.height - img.width) / 2, padding)
    }
    return canvas.createJPEGStream({
      bufsize: 2048,
      quality: 100,
    })
  })
}
module.exports = squareImage



//         const x = (i % options.width) * (options.imageWidth + options.spacing)
//         const y = Math.floor(i / options.width) * (options.imageHeight + options.spacing) + topPadding
//         const sRatio = img.width / img.height
//         const dRatio = options.imageWidth / options.imageHeight
//         let dx = 0
//         let dy = 0
//         let dWidth = options.imageWidth
//         let dHeight = options.imageHeight

//         // source image will fill X axis
//         if (sRatio > dRatio) {
//           dHeight = img.height * (options.imageWidth / img.width) // multiplier ratio
//           dy = (options.imageHeight - dHeight) / 2
//         // source image will fill y-axis
//         } else if (sRatio < dRatio) {
//           dWidth = img.width * (options.imageHeight / img.height) // multiplier ratio
//           dx = (options.imageWidth - dWidth) / 2
//         }
//         ctx.drawImage(img, 0, 0, img.width, img.height, dx + x, dy + y, dWidth, dHeight)

//     const canvasWidth = options.width * options.imageWidth + (options.width - 1) * (options.spacing)
//     const canvasHeight = options.height * options.imageHeight + (options.height - 1) * (options.spacing) + bottomPadding + topPadding

//   })

//   const canvas = new Canvas(canvasWidth, canvasHeight)
//   const ctx = canvas.getContext('2d')
//   ctx.fillStyle = options.backgroundColor
//   ctx.fillRect(0, 0, canvasWidth, canvasHeight)


//   const maxImages = options.width * options.height
//   const sources = options.sources.slice(0, maxImages)

//   return Promise.all(_.map(sources, getPhoto))
//     .then((photoBuffers) => {
//       _.forEach(_.filter(photoBuffers), (photoBuffer, i) => {

//         const img = new Canvas.Image()
//         img.src = photoBuffer

//         const x = (i % options.width) * (options.imageWidth + options.spacing)
//         const y = Math.floor(i / options.width) * (options.imageHeight + options.spacing) + topPadding
//         const sRatio = img.width / img.height
//         const dRatio = options.imageWidth / options.imageHeight
//         let dx = 0
//         let dy = 0
//         let dWidth = options.imageWidth
//         let dHeight = options.imageHeight

//         // source image will fill X axis
//         if (sRatio > dRatio) {
//           dHeight = img.height * (options.imageWidth / img.width) // multiplier ratio
//           dy = (options.imageHeight - dHeight) / 2
//         // source image will fill y-axis
//         } else if (sRatio < dRatio) {
//           dWidth = img.width * (options.imageHeight / img.height) // multiplier ratio
//           dx = (options.imageWidth - dWidth) / 2
//         }
//         ctx.drawImage(img, 0, 0, img.width, img.height, dx + x, dy + y, dWidth, dHeight)
//       })
//     })
//     .then(() => {
//       return canvas
//     })
// }
