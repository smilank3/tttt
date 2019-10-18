import React, { Component } from 'react'
import Chart from "chart.js";

 const port=process.env.PORT|| 3000;

const ROOT_URL=process.env.ROOT_URL || `http://localhost:${port}`;


export default class LineGraph extends Component {
    chartRef = React.createRef();

    
    async componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        // request the data ;

        // country from props

        console.log(this.props)

        var datas;


       try{
    var response=await fetch(`${ROOT_URL}/country/${this.props.countryName}`,{method:'GET',credentials:'include'});
 datas=await response.json();

console.log(datas)

}catch(err){
    alert(err);
}



//


const Label=['1909','1919','1929','1939','1949','1959','1969','1979','1989','1999','2009','2019'];

var Data=Label.map(e=>{
    var x=datas.data.find(d=> d.Year===e);

    var {Population}=x;
    return Number(Population);
})

console.log(Data)


        
this.chart= new Chart(myChartRef, {
    type: 'line',
    data: {
        labels: Label,
        datasets: [{
            label: 'population',
            data: Data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
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