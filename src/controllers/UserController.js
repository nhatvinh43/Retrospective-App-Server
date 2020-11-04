const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.updateUser = async (_id, user) =>
{
    try
    {
        const result = await User.findByIdAndUpdate(_id, user, { new: true }, (err, result) =>
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
