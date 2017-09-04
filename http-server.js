const http = require('http')
const port = 3004;

const server = http.createServer((request, response) => {
    console.log('new request', request.url)
    response.end('Hello world!')
})

server.listen(port, (err) => {
    if (err) return console.log('Error:', err);

    console.log(`Listening on ${port}`);
})

