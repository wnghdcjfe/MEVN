import io from 'socket.io-client'; 
export default {
    install: (app, {host}) => {
      const socketClient = io(`${host}`);
      app.config.globalProperties.$socket = socketClient
      app.provide('socket', socketClient)
    }
  }