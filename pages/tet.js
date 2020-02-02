import React, { Component } from 'react'
import Chart from "chart.js";
import 'isomorphic-unfetch'

 const port=process.env.PORT|| 3000;

const ROOT_URL=process.env.ROOT_URL || `http://localhost:${port}`;


export default class LineGraph extends Component {
    chartRef = React.createRef();

    
    async componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        // request the data ;

        // country from props

      

        var datas;


       try{
    var response=await fetch(`${ROOT_URL}/country/${this.props.countryName}`,{method:'GET',credentials:'include'},{'Content-type':'application/json; charset=UTF-8'});
 datas=await response.json();

console.log(datas)
}catch(err){
    alert(err);
}



// we only choose some years [with defference of 4 years]


const Label=['1909','1919','1929','1939','1949','1959','1969','1979','1989','1999','2009','2019'];

// here we return array of population on repective sequences.


var Data=Label.map(e=>{

    // dats is the reponse from the sever.

    // loop over the all the datas and return for specific year;
    var x=datas.data.find(d=> d.Year===e);


// get only poppulation from data; [destructuring prop]
    var {Population}=x;
    return Number(Population);// convert into number;
})

console.log(Data)


        
this.chart= new Chart(myChartRef, {
    type: 'line',
    data: {
        labels: Label,
        datasets: [{
            label: 'population',
            data: Data,
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
        }]
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


    componentWillUnMount(){

        this.chart.destroy();

    }
    render() {
        return (
            <div >
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}