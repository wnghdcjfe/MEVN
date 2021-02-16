import { createStore } from 'vuex' 
import service from '../utils/request.js' 
export default createStore({
    state: {
        resTimeList : [], 
        specLog: {
            "cpuUsage" : 0, 
            "memUsage" : 0
        }
    }, 
    mutations: { 
        CHANGE_SPEC(state, payload) {   
            state.specLog = payload 
        }, 
        CHANGE_RESPONSE_CHART(state, payload){   
            console.log(payload)
            state.resTimeList = payload;
        }
    }, 
    actions: {
        INIT_LOG({commit}, socket) {  
            socket.on("spec", data => commit("CHANGE_SPEC", data)) 
            socket.on("log", data => commit("CHANGE_RESPONSE_CHART", data))
        }, 
        async TEST(){ 
            const ret = await service.get('/test_request')
            if(!ret) return;  
            console.log('아래에 있는 로직이 실행됩니다.')
        }
    }, 
    getters: {
        resTimeList : state => state.resTimeList,  
        specLog : state => state.specLog,  
    },
    modules: {

    }
  })