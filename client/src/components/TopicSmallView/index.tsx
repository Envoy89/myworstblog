import React from 'react';
import { A, navigate } from 'hookrouter';
import req from '../../utils/request';
import { Endpoints } from '../../config';
import { isAuthenticate } from '../../utils/auth';
import { MyLinkEnum } from '../../routes';
import IQuery from '../../interface/IQuery';

interface TopicProps {
    _id: number,
    name: String,
    fullText: String,
}

const TopicSmallView: React.FC<TopicProps> = ({
    _id, name, fullText
}) => {
    const topicNameClass: string = "col s8"

    const isAuth = isAuthenticate();

    const removeTopic = async () => {
        const query: IQuery = {
            id: _id 
        }
        
        try {
            await req(Endpoints.DELETE_TOPIC, query);
            
            navigate(MyLinkEnum.HOME);
            document.location.reload();
        } catch(e) {
            alert(e);
        }
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