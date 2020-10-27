const Board = require('../models/Board');

exports.getAll = async (req, res) =>
{
    try
    {
        const result = await (Board.find({}).sort({ created: "desc" }));
        res.json(result);
    } catch (e)
    {
        console.log(e);
    }
}

exports.addBoard = async (req, res) =>
{
    try
    {
        const name = req.body.name;
        if (!name)
        {
            res.status(400).send({message: "400"});  
            return;
        }
        const created = new Date(req.body.created)
        const newBoard = new Board();
        newBoard.name = name;
        newBoard.created = created;
        const result = await newBoard.save();
        res.json(result);
    } catch (e)
    {
        console.log(e)
    }
}

exports.deleteBoard = async (req, res) =>
{
    try
    {
        const _id = req.body._id;
        console.log(_id);
        if (!_id)
        {
            res.status(400).send({message: "400"});  
            return;
        }

        const result = await Board.find({ _id: _id }).remove(err =>
        {
            console.log(err);
        });

        res.json(result);
    } catch (e)
    {
        console.log(e)
    }
}