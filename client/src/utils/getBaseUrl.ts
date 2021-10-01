const getBaseUrl = () => {
    const base = document.getElementsByTagName('base')[0].getAttribute("href");

    if (base && base !== '/') {
        if (base.length > 1 && base[base.length-1] === '/') {
            return base.substring(0, base.length - 1);
        }
        return base;
    }

    return null;
}

export default getBaseUrl;