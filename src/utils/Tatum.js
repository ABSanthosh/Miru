export default class Tantum {
  getTransactions(Address, cb, llCb, nodeCb, offset = 0) {
    var url = `https://api-eu1.tatum.io/v3/ethereum/account/transaction/${Address}?pageSize=50&sort=DESC&offset=${offset}`;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.setRequestHeader("x-api-key", process.env.REACT_APP_API_KEY);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let linkedList = [];
          let nodes = [];
          let data = JSON.parse(xhr.responseText);
          console.log(data);

          data.forEach((element) => {
            nodes.push(element.to + "|||To");
            nodes.push(element.from + "|||From");
            // console.log(element.from + "->" + element.to);
          });

          nodes = [...new Set(nodes)];
          
          data.forEach((element) => {
            linkedList.push({
              source: element.from,
              target: element.to,
              show: true,
              sentAmt: element.value,
              txnType: element.type,
              gas: element.gas,
              gasPrice: element.gasPrice,
              nonce: element.nonce,
              blockNumber: element.blockNumber,
              txnStatus: element.status,
              txnHash: element.transactionHash,
              txnPosition: element.transactionIndex,
            });
          });

          let finalNodeList = nodes.map((item) => ({
            id: item.split("|||")[0],
            show: true,
            group: item.split("|||")[1] === "To" ? 1 : 2,
          }));

          llCb(linkedList);
          nodeCb(finalNodeList);
          cb(data);
          // console.log(linkedList);
          // console.log(finalNodeList);
        }
      }
    };
    xhr.send();
  }
}
