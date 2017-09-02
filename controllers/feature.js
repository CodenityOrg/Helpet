let Feature = require('../model/Feature');

module.exports = {
    getForQuery(req,res){
        let q = req.query.q;
        Feature.find({ name: new RegExp(q,"i") })
            .then((features)=>res.send(JSON.stringify(features),200))
            .catch((err)=>{
                console.log(err)
                return res.send(null,503);
            })
    }
}