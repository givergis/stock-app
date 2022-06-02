import React, { useState,useEffect } from 'react'
import axios from 'axios';
import './Main.css'
import Items from './Items';

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
           console.log(result.data)
          })
          .catch(error=>{console.log(error)})  
      }


  return (
      <div>
    <div className='MainDiv'>
        <h1>Main</h1>
           <form>
            <div className="container">
              <input type="search" value={text} onChange={event=>onChangeHandler(event.target.value)}  className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />    
              { suggestions && suggestions.map((suggestion,i)=>{
                return <div className="suggestions" onClick={()=>onSuggestionHandler(suggestion.Name)} key={i}>{suggestion.Name}</div>
            })}
            </div>
           
                {/* <button type="button" onClick={onSearch} className="btn btn-outline-primary">search</button> */}
                </form>

                </div>
                <div className='itemsList'>
                {
                    array.length!=0?array.company.map((value)=>{
                      return <Items key={value.Name} id={value._id} itemname={value.Name} cmp={value.CurrentMarketPrice} mc={value.MarketCap} spe={value.StockPE} dy={value.DividendYield} roce={value.ROCE} rpa={value.ROEpreviousAnnum} dte={value.DebtToEquity} eps={value.EPS} rev={value.Reserves} debt={value.Debt}/>
                    }) :null
                  }
                </div>
    
    </div>
  )
}

export default Main