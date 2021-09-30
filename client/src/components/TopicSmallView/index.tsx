import React from 'react';
import { A, navigate } from 'hookrouter';
import req from '../../utils/request';
import { Endpoints } from '../../config';
import { isAuthenticate } from '../../utils/auth';
import { MyLinkEnum } from '../../routes';

interface TopicProps {
    _id: number,
    name: String,
    fullText: String,
    needUpdateAllTipics: boolean,
    setNeedUpdateAllTopics: (value: boolean) => void
}

const TopicSmallView: React.FC<TopicProps> = ({
    _id, name, fullText, needUpdateAllTipics, setNeedUpdateAllTopics
}) => {
    const topicNameClass = "col s8"

    const isAuth = isAuthenticate();

    const removeTopic = async () => {
        const query = {
            id: _id 
        }

        await req(Endpoints.DELETE_TOPIC, query);
        
        setNeedUpdateAllTopics(!needUpdateAllTipics);
    }

    const authUserButtons = isAuth ? <div className="col s4 topicControlButton">
        <button 
            className="btn waves-effect waves-light" 
            type="submit" 
            name="action" 
        >
            Edit
        </button>
        <button 
            className="waves-effect waves-light btn" 
            type="submit" 
            name="action"
            onClick={removeTopic}
        >
            Remove
        </button>
    </div> : null;

    return <div className="row">
        <div className={topicNameClass}>
            <h5><A href={`/topic/${_id}`}>{name}</A></h5>
        </div>
        {authUserButtons}
    <div className="col s12">
      <p className="topicFullText">{fullText}</p>
    </div>
    <div className="divider"></div>
  </div>
}

export default TopicSmallView;