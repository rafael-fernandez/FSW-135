import { Link } from 'react-router-dom';

export default function Login(props) {
    return(
        <div>
        <h1 id = "login">Log In</h1>
            <div id = "userLogin">
                <input type="text" id="loginUser" placeholder="Username"></input>
                <input type="text" id="loginUserPassword" placeholder="Password"></input>
                <button id = "loginButton" onClick={() => props.userLogin()}>
                    <Link to="/" style={{textDecoration: 'none', color: 'black'}}>Login</Link>
                </button>
            </div>

        </div>
        
    );
}