const bcrypt = require('bcrypt')
const SALT_ROUND = parseInt(process.env.SALT_ROUND)
const hash = (str)=>{
    try{
        const salt = bcrypt.genSaltSync(SALT_ROUND)
        return bcrypt.hashSync(str , salt) 
    }catch(e){
        console.log(e);
        return null 
    }
}

const compare= (str  ,hash)=>{
    try{
        return bcrypt.compareSync(str , hash)
    }catch(er){
        console.log(er);
        return false
    }
}
module.exports = {hash , compare}