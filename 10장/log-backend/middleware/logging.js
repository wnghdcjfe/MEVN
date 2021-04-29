const morgan = require('morgan') 
const logController = require('../controllers/logController') 
const jsonFormat = (tokens, req, res) => {
    const obj = { 
        'remote-address': tokens['remote-addr'](req, res),
        'time': tokens.date(req, res, 'iso'),
        'method': tokens.method(req, res),
        'url': tokens.url(req, res),  
        'content-length' : tokens.res(req, res, 'content-length'), 
        'response-time' : tokens['response-time'](req, res)
    } 
    logController.save(obj) 
    return `${obj['time']} :: ${obj['remote-address']} - [${obj['method']}] ${obj['url']} ${obj['response-time']}`  
}
module.exports = () =>{
    return{
        morganLog(){
            return morgan(jsonFormat)
        }
    }    
}
 