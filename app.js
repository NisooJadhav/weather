const express=require("express")
const https=require("https")
const bodyParser=require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res)
{
    
    const query=req.body.cityName
    const apiKey="83e6e24dab841aae8110feeb0a0980aa"
    const unit="metric"

    const url="https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apiKey+ "&units="+unit
    https.get(url,function(response)
    {
        console.log(response.statusCode)

        response.on("data",function(data)
        {
            const weatherData=JSON.parse(data)
            const temp=weatherData.main.temp
            const weatherDescription=weatherData.weather[0].description
            
            res.write("<p>The weather is currently "+weatherDescription+"</p>")
            res.write("<h1>Temperature in "+query+" is "+temp+" degree celcius</h1>")
            

            const id=weatherData.weather[0].id
            const icon=weatherData.weather[0].icon
            const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"

            res.write("<img src="+imageUrl+">")
            //console.log(id)
            console.log(temp)
            console.log(weatherDescription);
            res.send()
        })
    })
})

app.listen(3000,function()
{
console.log("server started at port 3000")
})