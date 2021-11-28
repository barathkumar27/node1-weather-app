
const { hasSubscribers } = require("diagnostics_channel")
const express =require("express")
const path = require('path')
const hbs = require('hbs')
const app = express()
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')


//Setups handlebars engine and views location--> for dynamic web pages
app.set('view engine', "hbs")
app.set('views', viewsPath)
hbs.registerPartials( partialsPath)


// app.use(express.static(publicDirectoryPath))--> used for static html pages
// app.get('',(req,res)=>{
//   res.send("<h1>Weather</h1>")
// })-->will not be used since we used express.static, which will search for index.html in public directory
//incoming request to the server-req

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index',{
        title:"Weather app",
        name:"barath"
    })
})

app.get("/about",(req,res)=>{
    res.render('about', {
        title:"About me",
        name: 'barath'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title:"Help",
        name:"barath",
        helptext: "this is some helpful text"
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            "error": "You must provide address search term"
        })
    }
  
    geocode (req.query.address,(error,{latitude, longitude, location}={})=>{
    
        if (error){
            return res.send({error}) //shorthand syntax for error: error
        } 
    
        forecast(latitude,longitude,(error, forecastData)=>{
            if (error){
                return res.send({error})
            }

            res.send({
                location,
                "forecast":forecastData,
                "address":req.query.address
            })
            
        })
    
    })
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            "error": "You must provide a search term"
        })
    } 
        res.send({
            product:[]
        })
        console.log((req.query.search))

})

app.get('/help/*',(req,res)=>{
    res.render('errpg', {title:404, error:"help article not found",name:"barath"})
})

app.get('*',(req,res)=>{
    res.render('errpg', {title:404,error:"oops! page not found",name:"barath"})
})



app.listen(port,()=>{
    console.log("server is connetcted to port 3000")
})