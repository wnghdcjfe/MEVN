const mongoose = require('mongoose')
const User = require('./models/User.js')   
const Item = require('./models/Item.js')  
const mongoDB = 'mongodb://127.0.0.1/my_database'  
const main = async()=>{ 
    await mongoose.connect(mongoDB, {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() =>  console.log('connection succesful'))
    .catch((err) => console.error(err)) 
    const user = {
        "name" : "이승철", 
        "password" : '12010'
    }
    
    const item = {
        id : 12010, 
        title : "진라면순한맛", 
        price : 2450
    } 
    const new_user = new User(user) 
    await new_user.save()
    //const new_item = await Item.create(item)  // --- (1)
    const new_item = new Item(item) 
    await new_item.save()
    const before = await User.findOne({
        name : {
            $eq : "이승철"
        }, 
        password : {
            $eq : '12010'
        }
    }) 
    before.items.push(new_item) // --- (2)
    await before.save() 
    const after = await User.findOne({
        name : {
            $eq : "이승철"
        }, 
        password : {
            $eq : '12010'
        }
    }) 
    console.log(after)
    const foundedItem = await Item.findOne({ _id : after.items[0]})  // --- (3)
    console.log(foundedItem)
}  
main()