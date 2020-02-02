import React from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText } from 'reactstrap';

  import Line from '../tet'


const Example = (props) => {
  return (
    <div style={{marginBottom:'200px',marginTop:"100px"}}>
      

      <Card style={{marginTop:'100px'}}>
        <CardHeader tag="h3" style={{fontWeight:900,fontSize:'28px'}}>Comparision of population of big three [china, United States, India]</CardHeader>
        <CardBody>
          <CardTitle></CardTitle>
          <CardText>
            <Line countryName="china"></Line>
          </CardText>
          
        </CardBody>
        <CardFooter className="text-muted"></CardFooter>
      </Card>



    
    </div>
  );
};

export default Example;