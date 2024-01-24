import { useEffect, useState } from 'react'

import './App.css'
import { useRef } from 'react'


function App() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState('')
  const [status, setStatus] = useState('')
  let inputRef = useRef();
  const handleClick = (e) => {
    e.preventDefault();
    let result = height&&weight&&(weight /(height / 100) ** 2).toFixed(2);
    setBmi(prev=>result&&result ?result:prev);
    if (result&&result < 18.5) {
      setStatus("Abnormal");
    }
    else if (result >= 18.5 && result <= 24.9) {
      setStatus("Normal");
    }
    else if (result >= 25 && result <= 29.9) {
      setStatus("Over Weight");
    }
    else if (result >= 30 && result <= 39.9) {
      setStatus("Obese");
    }
    else if (result > 40) {
      setStatus("Morbidly Obese");
    }
    setHeight('');
    setWeight('');
  }
  useEffect(() => {
    inputRef.current.focus();
  }, [])
  return (
    <>
      <div className='flex flex-col gap-2 items-center h-screen pt-2'>
        <div className='bg-slate-700 text-6xl px-5 py-2 rounded-md text-white text-center mx-2'>BMI calculator</div>
        <div className='flex justify-center items-center gap-4'>
          <div className=''><label className='bg-slate-500 px-4 py-2 rounded-lg' htmlFor="weight">Weight :</label></div>
          <div> <input type='text' id='weight' placeholder="Enter Weight in Kg's" value={weight} className='outline-1 bg-slate-700 text-white rounded-md p-2 ' onChange={
            (e) => {
              let weight=e.target.value;
              setWeight((prev)=>isNaN(weight)? prev:weight);
            }} ref={inputRef} />
          </div>
        </div>

        <div className='flex justify-between items-center gap-4'>
          <div> <label htmlFor="height" className='bg-slate-500 px-4 py-2 rounded-lg'>Height :</label></div>
          <div> <input type='text' id='height' placeholder="Enter Height in Cm's" value={height} className='outline-1 bg-slate-700 text-white rounded-md p-2' onChange={
            (e) => {
                let height=e.target.value
              setHeight(prev=>isNaN(height) ? prev:height);
            }
          } />
          </div>
        </div>

        <div><button onClick={handleClick} className='bg-slate-900 text-white rounded-md p-2'>Submit</button></div>
        <div className='text-2xl'>Your BMI is : {bmi}</div>
        <div className='text-2xl'>Your Status is: {status}</div>
      </div>

    </>
  )
}

export default App
