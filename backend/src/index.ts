import { errorHandler } from './midlewares/errorHandler';
import { onlyAdmin, onlyWhitRole } from './midlewares/index';
import express, { json, urlencoded }  from "express";
import dotenv from "dotenv";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
const  cookieSession = require( "cookie-session");
import { connectDB } from "./db";
import { corsOptions } from "./utils";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import budgetRouter from "./routes/budget.route";
import coordination from "./routes/coordination.route";
import { isAuth } from "./midlewares";

// env variables init
dotenv.config();
//passport init
import "./services/passportService";
//DB connection
connectDB();

const app = express();
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: false }));
app.use(cors(corsOptions));

//cookie midleware
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // how long this cookie could exist in browser
    keys: [process.env.COOKIE_KEY as string],
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/", authRouter);
app.get("/isAuth", isAuth, (req: express.Request, res: express.Response) => {
   res.send({role: req.body?.role})
});
app.use("/user", onlyAdmin, userRouter);
app.use("/budget", onlyWhitRole , budgetRouter);
app.use("/coordination", onlyWhitRole , coordination);

app.use(errorHandler)
app.get("/ping", (req, res) => {
  console.log("someone pinged here!!");
  res.send("pong");
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
