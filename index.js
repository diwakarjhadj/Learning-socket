const { Server } = require('socket.io');
const http = require('http');

// Create an HTTP server
const server = http.createServer();

// Attach Socket.IO to the HTTP server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

// Start the HTTP server on port 4000
server.listen(4000, () => {
    console.log('Server is running on port 4000');
});

io.on('connection', (socket) => {
    console.log("User Connected", socket.id);
    
    socket.on('disconnect', () => {
        console.log("User Disconnected");
    });
    
    socket.on('message', (message) => {
        console.log("My message", message);
        // Emit the message to all connected clients
        io.emit('response', message);
    });
});
