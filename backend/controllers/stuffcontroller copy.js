const Thing = require('../models/thing');


exports.createThing = (req,res,next) =>{ 
    delete req.body._id;
      const thing = new Thing({
          ...req.body
      });
      thing.save()
      .then(() => res.status(200).json({message: 'Object saved !'}))
      .catch(error => res.status(400).json({ error }));
    };
exports.modifyOneThing = (req, res, next) => {
        const modifiedThing = {
          ...req.body,
          DateModification: new Date().toISOString()
        };
      
        Thing.updateOne({ _id: req.params.id }, modifiedThing)
          .then(() => res.status(200).json({ message: 'Object Updated !' }))
          .catch(error => res.status(400).json({ error }));
    };   
exports.deleteOnething = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
};
exports.getAll = (req, res, next) =>{
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch( error => res.status(400).json({ error }));
        
};
exports.getOne = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
}
exports.getpage = (req, res, next) =>{
    Thing.find({})
    .then(thing => {


     const page=parseInt(req.query.page)
     const limit=parseInt(req.query.limit)
     const startPage=(page-1)*limit
     const lastPage=(page)*limit

    const results={}

    results.allthings=thing.length;
    results.pageCount=Math.ceil(thing.length/limit)
    if(lastPage<thing.length){
        results.next={
            page:page+1,  
        }
    }

    if(startPage>0){
        results.prev={
            page:page-1,
        }
    }

    
    


    results.result=thing.slice(startPage,lastPage)    
    
    
    res.status(200).json(results)
    })
    .catch( error => res.status(400).json({ error }));
   
    
    
    
}
exports.getpagin= () => {
    const { page = 1, limit = 5 } = req.query; 
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
  
    try {
      const products =  Thing.find().skip(startIndex).limit(limit).exec();
      const totalCount = Thing.countDocuments();
  
      res.status(200).json({
        products,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / limit),
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error });
    }

  };

