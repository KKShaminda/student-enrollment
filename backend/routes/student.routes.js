const express = require('express');
const router = express.Router();
const { getAllStudents, createStudent, updateStudent } = require('../controllers/studentController');

router.get('/', getAllStudents);
router.post('/', createStudent);
router.put('/:id', updateStudent);

module.exports = router;

