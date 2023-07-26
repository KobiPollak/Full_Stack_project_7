function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
    if (err) return res.status(403);
    req.id = id;
    next();
  });
}

function checkReqUserLogUpData(req, res, next) {
  console.log("in function checkReqUserData");
  const { email, password, fullName, address, city, phoneNumber, apartment } =
    req.body;
  console.log(email, password, "fffff");
  if (
    !email ||
    !password ||
    !fullName ||
    !address ||
    !city ||
    !phoneNumber ||
    !apartment
  ) {
    return res.status(400).json({ error: "not all the data were submitted" });
  }
  next();
}

function checkReqLogInData(req, res, next) {
  console.log("in function checkReqUserData");
  const { email, password } = req.body;
  console.log(email, password, "fffff");
  if (!email || !password) {
    return res.status(400).json({ error: "not all the data were submitted" });
  }
  next();
}

function checkInput(req, res, next) {
  console.log("in function checkInput");
  // const image = req.files.image;
  const { id, location, description, image } = req.body;
  if (!image || !id || !location || !description) {
    return res.status(400).json({ error: "not all the data were submitted" });
  }
  next();
}

export { checkReqUserLogUpData, checkReqLogInData, checkInput };
