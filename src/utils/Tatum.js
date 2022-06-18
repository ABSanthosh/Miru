export default class Tantum {
  getTransactions(Address, cb, llCb, nodeCb) {
    var url =
      "https://api-eu1.tatum.io/v3/ethereum/account/transaction/" +
      Address +
      "?pageSize=50&sort=DESC";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("x-api-key", process.env.REACT_APP_API_KEY);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let linkedList = [];
          let nodes = [];
          let data = JSON.parse(xhr.responseText);

          data.forEach((element) => {
            nodes.push(element.to + "|||To");
            nodes.push(element.from + "|||From");
          });

          nodes = [...new Set(nodes)];

          // data.forEach((element) => {
          //   linkedList.push({
          //     source: nodes.findIndex((item) => item === element.from),
          //     target: nodes.findIndex((item) => item === element.to),
          //   });
          // });
          data.forEach((element) => {
            linkedList.push({
              source: element.from,
              target: element.to,
              show: true,
              // value: element.blockNumber,
            });
          });
          let finalNodeList = nodes.map((item) => ({
            id: item.split("|||")[0],
            showChildren: true,
            show: true,
            group: item.split("|||")[1] === "To" ? 1 : 2,
          }));

          llCb(linkedList);
          nodeCb(finalNodeList);
          cb(data);
          console.log(data);
          // console.log(finalNodeList);
        }
      }
    };
    xhr.send();
  }
}
