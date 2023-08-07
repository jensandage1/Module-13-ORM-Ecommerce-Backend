const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//get all tags
router.get('/', async (req, res) => {
  try{
    const tag = await Tag.findAll({});
    if(!tag) {
      res.status(404).json({ message: "no tags found"})
    }
    res.status(200).json({ tag })
  }catch(e){
    res.status(500).json({ message: "server error"})
  }
});


//find a single tag by its id
//be sure to include associated product data
router.get('/:id', async (req, res) => {
  try{
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if(!tag) {
      res.status(404).json({ message: "cannot find tag" })
    }
    res.status(200).json({ tag }) 
  }catch(e){
      res.status(500).json({ message: "server error" })
    }
});

 // create a new tag
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    if(!tag){
      res.status(404).json ({ message: "can't create tag" })
    }
    res.status(200).json ({ tag })
  } catch (e) {
    res.status(500).json({ message: "server error" })
  }
 
});

 // update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json({tag})
  }  catch (e) {
    res.status(500).json({ message: "server error" })
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    })
    if(!tag) {
      res.status(404).json ({ message: "can't delete tag" })
    }
    res.status(200).json({ tag })
  } catch (e) {
    res.status(500).json({ message: "server error" })
  }
});

module.exports = router;
