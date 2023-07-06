const db = require('./db')
const logic = require('./logic')


// logic to delete history 
const deletehistory = (_id) => {
    return db.Animeuser.findOne({
        _id
    })
        .then((result) => {
            if (result) {
                history = result.history
                console.log('the detailed information of a persons history', history);
                if (history.length == 0) {
                    return {
                        statuscode: 401,
                        message: 'you havent watched anything to delete'
                    }
                }
                else {
                    result.history = []
                    result.save()
                    // gethistory()
                    return {
                        statuscode: 200,
                        message: 'History is cleared'
                    }
                }
            }
            else {
                return {
                    statuscode: 401,
                    message: 'Invalid credentials'
                }
            }
        })
}



// logic to delete   watchlater
const deletwatchlater = (_id) => {
    return db.Animeuser.findOne({
        _id
    })
        .then((result) => {
            if (result) {
                watchlater = result.watchlater
                console.log('the detailed information of a persons watchlater', watchlater);
                if (watchlater.length == 0) {
                    return {
                        statuscode: 401,
                        message: 'Nothing in watchlater'
                    }
                }
                else {
                    result.watchlater = []
                    result.save()
                    // gethistory()
                    return {
                        statuscode: 200,
                        message: 'watchlater  is empty'
                    }
                }
            }
            else {
                return {
                    statuscode: 401,
                    message: 'Invalid credentials'
                }
            }
        })
}

// to delete particular details of animation from history&watchlater

// logic to delete a particular animation
const deleteanimation = (_id, animeid) => {
    return db.Animeuser.findOne({ _id })
        .then((result) => {
            if (result) {
                console.log('the element', result);
                let index = result.history.findIndex((element) => element._id === animeid);
                console.log('dsddds is', index);
                if (index !== -1) {
                    result.history.splice(index, 1);
                    result.save();
                    return {
                        statuscode: 200,
                        message: 'deleted successfully from the history'
                    };
                } else {
                    return {
                        statuscode: 404,
                        message: 'Invalid data'
                    };
                }
            } else {
                return {
                    statuscode: 404,
                    message: 'User not found'
                };
            }
        })
        .catch((err) => {
            return {
                statuscode: 500,
                message: err.message
            };
        });
};


// logic to delete a particular animation
const deleteanimationwatchlater = (_id, animeid) => {
    return db.Animeuser.findOne({ _id })
        .then((result) => {
            if (result) {
                console.log('the element', result);
                let index = result.watchlater.findIndex((element) => element._id === animeid);
                console.log('dsddds is', index);
                if (index !== -1) {
                    result.watchlater.splice(index, 1);
                    result.save();
                    return {
                        statuscode: 200,
                        message: 'deleted successfully from the watchlater'
                    };
                } else {
                    return {
                        statuscode: 404,
                        message: 'Invalid data'
                    };
                }
            } else {
                return {
                    statuscode: 404,
                    message: 'User not found'
                };
            }
        })
        .catch((err) => {
            return {
                statuscode: 500,
                message: err.message
            };
        });
};



// logic to update a particular animations
const update = (_id, animationbg, animename, animeimage, animedescription, animegenre, animetimeduration, animetrailor, animescreenplaystoryby, animedirector, animescreenplayby, animestoryby, animewriter) => {
    return db.Animationcollection.updateMany({
        _id
    }, {
        $set: { animationbg, animename, animeimage, animedescription, animegenre, animetimeduration, animetrailor, animescreenplaystoryby, animedirector, animescreenplayby, animestoryby, animewriter }

    })
        .then((result) => {
            if (result) {
                console.log('the updated result is', result);
                return {
                    statuscode: 200,
                    message: result
                }
            }
            else {
                return {
                    statuscode: 401,
                    message: 'Invalid details'
                }
            }
        })

}











module.exports = {
    deletehistory,
    deleteanimation,
    deletwatchlater,
    deleteanimationwatchlater,
    update
}