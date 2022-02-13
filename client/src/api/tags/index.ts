import {Endpoints} from "../../config";
import ITag from "../../interface/ITag";
import IQuery from "../../interface/IQuery";
import useData from "../../hooks/useData";
import ITagResponse from "../../interface/ITagResponse";

const LIMIT_DEFAULT_VALUE = 500;
const PAGE_NUMBER_DEFAULT_VALUE = 1;
const SEARCH_STRING_DEFAULT_VALUE = '';

export const addTag = (name: string) => {
    const tag: ITag | undefined = name ? {
        name
    } : undefined;

    return useData<ITag>(Endpoints.CREATE_TAGS, undefined, tag, [name]);
}

export const getTags = (searchString: string | undefined, pageNumber:number = PAGE_NUMBER_DEFAULT_VALUE) => {
    const query: IQuery = {
        limit: LIMIT_DEFAULT_VALUE,
        pageNumber: pageNumber
    }

    if (!searchString) {
        searchString = SEARCH_STRING_DEFAULT_VALUE;
    } else {
        query.searchString = searchString;
    }

    return useData<ITagResponse>(Endpoints.GET_TAGS, query, undefined, [searchString]);
}