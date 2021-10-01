import React from 'react';
import Loader from '../../components/Loader';
import Topic from '../../components/Topic';
import { Endpoints } from '../../config';
import useData from '../../hooks/useData';
import IQuery from '../../interface/IQuery';
import ITopic from '../../interface/ITopic';

export enum TopicPageType {
    CREATE,
    EDIT,
    VIEW
}

export interface TopicPageProps {
    id?: number,
    type: TopicPageType,
}

const TopicPage: React.FC<TopicPageProps> = ({ id, type }) => {

    let topic = <Topic type={TopicPageType.CREATE} />
    
    if ((type == TopicPageType.VIEW || type == TopicPageType.EDIT) && id) {
        const query: IQuery = {
            id
        }

        const { data, isLoading } = 
            useData<ITopic>(Endpoints.GET_TOPIC, query, []);

        if (isLoading) {
            return <Loader />
        }

        topic = data ? <Topic type={type} value={data} /> :
            <Topic type={type} />
    }

    return (
        <div>
            {topic}
        </div>
    )
}

export default TopicPage;