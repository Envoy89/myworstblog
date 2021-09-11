import React from 'react';
import HomePage from './pages/Home';
import TopicsPage from './pages/Topics';
import TopicPage from './pages/Topic';
import Auth from './pages/Auth';

export enum MyLinkEnum {
    HOME = '/',
    LOG_IN = '/logIn',
    TOPICS = '/topics'
}

interface RoutesInt {
    [link: string]: () => JSX.Element;
}

const routes: RoutesInt = {
    [MyLinkEnum.HOME]: () => <HomePage />,
    [MyLinkEnum.TOPICS]: () => <TopicsPage />,
    [MyLinkEnum.LOG_IN]: () => <Auth />
}

export default routes;