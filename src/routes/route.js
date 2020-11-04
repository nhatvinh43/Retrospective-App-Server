const express = require('express')
const router = express.Router();
const { getAll, getOne, addBoard, deleteBoard, updateBoard } = require('../controllers/BoardController');
const { getOnePost, addPost, deletePost, updatePost} = require('../controllers/PostController');
const {updateUser} = require('../controllers/UserController');
const { UserValidator } = require('../validators/validator')
const passport = require('passport')
const jwt = require('jsonwebtoken');
const Board = require('../models/Board');
const User = require('../models/User')
const Post = require('../models/Post')

router.get('/', (req, res, next) =>
{
    res.send('Hello');
})

//Users
router.put('/update', (req, res, next) =>
{
    passport.authenticate('jwt', { session: false }, async (err, user, info) =>
    { 
        if (err)
        {
            res.status.json({ message: err.message });
        }
        if (info)
        {
            res.status.json({ message: info.message });
        }
        else
        {
            const _id = user._id;

            let tempUser = await User.findOne({ _id: _id }, (err, result) =>
            {
                if (err)
                {
                    res.status.json({ message: err.message });
                }
                
            });

            const newUser = new User(req.body);
            tempUser = { ...newUser._doc, _id: _id };

            const result = await updateUser(_id, tempUser);

            res.status(200).json(result);

        }
    })(req, res, next)
})
router.get('/user', (req, res, next) =>
{
    passport.authenticate('jwt', {session: false}, async (err, user, info) => {
        if (err)
        {
            res.status(400).json({ message: err.message });
        }

        if (info)
        {
            console.log(info);
            res.status(400).json({ message: info.message });
        }
        else
        {
            res.status(200).json(user);
        }

    })(req, res, next)
})
router.post('/register', UserValidator, (req, res, next) =>
{
    passport.authenticate('register', {session: false}, async (err, user, info) => {
        if (err)
        {
            return res.status(400).json({ message: err.message });
        }

        if (info)
        {
            console.log(info);
            return res.status(400).json({ message: info.message });
        }
        else
        {
            req.logIn(user, err =>
            {
                return res.status(200).json({ message: "User created" });
            });
        }

    })(req, res, next)
})
router.post('/login', (req, res, next) =>
{

    passport.authenticate('login', {session: false}, async (err, user, info) => {
        if (err)
        {
            return res.status(400).json({ message: err.message });
        }

        if (info)
        {
            console.log(info);
            return res.status(400).json({ message: info.message });
        }
        else
        {  
            const token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.status(200).json({auth: true, token: token,  message: "Logged in successfully" });
        }

    })(req, res, next)

    
})

//Board
router.get('/boards/:id', (req, res, next) =>
{
    passport.authenticate('jwt', { session: false }, async (err, user, info) =>
    {
        if (err)
        {
            res.status(400).json(err.message);
        }
        if (info)
        {
            console.log(info);
            res.status(400).json(info.message);
        }
        else
        {
            const board = await getOne(req.params.id);
            res.status(200).json(board);
        }
    })(req, res, next)
})
router.get('/boards', (req, res, next) =>
{
    passport.authenticate('jwt', { session: false }, async (err, user, info) =>
    {
        if (err)
        {
            res.status(400).json(err.message);
        }
        if (info)
        {
            console.log(info);
            res.status(400).json(info.message);
        }
        else
        {
            const boards = await getAll(user._id);
            res.status(200).json({ data: boards });
        }
    })(req, res, next);
});
router.post('/boards/add', (req, res, next) =>
{
    passport.authenticate('jwt', { session: false }, async (err, user, info) =>
    { 
        if (err)
        {
            res.status(400).json(err.message);
        }
        if (info)
        {
            console.log(info);
            res.status(400).json(info.message);
        }
        else
        {
            const newBoard = new Board();

            newBoard.owner = user._id;
            newBoard.name = req.body.name;
            newBoard.created = req.body.created;
            const board = await addBoard(newBoard);

            res.status(200).json(board);
        }
    })(req, res, next)
});
router.delete('/boards/delete', (req, res, next) =>
{
    passport.authenticate('jwt', { session: false }, async (err, user, info) =>
    { 
        if (err)
        {
            res.status(400).json(err.message);
        }
        if (info)
        {
            res.status(400).json(info.message);
        }
        else
        {
            const _id = req.body._id;

            const board = await deleteBoard(_id);

            res.status(200).json(board);
        }
    })(req, res, next)
});

router.put('/boards/update', (req, res, next) =>
{
    passport.authenticate('jwt', { session: false }, async (err, user, info) =>
    { 
        if (err)
        {
            res.status.json({ message: err.message });
        }
        if (info)
        {
            res.status.json({ message: info.message });
        }
        else
        {
            const _id = req.body._id;

            let board = await Board.findOne({ _id: _id }, (err, result) =>
            {
                if (err)
                {
                    res.status.json({ message: err.message });
                }
                
            });

            const newBoard = new Board(req.body);
            board = { ...newBoard._doc };

            const result = await updateBoard(_id, board);
            console.log(result);

            res.status(200).json(result);
            

        }
    })(req, res, next)
})

//Posts
router.get('/posts/:id', (req, res, next) =>
{
    passport.authenticate('jwt', {session: false}, async (err, user, info) =>
    {
        if (err)
        {
            res.status(400).json(err.message);
        }
        if (info)
        {
            console.log(info);
            res.status(400).json(info.message);
        }
        else
        {
            const post = await getOnePost(req.params.id);
            res.status(200).json(post);
        }

    })(req, res, next)
})

router.post('/posts/add', (req, res, next) =>
{
    passport.authenticate('jwt', { session: false }, async (err, user, info) =>
    { 
        if (err)
        {
            res.status(400).json(err.message);
        }
        if (info)
        {
            console.log(info);
            res.status(400).json(info.message);
        }
        else
        {
            const newPost = new Post();
            const boardID = req.body.boardID;
            const target = req.body.target;

            newPost.content = req.body.content;
            newPost.created = req.body.created;

            const post = await addPost(boardID ,newPost, target);

            res.status(200).json(post);
        }
    })(req, res, next)
});

router.delete('/posts/delete', (req, res, next) =>
{
    passport.authenticate('jwt', { session: false }, async (err, user, info) =>
    { 
        if (err)
        {
            res.status(400).json(err.message);
        }
        if (info)
        {
            res.status(400).json(info.message);
        }
        else
        {
            const _id = req.body._id;
            const boardID = req.body.boardID;
            const target = req.body.target;

            const post = await deletePost(_id, boardID, target);

            res.status(200).json(post);
        }
    })(req, res, next)
});

router.put('/posts/update', (req, res, next) =>
{
    passport.authenticate('jwt', { session: false }, async (err, user, info) =>
    { 
        if (err)
        {
            res.status.json({ message: err.message });
        }
        if (info)
        {
            res.status.json({ message: info.message });
        }
        else
        {
            const _id = req.body._id;

            let post = await Post.findOne({ _id: _id }, (err, result) =>
            {
                if (err)
                {
                    res.status.json({ message: err.message });
                }
                
            });

            const newPost = new Post(req.body);
            post = { ...newPost._doc };
            const boardID = req.body.boardID;
            const target = req.body.target;

            const result = await updatePost(_id, post, boardID, target);   

            res.status(200).json(result);

        }
    })(req, res, next)
})

module.exports = router;