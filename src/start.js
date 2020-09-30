import server from './app';
import http from 'http';

server.set('port', 3001);

const httpServer = http.createServer(server);

const startServer = () => {
  httpServer.listen(3001, () => {
    console.log('Here!')
  });
};
startServer();
