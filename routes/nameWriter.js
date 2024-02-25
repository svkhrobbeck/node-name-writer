const { Router } = require('express')
const { StatusCodes } = require('http-status-codes')
const Jimp = require('jimp')
const fs = require('fs')
const path = require('path')

const router = Router()

router
  .route('/')
  .get((req, res) => res.status(StatusCodes.OK).render('index'))
  .post(async (req, res) => {
    const imgRaw = 'public/raw/iron-man.jpg' // 1920x1080
    const imgActive = 'public/active/iron-man.jpg'
    const imgExported = 'public/export/image.jpg'
    const fontPath = 'public/fonts/iron-man.ttf.fnt'
    const textData = {
      text: `${req.body.name}`.toUpperCase(),
      maxWidth: 1920,
      maxHeight: 1080,
      placementX: 300,
      placementY: 500,
    }

    const clone = await Jimp.read(imgRaw)
    await clone.clone().write(imgActive)

    const active = await Jimp.read(imgActive)
    const font = await Jimp.loadFont(fontPath)

    const image = await active.print(
      font,
      textData.placementX,
      textData.placementY,
      { text: textData.text },
      textData.maxWidth
    )

    await image.quality(100).write(imgExported)
    res.status(StatusCodes.MOVED_TEMPORARILY).redirect(`/success`)
  })

router.get('/success', async (req, res) => {
  const img = await fs.readFile(path.join(__dirname, '../public/export/image.jpg'), 'utf-8', (err, data) => {
    if (err) throw err

    console.log(Buffer.from(data).toString())

    res.render('success', { img: data })
  })
})

module.exports = router
