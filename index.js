const express = require('express')
const multer = require('multer')
const Jimp = require('jimp')

const app = express()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/uploads`)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const imageType = file.mimetype.toLowerCase().includes('png') ? '.png' : 
                            file.mimetype.toLowerCase().includes('jpg') ? '.jpg' : null
        if(imageType) 
            cb(null, uniqueSuffix + imageType)
        else 
            cb(new Error('invalid file'))
    }
})
const upload = multer({storage}).single('image')

app.get('/test', async (req, res) => {
    try {
        res.send({status: true, message: 'working'})
    } catch(error) {
        res.status(400).send({status: false, message: 'Something went wrong, Try after sometimes.!'})
    }
})

app.post('/convertimage', async (req, res) => {
    try {
        await upload(req, res, function (error) {
            if (error instanceof multer.MulterError) {
                return res.status(400).send({status: false, message: 'Invalid inputs.!', error: 'A Multer error occurred when uploading.'})
            } else if (error) {
                return res.status(400).send({status: false, message: 'Only jpg and png files are allowed'})
            }
            const orignal = req.file.path.replace("\\","/").replace("\\","/")
            const name = orignal.slice(0, orignal.length-4)
            const ext = orignal.slice(-4)
            const horizontal = name+"_h"+ext
            const vertical = name+"_v"+ext
            const horizontalSmall = name+"_hs"+ext
            const gallery = name+"_g"+ext
            Jimp.read(orignal).then(image => image.resize(755, 450).write(horizontal))
            Jimp.read(orignal).then(image => image.resize(365, 450).write(vertical))
            Jimp.read(orignal).then(image => image.resize(365, 212).write(horizontalSmall))
            Jimp.read(orignal).then(image => image.resize(380, 380).write(gallery))
            const data = {
                orignal,
                horizontal,
                vertical,
                horizontalSmall,
                gallery
            }
            res.send({status: true, message: "image converted successfully", data })
        })
    } catch(error) {
        res.status(400).send({status: false, message: 'Something went wrong, Try after sometimes.!'})
    }
})

const port = 5000
app.listen(port, () => console.log(`Server is running on PORT ${port}`))