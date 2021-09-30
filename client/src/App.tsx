import React from 'react';
import { useRoutes, setBasepath } from 'hookrouter';
import Header from './components/Header';
import Footer from './components/Footer';
import routes from './routes';

var base = document.getElementsByTagName('base')[0].getAttribute("href");
if (base) {
    setBasepath(base);
}

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