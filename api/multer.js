import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile_pictures')
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user_id + file.originalname}`)
    }
})

const upload = multer({storage})

export default upload;