module.exports = function(app) {

    app.get('/', function(req, res) {
        res.sendFile('/home/ruzil/Projects/myWorstBlog/index.html');
    });
}