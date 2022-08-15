const  express =require('express');
const mongoose=require('mongoose');
const path=require('path');
const ejs=require('ejs');
const Blog=require('./models/Blog');
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')


const BlogController=require('./controllers/BlogController')
const PageController=require('./controllers/PageController')

const app=express();

app.set('view engine', 'ejs');


//connect mongodb
mongoose.connect('mongodb://localhost:27017/cleanblog-test-db');


//MİDDLEWARES
app.use(express.static(path.resolve(__dirname + '/public')));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(fileUpload())
app.use(methodOverride('_method',{
  methods:['POST','GET']
}))


//Routes
app.get('/',BlogController.getAllBlog);
app.get('/posts/:id',BlogController.getBlog);
app.get('/about',PageController.getABout);
app.get('/add_post',PageController.getAddNewpost );
app.get('/posts/edit/:id',PageController.getEditPost )
app.post('/posts',BlogController.getCreatepost)
app.delete('/post/:id',BlogController.deletePost)
app.put('/posts/:id',BlogController.updatePost)




const port = 3000

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı`);
})