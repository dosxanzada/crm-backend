const express = require('express')
const router = express.Router()
const { handleErrors, isAdmin } = require('../utils')
const multer = require('multer')

const {
  addUser,
  getUsers,
  // getUser,
  editUser,
  deleteUser
} = require('../controllers/users')

const storage = multer.diskStorage({
  destination: './uploads',
  filename (req, file, cb) {
    let ext = file.originalname.split('.')
    ext = ext[ext.length - 1]
    cb(null, `${req.payload._id}-${(new Date().getTime())}.${ext}`)
  }
})

const upload = multer({ storage,
  fileFilter (req, file, cb) {
    const mime = file.mimetype.split('/')
    if (mime[0].toString() !== 'image') {
      cb({ message: 'Отправляемый файл должен быть картинкой!' }, false)
    } else {
      cb(null, true)
    }
  }
})

router.post('/', isAdmin, addUser, handleErrors)

router.get('/', getUsers, handleErrors)

router.put('/:userId', upload.single('avatar'), editUser, handleErrors)

router.delete('/:userId', deleteUser, handleErrors)

// router.get('/:userId', getUser, handleErrors)

module.exports = router
