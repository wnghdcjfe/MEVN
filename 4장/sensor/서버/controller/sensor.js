const Sensor = require('../models/sensor.js'); 
const _ = require("fxjs/Strict");  
const start_CNT= 10; 
const save = async(data)=> {
    const ret = await Sensor.findOneAndUpdate({
        "cnt" : {
            $eq : data.cnt
        }}, {
            $set : data
        }, {
            upsert: true, 
            multi: true, 
            new : true, 
            setDefaultsOnInsert: true
        }
    ).lean()
    return ret;  
};
// 전역변수로 증가시키는 setNextData
let cnt = start_CNT;   
const setType = data =>{
    for(let key in data){
        if(key == 'time')data[key] = new Date(data[key])
        else data[key] = Number(data[key])
    } 
    return data; 
}
const setNextData = (jsonArray) =>{
    const l = jsonArray.length;    
    let data = jsonArray[cnt];  
    data = {cnt : cnt, ...setType(data)} 
    cnt = (cnt + 1) % l; 
    return data;    
}  

// 이터레이터로 만드는 cnt
function *setCntIterator() {  
    let cnt = start_CNT;  
    while (true) {
        yield cnt;
        cnt = (cnt + 1);  
    }
} 

const iterator = setCntIterator(); 
const setNextDataIterator = (jsonArray) =>{
    const l = jsonArray.length;      
    const cnt = iterator.next().value;  
    const idx = cnt % l; 
    let data = jsonArray[idx];  
    data = {idx : idx, ...setType(data)};
    return data;    
}


//slice를 이용한 take from to
const takeFromTo = (from, to, a) =>{
    if(to < from)return [...a.slice(from), ...a.slice(0, to + 1)] 
    else return a.slice(from, to + 1)
}  
function *setCntIterator(from) {  
    let cnt = from;  
    while (true) {
        yield cnt;
        cnt = (cnt + 1);  
    }
}   
//이터레이터를 이용한 take from to
const takeFromToIterator = (from, to, a)=>{ 
    const l = a.length; 
    const cnt = to < from ? l - (from - to - 1) :  to - from  + 1
    return _.go(
        setCntIterator(from), 
        _.take(cnt), 
        _.map(e => a[e % l])
    )
} 
const takeFromToIterator2 = (from, to, a) => {  
    const l = a.length; 
    return [...L.map(i => a[i], from < to ? L.range(from, to + 1) : L.flat([L.range(from, l), L.range(0, to + 1)]))]
}

exports.emitSensorAndSave = (io, jsonArray)=>{
    return new Promise((resolve, reject) =>{
        //const data = setNextData(jsonArray) 
        const data = setNextDataIterator(jsonArray)  
        io.emit("sensor", data); 
        save(data); 
        resolve(data)
    }) 
} 
exports.emitSensorAndSaveStart = (io, jsonArray, firstIdx)=>{
    const l = jsonArray.length
    const from  = firstIdx
    const to = (firstIdx + start_CNT - 1) / l
    return new Promise((resolve, reject) =>{ 
        let data = takeFromToIterator(from, to, jsonArray)
        io.emit("sensor", data); 
        save(data); 
        resolve(data)
    }) 
} 
   

