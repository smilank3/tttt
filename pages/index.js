

import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

import * as am4maps from "@amcharts/amcharts4/maps"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow"

import Line from './tet'
const port=process.env.PORT|| 3001;

const ROOT_URL=process.env.ROOT_URL || `http://localhost:${port}`;



// modal




class Bar extends React.Component{

	state={open:false,country:null};




	componentDidMount(){
		this.initChart();
	}

	componentWillUnMount(){
		if(this.chart){
			this.chart.dispose();
		}
	}

	async initChart(){
		const {chartId}=this.props;

		am4core.useTheme(am4themesAnimated);


		this.chart=am4core.create(chartId,am4maps.MapChart);

		var title=this.chart.titles.create();
		title.text="[bold font-size:20]Population of the world in 2019 [/]\n source: data.com";

		title.textAlign='middle';

		title.top=0
		this.chart.geodata=am4geodata_worldLow;

		this.chart.projection=new am4maps.projections.Miller();

 var polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries())
 polygonSeries.exclude=['AQ']
    polygonSeries.useGeodata = true





    //configure series

    // on hover display name

    var polygonTemplate=polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText="{name}"
//color of the country
    polygonTemplate.fill=this.chart.colors.getIndex(0).lighten(0.5);


// hover

var hover=polygonTemplate.states.create('hover');
hover.properties.fill=this.chart.colors.getIndex(0)


//onclick




//rqusest data from server

try{
	var response=await fetch(`${ROOT_URL}/2019`,{method:'GET',credentials:'include'});
var datas=await response.json();

console.log(datas)

}catch(err){
	alert(err);
}






var mapData = [
  
  
  { "Code":"US", "Entity":"United States", "Population":313085380, "color":'',"latitude":38, "longitude":-97 },
  {"Entity":"Afghanistan","Code":"AFG","Year":"2019","Population":"38042000","capital":"Kabul","longitude":69.183333,"latitude":34.516666666666666,color:'red'},
  {"Entity":"Africa","Code":"","Year":"2019","Population":"1308064000"},
  {"Entity":"Albania","Code":"ALB","Year":"2019","Population":"2881000","capital":"Tirana","longitude":19.816667,"latitude":41.31666666666667,color:'blue'},
  {"Entity":"Algeria","Code":"DZA","Year":"2019","Population":"43053000","capital":"Algiers","longitude":3.050000,"latitude":36.75,color:'yellow'},
  {"Entity":"American Samoa","Code":"ASM","Year":"2019","Population":"55000","capital":"Pago Pago","longitude":-170.700000,"latitude":-14.266666666666667,color:'orange'},
  {"Entity":"China","Code":"CHN","Year":"2019","Population":"1433784064","capital":"Beijing","longitude":116.383333,"latitude":39.916666666666664,color:'green'},
  {"Entity":"Japan","Code":"JPN","Year":"2019","Population":"126860000","capital":"Tokyo","longitude":139.75,"latitude":35.68333333333333,"color":"#63ec24"},

];

// Add lat/long information to data
/*
for(var i = 0; i < mapData.length; i++) {
  mapData[i].latitude = latlong[mapData[i].id].latitude;
  mapData[i].longitude = latlong[mapData[i].id].longitude;
}

*/

var imageSeries = this.chart.series.push(new am4maps.MapImageSeries());
imageSeries.data = datas;
imageSeries.dataFields.value = "Population";

var imageTemplate = imageSeries.mapImages.template;
imageTemplate.propertyFields.latitude = "latitude";
imageTemplate.propertyFields.longitude = "longitude";
imageTemplate.nonScaling = true

var circle = imageTemplate.createChild(am4core.Circle);
circle.fillOpacity = 0.7;
circle.propertyFields.fill = "color";
circle.tooltipText = "{Code}: [bold]{Population}[/]";

imageSeries.heatRules.push({
  "target": circle,
  "property": "radius",
  "min": 4,
  "max": 30,
  "dataField": "value"
})

// click on circle

imageTemplate.events.on("hit",(ev)=>{
console.log(ev.target.dataItem.dataContext)

	

	this.props.callback({open:!this.props.isOpen,country:ev.target.dataItem.dataContext.Entity});



})








    
	}



	render(){
		return (<div id={this.props.chartId} className="graph" style={{width:'100%',height:'500px',border:''}}></div>)
	}
}


class Index extends React.Component{

	state={open:false,country:null};


	setS=(boj)=>{
		console.log(boj)



		this.setState({open:boj.open,country:boj.country})
	}


	close=()=>{
		this.setState({open:false})
	}

	render(){
		return (

			<div>
				


<Bar chartId="test" callback={this.setS} isOpen={this.state.open}></Bar>

 <button type="button" className="btn btn-primary">Save changes</button>
{this.state.open &&(<div  className="modal" id="exampleModal" tabIndex="-1" style={{position:'fixed',display:'block',

ZIndex:99999,top:'100px'}}>
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{this.state.country}</h5>
        <button type="button" className="close" >
          <span onClick={this.close}>&times;</span>
        </button>
      </div>
      <div className="modal-body">
  {/*counryName to create graph */}
       <Line countryName={this.state.country}/>
      </div>
      <div className="modal-footer">
        
      </div>
    </div>
  </div>
</div>)}


			</div>)
	}
}


export default Index;