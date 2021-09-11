import React from 'react';

interface TopicProps {
    _id: number,
    name: String,
    fullText: String
}

const TopicSmallView: React.FC<TopicProps> = ({
    _id, name, fullText
}) => {
    const topicNameClass = "col s8"

    return <div className="row">
        <div className={topicNameClass}>
            <h5><a href={"/topics/${_id}"}>{name}</a></h5>
        </div>
    
        <div className="col s4">
        {/* <!-- <a class="waves-effect waves-light btn">Edit</a> --> */}
        <button className="btn waves-effect waves-light" type="submit" name="action">Edit</button>
        <a className="waves-effect waves-light btn" href="/topics/delete/{{topic._id}}">Remove</a>
        </div>
    <div className="col s12">
      <p className="topicFullText">{fullText}</p>
    </div>
    <div className="divider"></div>
  </div>
}

export default TopicSmallView;