import Comments from './Comments.js';

export default function OriginalPost(props) {
    return(
        <div>
            <div>
                <div id = "comments">
                    <img className= "comments"src={props.originalPoster.profImg} alt={`${props.originalPoster.userName}'s post`}></img>
                    <h4 className = "commentsUser">{props.originalPoster.userName}</h4>
                </div>
                <div id = "userPosted">
                    <h2>{props.originalPost.title}</h2>
                    <h3>{props.originalPost.description}</h3>
                </div>
            </div>
            <Comments commentThread = {props.commentThread}/>
        </div>
        
    );
}