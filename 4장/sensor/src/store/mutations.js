import * as types from './mutation-types';
import * as state from './state.js'; 

console.log(state)
export default {
    [types.CHANGE_SENSOR_CHART] (state) {
        state.sensors = [];  
    }
  }