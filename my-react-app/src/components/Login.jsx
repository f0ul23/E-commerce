import React, { useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    useEffect(()=>{
        const auth = localStorage.getItem('user');   //user agar already login hai to url se b wapas login page pe nahi jana
        if(auth){   //localstorage me agar user exist karta to un wapas login nahi karna
            navigate('/');
        }
    }, [])

    let handleLogin = async() =>{
        console.log(email, password);
        let result = await fetch('http://localhost:5000/login',{ //sending browser req 
            method: 'post',
            body: JSON.stringify({email, password}), //stingify
            headers: {'Content-Type': 'application/json'            }
        })
        result = await result.json();
        console.log(result)
        if(result.auth){
            localStorage.setItem('user', JSON.stringify(result.user)) //objectname 'user' me store kare result as a string
            localStorage.setItem('token', JSON.stringify(result.auth)) //objectname 'user' me store kare result as a string
            navigate('/')
        }else{
            alert('User does not exist')
        }
    }

  return (
    <>
    <form>
    <div className='login'>
        <h1>LogIn</h1>
        <input className="inputbox" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'/>
        <input className="inputbox" type="password" autoComplete="off" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'/>
    </div>
    <button className='button'onClick={handleLogin} type='button'>LogIn</button>
    </form>
    </>
  )
}

