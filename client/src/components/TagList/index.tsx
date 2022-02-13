import React from 'react';
import ITag from "../../interface/ITag";

interface TagListProps {
    tags: ITag[],
    handleTagSelect: (value: ITag) => void
}

const TagList: React.FC<TagListProps> = ({tags, handleTagSelect}) => {
    return <div className="selectedTagsList">
        {
            tags.map((val: ITag) => {
                return <div onClick={() => {
                    handleTagSelect(val)
                }}>
                    {val.name}
                </div>
            })
        }
    </div>
}

export default TagList;