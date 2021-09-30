import React, { useState } from 'react';
import TopicSmallView from '../../components/TopicSmallView';
import { Endpoints } from '../../config';
import useData from '../../hooks/useData';
import ITopic from '../../interface/ITopic';

interface ITopicQuery {
    limit: number
}

const Home = () => {
    const [needUpdate, setNeedUpdate] = useState<boolean>(true);
    const query: ITopicQuery = {
        limit: 200
    }
    const { data, isLoading, isError } = 
        useData<ITopic[]>(Endpoints.GET_TOPICS, query, [needUpdate]);

    return (
        <div>
            {data && data.map((val: ITopic) => {
                return <TopicSmallView 
                    _id = {val._id || 1}
                    name={val.name}
                    fullText={val.fullText}
                    needUpdateAllTipics={needUpdate}
                    setNeedUpdateAllTopics={
                        (value: boolean) => {
                            setNeedUpdate(value);
                        }
                    }
                />
            })}
        </div>
    )
}

export default Home;