
import io from 'socket.io-client';
export default {
    install(Vue, {host}) {
        const socketClient = io(`${host}`);
        Vue.prototype.$socket = socketClient; 
    }
}