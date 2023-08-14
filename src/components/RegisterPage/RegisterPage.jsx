import { useState } from 'react'
import "./RegisterPage.css"
import LoginPage from '../LoginPage/LoginPage'


export default function RegisterPage({ allUsers, handleCreateUser, setUser }){
const [accountExists, setAccountExist] = useState(false)
const [newAccount, setNewAccount] = useState(false)

const [cred, setCred] = useState({
    username: "",
    password: "",
    friendsList: "",
    img: "",
    firstName: "",
    lastName: "",
    about: "",
    posts: []
})

function handleExists(){
    setAccountExist(true)
}

function handleChange(e){
    setCred({...cred, [e.target.name]: e.target.value })
}

function handleSubmit(e){
    e.preventDefault()
    const exist = allUsers.filter(e => e.username === cred.username)
    
    if(exist.length > 0){
        console.log("username is NOT unique, rendering error msg")
        document.getElementById('errorMsgTwo').style.opacity = 1;
    } else if (cred.password.length < 8){
        document.getElementById('errorMsgThree').style.opacity = 1;
    } else if (cred.username.length < 1){
        document.getElementById('errorMsgFour').style.opacity = 1;
    }
    else {
        console.log("username is unique, creating a new account")
        handleCreateUser(cred)
        setNewAccount(true)
        setAccountExist(true)
        document.getElementById('errorMsgTwo').style.opacity = 0;
    }
}

if(!accountExists){
    return (
        <>
        <div className="p-8 bg-slate-200 rounded mx-auto mt-20 max-w-[80vmin] px-4 md:px-8 2xl:px-16 md:w-full lg:w-3/5 2xl:w-4/6 flex h-full ltr:md:ml-7 rtl:md:mr-7 flex-col ltr:lg:pl-7 rtl:lg:pr-7">

        <h4 class="text-2xl 2xl:text-3xl font-bold text-heading mb-10">
              Register Here
        </h4>
        <form className="w-full mx-auto flex flex-col justify-center" onSubmit={handleSubmit}>
            <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">Username:</label>
            <input className="mb-3 py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12" 
            placeholder="Username" onChange={handleChange} name="username"></input>
            
            <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">Password: <span className="text-gray-400">We suggest the word "password" since your password will not be private</span></label>
            <input className="mb-3 py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
            placeholder="Password" onChange={handleChange} name="password"></input>

            <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">First Name</label>
            <input className="mb-3 py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
            placeholder="First Name" onChange={handleChange} name="firstName"></input>

            <label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">Last Name:</label>
            <input className="mb-3 py-2 px-4 md:px-5 w-full appearance-none transition duration-150 ease-in-out border text-input text-xs lg:text-sm font-body placeholder-body min-h-12 transition duration-200 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-heading h-11 md:h-12"
            placeholder="Last Name" onChange={handleChange} name="lastName"></input>
            <h2>**This app is for educational purposes only. Do NOT use sensitive data in the password blank. Passwords are being temporarily stored during development and will later be replaced with encryption.**</h2>
            <h1 id="errorMsgTwo" className="text-red">An account already exists with this username.</h1>
            <h1 id="errorMsgThree" className="text-red">Weak Password</h1>
            <h1 id="errorMsgFour" className="text-red">Invalid Username</h1>



            <button onClick={handleSubmit}
            className="text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none  bg-black text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 hover:shadow-cart h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto"
            
            >Register</button>
            <button 
            className="text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none  bg-black text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 hover:shadow-cart h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto"
            onClick={handleExists}>Already have an account? Click to log in</button>
        </form>
        </div>
       
        </>


    )
} else {
    return (
        <LoginPage allUsers={allUsers} setUser={setUser} newAccount={newAccount}/>
    )
}
}