import React, { useState, useEffect } from 'react';
import ITopic from '../../interface/ITopic';

export enum TopicPageType {
    CREATE,
    EDIT,
    VIEW
}

export interface TopicProps {
    type: TopicPageType,
    value?: ITopic
}

const Topic: React.FC<TopicProps> = ({
    type, value
}) => {
    
    const [name, setName] = useState<string>(value?.name || "");
    const [fullText, setFullText] = useState<string>(value?.fullText || "");
    
    useEffect(() => {
        setName(value?.name || "");
    }, [value?.name])

    useEffect(() => {
        setFullText(value?.fullText || "");
    }, [value?.fullText])

    const handleChangeName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const targetValue = e.target.value;
        setName(targetValue);
    }

    const handleChangeFullText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const targetValue = e.target.value;
        setFullText(targetValue);
    }

    const readOnly = type == TopicPageType.VIEW;

    const handleCreate = () => {

    }

    const handleEdit = () => {

    }

    const button = <button 
        className="btn waves-effect waves-light" 
        type="submit" 
        name="action"
        onClick={type == TopicPageType.EDIT ? handleEdit : handleCreate}
    >
        {type == TopicPageType.EDIT ? "Изменить" : "Создать"}
    </button>;

    return (
        <div>
            <div>Topic!!!</div>
            <textarea onChange={handleChangeName} disabled={readOnly} value={name}></textarea>
            <textarea onChange={handleChangeFullText} disabled={readOnly} value={fullText}></textarea>
            {type == TopicPageType.EDIT || type == TopicPageType.CREATE ? button : null}
        </div>
    )
}

export default Topic;