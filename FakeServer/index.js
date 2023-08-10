let express = require('express');
let cookieParser = require('cookie-parser');
let app = express();
app.use(cookieParser());

const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

const example = async (req, res) => {
  console.log('Thread dormindo na execucao do algarismo:' + req.cookies.algarismo + '...');
  await snooze(100000);
  console.log('De volta!');

  if(req.cookies.algarismo==1){
	res.send('Cookie presente');	
  }else{
	res.send('Cookie ausente');
  }
};



app.get('/', (req, res)=>{	
	example(req,res);
});


    
app.listen(3005, (err)=>{
	if(err) throw err;
	
	console.log('listening on port 3005');
});