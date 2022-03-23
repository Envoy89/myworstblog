import React, { useState, useEffect } from 'react';
import { Endpoints } from "../../config";
import req from '../../utils/request';
import ITopic from '../../interface/ITopic';
import IQuery from '../../interface/IQuery';
import { navigate } from 'hookrouter';
import { MyLinkEnum } from '../../routes';
import { TopicPageType } from '../../pages/Topic';
import showAlert from '../../utils/alert';
import TagsSelector, {TagsSelectorType} from "../TagsSelector";
import ITag from "../../interface/ITag";
import cn from "classnames";

import s from './Topic.module.css';

export interface TopicProps {
    type: TopicPageType,
    value?: ITopic
}

const Topic: React.FC<TopicProps> = ({
    type, value
}) => {
    
    const [name, setName] = useState<string>(value?.name || "");
    const [fullText, setFullText] = useState<string>(value?.fullText || "");
    const [tags, setTags] = useState<ITag[]>(value?.tags || []);

    useEffect(() => {
        setName(value?.name || "");
    }, [value?.name])

    useEffect(() => {
        setFullText(value?.fullText || "");
    }, [value?.fullText])

    useEffect(() => {
        setTags(value?.tags || []);
    }, [value?.tags])

    const handleChangeName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const targetValue = e.target.value;
        setName(targetValue);
    }

    const handleChangeFullText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const targetValue = e.target.value;
        setFullText(targetValue);
    }

    const readOnly = type == TopicPageType.VIEW;

    const handleCreate = async () => {
        const topic: ITopic = {
            name,
            fullText,
            tags
        }

        try {
            await req<ITopic>(Endpoints.CREATE_TOPIC, undefined, topic);
        
            navigate(MyLinkEnum.HOME);
        } catch(e) {
            showAlert("Error", `${e}`);
        }
    }

    const handleEdit = async () => {
        if (!value || !value._id) return;

        const topic: ITopic = {
            name,
            fullText,
            tags
        }

        const query:IQuery = {
            id: value._id
        }

        try {
            await req<ITopic>(Endpoints.EDIT_TOPIC, query, topic);
        
            navigate(MyLinkEnum.HOME);
        } catch(e) {
            showAlert("Error", `${e}`);
        }
    }

    const button = <button 
        className={cn(s.button, "btn", "waves-effect", "waves-light")}
        type="submit" 
        name="action"
        onClick={type == TopicPageType.EDIT ? handleEdit : handleCreate}
    >
        {type == TopicPageType.EDIT ? "Изменить" : "Создать"}
    </button>;

    const topicName = readOnly ? <div className={s.topicName}>{name}</div> : <div className={s.topicField}>
        <textarea onChange={handleChangeName} disabled={readOnly} value={name}/>
    </div>

    const topicText = readOnly ? <div className={s.topicText}>{fullText}</div> :<div className={s.topicField}>
        <textarea className={s.topicTextArea} onChange={handleChangeFullText} disabled={readOnly} value={fullText}/>
    </div>

    return (
        <div className={s.topicArea}>
            <div className="topicInfoArea">
                {topicName}
                {topicText}
            </div>
            <TagsSelector
                type={readOnly ? TagsSelectorType.VIEW : TagsSelectorType.EDIT}
                tags={tags}
                handleTagSelect={readOnly ? () => {} : setTags}
            />
            {type == TopicPageType.EDIT || type == TopicPageType.CREATE ? button : null}
        </div>
    )
}

export default Topic;