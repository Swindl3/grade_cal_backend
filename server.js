const app = require("express")(),
  server = require("http").Server(app);
const bodyParser = require("body-parser");
const ip = require("ip");

const port = process.env.PORT || 8888;
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader("Access-Control-Allow-Headers", "*");

  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});
server.listen(port, () => {
  console.log("Server starting...");
  console.log(`http://${ip.address()}:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hi CORALINE.");
});

app.post("/calculate", (req, res) => {
  const dataList = req.body;
  console.log(dataList);
  let average = 0;
  let sumGrade = 0;
  let sumUnit = 0;
  for (let grade of dataList) {
    sumGrade += parseFloat(grade.grade) * parseFloat(grade.unit);
    sumUnit += parseFloat(grade.unit);
  }
  console.log("sumGrade", sumGrade);
  console.log("sumUnit", sumUnit);
  average = (sumGrade / sumUnit).toFixed(2);
  res.send({ average: average });
});
