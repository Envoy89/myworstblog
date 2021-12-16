import React, {useState} from 'react';
import Loader from '../../components/Loader';
import TopicSmallView from '../../components/TopicSmallView';
import { Endpoints } from '../../config';
import useData from '../../hooks/useData';
import IQuery from '../../interface/IQuery';
import ITopic from '../../interface/ITopic';
import ITopicResponse from "../../interface/ITopicResponse";
import Pagination from "../../components/Pagination";

const LIMIT = 10;

const Home = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const query: IQuery = {
        limit: LIMIT,
        pageNumber: currentPage
    }
    const { data, isLoading, isError } = 
        useData<ITopicResponse>(Endpoints.GET_TOPICS, query, [currentPage]);

    if (isLoading) {
        return <Loader />
    } else if (isError) {
        return null;
    } 

    return (
        <>
            <div className="mainTopics">
                {
                    data && data.topics && data.topics.map((val: ITopic) => {
                        return <TopicSmallView
                            _id = {val._id || 1}
                            name={val.name}
                            fullText={val.fullText}
                        />
                    })
                }
            </div>
            <div className="footer22">
                <Pagination
                    pageNumber={currentPage}
                    elementCount={data?.topicsCount}
                    limit={LIMIT}
                    changePage={setCurrentPage}
                />
            </div>
        </>
    )
}

export default Home;