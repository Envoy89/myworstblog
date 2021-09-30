import React from 'react';
import Loader from '../../components/Loader';
import Topic, { TopicPageType } from '../../components/Topic';
import { Endpoints } from '../../config';
import useData from '../../hooks/useData';
import IQuery from '../../interface/IQuery';
import ITopic from '../../interface/ITopic';

export interface TopicPageProps {
    id: number
}

const TopicPage: React.FC<TopicPageProps> = ({id}) => {
    const query: IQuery = {
        id
    }

    const { data, isLoading } = 
        useData<ITopic>(Endpoints.GET_TOPIC, query, []);

    const topic = data ? <Topic type={TopicPageType.VIEW} value={data} /> :
        <Topic type={TopicPageType.VIEW} />

    if (isLoading) {
        return <Loader />
    }

    return (
        <div>
            {topic}
        </div>
    )
}

export default TopicPage;