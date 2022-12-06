import LoginForm from "../components/LoginForm"
import {Link} from "react-router-dom"

import { useState } from "react";
import {useNavigate} from "react-router-dom"


function Login({setUser}) {

    const [form, setForm] = useState({
        username: "",
        avatar: "",
        password: "",
        passwordConfirmation: "",
      });
    
      const navigate = useNavigate()
    
      const [errors, setErrors] = useState([]);
      console.log("Errors:", errors);
    
      function handleChange(e) {
        const value = e.target.value;
        const keyName = e.target.name;
        setForm({ ...form, [keyName]: value });
      }
    
      function handleSubmit(e) {
        e.preventDefault();
        fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: form.username,
            avatar: form.avatar,
            password: form.password,
            password_confirmation: form.passwordConfirmation,
          }),
        }).then((r) => {
          if (r.ok) {
            r.json().then((newUser) => setUser(newUser));
            navigate("/profile")
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }

    return(
        <>
        <div className="flex w-full">
            <div className="logincontainer">
            <div className="grid h-300 flex-grow card bg-base-000 rounded-box place-items-center">
                <h1>LOG IN</h1>
                <br></br>
                <LoginForm setUser={setUser}/>
            </div>
            </div>
        <div className="divider divider-horizontal">
            {/* OR */}
        </div>
        
        <div className="grid h-300 flex-grow card bg-base-000 rounded-box place-items-center">
    
        <div className="flex flex-col w-full lg:flex-row">
      
      
        <div className="signup">
        <div className="mockup-phone">
        <div className="camera"></div> 
        <div className="display">
        <div className="artboard artboard-demo phone-1">
        
        <h1>SIGN UP</h1>
        <br></br>
        <form onSubmit={handleSubmit}>
    
        {/* <label>Username</label> */}
        <input type="text" placeholder="Username" className="input input-bordered input-md w-full max-w-xs"
         value={form.username}
         onChange={handleChange}
         name = "username"/>


    
        {/* <label>Profile photo</label> */}
        <input type="text" placeholder="Image" className="input input-bordered input-md w-full max-w-xs" value={form.avatar} onChange={handleChange} name="avatar"/>
        
        {/* <label>Password</label> */}
        <input type="text" placeholder="Password" className="input input-bordered input-md w-full max-w-xs" value={form.password} onChange={handleChange} name="password"/>
        
        {/* <label>Confirm password</label> */}
        <input type="text" placeholder="Password Confirmation" className="input input-bordered input-md w-full max-w-xs" value={form.passwordConfirmation} onChange={handleChange} name="passwordConfirmation"/>
        
        <button type="submit" className="btn btn-block">Sign Up</button>
    
        </form>
    
         <div className = "signup-error">{errors.map((e) => `${e}. `)}</div>
        </div>
        </div>
        </div>
        </div>
        
      <div className="divider lg:divider-horizontal"></div> 
      <div className="grid flex-grow h-32 card bg-base-000 rounded-box place-items-center"></div>
     
    </div>
    </div>
    </div>
    </>
    
    );
}
    
export default Login;
    
    