import { useEffect } from 'react';
import UsersPost from './UsersPost.js';

export default function Profile(props) {
    useEffect(() => {
        props.userPosts(props.currentUser._id)
    }, [])
    
    return(
        <div id = "profileInfo">
            <h2>Username: {props.currentUser.userName}</h2>
            <img className = "profilepicture" src={props.currentUser.profImg} alt={`${props.currentUser.userName}'s profile pic`}></img>
            <UsersPost 
                userIssues = {props.userIssues}
                getComments = {props.getComments}
                getOriginalPoster = {props.getOriginalPoster}
                setOriginalPost = {props.setOriginalPost}
            />
        </div>
    );
}