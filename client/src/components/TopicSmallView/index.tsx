import React from 'react';
import { A, navigate } from 'hookrouter';
import req from '../../utils/request';
import { Endpoints } from '../../config';
import { isAuthenticate } from '../../utils/auth';
import { MyLinkEnum } from '../../routes';
import IQuery from '../../interface/IQuery';
import showAlert from '../../utils/alert';
import ITag from "../../interface/ITag";
import TagList from "../TagList";
import cn from 'classnames';

import s from './TopicSmallView.module.css';
import MarkdownViewer from "../MarkdownViewer";

interface TopicProps {
    _id: number,
    name: string,
    fullText: string,
    tags?: ITag[],
    createdDate?: Date
}

const TopicSmallView: React.FC<TopicProps> = ({
    _id, name, fullText, tags, createdDate
}) => {

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
            showAlert("Error", `${e}`);
        }
    }

    const editTopic = () => {
        navigate(MyLinkEnum.TOPIC_CHANGE.replace(':id', `${_id}`));
    }

    const authUserButtons = isAuth ? <div className={s.topicControlButton}>
        <button 
            className={cn("btn", "waves-effect", "waves-light")}
            type="submit" 
            name="action" 
            onClick={editTopic}
        >
            Edit
        </button>
        <button 
            className={cn("btn", "waves-effect", "waves-light")}
            type="submit" 
            name="action"
            onClick={removeTopic}
        >
            Remove
        </button>
    </div> : null;

    const tagsContainer = tags ? <div className={s.tags}>
        <TagList tags={tags} handleTagSelect={() => {}} />
    </div>: null;

    return <div className={s.topicRow}>
        <div className={s.buttonsContainer}>
            <div className={s.nameClass}>
                <A href={`/topic/${_id}`}><MarkdownViewer text={name} /></A>
            </div>
            <div className={s.createdDate}>{createdDate?.toLocaleDateString()}</div>
            {authUserButtons}
        </div>
        <div className={s.topicText}>
          <MarkdownViewer text={fullText} />
        </div>
        {tagsContainer}
  </div>
}

export default TopicSmallView;