import * as types from './mutations-type';
import state from './state';   
  export default {
    [types.CHANGE_SENSOR_CHART](state, payload) {
        state.sensors = [];  
    }
} 