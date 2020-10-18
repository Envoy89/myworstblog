module.exports = (req, res, fileName, renderObj = {}) => {
    renderObj.isAuth = req.isAuthenticated();
    res.render(fileName, renderObj);
}