import React from 'react';
import IQuery from "../../interface/IQuery";
import useData from "../../hooks/useData";
import ITagResponse from "../../interface/ITagResponse";
import {Endpoints} from "../../config";
import ITag from "../../interface/ITag";

interface TagsSelectorProps {
    tags: string[],
    handleTagSelect: (value: string) => void
}

const LIMIT = 500;

const TagsSelector: React.FC<TagsSelectorProps> = ({tags, handleTagSelect}) => {

    const query: IQuery = {
        limit: LIMIT,
        pageNumber: 1
    }
    const { data } =
        useData<ITagResponse>(Endpoints.GET_TAGS, query, [1]);

    //todo loader and error handle

    const handleClick = (value: React.ChangeEvent<HTMLSelectElement>) => {
        handleTagSelect(value.target.value);
    }

    return <div className="tagsSelector">
        <h6>Тэги:</h6>
        <select size={15} onChange={handleClick}>
            {
                data && data.tags && data.tags.map((val: ITag) => {
                    return <option value={val._id}>{val.name}</option>
                })
            }
        </select>
        <div className="selectedTagsList">
            {
                tags.map((val: string) => {
                    const element = data?.tags.find(x => x._id == val);
                    return <div onClick={() => {
                        element && handleTagSelect(element._id)
                    }}>
                        {element?.name}
                    </div>
                })
            }
        </div>
    </div>
}

export default TagsSelector;