import React, { PropsWithChildren } from 'react';
import HomePage from './pages/Home';
import TopicPage, { TopicPageProps } from './pages/Topic';
import Topic, { TopicProps, TopicPageType } from './components/Topic';
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
    [MyLinkEnum.TOPIC_VIEW]: ({ id }: TopicPageProps) => <TopicPage id={id} />,
    [MyLinkEnum.TOPIC_CREATE]: () => <Topic type={TopicPageType.CREATE} />,
   // [MyLinkEnum.TOPIC_CHANGE]: ({ id }: TopicPageProps) => <Topic type={TopicPageType.CREATE} id={id} />,
}

export default routes;