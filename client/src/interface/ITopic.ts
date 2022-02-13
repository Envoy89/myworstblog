import ITag from "./ITag";

export default interface ITopic {
    _id ?: number,
    name: string,
    fullText: string,
    tags?: ITag[]
}