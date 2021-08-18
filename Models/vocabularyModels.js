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
    async index(topic){
        const data = await db.vocabulary.find({topic: topic}).toArray();
        return  response(true, data);
    }

    // New Document
    async store(){
        const checkData = await db.vocabulary.findOne({ vocabulary: this.vocabulary });
        if(checkData){
            return response(false, "Đã có từ này trong thư viện");
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
    async update(){

    }

}

module.exports = Vocabulary;