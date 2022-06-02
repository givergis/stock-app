import React, { useState,useEffect } from 'react'
import axios from 'axios';
import './items.css'

function Main() {
    const [array,setArray] = useState([]);
    const[company,setCompany] = useState([]);
    const[text,setText] = useState('');
    const[suggestions,setSuggestions] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5005/Company/companies`)
        .then(result =>{
           setCompany(result.data.company);
        // console.log(result.data);
        })
        .catch(error=>{console.log(error)})  
      },[]);

      const onChangeHandler = (text)=>{
        let matches = [];
        if(text.length>0){
            matches = company.filter(usr=>{
                const regex = new RegExp(`${text}`,"gi");
                return usr.Name.match(regex)
            })
        }
       // console.log('matches',matches);
        setSuggestions(matches);
        setText(text)
      }

      const onSuggestionHandler = (text)=>{
          setText(text);
          setSuggestions([]);
          axios.get(`http://localhost:5005/Company/companyByName/${text}`)
          .then(result =>{
             setArray(result.data);
         //  console.log(result.data)
          })
          .catch(error=>{console.log(error)})  
      }
const onClose = ()=>{
  //console.log("clicked");
  setArray([]);
}

  return (
    <div className='mainDiv'>
    <div className='head'>
        <h1><b>Stocks</b></h1>
        <div className='headContent'>
          <h2>The easiest way to buy and sell stocks.</h2>
          <h4>Stock Analysis and screening tool for Investors in India.</h4>
        </div>
        <div className='subHead'>
        <div className="container">
        <input type="search" value={text} onClick={()=>onClose()} onChange={event=>onChangeHandler(event.target.value)} onBlur={()=>{
          setTimeout(() => {
            setSuggestions([]);
          }, 500);}} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />    
                { suggestions && suggestions.map((suggestion,i)=>{
                  return <div className="suggestions" onClick={()=>onSuggestionHandler(suggestion.Name)} key={i}>{suggestion.Name}</div>
              })}  </div>
        </div>
        {
                    array.length!=0?array.company.map((value)=>{
                      return     <div className='outputBox'>
                      <h2 key={value._id}>{value.Name}</h2>
                      <div className='insideBox1'>
                        <h5>Market Price <i>₹{value.CurrentMarketPrice}</i></h5>  
                      </div>
                      <div className='insideBox2'>
                        <h5>Market Cap <i>₹{value.MarketCap}</i></h5>  
                      </div>
                      <div className='insideBox3'>
                        <h5>Stock P/E <i>{value.StockPE}%</i></h5>  
                      </div>
                      <div className='insideBox4'>
                        <h5>Dividend Yield <i>{value.DividendYield}%</i></h5>  
                      </div>
                      <div className='insideBox5'>
                        <h5>ROCE <i>{value.ROCE}%</i></h5>  
                      </div>
                      <div className='insideBox6'>
                        <h5>ROE <i>{value.ROEpreviousAnnum}%</i></h5>  
                      </div>
                      <div className='insideBox7'>
                        <h5>Debt Equality <i>{value.DebtToEquity}%</i></h5>  
                      </div>
                      <div className='insideBox8'>
                        <h5>EPS <i>₹{value.EPS}</i></h5>  
                      </div>
                      <div className='insideBox9'>
                        <h5>Reserves <i>₹{value.Reserves}</i></h5>  
                      </div>
                      <div className='insideBox10'>
                        <h5>Debt <i>₹{value.Debt}</i></h5>  
                      </div>
                  </div>
                    }) :null
                  }
    
    </div>  
    </div>
  )
}

export default Main