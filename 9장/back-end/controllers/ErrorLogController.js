module.exports = db =>{
    return{
        async save(data){ 
            await db.collection('errorLogs').insertOne(data)
        }, 
        test1(){
          
        }
    }
  }