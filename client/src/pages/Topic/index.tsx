import React from 'react';
import Topic, { TopicPageType } from '../../components/Topic';
import { Endpoints } from '../../config';
import useData from '../../hooks/useData';
import ITopic from '../../interface/ITopic';

export interface TopicPageProps {
    id: number
}

interface ITopicQuery {
    id: string
}

const TopicPage: React.FC<TopicPageProps> = ({id}) => {
    const query = {
        id: id 
    }

    const { data, isLoading, isError } = 
        useData<ITopic>(Endpoints.GET_TOPIC, query, []);

    const topic = data ? <Topic type={TopicPageType.VIEW} value={data} /> :
    <Topic type={TopicPageType.VIEW} />

    return (
        <div>
            {topic}
        </div>
    )
}

export default TopicPage;