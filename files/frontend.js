$("#add").click(function() {
  $("form").append('<input type="text" name="textfield"><br>');
});

$.getJSON("http://localhost:3000/data-write.json", function(data) {
  labelLoop = () => {
    for (var i = 0; i < data.length; i++) {
      var newData = data[i];
      var items = newData.slice(8);

      var chooseElement = (record, elementName) => {
        switch (elementName) {
          case "__EMPTY_2":
            return record.__EMPTY_2;
          case "__EMPTY_9":
            return record.__EMPTY_9;
          case "__EMPTY_3":
            return record.__EMPTY_3;
          case "__EMPTY_4":
            return record.__EMPTY_4;
          case "__EMPTY_5":
            return record.__EMPTY_5;
          case "__EMPTY_6":
            return record.__EMPTY_6;
          case "__EMPTY_7":
            return record.__EMPTY_7;
          case "__EMPTY":
            return record.__EMPTY;
          default:
            throw new Error("element " + elementName + " is not supported!");
        }
      };

      var labelItem = (jsonPos, elementName) => {
        return jsonPos.map(function(record) {
          var newData = chooseElement(record, elementName);
          return newData;
        });
      };

     const customer = labelItem(newData, "__EMPTY_2");
     const ref = labelItem(newData, "__EMPTY_9");
     const material = labelItem(newData, "__EMPTY_7");
     const alength = labelItem(items, "__EMPTY_4");
     const awidth = labelItem(items, "__EMPTY_5");
     const amount = labelItem(items, "__EMPTY_6");
     const order = labelItem(items, "__EMPTY");
     console.log(ref);

      newLabel = a => {
        for (var i = 0; i < a.length; i++) {
          if (typeof alength[i] === "undefined") {
            return;
          } else {
            for (var m = 0; m < amount[i]; m++) {
              $("#index").append(`<ul><li>${customer[1]}</li>${
                ref[3]
                  ? `<li>Ref. č. ${ref[3]}</li>`
                  : `<li>P.č. ${order[i]}</li>`}
                <li>${material[4]}</li>  <li>${alength[i]} x ${awidth[i]}</li></ul>`);
            }
          }
        }
      };

      newLabel(alength);
    }
  };
  labelLoop();
});
