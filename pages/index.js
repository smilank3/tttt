

import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

import * as am4maps from "@amcharts/amcharts4/maps"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow"

import Graph from './components/graph'

import fetch from 'isomorphic-unfetch'

import Line from './tet'

import Grap from './urbanRural'

import Auto from './components/Autocomplete'
const port=process.env.PORT|| 3000;

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


var datas;

//rqusest data from server

try{
	var response=await fetch(`${ROOT_URL}/2019`,{method:'GET',credentials:'include'},{'Content-type':'application/json; charset=UTF-8'});
 datas=await response.json();



}catch(err){
	alert(err);
}








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
//console.log(ev.target.dataItem.dataContext)

	

	this.props.callback({open:!this.props.isOpen,country:ev.target.dataItem.dataContext.Entity});



})








    
	}



	render(){
		return (<div id={this.props.chartId} className="graph" style={{width:'100%',height:'80vh',border:''}}></div>)
	}
}


class Index extends React.Component{

	state={open:false,country:null, countryName:"United States"};// intial is United states
	// here we have two country porp
	// country is use for the earth map
	// while countryName is use to get data for urban and rural population comparision


	setS=(boj)=>{
		



		this.setState({open:boj.open,country:boj.country})
	}


	close=()=>{
		this.setState({open:false})
	}


	// function to set countryName  used in Autocomplete; when clik suggestion
	// on auto complete component . this function gets called ; it comes with the suggested countryname
	// then we set to state and used to show grap in <Grap>

	setCountryName=(countryname)=>{
		this.setState({countryName:countryname})
	}

	render(){
		return (

			<div style={{width:"80%",margin:'0 auto',marginTop:'100px'}}>
				


<Bar chartId="test" callback={this.setS} isOpen={this.state.open}></Bar>









<Auto callback={this.setCountryName}></Auto>

<Grap countryName={this.state.countryName}></Grap>




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