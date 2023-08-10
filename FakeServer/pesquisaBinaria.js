let porta        = 3006;
let express      = require('express');
let cookieParser = require('cookie-parser');
let app          = express();
const fs         = require("fs");
const dbFile = "./.data/binarySearch.db";
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
          "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password nvarchar(5),token nvarchar(5))"
        );
        
        await db.run(
          "INSERT INTO users (username, password,token) VALUES ('Bart Simpsom','23489','48799'), ('Liza Simpsom','l1s23','45741'), ('administrator','ad1m4','33347')"
        );
      } else {
        console.log(await db.all("SELECT * from users"));
      }
    } catch (dbError) {
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
  var users = await db.all(sqlAskingToInject);
  if(users.length > 0)
    res.sendFile('welcome.html', {root: __dirname })
  else
    res.sendFile('first.html', {root: __dirname })
});

app.listen(porta, (err)=>{
	if(err) throw err;
	
	console.log('listening on port:' + porta);
});

