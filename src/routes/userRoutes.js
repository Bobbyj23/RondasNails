const express = require('express');
const {
    registerUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController.js');
const validateUser = require('../../middleware/validateUser.js');


const router = express.Router();

router.post('/register', validateUser, registerUser); 
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', validateUser, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;