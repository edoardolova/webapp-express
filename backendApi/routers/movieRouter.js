const express = require('express')
const router = express.Router();
const movieController = require('../controllers/movieControllers.js');

// multer 
const multer = require('multer');
const path = require('path');

// Config multer to save file in public and set file name
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // save in public
        cb(null, 'public'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname); 
        const filename = file.fieldname + '-' + uniqueSuffix + ext;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

// index
router.get('/', movieController.index);

// show
router.get('/:slug', movieController.show);

// post middleware to handle image upload
router.post('/', upload.single('image'), movieController.store);



module.exports = router;