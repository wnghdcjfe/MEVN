import service from '../utils/request.js' 
export default {
    initLog({commit}, socket) {  
        socket.on("spec", data => commit("CHANGE_SPEC", data)) 
        socket.on("log", data => commit("CHANGE_RESPONSE_CHART", data))
    }, 
    async test(){ 
        const ret = await service.get('/test_request')
        if(!ret) return;  
        console.log('아래에 있는 로직이 실행됩니다.')
    }
}; 