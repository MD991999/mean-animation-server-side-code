// import mongoose
const mongoose=require('mongoose')
// connection 
mongoose.connect('mongodb://localhost:27017/animation')
// create model
const Animeuser=mongoose.model('Animeuser',{
    uname:String,
    email:String,
    pswd:String,
    dob:String,
    option:String,
    gender:String,
    likedvideos:[],
    watchlater:[],
    history:[]
})

// create a model for adding animation
const Animationcollection=mongoose.model('Animationcollection',{
    animationbg:String,
    animename:String,
    animeimage:String,
    animedescription:String,
    animegenre:String,
    animetimeduration:String,
    animetrailor:String,
    animescreenplaystoryby:String,
    animedirector:String,
    animescreenplayby:String,
    animestoryby:String,
    animewriter:String,
    animedateofdisplay:String,
    animeviewerscount:String
})



// create a model for admin details
const Admindetail=mongoose.model('Admindetail',{
    username:String,
    password:String
})
// we need to export the models that we define here inorder to use them in other files
module.exports={
    Animeuser,
    Admindetail,
    Animationcollection
}