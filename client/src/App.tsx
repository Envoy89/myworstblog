import React from 'react';
import { useRoutes } from 'hookrouter';
import Header from './components/Header';
import routes from './routes';

const App = () => {
    const match = useRoutes(routes);
    return (
        <div>
            <Header />
            { match }
        </div>
    )
}

export default App;