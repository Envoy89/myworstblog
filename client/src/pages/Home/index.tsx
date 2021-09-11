import React from 'react';
import TopicSmallView from '../../components/TopicSmallView';
import { Endpoints } from '../../config';
import useData from '../../hooks/useData';

interface ITopic {
    _id: number,
    name: string,
    fullText: string
}

interface ITopicQuery {
    limit: number
}

const Home = () => {
    const query: ITopicQuery = {
        limit: 2
    }
    const { data, isLoading, isError } = 
        useData<ITopic[]>(Endpoints.GET_TOPICS, query, []);

    return (
        <div>
            {data && data.map((val: ITopic) => {
                return <TopicSmallView 
                    _id = {1}
                    name={val.name}
                    fullText={val.fullText}
                />
            })}
        </div>
    )
}

export default Home;