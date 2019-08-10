export default {
    initGetSensor({commit}, socket) { 
        socket.on("sensor", data => commit("CHANGE_SENSOR_CHART", data)) 
    }
};