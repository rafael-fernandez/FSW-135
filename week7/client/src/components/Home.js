import { useContext } from 'react';
import { TokenContext } from '../App.js';
import StreamIssues from './StreamIssues.js';

export default function Home(props) {
    const token = useContext(TokenContext);

    const resetInput = () => {
        document.querySelector("#postTitle").value = "";
        document.querySelector("#postsDescription").value = "";
    }

    if (!token) {
        return(
            <div id = "home">
                <h1> Climate Action 101</h1>
                <h2>Register or Login </h2>
            </div>
        );
    }
    else if (token) {
        return(
           <div>
               <div id = "issuesPosted">
                   <h1 id = "posted">Post Any Issues Here</h1>
                   <input type = "text" id = "postTitle" placeholder = "Enter Title Here" defaultValue=""></input>
                   <input type = "text" id = "postsDescription" placeholder = "Enter Description Here" defaultValue=""></input>
                   <button id = "postButton" onClick={() => {
                       props.userPosting()
                       resetInput()
                   }}>Submit</button>
               </div>
               <div>
                    <StreamIssues
                        issues = {props.issues}  
                        getComments = {props.getComments}
                        getOriginalPoster = {props.getOriginalPoster}
                        originalPoster = {props.originalPoster}
                        setOriginalPost = {props.setOriginalPost}
                        liked = {props.liked}
                        disliked = {props.disliked}
                    />
                </div>
           </div>
           
        );
    }
}