const { ObjectId } = require("mongodb");
const quiltModel = require("../models/quiltModel");
const quiltersModel = require("../models/quiltersModel");



//Quilts Collection
const getQuilts = async (req, res) => {
     const allQuiltsCollection = await quiltModel.find({}).exec();
     console.log("where are the quilts", allQuiltsCollection);
     res.json(allQuiltsCollection);
}

const getSingleQuiltById = async (req, res) => {
    const id = req.params.id;
    const singleQuilt = await await quiltModel.findById(id);

    res.json(singleQuilt);
}


const createQuilt = async (req, res) => {
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
    const quiltsJson = req.body;
    
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
    const quiltsJson = req.body;
    const id = req.params.id;
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await quiltModel.updateOne(filter, quiltsJson, {runValidators: true});
       
        
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

//Quilters Collection
const getQuilters = async (req, res) => {
    const allQuiltersCollection = await quiltersModel.find({}).exec();
    console.log("where are the quilters", allQuiltersCollection);
    res.json(allQuiltersCollection);
}

const getSingleQuilterById = async (req, res) => {
    const id = req.params.id;
    const singleQuilter = await quiltersModel.findById(id);

    res.json(singleQuilter);
}

const createQuilter = async (req, res) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Quilter data',
        required: true,
        schema: {
            "fname" : "Margaret",
            "lname" : "Davis",
            "email" : "mdquilts@juno.com",
            "experience" : "advanced",
            "residentCity" : "Des Moines",
            "residentState" : "Iowa",
           
        }
    } */
    const quiltersJson = req.body;
    
    try {
        const newQuilter = new quiltersModel(quiltersJson);
        const result = await newQuilter.save();
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

const updateQuilter = async (req, res) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Quilter data',
        required: true,
        schema: {
            "fname" : "The Seven Sisters",
            "lname" : "1982",
            "email" : "7x7",
            "experience" : "images/sevenSisters.jpg",
            "residentCity" : "This quilt was made in honor of my six sisters and I.  Each sister has a different favorite color, so I made a block for each sister in her favorite color.  The quilt is hand-stitched and was awarded first place at the Utah County Historical Society 2005 quilt show.",
            "residentState" : "Handstitched",
           
        }
    } */
    const quiltersJson = req.body;
    const id = req.params.id;
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await quiltersModel.updateOne(filter, quiltersJson, {runValidators: true});
       
        
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Quilter not found" });
        }
    
        res.status(200).json({ message: "Update successful", result });

    } catch(e) {
        res.status(500).send(e.message);
    }
};

const deleteQuilter = async (req, res) => {
    const id = req.params.id;
    try {
        const filter = { _id: new ObjectId(id) };
        const result = await quiltersModel.deleteOne(filter);
    
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Quilter not found" });
        }
       
        res.status(204).json({ message: "Delete successful", result });

    } catch(e) {
        res.status(500).send(e.message);
    }
    
};

module.exports = { getQuilts, getSingleQuiltById, createQuilt, updateQuilt, deleteQuilt, getQuilters, getSingleQuilterById, createQuilter, updateQuilter, deleteQuilter };
