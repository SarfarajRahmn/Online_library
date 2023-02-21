 const { response } = require('express');
const express = require('express');
const app = express();
const hbs = require('hbs');
const mysql = require('mysql');


const fileupload = require('express-fileupload');
const path = require('path');
const session = require('express-session');
const { books } = require('express/lib/response');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'booklab'
});

const publicDir = path.join(__dirname);
app.use(express.static(publicDir+'/views/public'));
app.use(session({secret:'abcxyz'}));
app.set('view engine', 'hbs');       
app.use(fileupload());


// var dir = path.join(__dirname)+'/views/partial';
hbs.registerPartials(publicDir+'/views/partial');
app.use(express.urlencoded({extended:false}));

app.get('/admin',(req,res)=>{
    
    if(!req.session.uname){
        res.redirect("/login");
    }else{
        db.query('SELECT *from admin',(err,result)=>{
        
         db.query('SELECT *FROM books ORDER BY id DESC',(err,post)=>{
             res.render('admin',{
                 'admin' : result,
                 'books' : post  
             })  
         })
        });
    }

    
})  


app.get('/login',(req,res)=>{

    
    res.render('login');
})

app.post('/logout', function(req, res){
    req.logout();
    req.session.destroy();
    res.redirect('/');
  });

app.get('/register',(req,res)=>{  
    res.render('register');
})

app.post('/search',function(req,res){
    var str = {
        stringPart:req.body.typeahead
    }

    db.query('SELECT title FROM books WHERE title LIKE "%'+str.stringPart+'%"',function(err, rows, fields) {
        if (err) throw err;
        var data=[];     
        for(i=0;i<rows.length;i++)
        {
            data.push(rows[i].title);
        }
        res.render('/',{
            'typeahead':'title'    
        });
    });
});

    
app.get('/',(req,res)=>{

    db.query('SELECT *from admin',(err,result)=>{
        
        db.query('SELECT *FROM books ORDER BY id DESC',(err,post)=>{
            res.render('home',{
                'admin' : result,
                'books' : post 
            })
        })
       });
    
})


app.post('/editform',(req,res)=>{  
    const {uname,pass} = req.body;
    var id = req.session.uname;

    db.query('UPDATE admin SET name = ?, password = ? WHERE id = ?',[uname,pass,id],(err,result)=>{ 
        console.log(err);
     });
      
})
   
app.get('/editprofile',(req,res)=>{            
    db.query('SELECT *FROM admin WHERE id = ?',req.session.uname,(err,result)=>{
        res.render('editprofile',{
            'uname' : result[0].name,
            'pass' : result[0].password
        });          
    })   
      
})


app.post('/submitpost',(req,res)=>{     
    var uid = req.session.uname;
    const {upost} = req.body;

    const date = Date.now();
    
    const photo = req.files.picture;
    const photoname = date+photo.name;
    const book = req.files.pdf;
    const bookname = date+book.name;


    var type = book.mimetype;
    console.log(type);
    var type = photo.mimetype;
	console.log(type);

    db.query('SELECT *FROM admin WHERE id = ?',uid,(err,result)=>{
        var uname = result[0].name;

        
            if((type != "image/png")&&(type != "image/jpeg")&&(type != "image/jpg")&&(type != "application/pdf")){
                res.render('admin',{
                    'message':'invalid file format' 
                }); 
            } else{
               db.query('INSERT INTO books SET ?',{uid:uid, uname:uname, title:upost, cphoto:photoname,book:bookname},(err,result)=>{
                photo.mv(publicDir+'/views/public/'+photoname, book.mv(publicDir+'/views/public/'+bookname,(err)=>{
                 res.redirect('/');    
                }))
        }
               )}
    });
})

app.get('/books/:id',(req,res)=>{
    var uid = (req.params.id);
    db.query('SELECT *FROM books WHERE id = ?',uid,(err,result)=>{
       res.render('books',{
           'books':result  
       });  
   
    })
})

app.post('/submitlogin',(req,res)=>{
    const {email,pass} = req.body;
    
    db.query('SELECT *FROM admin WHERE email = ?',email,(err,result)=>{
        
        if(result.length == 0){
            console.log('failed')  
            res.render('login',{
                'message':'sorry email already exist'
            });
        } else {          
            
            if(result[0].password == pass){
                req.session.uname=result[0].id;
                res.redirect("/admin");
            }else{
                res.render('login',{
                    'message':'sorry password is incorrect'
                });
            }
        }  
    })
})



app.post('/submitform',(req,res)=>{
   const {uname,email,pass}= req.body;

   
   const photo = req.files.pphoto;
   const photoname = photo.name;

   db.query('INSERT INTO admin SET ?',{name:uname, email:email, photo:photoname, password:pass},(err,result)=>{
       if(err == null){
           photo.mv(publicDir+'/views/public/'+photoname,(err)=>{
            res.redirect('/');    
           })
           
       } else {
           res.render('register',{
               'message':'Something went wrong'
           })
       }      
   });

})

app.listen('5000',(req,res)=>{  
        console.log('Server running on port 5000');
})