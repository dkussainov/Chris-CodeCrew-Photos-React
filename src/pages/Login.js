import LoginForm from "../components/LoginForm"
import {Link} from "react-router-dom"

function Login({setUser}) {


    return(
        <div>
            <h1>Login</h1>
            <LoginForm setUser={setUser}  />
            <nav>
                <Link to="/signup">Signup</Link>
            </nav>
        </div>
    )
    
    
    }
    
    export default Login
    
    