import ITopic from "./ITopic";

export default interface ITopicResponse {
    topics: ITopic[],
    topicsCount: number
}