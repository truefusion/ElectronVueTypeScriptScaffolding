// https://www.raymondcamden.com/2019/10/16/using-indexeddb-with-vuejs
// https://github.com/cfjedimaster/vue-demos/blob/master/idb/src/api/idb.js
// https://github.com/mdn/to-do-notifications/
// https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/get
// https://stackoverflow.com/questions/22484336/counting-the-number-of-records-in-an-object-store-in-indexeddb

//import quotesFile from '../../data/quotesFile.js';

//const DB_NAME = 'ggcidb';
//const DB_VERSION = 1;
//let DB;

//var quotes = quotesFile.quotes;

//async function getDb() {
//    return new Promise((resolve, reject) => {

//        if (DB) {
//            return resolve(DB);
//        }

//        console.log("OPENING DB", DB);
//        let request = window.indexedDB.open(DB_NAME, DB_VERSION);

//        request.onerror = e => {
//            console.log("Error opening db", e);
//            reject("Error");
//        }

//        request.onsuccess = e => {
//            DB = e.target.result;
//            resolve(DB);
//        };

//        request.onupgradeneeded = e => {
//            console.log("onupgradeneed");
//            let db = e.target.result;
//            db.createObjectStore("quotestore", { autoIncrement: true, keyPath: 'id' });
//        };
//   });
//}

//async function insertQuotesInIdb() {
    //let db = await this.getDb();
    //return new Promise(resolve => {
        //let trans = db.transaction("quotestore", "readwrite");
        //trans.oncomplete = () => {
            //resolve();
        //};
        //let store = trans.objectStore("quotestore");
        //for (var i = 0; i < quotes.length; i++) {
            //let quote_to_insert = {
                //id: i,
                //quote_text: quotes[i]
            //};
            //let request = quotestore.add(quote_to_insert);
            //request.onsuccess = function() {
            //    console.log("Quote added to the store", request.result);
            //};
            //request.onerror = function() {
            //    console.log("Error: ", request.error);
            //};
        //}
    //});
//}

//async function getQuoteFromIdb(index) {

    //let db = await this.getDb();

    //return new Promise(resolve => {
        //let trans = db.transaction(["quotestore", "readonly"]);
        //trans.oncomplete = () => {
            //resolve(quotestore);
        //};

        //let store = trans.objectStore("quotestore");

        //let quoteRequest = quotestore.get(index);
        //quoteRequest.onsuccess = function() {
        //    return quoteRequest.result;
        //};
        //quoteRequest.onerror = function() {
        //    console.log("Error: ", request.error);
        //};
    //});
//}

//export {insertQuotesInIdb, getQuoteFromIdb};
