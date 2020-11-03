const Post = require('../models/Post');
const Board = require('../models/Board');

exports.addPost = async (boardID, post, target) =>
{
    try
    {   
        const resPost = await post.save();

        let board = await Board.findOne({ _id: boardID });

        board[target].unshift({ _id: resPost._id, content: post.content });

        const result = await Board.findByIdAndUpdate(boardID, board);

        return resPost;

    } catch (e)
    {
        console.log(e)
        return {};
    }
}

exports.getOnePost = async (_id) =>
{
    try
    {
        const result = await (Post.findById(_id));
        return result

    } catch (e)
    {
        console.log(e);
    }
}

exports.deletePost = async (_id, boardID, target) =>
{
    try
    {

        if (!_id)
        {
            return {};
        }

       await Post.deleteOne({ _id: _id }, async (err, result) =>
        {
            if (err)
            {
                return {};
            }
        })

        let board = await Board.findOne({ _id: boardID });
        
            
        const index = board[target].findIndex(item =>
        {
            return item._id.toString() == (_id);
        });

        const tempBoard = new Board(board);
        tempBoard[target].splice(index, 1);

        await Board.findByIdAndUpdate(boardID, tempBoard);

        return tempBoard;

    } catch (e)
    {
        console.log(e)
    }
}

exports.updatePost = async (_id, post, boardID, target) =>
{
    try
    {
        await Post.findByIdAndUpdate( _id ,  post , (err, result) =>
        {
            if (err)
            {
                console.log(err);
                return {};
            }
        })

        
        let board = await Board.findOne({ _id: boardID });
        
            
        const index = board[target].findIndex(item =>
        {
            return item._id.toString() == (_id);
        });

        const tempBoard = new Board(board);
        tempBoard[target][index] = post;

        const result = await Board.findByIdAndUpdate(boardID, tempBoard, {new: true});

        return result;

        
    } catch (e)
    {
        console.log(e);
        return {};
    }
}