// starting point
const express = require('express')
// create a server app using express
const server = express()
// install cors
const cors = require('cors')
// import logic.js
const logic = require('./services/logic')
// import library.js
const library=require('./services/library')
// using cors specify origin to server
server.use(cors({
    // ==========DOUBT============
    origin: "http://localhost:4200"
    // ==========DOUBT============
}))
// convert to json
server.use(express.json())
// port number
server.listen(3000, () => {
    // this execute in the command panel
    console.log('server is listening in the port number 3000');
})

server.post('/register', (req, res) => {
    console.log("request has reached the backend session");
    console.log(req.body);
    // user existing
    // not existing
    logic.solution(req.body.uname, req.body.email, req.body.pswd,  req.body.dob, req.body.option, req.body.gender)
        .then((result) => {
            res.status(result.statuscode).json(result)
        })

    
})

// ====TABLE++++++++
server.get('/table', (req, res) => {
    console.log('reached on the logic function');
    console.log();
    logic.display()
    .then((result) => {
        console.log('what index get is ');
        console.log('ansewer to the question is:',result);
        res.status(result.statuscode).json(result)

    })
// res.status(result.statuscode).json(result)
// console.log('the last output is',res.status(result));
})

// ===========FUNCTION TO GET ADMIN DETAILS+================

// backend logic:how to check whether the admin is a already existing on

server.post('/navbar',(req,res)=>{
    // to check whether the control has eached here

console.log('request reached in the admin session');
console.log(req.body);
    // here we need to tell the logic to resolve this crisis
    // so we will tell the logic insidde a function in logic.js and what we do is we will call that function here
    logic.admin(req.body.username,req.body.password)
    // /this is asynchronous function 
    .then((data)=>{
        // data has two values:
        //     --{statuscode:200,and its corresponding message} or {statuscode:401,and its corresponding message}
        
        console.log('whether the data has otp in it',data);
        res.status(data.statuscode).json(data)

    })
    // we need to send response to the frontend
})


// request from frontend to add a new animation movie in the database
server.post('/adminpage',(req,res)=>{
    console.log('request for adding a new ANIMation has reached in the backend');
    // index explains the logic to resolve this request
    logic.addanimation(req.body.animationbg,req.body.animename,req.body.animeimage,req.body.animedescription,req.body.animegenre,req.body.animetimeduration,req.body.animetrailor,req.body.animescreenplaystoryby,req.body.animedirector,req.body.animescreenplayby,req.body.animestoryby,req.body.animewriter)
    .then((result)=>{
        console.log('the result is',result);
        res.status(result.statuscode).json(result)
    })
})


// request  to display all the details in the table
server.get('/table-animationdetails',(req,res)=>{
    console.log('Successfully reached in tableanimation function');
    // logic to display details on the table
    logic.displayanimeontable()
    .then((result)=>{
console.log(result);
res.status(result.statuscode).json(result)
})
})

// request to view a particular animation
// server.get('/table-animationdetails/:id')











// request to fetch the details of a particular animation
// server.get('/adminpage/:id',(req,res)=>{
//     console.log('the request has reached on the viewanimation details');
// })

// request to fetch the logindetails of a particular person
server.post('/login',(req,res)=>{
    console.log('the call has reached over the funtion side');
    console.log('the request body is 1234567890',req.body);
    // to check whether the login details are correct or not
    // we will call a function and specify the logic inside of it
    logic.logindetails(req.body.email,req.body.pswd)
    .then((result)=>{
        console.log('the final outcome from logic session',result);
        res.status(result.statuscode).json(result)
    })
})

// request to  get the details of a particular animation
server.get('/viewanimation/:_id',(req,res)=>{
    console.log('Request to view particular animation');
    // our body is empty,we get the name of the particular animation from its url/params
    console.log(req.params)
    logic.particularanimation(req.params._id)
    // asynchronous function
    .then((result)=>{
        res.status(result.statuscode).json(result)
    })
})

// request to get the number of animations from backend
server.get('/admin-page/animecount',(req,res)=>{
    console.log('the call has reached on the animecount function');
    logic.animationcount()
    .then((result)=>{
        console.log(result);
        res.status(200).json(result) 
      })
})
// request to get the number of admin from backend
server.get('/admin-page/admincount',(req,res)=>{
    console.log('the call has reached on the animecount function');
    logic.admincount()
    .then((result)=>{
        console.log(result);
        res.status(200).json(result) 
      })
})
// request to get the number of users from backend
server.get('/admin-page/userscount',(req,res)=>{
    console.log('the call has reached on the animecount function');
    logic.userscount()
    .then((result)=>{
        console.log(result);
        res.status(200).json(result) 
      })
})

// request to delete a particular animation 
server.delete('/admin-page/delete/:_id',(req,res)=>{
    console.log('the function as reached on the delete session');
    console.log(req.params);
logic.deleteanimation(req.params)
.then((result)=>{
    console.log(result);
    res.status(200).json(result)
})
})

// request to download a particular animations
// server.get('/downloadanimation/:_id',(req,res)=>{
//     console.log('the request for download has reached on the server side');
//     console.log(req.params);
//     // console.log(req.body);
//     logic.download(req.params)
//     .then((result)=>{
//         console.log(result.message.animetrailor);
//         res.set('Content-Type', 'video/mp4');
        
// })
// })

// request to add to wishlist
server.post('/wishlist/:email',(req,res)=>{
    console.log(req.params);
    console.log('params is',req.params.email);
    console.log('body is',req.body);
    console.log('the call has reached on the wishlist session');
    logic.wishlist(req.params.email,req.body._id,req.body.animename,req.body.animeimage)
    .then((result)=>{
        console.log('wewewewe',result);
 
        res.status(200).json(result)
    })
})

   //  request to check whether the animation is already in wishlist

server.get('/wishlistcheck/:email',(req,res)=>{
    // console.log('the call has reached on the wishlist check function');
    // logic.inwishlist(req.params)
    // .then((result)=>{
    //     console.log(result);
    //     res.status(200).json(result) 
    //   })
})

// request to get animations in watchlater
server.get('/watchlater/:_id',(req,res)=>{
    console.log('request has reached on the watchlater function');
    logic.getwatchlater(req.params)
    .then((result)=>{
        res.status(200).json(result)
    })
})
// request to add animation to history
server.post('/addtohistory/:_id',(req,res)=>{
    console.log(req.params);
    // console.log('params is',req.params.email);
    console.log('body is',req.body);
    console.log('idd',req.body.animeid);
    console.log('the call has reached on the wishlist session');
    logic.history(req.params,req.body.animeid,req.body.animename,req.body.animeimage,req.body.animetrailor)
    .then((result)=>{
        console.log('wewewewe',result);
 
        res.status(200).json(result)
    })
})

// request to get animations from history
server.get('/history/:_id',(req,res)=>{
    console.log('request has reached on the history function');
    logic.gethistory(req.params)
    .then((result)=>{
        res.status(200).json(result)
    })
})

// request to delete the history
server.delete('/deletehistory/:_id',(req,res)=>{
    console.log('request has reached on the history function');
    library.deletehistory(req.params)
    .then((result)=>{
        res.status(200).json(result)
    })
})


// request to delete the watchlater
server.delete('/watchlaterhistory/:_id',(req,res)=>{
    console.log('request has reached on the watchlater function');
    library.deletwatchlater(req.params)
    .then((result)=>{
        res.status(200).json(result)
    })
})









// delete a particular animation from the history
server.delete('/deleteonehistory/:_id/:animeid',(req,res) => {
    console.log('The delete function has reached the server');
    console.log(req.params);
    library.deleteanimation(req.params._id,req.params.animeid)
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
 
  });







  
// delete a particular animation from the history
server.delete('/deleteonewatchlater/:_id/:animeid',(req,res) => {
    console.log('The delete function has reached the server');
    console.log(req.params);
    library.deleteanimationwatchlater(req.params._id,req.params.animeid)
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
 
  });
  

  // update a particular animation from the history
server.put('/updateanimation/:_id',(req,res) => {
    console.log('The update function has reached the server');
    console.log(req.params);
    library.update(req.params._id,req.body.animationbg,req.body.animename,req.body.animeimage,req.body.animedescription,req.body.animegenre,req.body.animetimeduration,req.body.animetrailor,req.body.animescreenplaystoryby,req.body.animedirector,req.body.animescreenplayby,req.body.animestoryby,req.body.animewriter)
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
 
  });
