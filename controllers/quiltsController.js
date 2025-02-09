const { ObjectId } = require("mongodb");
const mongoDB = require("./mongodb");


const getQuilts = async (req, res) => {
     const myQuiltsCollection = await mongoDB.getClient();
     const projection = { _id: 1, name: 1, yearCreated: 1, size: 1, imageURL: 1, description: 1, quiltType: 1, awards: 1, quiltShow: 1, price: 1, status: 1 };
        const cursor = myQuiltsCollection.find().project(projection);
        const results = [];
        for await (const doc of cursor) {
            results.push(doc);
            
        }
        res.json(results);
}

const getSingleQuiltById = async (req, res) => {
    const id = req.params.id;
    const myQuiltsCollection = await mongoDB.getClient();
    const options = {
        projection: { _id: 0, name: 1, yearCreated:1 },
    };

  const findResult = await myQuiltsCollection.findOne({_id: new ObjectId(id)}, options);
  res.json(findResult);
  console.log(id, findResult)
}

const requireField = (obj, fieldName) => {
    if(obj[fieldName] == undefined) throw new Error(fieldName+ ' is required.');
}

const createQuilt = async (req, res) => {
    const quiltsJson = req.body;
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Quilt data',
        required: true,
        schema: {
            "name" : "The Seven Sisters",
            "yearCreated" : "1982",
            "size" : "7x7",
            "imageURL" : "images/sevenSisters.jpg",
            "description" : "This quilt was made in honor of my six sisters and I.  Each sister has a different favorite color, so I made a block for each sister in her favorite color.  The quilt is hand-stitched and was awarded first place at the Utah County Historical Society 2005 quilt show.",
            "quiltType" : "Handstitched",
            "awards" : "honorable mention and first place",
            "quiltShow" : "Washington County Fair 1982 and Utah County Historical Society 2005",
            "price" : "not for sale",
            "status" : "unavailable"
        }
    } */
    try {
        requireField(quiltsJson, 'name');
        requireField(quiltsJson, 'yearCreated');
        requireField(quiltsJson, 'size');
        requireField(quiltsJson, 'imageURL');
        requireField(quiltsJson, 'description');
        requireField(quiltsJson, 'quiltType');
        requireField(quiltsJson, 'awards');
        requireField(quiltsJson, 'quiltShow');
        requireField(quiltsJson, 'price');
        requireField(quiltsJson, 'status');

        const myQuiltsCollection = await mongoDB.getClient();
        const result = await myQuiltsCollection.insertOne(quiltsJson)
    

        res.status(201).send(result.insertedId)

    } catch(e) {
        res.send(e.message);
    }
}

const updateQuilt = async (req, res) => {
    const contactJson = req.body;
    const id = req.params.id;
    try {
        const myQuiltsCollection = await mongoDB.getClient();
        const result = await myQuiltsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: contactJson }
        );
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Quilt not found" });
        }
    
        res.status(200).json({ message: "Update successful", result });

    } catch(e) {
        res.status(500).send(e.message);
    }
}

const deleteQuilt = async (req, res) => {
    const id = req.params.id;
    try {
        const myQuiltsCollection = await mongoDB.getClient();
        const result = await myQuiltsCollection.deleteOne(
            { _id: new ObjectId(id) }
        );
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Contact not found" });
        }
       
        res.status(204).json({ message: "Delete successful", result });

    } catch(e) {
        res.status(500).send(e.message);
    }
    
};
module.exports = { getQuilts, getSingleQuiltById, createQuilt, updateQuilt, deleteQuilt };
