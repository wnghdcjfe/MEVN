import axios from 'axios'
import config from '../config' 
import Vue from 'vue';
console.log(config.host) 
const service = axios.create({
  baseURL: config.host, 
  timeout: 10000  
})
 
service.interceptors.response.use(res => res.data, err => {  
    // if has response show the error 
    if (err.response) {
        const message = err.response.data.message;
        const code = err.response.data.code;
        if(code) Vue.swal.fire(message,`오류코드 : ${code}`,'error');
        else Vue.swal.fire(message,'','error'); 
    }
    return null;
}) 

export default service