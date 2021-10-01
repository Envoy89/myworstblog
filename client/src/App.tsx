import React from 'react';
import { useRoutes, setBasepath } from 'hookrouter';
import Header from './components/Header';
import Footer from './components/Footer';
import Alert from './components/Alert';
import routes from './routes';
import getBaseUrl from './utils/getBaseUrl';

const base = getBaseUrl();

if (base) {
    setBasepath(base);
}

const App = () => {
    const match = useRoutes(routes);
    return (
        <>
            <Alert />
            <Header />
            <div className="mainContainer">
                { match }
            </div>
            <Footer />
        </>
    )
}

export default App;