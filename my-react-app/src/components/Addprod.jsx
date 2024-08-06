import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';


export default function Addprod() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate()

    const addproduct = async()=>{
      console.log(name, price, category, company);
      if(!name || !price || !category || !company)
      {
        setError(true);
        return false;
      }


      const userId = JSON.parse(localStorage.getItem('user'))._id;
      let result = await fetch('http://localhost:5000/addproduct',{
        method: 'post',
        body: JSON.stringify({name, price, category, company, userId}),
        headers: {
            'Content-Type': 'application/json',
             authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      result = await result.json();
      console.log(result);
      navigate('/')
    }

  return (
    <>
    <div className='product'>
    <div className="line"><h1>Add product</h1></div>
      <input className='inputbox2' type="text" placeholder='Enter product name' value={name} 
        onChange={(e)=>{setName(e.target.value)}}/>
        {error && !name && <span className='invalid-input'>Enter valid Name</span>}
      <input className='inputbox2' type="text" placeholder='Enter product price' value={price} 
        onChange={(e)=>{setPrice(e.target.value)}}/>
        {error && !price && <span className='invalid-input'>Enter valid Prize</span>}
      <input className='inputbox2' type="text" placeholder='Enter product category' value={category} 
        onChange={(e)=>{setCategory(e.target.value)}}/>
        {error && !category && <span className='invalid-input'>Enter valid Category</span>}
      <input className='inputbox2' type="text" placeholder='Enter product company' value={company} 
        onChange={(e)=>{setCompany(e.target.value)}}/>
        {error && !company && <span className='invalid-input'>Enter valid Company</span>}
      <button className='button' id= 'button' onClick={addproduct} style={{'marginTop':'9px'}}>Add product</button>
    </div>
    </>
  )
}
