const csvFilePath = './data/20190802_강동구.csv' 
const csv         = require('csvtojson') 
module.exports = () => {
    return {
        async readCSV() {
            //const jsonArray = await csv().fromFile(csvFilePath);
            return await csv().fromFile(csvFilePath);
        }
    };
} 