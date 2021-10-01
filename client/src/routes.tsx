import React, { PropsWithChildren } from 'react';
import HomePage from './pages/Home';
import TopicPage, { TopicPageProps, TopicPageType } from './pages/Topic';
import Topic, { TopicProps } from './components/Topic';
import Auth from './pages/Auth';

export enum MyLinkEnum {
    HOME = '/',
    LOG_IN = '/login',
    LOG_OUT = '/logout',
    TOPIC_CREATE = '/createTopic',
    TOPIC_VIEW = '/topic/:id',
    TOPIC_CHANGE = '/changeTopic/:id',
}

interface RoutesInt {
    [link: string]: (props: PropsWithChildren<any>) => JSX.Element;
}

const routes: RoutesInt = {
    [MyLinkEnum.HOME]: () => <HomePage />,
    [MyLinkEnum.LOG_IN]: () => <Auth />,
    [MyLinkEnum.TOPIC_VIEW]: ({ id }: TopicPageProps) => <TopicPage id={id} type={TopicPageType.VIEW} />,
    [MyLinkEnum.TOPIC_CREATE]: () => <TopicPage type={TopicPageType.CREATE} />,
    [MyLinkEnum.TOPIC_CHANGE]: ({ id }: TopicPageProps) => <TopicPage id={id} type={TopicPageType.EDIT} />,
}

export default routes;