const express = require("express");
const cookieParser = require("cookie-parser");
const appErrorHandler = require("./controllers/errorHandler.js");
const cors = require("cors");

const userRouter = require("./router/user.js");
const voteListRouter = require("./router/voteList.js");


const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
	origin: "http://localhost:3000",
	credentials: true,
	optionsSuccessStatus: 200
}))

// Routes
app.use("/user", userRouter);
app.use("/votelist", voteListRouter);
app.all("*", (req, res) => res.status(404).json(
	{
		status: "fail",
		message: `${req.originalUrl} isn't found`
	})
);
app.use(appErrorHandler)
module.exports = app;
