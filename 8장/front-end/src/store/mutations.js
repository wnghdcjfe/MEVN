import * as types from './mutations-type'; 
  export default {
    [types.CHANGE_SPEC](state, payload) {    
      state.specLog = payload 
    }, 
    [types.CHANGE_RESPONSE_CHART](state, payload) {   
        if(state.resTimeList.length < 10){ 
          state.resTimeList.push(payload);
        }else{
          state.resTimeList.shift(); 
          state.resTimeList.push(payload); 
        } 
    },  
    [types.CHANGE_LOG_CHART](state, payload) {     
      state.logList = payload; 
  },   
} 