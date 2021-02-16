import { createStore } from 'vuex' 
export default createStore({
    state: {
        sensors : [], 
        sensor : {},
        isClosed : false
    }, 
    mutations: {
        CHANGE_SENSOR_CHART(state, payload) {   
            state.sensors.push(payload)
            if(state.sensors.length > 10)state.sensors.shift()
            state.sensor = payload  
        }, 
        CLOSE_SERVICE(state, payload){ 
            console.log("CLOSE_SERVICE", payload)
            state.isClosed = true
        }
    }, 
    actions: {
        INIT_GET_SENSOR({ commit }, socket) {
            socket.on("sensor", data => commit("CHANGE_SENSOR_CHART", data))  
            socket.on("closeSensorService", data => commit("CLOSE_SERVICE", data))  
        } 
    }, 
    getters: {
        sensors : state => state.sensors,  
        sensor : state => state.sensor,  
    },
    modules: {

    }
  })