const router = require('express').Router();
const usersModel = require('./usersModel');
const userRecipes = require('./userRecipes/userRecipesRouter');


// api/users

router.get('/', async (req, res) => {
    try {
        const users = await usersModel.getUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', checkUser, async (req, res) => {
    const user = {
        displayName: req.body.nickname,
        email: req.body.email,
        picture: req.body.picture
    }
    try {
        const newUser = await usersModel.addUser(user);
        res.status(201).json(newUser)
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

function checkUser(req, res, next) {
    const email = req.body.email
    usersModel.getUserByEmail(email)
        .then(foundUser => {
            if (foundUser === undefined) {
                next();
            } else {
                res.status(200).json(foundUser);
                return
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
}

// api/users/:id

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await usersModel.getUserById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await usersModel.updateUser(id, { ...req.body });
        const updatedUser = await usersModel.getUserById(id);
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const count = await usersModel.deleteUser(id);
        res.status(200).json({ count: `${count} user deleted` });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.use('/:id/recipes', function (req, res, next) {
    req.userId = req.params.id;
    next()
}, userRecipes);


module.exports = router;