import { Link } from 'react-router-dom';

export default function UsersPost(props) {
    if (props.userIssues.errMsg) {
        return(
            <div>
                <h2>You do not have any post.</h2>
            </div>
        );
    }
    else if (!props.userIssues.errMsg) {
        return(
            props.userIssues.map(e => {
                return(
                    <div className = "userPostings">
                        <div>
                            <h3>{e.title}</h3>
                            <h4>{e.description}</h4>
                        </div>
                        <div className = "Posters">
                            <button className = "issueSpace" onClick={() => {
                                props.getComments(e._id, e.userID)
                                props.getOriginalPoster(e.userID)
                                props.setOriginalPost({title: e.title, description: e.description})
                            }}>
                                <Link to="/comments" style={{textDecoration: 'none', color: 'blue'}}>Comments</Link>
                            </button>

                            <h4 className = "liked">{`Likes: ${e.liked}`}</h4>
                            <h4 className = "disliked">{`Dislikes: ${e.disliked}`}</h4>
                        </div>
                    </div>
                );
            })
        );
    }
}