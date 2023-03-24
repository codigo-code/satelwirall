import { NextFunction, Response, Router, Request } from "express";
import passport from "passport";
import { logOutUtils } from "../utils";
const router: Router = Router();

router.get(
  "/auth/google",
  passport?.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "login",
  })
);

router.get(
  "/auth/google/redirect",
  passport?.authenticate("google", {
    failureRedirect: `${
      process.env.NODE_ENV === "development"
        ? process.env.CLIENT_SERVER_DEV
        : process.env.CLIENT_SERVER_PROD
    }/login`,
  }),
  (req: Request, res: Response) => {
    if (JSON.stringify(req.user) === "{}") {
      res.redirect(
        `${
          process.env.NODE_ENV === "development"
            ? process.env.CLIENT_SERVER_DEV
            : process.env.CLIENT_SERVER_PROD
        }/login?unauthorized=true`
      );
    } else {
      res.redirect(
        `${
          process.env.NODE_ENV === "development"
            ? process.env.CLIENT_SERVER_DEV
            : process.env.CLIENT_SERVER_PROD
        }`
      );
    }
  }
);

router.get("/auth/logout", (req, res: Response, next: NextFunction) => {
  logOutUtils(req, res);
  res.sendStatus(200);
});
export default router;
