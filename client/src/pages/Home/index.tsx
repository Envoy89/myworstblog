import React from 'react';
import Loader from '../../components/Loader';
import TopicSmallView from '../../components/TopicSmallView';
import { Endpoints } from '../../config';
import useData from '../../hooks/useData';
import IQuery from '../../interface/IQuery';
import ITopic from '../../interface/ITopic';

const Home = () => {
    const query: IQuery = {
        limit: 20,

    }
    const { data, isLoading, isError } = 
        useData<ITopic[]>(Endpoints.GET_TOPICS, query, []);

    if (isLoading) {
        return <Loader />
    } else if (isError) {
        return null;
    } 

    return (
        <div>
            {
                data && data.map((val: ITopic) => {
                    return <TopicSmallView 
                        _id = {val._id || 1}
                        name={val.name}
                        fullText={val.fullText}
                    />
                })
            }
        </div>
    )
}

export default Home;