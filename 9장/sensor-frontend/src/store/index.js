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
        CLOSE_SERVICE(state){
            state.isClosed = true
        }
    }, 
    actions: {
        INIT_GET_SENSOR({ commit }, socket) {
            socket.on("sensor", data => commit("CHANGE_SENSOR_CHART", data))  
            socket.on("closeSensorService", commit("CLOSE_SERVICE"))  
        } 
    }, 
    getters: {
        sensors : state => state.sensors,  
        sensor : state => state.sensor,  
    },
    modules: {

    }
  })