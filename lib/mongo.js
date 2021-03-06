const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config/index');

const USER = encodeURIComponent(config.dbUser);

const MONGO_URI = `mongodb://${USER}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/?authSource=${config.dbName}`

class MongoLib{
    constructor (){
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true});
        this.dbName = config.dbName
    }

    connect(){
        return new Promise((resolve, reject)=>{
            this.client.connect(error=>{
                if (error){
                    reject(error)
                }
                console.log('Succesfully connected to DB');
                resolve(this.client.db(this.dbName));
            })
        })
    }
    getAll(collection, query){
        return this.connect().then(db=>{
            return db
                .collection(collection)
                .find(query)
                .toArray();
        });
    }
    get(collection, id){
        return this.connect().then(db=>{
            return db
                .collection(collection).findOne({_id: ObjectId(id)});
        });
    }
    create(collection, data){
        return this.connect().then(db=>{
            return db 
                .collection(collection).insertOne(data);
        })
        .then(result => result.insertId);
    }
    update(collection, id, data){
        return this.connect().then(db=>{
            return db 
                .collection(collection).updateOne({_id: ObjectId(id)}, {$set: data}, {upsert: true});
        })
        .then(result => result.upsertedId || id);
    }
    delete(collection, id){
        return this.connect().then(db=>{
            return db 
                .collection(collection).deleteOne({_id: ObjectId(id)});
        })
        .then(result => id);
    }
}

module.exports = MongoLib;