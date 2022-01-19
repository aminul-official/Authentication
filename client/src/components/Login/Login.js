import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa, faFacebook, faGoogle, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import axios from 'axios';



const Login = ({user,setUser}) => {


    // using react hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
    
    
    
    //fontawsome icons
    const facebookIcon = <FontAwesomeIcon icon={faFacebook} />
    const linkedinIcon = <FontAwesomeIcon icon={faLinkedin} />
    const googleIcon = <FontAwesomeIcon icon={faGoogle} />
    const youtubeIcon = <FontAwesomeIcon icon={faYoutube} />
    const twitterIcon = <FontAwesomeIcon icon={faTwitter} />

    const onSubmit = (data) => {
        console.log(data)
        axios.post('http://localhost:7000/login',data)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
    
    return(
        <>
        <div className="container">
            <div className="text">Login Form </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field"> 
                <i className="fa fa-envelope-o"></i> 
                <input type='email' placeholder='Email' type="text" {...register("email", { required: true })}/> 
            </div>
            <div className="field"> 
                <i className="fa fa-key"></i>
                <input type="password" placeholder='Password' {...register("password", { required: true })}/>
            </div> 
            <button type='submit' className="login_btn">Login</button>
            </form>
            <p className='clickable-text' onClick={() => setUser(false)}>Not a User?</p>
            <div className="social-buttons"> 
                <button className="neo-button">
                   {facebookIcon}
                </button> 
                <button className="neo-button">
                    {linkedinIcon}
                </button> 
                <button className="neo-button">
                    {googleIcon}
                </button>
                <button className="neo-button">
                    {youtubeIcon}
                </button> 
                <button className="neo-button">
                    {twitterIcon}
                </button> 
            </div>
        </div>
        </>
    );
};

export default Login;