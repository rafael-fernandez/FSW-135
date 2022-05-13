import { Link } from 'react-router-dom';

export default function SignUp(props) {
    return(
        <div>
        <h1 id = "signUp-Header">Sign Up</h1>
            <div id = "signUp">
                <input type="text" id="register" placeholder="Enter A Username"></input>
                <input type="text" id="register" placeholder="Enter A Password"></input>
                <input type="text" id="profilepicture" placeholder="Profile Picture"></input>
                <button id = "loginButton" onClick={() => props.userSignup()}>
                    <Link to="/" style={{textDecoration: 'none', color: 'black'}}>Sign Up</Link>
                </button>
            </div>
        </div>
        
    );
}