import {Endpoints} from "../../config";
import ITag from "../../interface/ITag";
import IQuery from "../../interface/IQuery";
import useData from "../../hooks/useData";
import ITagResponse from "../../interface/ITagResponse";
import req from "../../utils/request";

const LIMIT_DEFAULT_VALUE = 500;
const PAGE_NUMBER_DEFAULT_VALUE = 1;
const SEARCH_STRING_DEFAULT_VALUE = '';

export const addTag = async (name: string) => {
    const tag: ITag | undefined = name ? {
        name
    } : undefined;

    return await req<ITag>(Endpoints.CREATE_TAGS, undefined, tag);
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

export const getTagsWithPromiseForSelector = (searchString: string): Promise<any> => {
    const query: IQuery = {
        limit: LIMIT_DEFAULT_VALUE,
        pageNumber: PAGE_NUMBER_DEFAULT_VALUE,
        searchString: searchString
    }

    return new Promise(async function(resolve) {
        const tagsData = await req<ITagResponse>(Endpoints.GET_TAGS, query, undefined);

        const data:any = [];
        tagsData && tagsData.tags && tagsData.tags.map((val: ITag) => {
            data.push({
                label: val.name,
                value: val._id
            })
        });

        resolve(data);
    });
}