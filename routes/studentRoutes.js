const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const multer = require('multer')

//set up multer to store files in uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         const suffix = Date.now()
//         cb(null, suffix + '-' + file.originalname);
//     }
// });

//Configure multer to store files in memory as Buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

//Route to create a new student
router.post('/create', upload.single('photo'), async (req, res) => {
    try {
        const { name, age, email, phone, address } = req.body;

        //const photopath = req.file ? req.file.path : null //Get the file path if uploaded

        const photoBased64 = req.file ? req.file.buffer.toString('base64') : null

        const newStudent = new Student({ name, age, email, phone, address, photo: photoBased64 });
        await newStudent.save();
        res.status(201).json({ message: "Student created successfully", student: newStudent });
    }
    catch (error) {
        res.status(400).json({ message: "Error creating student record" });
    }
})
module.exports = router