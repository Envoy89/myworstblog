import ITag from "./ITag";

export default interface ITagResponse {
    tags: ITag[],
    tagCount: number
}