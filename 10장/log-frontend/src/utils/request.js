import axios from 'axios'
import {host} from '../config'  
import Swal from 'sweetalert2'
const service = axios.create({
  baseURL: host
})
service.interceptors.response.use(res => res.data, err => {    
  // err를 받아 err를 핸들합니다. return null로써 애러가 발생되었다는 사실을 전달합니다.
  if (err.response) {
        const message = err.response.data.message;
        const code = err.response.data.code;
        if(code) Swal.fire(message,`오류코드 : ${code}`,'error');
        else Swal.fire(message,'','error');  
  }else Swal.fire('네트워크애러','서버와의 연결에 실패했습니다. 네트워크를 확인해주세요!','error'); 
  return null;
}) 

export default service