import { createStore } from 'vuex' 
export default createStore({
    state: {
        sensors : [] 
    }, 
    mutations: {
        CHANGE_SENSOR_CHART(state, payload) {   
            if(!state.sensors.length){  
                state.sensors = payload; 
              }else {
                state.sensors.shift(); 
                state.sensors.push(payload);
              }  
            console.log("state sensor", state.sensors)
        } 
    }, 
    actions: {
        INIT_GET_SENSOR({ commit }, socket) {
            socket.on("sensor", data => commit("CHANGE_SENSOR_CHART", data))  
        } 
    }, 
    getters: {
        sensors : state => state.sensors,  
    },
    modules: {

    }
  })