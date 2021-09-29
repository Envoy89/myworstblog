import React from 'react';
import TopicSmallView from '../../components/TopicSmallView';
import { Endpoints } from '../../config';
import useData from '../../hooks/useData';
import ITopic from '../../interface/ITopic';

interface ITopicQuery {
    limit: number
}

const Home = () => {
    const query: ITopicQuery = {
        limit: 200
    }
    const { data, isLoading, isError } = 
        useData<ITopic[]>(Endpoints.GET_TOPICS, query, []);

    return (
        <div>
            {data && data.map((val: ITopic) => {
                return <TopicSmallView 
                    _id = {val._id || 1}
                    name={val.name}
                    fullText={val.fullText}
                />
            })}
        </div>
    )
}

export default Home;