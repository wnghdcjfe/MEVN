export default {
    initLog({commit}, socket) {  
        socket.on("spec", data => commit("CHANGE_SPEC", data)) 
        socket.on("log", data => commit("CHANGE_RESPONSE_CHART", data))  
    }
};