import { Link } from 'react-router-dom';

export default function IssuesFeed (props){
    return(
        props.issues.map(e => {
            return(
                <div className = "issuesFeed">
                    <div>
                        <img className = "prof_img" src={e.userProfImg} alt={`${e.userName}'s post`}></img>
                        <h5 className = "userName">{e.userName}</h5>
                    </div>
                    <div className = "streamText">
                        <h3>{e.title}</h3>
                        <h4>{e.description}</h4>
                    </div>
                    <div className = "votersButton">
                        <button className = "commentButton" onClick={() => {
                            props.getComments(e._id, e.userID)
                            props.getOriginalPoster(e.userID)
                            props.setOriginalPost({title: e.title, description: e.description})
                        }}>
                            <Link to="/comments" style={{textDecoration: 'none', color: 'blue'}}>Comments</Link>
                        </button>
                    
                        <button className = "voted" onClick={() => props.liked(e._id)}>Like</button>
                        <h4>{e.liked}</h4>
                        <button className = "voted" onClick={() => props.disliked(e._id)}>Dislike</button>
                        <h4>{e.disliked}</h4>
                    </div>
                </div>
            );
        })
    )
}