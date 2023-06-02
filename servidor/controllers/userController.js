const jwt = require('jsonwebtoken');

const User = require("../models/User");
const config = require('../config/global');

exports.crearUsuario = async (req, res) => {
    //const { username, email, password } = req.body;
    //console.log(username, email, password)
    //console.log(user)

    try {
        
        const { username, email, password } = req.body;
        const user = new User(
            {
               username,
               email,
               password
            } 
         );

        
        user.password = await user.encryptPassword(user.password)
        await user.save();

        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 60 * 60 * 24
        })
        //res.json({message: 'Received'})
        res.json({auth: true, token})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerUsuario = async (req, res) => {

    const { email, password } = req.body;
    console.log(email, password)

    /*try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        
        if(!user){
            return res.status(404).send("The user doesn't exists");
        }

        const validPassword = await user.validatePassword(password);

        if(!validPassword){
            return res.status(401).json({auth: false, token: null});
        }

        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 60 * 60 * 24
        });
        
        res.json({auth: true, token});
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }*/

}