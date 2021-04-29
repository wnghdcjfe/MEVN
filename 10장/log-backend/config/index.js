module.exports = {
    PORT : process.env.PORT || 12010, 
    USER : 'dabin', 
    PWD : 'dabin12010', 
    HOST : 'localhost:27017',  
    DB : 'log', 
    errorCode:[
        {
            "name" : new RegExp("Unexpected end of JSON input"), 
            "code" : 100001
        },
        {
            "name" : new RegExp("ReferenceError"), 
            "code" : 100002 
        },
        {
            "name" : new RegExp("Cast to ObjectId"), 
            "code" : 100003 
        },
    ]
} 