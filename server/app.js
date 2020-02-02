const express=require("express");
const fs=require('fs')
const next=require('next');
const path=require("path")

//require lib

const Lib =require('./lib');

const dev=process.env.NODE_ENV!=='production';

const app=next({dev});

const port=process.env.PORT||3000;

///const Root_Url=`http://localhost:${port}`;

//var p=new Lib('world-population-by-world-regions-post-1820.csv','country-capitals.csv')



const handle=app.getRequestHandler();



app.prepare().then(async()=>{


	const server=express();

	server.use(express.static(path.resolve(__dirname,"files")));
	



	server.get('/',async(req,res)=>{

		app.render(req,res,'/')
	})

	server.get("/worldpopulation",(req,res)=>{
	const datas=Lib.displayData_worldPopulation();
	res.json(datas)
})



	// get countries name;

	server.get("/countryNames",(req,res)=>{

		/*

fs.readFile("world-population-by-world-regions-post-1820.csv","utf-8",(err,data)=>{
	if(err){
		console.log(err.message)
	}

	console.log(data)
});
	*/

	//console.log(Lib.countries_PopulationBy_Year('2019'))

	var countries=Lib.getCountries_urban_rural();

		res.json(countries)
	})



	// get population of countries by year
server.get('/:year',async(req,res)=>{

	const {year}=req.params;
//get populations.
	

	// render index 


	try{
		var populations=await Lib.countries_PopulationBy_Year(year);
		res.json(populations);

	}catch(err){
		res.json({error:err.message});
	}


	
});





	// get individual country population data for every year or (every 10 year)



server.get("/country/:name",(req,res)=>{

// working

var country=Lib.country_pop(req.params.name)
	res.json(country)
})




// for urban and rural

server.get("/countryUrbanandRural/:name",(req,res)=>{
	var country=Lib.countryName(req.params.name);


	res.json(country);
})


// get the country name from the "urban-vs-rural-majority.csv" file
//the reason we choose this file to get country name is .. we are graphing base on this file
	server.get("/fuck",(req,res)=>{

		/*

fs.readFile("world-population-by-world-regions-post-1820.csv","utf-8",(err,data)=>{
	if(err){
		console.log(err.message)
	}

	console.log(data)
});
	*/

	//console.log(Lib.countries_PopulationBy_Year('2019'))

		res.json({name:"fsdfsf"})
	})































	server.get("*",(req,res)=>(handle(req,res)));


	server.listen(port,(err)=>{

		if(err){
			throw err;
		}
		console.log("listining.....................")
	})

})