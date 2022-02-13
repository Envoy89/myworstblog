import React, {useEffect, useState} from 'react';
import ITag from "../../interface/ITag";
import {addTag, getTags} from "../../api/tags";
import TagList from "../TagList";

export enum TagsSelectorType {
    EDIT,
    VIEW
}

interface TagsSelectorProps {
    type: TagsSelectorType,
    tags: ITag[],
    handleTagSelect: (value: ITag) => void
}

const TagsSelector: React.FC<TagsSelectorProps> = ({type, tags, handleTagSelect}) => {

    const [tagSearchString, setTagSearchString] = useState<string>("");
    const [newTagName, setNewTagName] = useState<string>("");

    const { data: newTag } = addTag(newTagName);
    const { data: tagsData } = getTags(tagSearchString);

    useEffect(() => {
        setTagSearchString("");
        newTag && handleTagSelect(newTag);
    }, [newTag])

    const handleClick = (event: React.BaseSyntheticEvent) => {
        const tag = tagsData?.tags.find(x => x._id === event.target?.value);
        tag && handleTagSelect(tag);
    }

    const handleTagSearchStringChange = (value: React.ChangeEvent<HTMLInputElement>) => {
        const searchString = value.target.value;
        setTagSearchString(searchString);
    }

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab') {
            setNewTagName(tagSearchString);
        }
    }

    const test = type === TagsSelectorType.VIEW ? null : <div>
        <div className="tagSearchContainer">
            <h6 className="tagSearchTitle">Тэги:</h6>
            <div className="tagSearchText">
                <input value={tagSearchString}
                       onChange={handleTagSearchStringChange}
                       onKeyDown={handleTagInputKeyDown}
                       placeholder="Введите для поиска (Tab чтобы добавить новый)"
                />
            </div>
        </div>
        <select size={15} onClick={handleClick} className="tagsSelectorList">
            {
                tagsData && tagsData.tags && tagsData.tags.map((val: ITag) => {
                    return <option className="selectableOption" value={val._id}>{val.name}</option>
                })
            }
        </select>
    </div>


    return <div className="tagsSelector">
        {test}
        <TagList tags={tags} handleTagSelect={handleTagSelect} />
    </div>
}

export default TagsSelector;