export const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
};

export const logOutUtils = (req : any, res : any ) => {
    req.session = null;
    req.user = undefined;
    res.clearCookie("connect.sid");
    req.logout({ keepSessionInfo: false }, () => {
      console.log("logged out");
    });
};

export const userOutOfDate = (req : any, res : any ) => {
    req.session = null;
    req.user = undefined;
    res.clearCookie("connect.sid");
    req.logout({ keepSessionInfo: false }, () => {
      console.log("logged out");
    });
};
