import fs from "fs";


 class DataController {
   returnNumber() {
    return new Promise((resolve, reject) => {
     fs.readFile("./data/numberData.json", "utf-8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    })

  }

  updateNumber(newNumber) {
    return new Promise((resolve, reject) => {
      const updateData = JSON.stringify({ storedNumber: newNumber });
  
      fs.writeFile("./data/numberData.json", updateData, "utf8", (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    })
  
  }
}


export default new DataController()