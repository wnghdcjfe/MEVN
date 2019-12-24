module.exports = db =>{
  return{
      naverLogin(req, res){
          console.log("리스폰스")
          console.log(req.url)
          console.log(req.query) 
//           var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href
// var url = new URL(url_string);
// var c = url.searchParams.get("c");
// console.log(c);
        return res.send('1')
         res.redirect('http://127.0.0.1:8080') 
      }, 
      test1(){
        
      }
  }
}