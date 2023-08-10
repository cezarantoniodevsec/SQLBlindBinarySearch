let porta        = 3006;
let express      = require('express');
let cookieParser = require('cookie-parser');
let app          = express();
const fs         = require("fs");
const dbFile = "./data/fake.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
let db;

app.use(cookieParser());

dbWrapper
  .open({
    filename: dbFile,
    driver: sqlite3.Database
  })
  .then(async dBase => {
    db = dBase;
    
    try {
      if (!exists) {
        await db.run(
          "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password nvarchar(20),token nvarchar(5))"
        );
        
        await db.run(
          "INSERT INTO users (username, password,token) VALUES ('Bart Simpsom','l1s4a','48799'), ('Liza Simpsom','a1b2c3d4e5f6g7h8i955','45741'), ('administrator','ad1m45sis56tem8roo8t','33347')"
        );		
      }
      console.log("Base de dados Fake criada com sucesso.");
	  console.log("======================================");
	  console.log("Usuarios:");
	  console.log(await db.all("SELECT * from users"));
    } catch (dbError) {
	  console.log("Ocorreu um erro ao tentar criar a base de dados");
	  console.log("======================================");
      console.error(dbError);
    }
});

app.get('/', (req, res)=>{	
  if(req.cookies.algarismo==1)
    res.send('Cookie presente');	
  else
    res.send('Cookie ausente');
});

app.get('/users', async(req, res)=>{	 
  var sqlAskingToInject = "SELECT * from users where token='"+ req.cookies.TrackingId+"'";
  console.log('Query Injected:',sqlAskingToInject);

  /*const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));
  var delay = 8000; 
  console.log('Delay de ' + (delay) + ' ms aplicado...');
  await snooze(delay);*/
  
  try{
	  var users = await db.all(sqlAskingToInject);
	  if(users.length > 0)
		res.sendFile('welcome.html', {root: __dirname })
	  else
		res.sendFile('first.html', {root: __dirname })
  }catch(e){
	res.sendFile('first.html', {root: __dirname })  
  }
});

app.listen(porta, (err)=>{
	if(err) throw err;
	
	console.log('listening on port:' + porta);
});

