import React, { Component } from 'react'
import Chart from "chart.js";
import 'isomorphic-unfetch'
import { Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText } from 'reactstrap';
 const port=process.env.PORT|| 3000;

const ROOT_URL=process.env.ROOT_URL || `http://localhost:${port}`;





export default class Grap extends Component {
    chartRef = React.createRef();
constructor(props){
    super();
     this.state={country:"United states",fuck:{name:"test"}}

}
   


    // function that fetches the data of given country

    initChart=async(datas)=>{

const myChartRef = this.chartRef.current.getContext("2d");

 




// we only choose some years [with defference of 4 years]


const Label=['1960','1965','1970','1975','1980','1985','1990','1995','2000','2005','2010','2015','2017','2020','2020','2030','2035','2040'];



//now;
// now we filer the urban(%) and Rural(%) from the data of respective year.


// create array to hold the data;
var urban=[];
var rural=[];


Label.map(year=>{
    var d=datas.find(d=>d.Year==year);

    // push to urban array a urban data

    

    urban.push(Number(d['Urban (%)']));
// similar to rural
    rural.push(Number(d['Rural (%)']));
})




        
this.chart= new Chart(myChartRef, {
    type: 'line',
    data: {
        labels: Label,
        datasets: [{
            label: 'Urban',
            data: urban,
            fill:false,
           
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 3
        },

        {
            label: 'Rural',
            data: rural,
            fill:false,
           borderColor: "#3e95cd",
            borderWidth: 3
        }

       

       
        ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

    }

    
componentDidMount=async()=> {
      
 var datas;



// Fetch the data of specific country;


       try{
    var response=await fetch(`${ROOT_URL}/countryUrbanandRural/${this.props.countryName}`,{method:'GET',credentials:'include'},{'Content-type':'application/json; charset=UTF-8'});
 datas=await response.json();



}catch(err){
    alert(err);

}


// set datas



// render the graph



this.initChart(datas);




    }



async componentDidUpdate(prevProps,prevState){

 
    if(prevProps.countryName!==this.props.countryName){
      
        var datas;
       try{
    var response=await fetch(`${ROOT_URL}/countryUrbanandRural/${this.props.countryName}`,{method:'GET',credentials:'include'},{'Content-type':'application/json; charset=UTF-8'});
 datas=await response.json();



}catch(err){
    alert(err);

}


// set datas



// render the graph


this.initChart(datas);
    }
}
 


     static getDerivedStateFromProps(nextProps,prevState){
      



    if(nextProps.country!==prevState.country){

  
        var x={};
        x.name=nextProps.country;
        return {fuck:x,country:nextProps.country}
     
   }else{
     return null;
   }

  
}
   


    componentWillUnMount(){

        this.chart.destroy();

    }
    render() {
        return (
            <div style={{marginBottom:'200px',marginTop:"50px",position:''}}>
      

      <Card >
        <CardHeader tag="h3" style={{fontWeight:900,fontSize:'28px'}}>The comparision of Urban and Rural population </CardHeader>
        <CardBody>
          <CardTitle><h2>{this.props.countryName}</h2></CardTitle>
          <CardText>
          
            
            
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
          </CardText>
          
        </CardBody>
        <CardFooter className="text-muted"></CardFooter>
      </Card>



    </div>
        )
    }
}


