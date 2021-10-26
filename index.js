require("dotenv").config({ path: "./.env"});
const mongoose = require("mongoose");
const app = require("./app.js")

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DB_ACCESS.replace("<PASSWORD>",process.env.DB_PASSWORD)
mongoose.connect(DB,    
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
)
	.then(() => console.log("DB is connected"))
	.catch((err) => {
		console.log(err)
	})

app.listen(process.env.PORT, () => console.log(`app is running on a port ${process.env.PORT}`));

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
