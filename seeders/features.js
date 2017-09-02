var Feature = require('../model/Feature');
var db = require('../db/con.js');
db.connect(()=>{

    var features = [
        {
            name: "Grande"        
        },
        {
            name: "Pelo esponjoso"
        },
        {
            name: "Chitzu"
        },
        {
            name: "Negro"
        },
        {
            name: "Hembra"
        },
        {
            name: "Macho"
        },
        {
            name: "Orejas cortada"
        },
        {
            name: "Enfermo"
        }
    ];

    let fFeature = []
    
    features.forEach(function(feature) {
        fFeature.push(Feature.create(feature));
    });

    Promise.all(fFeature)
            .then(()=>process.exit())
            .catch(()=>console.log('dasdas'));
    
})    
