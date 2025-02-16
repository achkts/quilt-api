const { ObjectId } = require("mongodb");
const quiltModel = require("../models/quiltModel");


const getQuilts = async (req, res) => {
     const allQuiltsCollection = await quiltModel.find({}).exec();
     res.json(allQuiltsCollection);
}

const getSingleQuiltById = async (req, res) => {
    const id = req.params.id;
    const singleQuilt = await await quiltModel.findById(id);

    res.json(singleQuilt);
}


const createQuilt = async (req, res) => {  
    const quiltsJson = req.body;
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Quilt data',
        required: true,
        schema: {
            $name : "The Seven Sisters",
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
        const newQuilt = new quiltModel(quiltsJson);
        const result = await newQuilt.save();
        console.log('created', result)

        res.status(201).send(result._id)

    } catch(e) {
        const messages = [];
        for(const key in e.errors) {
            messages.push(e.errors[key].message);
        }
        res.status(400).json(messages);
    }
}

const updateQuilt = async (req, res) => { 
    const quiltsJson = req.body;
    /* #swagger.requestBody = {
        in: 'body',
        description: 'Quilt data',
        required: true,
        content: {
            "application/json": {
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
            }   
        }
        
    } */
   
    const id = req.params.id;
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await quiltModel.updateOne(filter, quiltsJson);
       
        
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
        const filter = { _id: new ObjectId(id) };
        const result = await quiltModel.deleteOne(filter);
    
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Quilt not found" });
        }
       
        res.status(204).json({ message: "Delete successful", result });

    } catch(e) {
        res.status(500).send(e.message);
    }
    
};
module.exports = { getQuilts, getSingleQuiltById, createQuilt, updateQuilt, deleteQuilt };
