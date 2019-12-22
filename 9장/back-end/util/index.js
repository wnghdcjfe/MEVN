const _form = date => ("00" + date).slice(-2) 

const errorCode = require('../config').errorCode  
module.exports = () => {
    return { 
        _date(){
            const d = new Date(); 
            return `${d.getFullYear()}-${_form(d.getMonth() + 1)}.${_form(d.getDate())} ${_form(d.getHours())}:${_form(d.getMinutes())}:${_form(d.getSeconds())}`
        },  
        wrapE(f){
            return (req, res, next) => {
                f(req, res, next).catch(next)
            }
        }, 
        setError(error){
            const message = error.message.replace(/"|\\/g, ''); 
            const founded = errorCode.find(e => e.name.test(message)) 
            const code = founded ? founded.code : 100000;
            return {
                time : new Date(),
                message, 
                error : error.stack, 
                code
            }
        }
    };
} 