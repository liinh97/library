const { db } = require("../Repositories/database");
const { response } = require("../base");
const { ObjectId } = require("mongodb");

class Vocabulary {

    constructor(vocabulary, means, author, topic, createdAt){
        this.vocabulary = vocabulary;
        this.means = means;
        this.author = author;
        this.topic = topic;
        this.createdAt = createdAt;
    }

    // Get All Topics
    async listTopic(){
        const data = await db.vocabulary.distinct("topic");
        return response(true, data);
    }

    // Get All Documents
    async index(topic, str){
        if(str === ''){
            var data = await db.vocabulary.find({topic: new RegExp(`^${topic}$`, "i")}).toArray();
        }else{
            var data = await db.vocabulary.find({topic: new RegExp(`^${topic}$`, "i"), $or: [
                {author: new RegExp(`^${str}$`, "i")},
                {vocabulary: new RegExp(`^${str}$`, "i")},
            ]}).toArray();
        }
        return response(true, data);
    }

    // New Document
    async store(){
        const checkData = await db.vocabulary.findOne({ vocabulary: this.vocabulary });
        if(checkData){
            return response(false, "Opps, Has exists in library");
        }
        const data = await db.vocabulary.insertOne({
            "vocabulary": this.vocabulary,
            "means": this.means,
            "author": this.author,
            "topic": this.topic,
            "createdAt": new Date().toJSON().slice(0,10),
        });
        if(data){
            return response(true);
        }
        return response(false);
    }

    // Update Document
    async update(id){

        const checkData = await db.vocabulary.findOne({
            _id: {$ne: ObjectId(id)},
            vocabulary: this.vocabulary,
        });
        if(checkData){
            return response(false, "Opps, Has exists in library");
        }
        const update = await db.vocabulary.updateOne(
            {"_id": ObjectId(id)},
            { $set: {
                    "vocabulary": this.vocabulary,
                    "means": this.means,
                }
            }
        );
        if(update){
            return response(true);
        }
        return response(false);

    }

    // Delete Document
    async del(id){

        const del = await db.vocabulary.deleteOne({
            _id: ObjectId(id),
        });

        if(del){
            return response(true);
        }
    }

}

module.exports = Vocabulary;