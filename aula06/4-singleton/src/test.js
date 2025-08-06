const MongoSingleton = require('./mongoSingleton');

const mongoInstance = MongoSingleton.getInstance();
console.log(mongoInstance.instance); // undefined -> atributo estático
console.log(mongoInstance.url);
// mongoInstance.getInstance() // método estático

const anotherMongoInstance = MongoSingleton.getInstance();
console.log(anotherMongoInstance.url);