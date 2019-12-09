import axios from 'axios'
import config from '../config' 
import Vue from 'vue'; 
const service = axios.create({
  baseURL: config.host
})
service.interceptors.response.use(res => res.data, err => {    
  if (err.response) {
        const message = err.response.data.message;
        const code = err.response.data.code;
        if(code) Vue.swal.fire(message,`오류코드 : ${code}`,'error');
        else Vue.swal.fire(message,'','error'); 
  }else Vue.swal.fire('네트워크애러','서버와의 연결에 실패했습니다. 네트워크를 확인해주세요!','error');
  return null;
}) 

export default service