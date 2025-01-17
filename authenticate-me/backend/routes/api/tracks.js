const express = require('express')
const asyncHandler = require('express-async-handler')
const { Track, Annotation } = require('../../db/models')

const router = express.Router()

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  // const track = await Track.findByPk((req.params.id), {
  //   include: Annotation
  // })

  const track = await Track.findByPk((req.params.id), {
    include: Annotation,
    order: [
      [Annotation, 'createdAt', 'DESC'],
    ]
  })


  res.json(track)
}))

router.get('/', asyncHandler(async (req, res) => {
  const tracks = await Track.findAll({
    limit: 10
  })
  res.json(tracks)
}))

router.post('/annotations/:trackId', asyncHandler(async (req, res) => {
  const {
    annotation,
    lyric,
    userId,
    trackId,
    startIndex,
    endIndex,
  } = req.body

  const newAnnotation = await Annotation.create({
    annotation,
    lyric,
    userId,
    trackId,
    startIndex,
    endIndex,
  })

  res.json(newAnnotation)
}))

module.exports = router
