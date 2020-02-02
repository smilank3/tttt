
const fs=require('fs');
const path=require('path');
/*


// read file
var k=fs.readFileSync('ex.csv','utf-8');

//convert into json
var list=csvJSON(k);

list.map((ele)=>{
	console.log(elem);
	
})
*/



class pro{

	constructor(csv1,csv2,csv3,csv4){
    this.csv1=csv1;
    this.csv2=csv2;
    this.csv4=csv4;
    this.csv3=csv3;

	}


	csv_to_Json(csv){
	 const lines = csv.split('\n');
    const result = []
    const headers = lines[0].split(',')

    

   

    for (let i = 1; i < lines.length; i++) {        
        if (!lines[i])
            continue
        const obj = {}
     
        const currentline = lines[i].split(',')

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
        }

       
        result.push(obj)
    }
    return result
	}

// convert csv file to json for carriage return
  csv_to_Json2(csv){
   const lines = csv.split('\r');
    const result = []
    const headers = lines[0].split(',')

    
   

    for (let i = 1; i < lines.length; i++) {        
        if (!lines[i])
            continue
        const obj = {}
     
        const currentline = lines[i].split(',')

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
        }

       
        result.push(obj)
    }
    return result
  }



  // reads file and return file in json format

	 readFile(csv){

		var file=fs.readFileSync(csv,"utf-8");



		var list=this.csv_to_Json(file);

	
  // return json file;

		return list;



	}



// merged two csv if csv1, is missing some props from csv2;
// this merged is apparently slow.
	async  merged(f1,f2){

var list=[];

var matched;
for(var e of f1){
	


matched=false;
    		
// loop over data2;
    		for(var i of f2){

    			//console.log(i.CountryCode)

    			// check if the props' value are same
    			// in this case 'Enitity name' and  'countryName';

    			//if same value then put the props form data2 to data1;



    		if(e.Entity===i.CountryName){

    			console.log(e.Entity)
    		

    		// if same country then we add longitiude and latitude and..
    		e.capital=i.CapitalName;

    		// we make country's longitude to CapitalLongitude and ...
    		e.longitude=Number(i.CapitalLongitude);
    		e.latitude=Number(i.CapitalLatitude);


      //push color for population bubbles

      e.color='#' + (Math.random().toString(16) + "000000").substring(2,8);

    		

    		matched=true;

    		break;
    		
    		}

    		

    			


    		}

    		
// if the same country then push to make data formation same;
// if mathced=false then the data props doesnot seems to matched; 
// which means at some point the data is broken so we disgard that data.
    		if(matched){
    			list.push(e);
    		}

    


}


return list;


    	

	}



  //

// this is function merged two file.
// and return new file .(as desired).

// and is faster than merged();
  async me(f1,f2){

   

var list=[];
    for(var i of f1){
     
            var x=f2.find(f=>f.CountryName===i.Entity);

            if(x && x!==undefined){
              i.latitude=Number(x.CapitalLatitude);
              i.longitude=Number(x.CapitalLongitude);
              // color code in Hex Code.
              i.color='#' + (Math.random().toString(16) + "000000").substring(2,8);

              list.push(i);
            }
    }

    return list;

  }



// this function takes the country as paramater and return the its data
//  

	country_pop(country){


          var data=this.readFile(this.csv1);

          // to store sorted nation;
var Nations=[];

// create empty set to save countries name ;
          var countries_name=new Set();
// data ; json obj

          data.forEach(c=>{
          	   
          	   countries_name.add(c.Entity)
          })


       


// loop cuntries and seperate the data to each belonging nation;
          countries_name.forEach(c=>{
          	   var nation=data.filter(n=>{
          	   	return n.Entity==c;
          	   })


//only get [population] and [Year]s
          	  var d=nation.map(e=>{
          	  	return {Population:e.Population,Year:e.Year};
          	  })
          	 

// store sorted nation and their data;
          	   Nations.push({name:c,data:d});


          })





// find the data of query country;




return Nations.find(n=>(n.name.toLowerCase()===country.toLowerCase()));


	}

// just for testinga purpose.

  test(){
    var datas=fs.readFileSync(this.csv3,'utf-8')


var dat=this.csv_to_Json2(datas)
    
  }


// for urban and rural data
/* this function takes
   the name(country name) as paramater and return its data.
*/
countryName(name){
  var datas=this.readFile(this.csv4);
  return datas.filter(n=>n.Entity==name);
}


// get only the countries name from "urban-vs-rural-majority.csv" file
// this is for autocomplete for searches.
getCountries_urban_rural(){
  var datas=this.readFile(this.csv4);





const countries=new Set();  /* the reason to use set is it will not hold 
                            repetive value; since we have a dataset which 
                            loops over repetetive names alot.
                            */

   datas.map(country=>{
      countries.add(country.Entity);
  })

 return Array.from(countries);
}



/* this function takes year as paramter and return the population of 
entire world of that year;
 we use to visualize data in map
 inside the function we use me() function to insert longitude and latitude to the data
*/

	async countries_PopulationBy_Year(year){


		var data=this.readFile(this.csv1);
     var map_loc=this.readFile(this.csv2);

		var _country=data.filter((element,index)=>{
			
			return element.Year===year
		})

		//add longitude and latitued;

var co= await this.me(_country,map_loc);

		return co;
	}

  // just to display the data in json format

  displayData_worldPopulation(){
    const datas=this.readFile(this.csv1);
    return datas;
  }


}

// 

var p=new pro(
  'world-population-by-world-regions-post-1820.csv',
  'country-capitals.csv',
  'WorldPopulationAnnual12000years_interpolated_HYDEandUNto2015.csv',
  'urban-vs-rural-majority.csv'
  );



module.exports=p;



