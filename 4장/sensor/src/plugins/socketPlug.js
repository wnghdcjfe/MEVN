import Vue from 'vue';
import io from 'socket.io-client';
export default {
    install(Vue, {
        host,
        port
    }) {
        const socketClient = io(`${host}:${port}`);
        Vue.prototype.$socket = socketClient;
        console.log("complete")
    }
}