import {Server} from 'socket.io';

export default function SocketHandler(req, res) {
    if (res.socket.server.io) {
      console.log('Socket is already running');
      res.end();
      return;
    }

    const io = new Server(res.socket.server, {cors: {origin: "http://localhost:3000"}});
    res.socket.server.io = io;

    io.on('connection', socket => {
      console.log(`⚡: ${socket.id} user just connected!`);
      socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
      });
      socket.on('messageToPropogate', msg => {
        socket.broadcast.emit('newIncomingMessage', msg);
      })
    })
    
    res.end();
}