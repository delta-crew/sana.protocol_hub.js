import path from 'path';
import Express from 'express';

var app = Express();
var server;

const PATH_STYLES = path.resolve(__dirname, '../client/styles');
const PATH_DIST = path.resolve(__dirname, '../../dist');
const PATH_FAVICON = path.resolve(__dirname, '../../img/favicon.ico');
const PATH_IMG = path.resolve(__dirname, '../../img');

app.use('/styles', Express.static(PATH_STYLES));
app.use(Express.static(PATH_DIST));
app.use('/favicon.ico', Express.static(PATH_FAVICON));
app.use('/img', Express.static(PATH_IMG));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

server = app.listen(process.env.PORT || 3000, () => {
  var port = server.address().port;

  console.log('Server is listening at %s', port);
});
