import * as types from './mutations-type'; 
  export default {
    [types.CHANGE_LOG_CHART](state, payload) {    
      console.log(payload)
        if(!state.log.length){ 
          state.log = payload; 
        }else {
          state.log.shift(); 
          state.log.push(payload);
        } 
    }
} 