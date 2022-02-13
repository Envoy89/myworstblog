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
        className="btn waves-effect waves-light" 
        type="submit" 
        name="action"
        onClick={type == TopicPageType.EDIT ? handleEdit : handleCreate}
    >
        {type == TopicPageType.EDIT ? "Изменить" : "Создать"}
    </button>;

    const setOneTag = (value: ITag) => {
        let newTags = [...tags];
        if (newTags.find(x => x._id === value._id)) {
            newTags = newTags.filter(x => x._id != value._id);
        } else {
            newTags.push(value);
        }
        setTags(newTags);
    }

    return (
        <div className="topicArea">
            <h4>Topic</h4>
            <div className="topicInfoArea">
                <div className="topicField">
                    <div className="fieldText">Name:</div>
                    <textarea onChange={handleChangeName} disabled={readOnly} value={name}/>
                </div>
                <div className="topicField">
                    <div className="fieldText">Text:</div>
                    <textarea className="topicTextArea" onChange={handleChangeFullText} disabled={readOnly} value={fullText}/>
                </div>
            </div>
            <TagsSelector
                type={readOnly ? TagsSelectorType.VIEW : TagsSelectorType.EDIT}
                tags={tags}
                handleTagSelect={readOnly ? () => {} : setOneTag}
            />
            {type == TopicPageType.EDIT || type == TopicPageType.CREATE ? button : null}
        </div>
    )
}

export default Topic;