export default {
    initLog({commit}, socket) {  
        socket.on("log", data => commit("CHANGE_LOG_CHART", data)) 
    }
};