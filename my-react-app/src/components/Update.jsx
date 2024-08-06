import React,{useState, useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';


export default function Update() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const param = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
     getProductDetails();
    },[])

    const getProductDetails = async () => {
        console.log(param);
        let result = await fetch(`http://localhost:5000/update/${param.id}`,{
          headers: {
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })  
        result = await result.json()
        console.log(result)
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    const updateproduct = async()=>{
        console.log(name, price, category, company)
        let result = await fetch(`http://localhost:5000/update/${param.id}`, {
            method: 'put',
            body: JSON.stringify({name, price, category, company}),
            headers: {
                'Content-Type': 'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        console.log(result)
        navigate('/')
    }

  return (
    <>
    <div className='product'>
    <div className="line"><h1>Update Product</h1></div>
      <input className='inputbox2' type="text" placeholder='Enter product name' value={name} 
        onChange={(e)=>{setName(e.target.value)}}/>
      <input className='inputbox2' type="text" placeholder='Enter product price' value={price} 
        onChange={(e)=>{setPrice(e.target.value)}}/>
      <input className='inputbox2' type="text" placeholder='Enter product category' value={category} 
        onChange={(e)=>{setCategory(e.target.value)}}/>
      <input className='inputbox2' type="text" placeholder='Enter product company' value={company} 
        onChange={(e)=>{setCompany(e.target.value)}}/>
      <button className='button1'onClick={updateproduct} style={{'marginTop':'9px'}}>Update product</button>
    </div>
    </>
  )
}
