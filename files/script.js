const xlsx = require("xlsx");
const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/form.html"));
});

app.listen(3000, function() {
  console.log("Server is listening on port 3000");
});

app.use(express.static("files"), express.urlencoded({ extended: true }));

app.post("/index.html", (req, res) => {
  res.redirect("/index.html");

  const xcelFile = xlsx.readFile(req.body.xlsDoc + ".xls");

  var jsonArr = [];

  xcelToJson = () => {
    for (var i = 0; i < req.body.textfield.length; i++) {
      
      const xcelSheet = xcelFile.Sheets[req.body.textfield[i]];

      const jsonify = xlsx.utils.sheet_to_json(xcelSheet);

      jsonArr.push(jsonify);
    }
  };

  xcelToJson();

  const writeFile = newData => {
    const stringifiedData = JSON.stringify(newData);

    fs.writeFile("files/data-write.json", stringifiedData, error => {
      if (error) {
        console.log("Write: NOT successful!");
        console.log(error);
      } else {
        console.log("Write: successful!");
      }
    });
  };

  writeFile(jsonArr);
  jsonArr = [];

  res.end();
});
