// import db.js
const db = require('./db');

// import otp package
// import * as notp from 'notp';

const notp = require('notp');

// secret key used to generate otp
const otpgeneration = () => {

}
const mongoose = require('mongoose');




// ========DOUBT===========
// DO I NEED TO IMPORT MONGOOSE
// ==========DOUBT============


// arrow functions
const solution = (uname, email, pswd, dob, option, gender) => {
    // console.log('We are checking whether the user exist or not');
    return db.Animeuser.findOne({
        email
    })
        .then((result) => {
            console.log(result);
            if (result) {
                return {
                    statuscode: 401,
                    message: 'Already exists'
                }


            }
            else {
                const newuser = new db.Animeuser({
                    // right hand side uname is the argument specified indside the solution function
                    uname: uname,
                    // right hand side email is the argument specified indside the solution function

                    email: email,
                    // right hand side pswd is the argument specified indside the solution function

                    pswd: pswd,
                    // right hand side pswd is the argument specified indside the solution function

                    // right hand side mobile is the argument specified indside the solution function

                    dob: dob,
                    // right hand side dob is the argument specified indside the solution function

                    option: option,
                    // right hand side option is the argument specified indside the solution function

                    gender: gender,
                    // right hand side gender is the argument specified indside the solution function
                    likedvideos: [],
                    watchlater: [],
                    history: []

                })
                newuser.save();
                return {
                    statuscode: 200,
                    message: 'Created a profile for him/her'
                }

            }
        })
}

// to fetch data from database

const display = () => {
    return db.Animeuser.find({})
        .then((result) => {
            if (result) {
                console.log(result, 'result is');

                return {
                    message: result,
                    statuscode: 200,
                }

            }
            else {
                return {
                    statuscode: 401,
                    message: 'Nothing in the database'
                }
            }
        })
}

// to check login details of admin 
// create a function
const admin = (emailid, pswd) => {
    // to check whether the control has reached inside of this function 
    console.log('the control has reached in the admin function session');
    // we need to check whether this person is the admin of the website
    // we will crosscheck details given in the arguments with the information mentioned in the database
    // to check whether a given data is present inside the databaase
    // so to do that we need to create a model inside the db.js
    return db.Admindetail.findOne({
        username: emailid,
        password: pswd
        // the value of emailid is kept in the key username(where username is the key that we had given in the model)
    })
        // this is a asynchronous function
        .then((result) => {
            // the result has two values
            //   --admin is present
            if (result) {
                // ====generate token===
                // we need to generate token when the admin exists
                // assign the generated token to a variable
                // we use sign method to generate webtoken
                // otpgeneration()
                const secret = 'mysecretkey';

                // to generate time based one time password using 'notp.totp.gen' method:
                const totp = notp.totp.gen(secret);
                console.log('the otp is totp ', totp);



                return {
                    statuscode: 200,
                    message: 'Admin exists',
                    totp,
                    email: result.username

                }

            }
            // --invalid admin details:admin is not present here
            else {
                return {
                    statuscode: 401,
                    message: 'Invalid Admin details'

                }
            }
        })
}

// FUNCTION TO ADD ANIMATION IN THE BACKEND
const addanimation = (animationbg, animename, animeimage, animedescription, animegenre, animetimeduration, animetrailor, animescreenplaystoryby, animedirector, animescreenplayby, animestoryby, animewriter) => {
    // check wheteher the given animation exists in the backend
    return db.Animationcollection.findOne({
        animename
    })
        //  exist
        .then((result) => {
            if (result) {
                return {
                    statuscode: 401,
                    message: 'Already animation exists'

                }
            }
            else {
                // to access date
                const date = new Date();
                const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-IN', options);

                // const time=new Date()
                // console.log(time);
                // const date=time.getDate();
                // const month=time.getMonth();
                // const year=time.getYear()
                // console.log(year);
                // console.log(date);
                // create object using mongoose
                const newanimation = new db.Animationcollection({
                    animationbg,
                    animename,
                    animeimage,
                    animedescription,
                    animegenre,
                    animetimeduration,
                    animetrailor,
                    animescreenplaystoryby,
                    animedirector,
                    animescreenplayby,
                    animestoryby,
                    animewriter: '',
                    animedateofdisplay: formattedDate,
                    animeviewerscount: 0
                })
                // save data in mongodb

                newanimation.save()
                return {
                    statuscode: 200,
                    message: 'Added successfully',
                }
            }
        })
}

// function to display all details on the animation table
const displayanimeontable = () => {
    return db.Animationcollection.find({})
        .then((result) => {
            if (result) {
                return {
                    statuscode: 200,
                    message: result
                }
            }
            else {
                return {
                    statuscode: 401,
                    message: 'This table is empty'
                }
            }

        })
}

// logic to obtain a particular animation from backend
const particularanimation = (_id) => {
    return db.Animationcollection.findOne({
        _id
    })
        // asynchronous function

        .then((result) => {
            // if that particular animation exist
            if (result)
                return {
                    statuscode: 200,
                    message: result
                }
            // if animation doesnt exist
            else {
                return {
                    statuscode: 401,
                    message: 'There is no animation exists'
                }
            }
        })
}

// function to check the login credentials of a particular person
const logindetails = (username, password) => {
    console.log('the call has reached on the logic session');
    // to check whther the user exist or not
    return db.Animeuser.findOne({
        email: username,
        pswd: password,

    })
        .then((result) => {
            // if username exists
            if (result) {
                console.log('the answer is', result);
                return {
                    statuscode: 200,
                    message: 'User exists',
                    uname: result.uname,
                    email: result.email,
                    wishlist: result.watchlater,
                    _id: result._id
                }
            }
            // there is no user
            else {
                return {
                    statuscode: 401,
                    message: 'Invalid credentials'
                }
            }
        })

}

// function to define the logic to obtain the number of animations from backend
const animationcount = () => {
    return db.Animationcollection.countDocuments()
        //  asynchronous function
        .then((result) => {
            // here the value of the result is  a number 
            console.log(result);
            return result
        })

}
// function to define the logic to obtain the number of admin from backend
const admincount = () => {
    return db.Admindetail.countDocuments()
        //  asynchronous function
        .then((result) => {
            // here the value of the result is  a number 
            console.log(result);
            return result
        })

}
// function to define the logic to obtain the number of users from backend
const userscount = () => {
    return db.Animeuser.countDocuments()
        //  asynchronous function
        .then((result) => {
            // here the value of the result is  a number 
            console.log(result);
            return result
        })

}

// logic to delete a particular animation
const deleteanimation = (_id) => {
    return db.Animationcollection.deleteOne({
        _id
    })

        .then((result) => {
            if (result) {
                console.log('hgjhfjsfhjfaf', result);
                return {
                    statuscode: 200,
                    message: 'Successsfully deleted'
                }
            }
            else {
                return {
                    statuscode: 401,
                    message: 'No item found'
                }
            }

        })
}

// logic to add to wishlist

const wishlist = (email, _id, animename, animeimage) => {
    return db.Animeuser.findOne({
        email
    })
        .then(
            (result) => {
                if (result) {
                    console.log('result.watchlater', result.watchlater);

                    if (result.watchlater == '') {
                        result.watchlater.push({
                            _id,
                            animename,
                            animeimage
                        })
                        // result.watchlater.save()
                        result = result.save()
                        return {
                            statuscode: 200,
                            message: "Successfully addded",

                        }
                    }
                    else {
                        for (let item of result.watchlater) {

                            if (item.animename == animename) {
                                // alert('Already exist')
                                console.log('Already present in the watchlist');
                                return {
                                    statuscode: 401,
                                    message: "Already present in the watchlist"
                                }
                            }
                        }
                        const date = new Date();
                        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
                        const formattedDate = date.toLocaleDateString('en-IN', options);


                        result.watchlater.push({
                            _id,
                            animename,
                            animeimage,
                            watchlateradddate: formattedDate
                        })
                        result = result.save()
                        return {
                            statuscode: 200,
                            message: "Successfully addded"

                        }



                    }

                }
                else {
                    return {
                        statuscode: 401,
                        message: "invalid User credentials"
                    }
                }
            }
        )
    // console.log('the result is',result);
    // return result

}

// logic for getting all animations in watchlater array
const getwatchlater = (_id) => {
    return db.Animeuser.findOne({
        _id
    })
        .then((result) => {
            if (result) {
                console.log(result);
                console.log(result.watchlater);
                let item = result.watchlater
                console.log('all collection of animations', item);
                if (item == '') {
                    return {
                        statuscode: 401,
                        message: 'Nothing Added'
                    }
                }
                else {
                    return {
                        statuscode: 200,
                        message: item
                    }
                }

            }
            else {
                return {
                    statuscode: 401,
                    message: 'Invaid credentials'
                }
            }
        })
}

// logic to add animation to history

const history = (_id,animeid, animename, animeimage, animetrailor) => {
    return db.Animeuser.findOne({
        _id
    })
        .then(
            (result) => {
                if (result) {
                    console.log('result.history', result.history);

                    if (result.history == '') {
                        result.history.push({
                            _id:animeid,
                            animename,
                            animeimage,
                            animetrailor
                        })
                        // result.watchlater.save()
                        result = result.save()
                        return {
                            statuscode: 200,
                            message: "Successfully addded"
                        }
                    }
                    else {

                        const date = new Date();
                        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
                        const formattedDate = date.toLocaleDateString('en-IN', options);


                        result.history.push({
                            _id:animeid,
                            animename,
                            animeimage,
                            animetrailor,
                           historydate: formattedDate
                        })
                        result = result.save()
                        return {
                            statuscode: 200,
                            message: "Successfully addded"

                        }



                    }

                }
                else {
                    return {
                        statuscode: 401,
                        message: "invalid User credentials"
                    }
                }
            }
        )
    // console.log('the result is',result);
    // return result


}

// logic for getting all animations in history array
const gethistory = (_id) => {
    return db.Animeuser.findOne({
        _id
    })
        .then((result) => {
            if (result) {
                console.log(result);
                console.log(result.history);
                let item = result.history
                console.log('all collection of animations', item);
                if (item == '') {
                    return {
                        statuscode: 401,
                        message: 'Nothing is in the history'
                    }
                }
                else {
                    return {
                        statuscode: 200,
                        message: item
                    }
                }

            }
            else {
                return {
                    statuscode: 401,
                    message: 'Invaid credentials'
                }
            }
        })
}














const inwishlist = (email) => {
    // return db.Animeuser.findOne({
    //     email
    // })

}























// logic for how to download a video
// const download=(_id)=>{
//     console.log(_id);
//     return db.Animationcollection.findOne({
//         _id
//     })
//     .then((result)=>{
//         if(result){
//             console.log('the output is',result);
//             return{
//                 statuscode:200,
//                 message:result
//             }
//         }
//         else{
//             return{
//                 statuscode:401,
//                 message:'Nothing in the store'
//             }
//         }
//     })
// }






//  // Use the transporter to send the email, including the OTP in the email body:
// const otp = notp.totp.gen(secret);
//   to send otp via email
// we need to export all the function that we define here inorder to use them in other files

module.exports = {
    solution,
    display,
    admin,
    addanimation,
    displayanimeontable,
    particularanimation,
    logindetails,
    animationcount,
    admincount,
    userscount,
    deleteanimation,
    wishlist,
    inwishlist,
    getwatchlater,
    history,
    gethistory
    // download
}










