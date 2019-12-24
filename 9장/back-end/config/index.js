module.exports = {
    PORT : process.env.PORT || 12010, 
    USER : 'dabin', 
    PWD : 'dabin12010', 
    HOST : 'localhost:27017',  
    DB : 'artbori', 
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
    ], 
    naver : {
        'client_id' : '',
        'secret_id' : '',
        'callback_url' : '/auth/login/naver/callback'
    },
    facebook : {
        'client_id' : '',
        'secret_id' : '',
        'callback_url' : '/auth/login/facebook/callback'
    },
    kakao : {
        'client_id' : '',
        'callback_url' : '/auth/login/kakao/callback'
    }
} 