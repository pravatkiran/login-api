const jwt = require('jsonwebtoken');

module.exports = async(req,res,next)=>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        return res.status(401).json({status: 'fail', msg: 'Not authenticated'})
    }
    const token = authHeader.split(' ')[1];
    try{
        var decodeToken = jwt.verify(token, 'supersecretkey')
    }catch(err){
        console.log('error', err);
        return res.status(500);
    }

    if(!decodeToken){
        return res.status(500).json({status: 'fail', msg: 'Not authenticated'});
    }
    req.id = decodeToken.id;
    req.token = token;
    next();
}