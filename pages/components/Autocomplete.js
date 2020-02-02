

import React, { Component } from "react";
import PropTypes from "prop-types";
const port=process.env.PORT|| 3000;
const ROOT_URL=process.env.ROOT_URL || `http://localhost:${port}`;
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'isomorphic-unfetch'

class Autocomplete extends Component {
  
  static defaultProperty = {
    suggestions: []
  };
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }

  onChange = e => {

   
    const { suggestions } = this.props;
   
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          /*
          <ul className="row-fluid" >
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              if (index === activeSuggestion) {
                className = "";
              }

              return (
                <li key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
          */

          <div style={{
        display:'block',
        width:'316px',
        marginTop:'9px',
        borderRadius:'4px',
        right:'',
        left:'',
        position:'',
        padding:'5px 0',
        background:'#fff',
        color:'green',
        zIndex:1000,/*put this div top of absolute div whose zIndex=900*/
        top:'',
        position:'absolute',


boxShadow:' 0 1px 4px rgba(0,0,0,0.25)',
    backgroundClip: 'padding-box',


      }} >

      <div style={{maxHight:'20vh',overflow:'auto',height:'200px'}}>

        

<ul role="presentation" className="typeahead-items typeahead-topics block3 has-results" style={{listStyle:'none',padding:'0px',
width:'100%',margin:0,overflow:'hidden'
}} >



    
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              if (index === activeSuggestion) {
                className = "";
              }

              return (
                
                 <li key={suggestion} onClick={onClick}  style={liStyle}>
          <a role="option" style={liA} onClick={()=>(this.props.callback(suggestion))} data-search-query="edson alvarez" data-query-source="typeahead_click" data-ds="topics"  dir="ltr" id="typeahead-item-0">
          <span>{suggestion}</span>
          </a>
        </li>
              );
            })}
     

       


 </ul>

 </div>




</div>
          


        );
      } else {
        suggestionsListComponent = (
        

           <div style={{
        display:'block',
        width:'316px',
        marginTop:'9px',
        borderRadius:'4px',
        right:'auto',
        left:'',
        position:'relative',
        padding:'5px 0',
        background:'#fff',
        color:'green',
        zIndex:900,
        top:'',
        opacity:1,

        
position:'absolute',

boxShadow:' 0 1px 4px rgba(0,0,0,0.25)',
    backgroundClip: 'padding-box',


      }} >

      <div style={{maxHight:'20vh',overflow:'auto'}}>

        

<ul role="presentation" className="typeahead-items typeahead-topics block3 has-results" style={{listStyle:'none',padding:'0px',
width:'100%',margin:0,overflow:'hidden'
}} >



    
                
                 <li  style={liStyle}>
          
          <span style={liA}><em>No suggestion</em></span>
          
        </li>
           
     

       


 </ul>

 </div>




</div>
          
        );
      }
    }

    return (
      <React.Fragment>
        <input
          type="search"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={userInput}
          
        />

        {suggestionsListComponent}
      </React.Fragment>
    );
  }
}


const liStyle={
  width:'100%',
  whiteSpace:'norap',
  float:'left',
  clear:'left',
  display:'block',
  position:'relative',

}

const liA={
  lineHeight:'16px',
  padding:'7px 15px 6px 10px',
  display:'block',
  overflow:'hidden',
  textOverflow:'ellipsis',
  fontSize:'14px',
  whiteSpace:'nowrap',
  clear:'both',
  position:'relative',
  textDecoration:'none',
  zIndex:900,


}



// component;;;
class CustomeSearch extends React.Component{

  state={suggestion:[]};


async componentDidMount(){

  console.log("component did mount")

  // we want to get a countryname from the file

var datas;
       try{
    var response=await fetch(`${ROOT_URL}/countryNames`,{method:'GET',credentials:'include'},{'Content-type':'application/json; charset=UTF-8'});
 datas=await response.json();



}catch(err){
    alert(err);

}





this.setState({suggestion:datas});



 

// we get titles name from localstorage;
// we save titles in local storage in index.js.

/*
var titles=JSON.parse(localStorage.titles);

this.setState({suggestion:titles})

*/
}

  render(){


  
      return (

  
 
  <div className={this.props.classname}> {/*because the className for css are different. */}
  {/*<!-- display search bar responsive -->*/}
  <form role="search"  id="searchres" /*form is just for not to break css*/>
  {/*}
    <input className="rounded-left" id="search-input-res"  name="s" placeholder="Search Books" role="search" type="search"/>
    <button className="rounded-right" aria-label="submit" type="submit">
     <i className="material-icons">
search
</i>
    </button>
  <input type="hidden" name="post_type" id="post_type_res"/>
  */}

 <p style={{marginTop:'12px'}}> <strong style={{marginTop:'12px',color:'white',background:'black',padding:'4px',boxShadow: "-1px 1px 5px 0px #721c24"}}>Enter the Country Name :</strong></p>

<Autocomplete id="searchres"
          suggestions={this.state.suggestion}  callback={this.props.callback}
        
        />
        </form> 

</div>  



    )
  }

}

export default CustomeSearch;




