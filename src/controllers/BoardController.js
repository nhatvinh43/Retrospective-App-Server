const Board = require('../models/Board');
exports.getAll = async (_id) =>
{
    try
    {
        const result = await (Board.find({ owner: _id }).sort({ created: "desc" }));
        return result
    } catch (e)
    {
        console.log(e);
    }
}

exports.getOne = async (_id) =>
{
    try
    {
        const result = await (Board.findById(_id));
        return result

    } catch (e)
    {
        console.log(e);
    }
}

exports.addBoard = async (board) =>
{
    try
    {   
        const result = await board.save();
        return result;

    } catch (e)
    {
        console.log(e)
        return {};
    }
}

exports.deleteBoard = async (_id) =>
{
    try
    {

        if (!_id)
        {
            return {};
        }

        const result = await Board.deleteOne({ _id: _id }, (err, result) =>
        {
            if (err)
            {
                return {};
            }
            return result;
        })

        return result;
    } catch (e)
    {
        console.log(e)
    }
}

exports.updateBoard = async (_id, board) =>
{
    try
    {
        const result = await Board.findByIdAndUpdate( _id ,  board ,{new: true},  (err, result) =>
        {
            if (err)
            {
                console.log(err);
                return {};
            }
        })

        return result;

        
    } catch (e)
    {
        console.log(e);
        return {};
    }
}