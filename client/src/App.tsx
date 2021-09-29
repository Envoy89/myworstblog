import React from 'react';
import { useRoutes } from 'hookrouter';
import Header from './components/Header';
import Footer from './components/Footer';
import routes from './routes';

const App = () => {
    const match = useRoutes(routes);
    return (
        <div>
            <Header />
            { match }
            <Footer />
        </div>
    )
}

export default App;