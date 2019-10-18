
const fs=require('fs');
const path=require('path');
/*


// read file
var k=fs.readFileSync('ex.csv','utf-8');

//convert into jason
var list=csvJSON(k);

list.map((ele)=>{
	console.log(elem);
	
})
*/



class pro{

	constructor(csv1,csv2){
    this.csv1=csv1;
    this.csv2=csv2;

	}


	csv_to_Json(csv){
	 const lines = csv.split('\n')
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


	 readFile(csv){

		var file=fs.readFileSync(csv,"utf-8");

		var list=this.csv_to_Json(file);

	
  // return json file;

		return list;



//read a file and convert into object
	}



// merged two csv if csv1, is missing some props from csv2;
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

    			console.log(e.Entity)
    			console.log("----------------------------------");
    			console.log(i.CountryName)


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


  async me(f1,f2){

    // faster then merged;

var list=[];
    for(var i of f1){
      console.log(i.Entity)

            var x=f2.find(f=>f.CountryName===i.Entity);

            if(x && x!==undefined){
              i.latitude=Number(x.CapitalLatitude);
              i.longitude=Number(x.CapitalLongitude);
              i.color='#' + (Math.random().toString(16) + "000000").substring(2,8);

              list.push(i);
            }
    }

    return list;

  }

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

console.log(Nations)



// find the data of query country;




return Nations.find(n=>(n.name.toLowerCase()===country.toLowerCase()));


	}

  test(){
    return "teststset"
  }



	async countries_PopulationBy_Year(year){


		var data=this.readFile(this.csv1);
     var map_loc=this.readFile(this.csv2);

		var _country=data.filter((element,index)=>{
			
			return element.Year===year
		})

		//add longitude and latitued;

var co= await this.me(_country,map_loc);
console.log(co)






		return co;


	}














}

// two files..

var p=new pro('world-population-by-world-regions-post-1820.csv','country-capitals.csv');






///var ks=p.countries_PopulationByYear('2016');


module.exports=p;
