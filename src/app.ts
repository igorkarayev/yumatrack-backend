// tslint:disable-next-line:no-import-side-effect
import "source-map-support/register";
import express from "express";
import cors from "cors";
import { jsonBodyParser } from "@middleware/jsonBodyParser";
import { sessionMiddleware } from "@middleware/session";
import { loggingMiddleware } from "@middleware/logging";
import { errorMiddleware } from "@middleware/error";
import { invalidUrl } from "@middleware/invalidUrl";
import { userRouter } from "@routes/user";
import { reportRouter } from "@routes/report";
import { authRouter } from "@routes/auth";
import { serviceRouter } from "@routes/services";
import { companyRouter } from "@routes/company";
import { isAuth } from "@middleware/auth";

export const app = express();

// middlewares
app.use(cors());
app.use(jsonBodyParser);
app.use(sessionMiddleware);
app.use(loggingMiddleware);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// routers
app.use("/users", isAuth, userRouter);
app.use("/companies", isAuth, companyRouter);
app.use("/auth", authRouter);
app.use("/services", serviceRouter);
app.use("/report", isAuth, reportRouter);

// invalid URL
app.use(invalidUrl);
// error handler
app.use(errorMiddleware);
