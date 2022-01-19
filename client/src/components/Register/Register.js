import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGoogle,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import "./Register.css";
import CountryDropdown from "country-dropdown-with-flags-for-react";
import axios from "axios";

const Register = ({ user, setUser }) => {
  // country state
  const [country, setCountry] = useState("");

  // using react hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // preview image

  const [previewImg, setPreviewImg] = useState(watch("image"));

  //fontawsome icons
  const facebookIcon = <FontAwesomeIcon icon={faFacebook} />;
  const linkedinIcon = <FontAwesomeIcon icon={faLinkedin} />;
  const googleIcon = <FontAwesomeIcon icon={faGoogle} />;
  const youtubeIcon = <FontAwesomeIcon icon={faYoutube} />;
  const twitterIcon = <FontAwesomeIcon icon={faTwitter} />;

  // image preview after choose

  // imgInp.onchange = evt => {

  //   }
  //   const imgInp = document.getElementById("imgInp");
  //   const blah = document.getElementById("blah");

  //   const imgPreview = (e) => {
  //     const [file] = imgInp.files;
  //     if (file) {
  //       blah.src = URL.createObjectURL(file);
  //     }
  //   };

  //form submission


  const registerSubmit = (e, data) => {
    e.preventDefault();
    console.log("working");
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("file", data.image[0]);
    console.log(data);
  };

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }
  
  
  const onSubmit = (data) => {
    // data.country = country;

    const imgBase64 = data.image[0].toString("base64");

    console.log(imgBase64);
    
    
    
    const formData = new FormData();
    
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    // formData.append('image', data.image[0]);
    formData.append('image', imgBase64);
    formData.append('email', data.email);
    formData.append('country', data.country);
    formData.append('password', data.password);


    // axios.post(`${process.env.REACT_APP_BASE_URL}/registerUser`,formData,config)
    //  axios.post(`http://localhost:5000/registerUser`,formData,config)
   axios.post(`http://localhost:5000/api/auth/register`,formData,config)
    .then(res => {
      console.log(res);
      console.log(formData);
    })
    .catch(err => console.log(err))
};


//   console.log(previewImg, watch("image"));

  return (
    <>
      <div className="container">
        <div className="text"> Register From </div>
        {/* { previewImg !== undefined ||  <img src={previewImg} alt="Girl in a jacket" />} */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="fields">
            <label className="img-input-label" htmlFor="imgInput">
              Upload Image
            </label>
            <input
              name="imgInput"
              id="imgInput"
              // onChange={() => setPreviewImg(URL.createObjectURL(previewImg[0]))}
              className="file-input"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              size="60"
              {...register("image", { required: true })}
            />
          </div>
          <div className="field">
            <i className="fa fa-envelope-o"></i>
            <input
              placeholder="First Name"
              name="first-name"
              type="text"
              {...register("first_name", { required: true })}
            />
          </div>
          <div className="field">
            <i className="fa fa-envelope-o"></i>
            <input
              placeholder="Last Name"
              type="text"
              {...register("last_name", { required: true })}
            />
          </div>
          <div className="field">
            <CountryDropdown
              id="UNIQUE_ID"
              className="YOUR_CSS_CLASS"
              preferredCountries={["bd"]}
              value=""
              handleChange={(e) => {
                setCountry(e.target.value);
                console.log(e.target.value);
              }}
            ></CountryDropdown>
          </div>

          <div className="field">
            <i className="fa fa-envelope-o"></i>
            <input
              placeholder="Email"
              type="text"
              {...register("email", { required: true })}
            />
          </div>
          <div className="field">
            <i className="fa fa-envelope-o"></i>
            <input
              placeholder="Phone"
              type="text"
              {...register("phone", { required: true })}
            />
          </div>
          <div className="field">
            <i className="fa fa-key"></i>
            <input
              placeholder="Password"
              type="text"
              {...register("password", { required: true })}
            />
          </div>
          <button type="submit" className="login_btn">
            Register
          </button>
        </form>
        <p className="clickable-text" onClick={() => setUser(true)}>
          Already a User?
        </p>
        <div className="social-buttons">
          <button className="neo-button">{facebookIcon}</button>
          <button className="neo-button">{linkedinIcon}</button>
          <button className="neo-button">{googleIcon}</button>
          <button className="neo-button">{youtubeIcon}</button>
          <button className="neo-button">{twitterIcon}</button>
        </div>
      </div>
    </>
  );
};

export default Register;
