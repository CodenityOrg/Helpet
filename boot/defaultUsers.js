// const User = require("../model/User");

// const defaultUsers = [
//     {
//         email: "angel.rodriguez@helpet.org",
//         password: "helpet123",
//         firstName: "Angel",
//         lastName: "Rodriguez"
//     },
//     {
//         email: "julio.pari@helpet.org",
//         password: "helpet123",
//         firstName: "Julio",
//         lastName: "Pari"
//     },
//     {
//         email: "alvaro.morales@helpet.org",
//         password: "helpet123",
//         firstName: "Alvaro",
//         lastName: "Morales"
//     }
// ]


// module.exports = () => {
//     defaultUsers.forEach(user => {
//         const promises = [];
//         User.findOne({ email: user.email })
//             .then((userFound) => {
//                 if (!userFound) {
//                     promises.push(User.register(user));
//                 }
//             })
//     })

//     Promise.all(promises)
// }