import React from 'react';
import { isAuthenticate } from '../../utils/auth';

interface TopicProps {
    _id: number,
    name: String,
    fullText: String
}

const TopicSmallView: React.FC<TopicProps> = ({
    _id, name, fullText
}) => {
    const topicNameClass = "col s8"

    const isAuth = isAuthenticate();

    const authUserButtons = isAuth ? <div className="col s4">
        <button className="btn waves-effect waves-light" type="submit" name="action">Edit</button>
        <a className="waves-effect waves-light btn" href="/topics/delete/{{topic._id}}">Remove</a>
    </div> : null;

    return <div className="row">
        <div className={topicNameClass}>
            <h5><a href={"/topics/${_id}"}>{name}</a></h5>
        </div>
        {authUserButtons}
    <div className="col s12">
      <p className="topicFullText">{fullText}</p>
    </div>
    <div className="divider"></div>
  </div>
}

export default TopicSmallView;