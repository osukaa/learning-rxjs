const http = require('http')
const port = 3004;

const Rx = require('rxjs/rx')

const server = http.createServer()

const requests = Rx.Observable.fromEvent(server, 'request', Array.of);

requests.subscribe(([request, response]) => {
    console.log('new request', request.url);
    response.end('Hello world!');
});

server.listen(port, (err) => {
    if (err) return console.log('Error:', err);

    console.log(`Listening on ${port}`);
})

