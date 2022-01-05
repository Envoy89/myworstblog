import React, {useState} from 'react';
import useData from "../../hooks/useData";
import {Endpoints} from "../../config";
import IQuery from "../../interface/IQuery";
import ITagResponse from "../../interface/ITagResponse";
import ITag from "../../interface/ITag";
import Loader from "../Loader";

const LIMIT = 20;

const TagsList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const query: IQuery = {
        limit: LIMIT,
        pageNumber: currentPage
    }
    const { data, isLoading, isError } =
        useData<ITagResponse>(Endpoints.GET_TAGS, query, [currentPage]);

    if (isLoading) {
        return <Loader />
    } else if (isError) {
        return null;
    }

    return <div>
        {
            data && data.tags && data.tags.map((val: ITag) => {
                return <div>{val.name}</div>
            })
        }
    </div>
}

export default TagsList;