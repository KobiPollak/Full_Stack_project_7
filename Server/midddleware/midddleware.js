import jwt from "jsonwebtoken";

async function authenticateToken(req, res, next) {
  console.log("in function authenticateToken");
  const authHeader = req.headers.authorization;

  if (authHeader == null) return res.status(401);

  jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
    if (err) return res.status(403);
    console.log("yey");
    req.id = id;
    next();
  });
}

function checkReqPaymentData(req, res, next) {
  console.log("in function checkReqPaymentData");

  console.log(req.body);
  try {
    const {
      id,
      cardNumber,
      cardType,
      cardHolderName,
      expirationYear,
      expirationMonth,
      reason,
      formattedMonth,
      amount,
    } = req.body;
    console.log(cardNumber);

    if (!cardNumber) console.log("Missing card number data");
    else if (!id) console.log("Missing id data");
    else if (!expirationMonth) console.log("Missing expiration month data");
    else if (!expirationYear) console.log("Missing expiration year data");
    else if (!amount) console.log("Missing amont data");
    else if (!cardType) console.log("Missing card type data");
    else if (!cardHolderName) console.log("Missing card holder name data");
    else if (!reason) console.log("Missing reason data");
    else if (!formattedMonth) console.log("Missing formattedMonth data");
  } catch {
    return res.status(400).json({ error: "not all the data were submitted" });
  }
  next();
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
  console.log(req.id);
  const { id, location, description, image, type } = req.body;
  if (!image || !id || !location || !description || !type) {
    return res.status(400).json({ error: "not all the data were submitted" });
  }
  next();
}

export {
  checkReqUserLogUpData,
  checkReqLogInData,
  checkInput,
  checkReqPaymentData,
  authenticateToken,
};