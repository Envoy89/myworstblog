import React from 'react';
import HomePage from './pages/Home';
import TopicsPage from './pages/Topics';
import TopicPage from './pages/Topic';

export enum MyLinkEnum {
    HOME = '/',
    TOPICS = '/topics'
}

interface RoutesInt {
    [link: string]: () => JSX.Element;
}

const routes: RoutesInt = {
    [MyLinkEnum.HOME]: () => <HomePage />,
    [MyLinkEnum.TOPICS]: () => <TopicsPage />
}

export default routes;