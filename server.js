
//****************************************//
//使用了express和hbs两个third party module  //
//express是用来configure 服务器，app/配置了  //
//entry file							  //
//****************************************//





const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();




hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


//use middleware to 停止其他网页的进程
app.use((req,res,next)=>{
	res.render('maintainence.hbs');
});



//show the html page, set up a static dirtory
app.use(express.static(__dirname + '/public'));


app.use((req,res,next)=>{
	var now = new Date().toString();
	//middleware shows get/post and the page,track the process of network, and creat log
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFileSync('server.log', log + '\n');
	next();
})



//create a helper, which can be used in all templates, name of the helper is called getCurrentYear
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text)=>{
})



//send back, first argument
app.get('/', (req,res) => {

	//res.send('<h1>eh</h1>');
	// res.send({
	// 	name: 'Daniel',
	// 	Like: [
	// 		'edm',
	// 		'nba'
	// 	]
	// })


	res.render('home.hbs',{
		pageTitle: 'Home Page',		
		welcomeMessage: 'Welcome to my site'
	});
});
//create a new page
app.get('/about',(req, res) => {
	res.render('about.hbs',{
		pageTitle: 'About Page',
		welcomeMessage: 'Welcome to my site'

	});
})

app.get('/bad',(req, res) => {
	res.send({
		errorMessage: 'Error'
	});
})



//listen to request, localhost:3000
app.listen(3000, ()=>{
	console.log('Server is up on port 3000')
})