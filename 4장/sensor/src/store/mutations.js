import * as types from './mutations-type';
import state from './state';   
  export default {
    [types.CHANGE_SENSOR_CHART](state, payload) {
        console.log(payload)
        if(state.sensors.length != 10) state.sensors.push(payload);
        else  {
          state.sensors.unshift(); 
          state.sensors.push(payload);
        }
    }
} 