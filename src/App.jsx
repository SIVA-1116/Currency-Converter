import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [amount,setAmount]=useState(1);
  const [fromCurrency,setFromCurrency]=useState("INR");
  const [toCurrency,setToCurrency]=useState("USD");
  const [convertedAmount,setConvertedAmount]=useState(null);
  const [exchangeRate,setExchangeRate]=useState(null);

  useEffect(()=>{
    const getExchangeRate=async ()=>{
      try{
        let url=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        const response = await axios.get(url);
        setExchangeRate(response.data.rates[toCurrency])

      }catch(error){
        console.error("Error in fetching:"+error);
      }
    };  
    getExchangeRate();
  },[fromCurrency,toCurrency]); 

  useEffect(()=>{
    if(exchangeRate!== null){
      setConvertedAmount((amount*exchangeRate).toFixed(2));
    }
  },[amount,exchangeRate]);

  const handleAmountchange=(e)=>{
    const value=parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  }
  const handleFromcurrency=(e)=>{
    setFromCurrency(e.target.value);
  }
  const handleTocurrency=(e)=>{
    setToCurrency(e.target.value);
  }

  return (
    <>
      <div className="currency-converter">
        <div className="box"></div>
        <h1>Currency Converter</h1>
        <div className="data">
          <div className="input-container">
            <label htmlFor="amt">Amount:</label>
            <input type="number" id='amt' value={amount} onChange={handleAmountchange}/>
          </div>
          <div className="input-container">
            <label htmlFor="fromCurrency">FromCurrency:</label>
            <select id="fromCurrency" value={fromCurrency} onChange={handleFromcurrency} >
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro </option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South Arican Rand</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="toCurrency">FromCurrency:</label>
            <select id="toCurrency" value={toCurrency} onChange={handleTocurrency} >
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro </option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South Arican Rand</option>
            </select>
          </div>
          <div className="result">
            <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
