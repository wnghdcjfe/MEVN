import * as types from './mutations-type'; 
  export default {
    [types.CHANGE_SENSOR_CHART](state, payload) {    
        if(!state.sensors.length){ 
          state.sensors = payload; 
        }else {
          state.sensors.shift(); 
          state.sensors.push(payload);
        } 
    }
} 