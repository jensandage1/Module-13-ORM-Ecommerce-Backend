const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  // find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => {
try{
  const categories = await Category.findAll({});
  if(!categories) {
    res.status(404).json({ message: "No categories found" })
  }
  res.status(200).json({ categories })
} catch(e){
  res.status(500).json({ message: "server error"})
}
});

  // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
try{
  const categories = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  })
  if(!categories) {
    res.status(404).json({ message: "cannot find category" })
  }
  res.status(200).json({ categories })
} catch(e){
  res.status(500).json({ message: "server error" })
}
});

 // create a new category
router.post('/', async (req, res) => {
 try {
  const categories = await Category.create(req.body);
  if(!categories) {
    res.status(404).json ({ message: "can't create category" })
  }
  res.status(200).json ({ categories })
 } catch(e){
  res.status(500).json({ message: "server.error" })
 }
});

 // update a category by its `id` value
router.put('/:id', async (req, res) => {
 try {
  const categories = await Category.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
  res.status(200).json({ categories })
 } catch(e) {
  res.status(500).json({ message: "server error" })
 }
});

  // delete a category by its `id` value
router.delete('/:id', async (req, res) => {
try {
  const categories = await Category.destroy({
    where: {
      id: req.params.id,
    }
  })
  if(!categories){
    res.status(404).json ({ message: "can't delete category" })
  }
res.status(200).json({ categories })
} catch (e) {
  res.status(500).json({ message: "server error" })
}
});

module.exports = router;
