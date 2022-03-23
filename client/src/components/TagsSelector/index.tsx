import React from 'react';
import ITag from "../../interface/ITag";
import {addTag, getTagsWithPromiseForSelector} from "../../api/tags";
import TagList from "../TagList";

import AsyncCreatableSelect from 'react-select/async-creatable';

import s from './TagsSelector.module.css';

export enum TagsSelectorType {
    EDIT,
    VIEW
}

interface TagsSelectorProps {
    type: TagsSelectorType,
    tags: ITag[],
    handleTagSelect: (value: ITag[]) => void
}

const TagsSelector: React.FC<TagsSelectorProps> = ({type, tags, handleTagSelect}) => {

    const defaultData:any = [];
    tags && tags.map((val: ITag) => {
        defaultData.push({
            label: val.name,
            value: val._id
        })
    })

    console.log(defaultData);

    const handleChange = (opt: any) => {
        const tags:ITag[] = [];

        for (const i in opt) {
            tags.push({
                _id: opt[i].value,
                name: opt[i].label
            })
        }

        handleTagSelect(tags);
    }

    return type === TagsSelectorType.VIEW ? <div className={s.tagsSelectorView}>
            <TagList tags={tags} handleTagSelect={() => {}} />
        </div>
        :
        <div className={s.tagsSelector}>
            <AsyncCreatableSelect
                defaultOptions
                defaultValue={defaultData}
                isMulti
                loadOptions={getTagsWithPromiseForSelector}
                onChange={handleChange}
                menuPlacement="auto"
                onCreateOption={async (tagName) => { await addTag(tagName); }}
            />
        </div>
}

export default TagsSelector;