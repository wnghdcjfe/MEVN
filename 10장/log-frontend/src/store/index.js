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
            // 애러가 만약 발생이 되었다면 ret에는 null이 할당되게 되며 그 아래에 있는 로직은 실행되지 않게 하는 코드입니다.  
            console.log("ret", ret)
            if(!ret) return;  
            // 올바른 데이터의 경우 ret {올바른: "데이타"} 이런 식의 로그가 나타나게 됩니다. 
            console.log('애러가 발생되지 않았고 아래에 있는 로직이 실행됩니다.')
        }
    }, 
    getters: {
        resTimeList : state => state.resTimeList,  
        specLog : state => state.specLog,  
    },
    modules: {

    }
  })