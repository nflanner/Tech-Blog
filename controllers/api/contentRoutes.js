const router = require('express').Router();
const { Content } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const contentData = await Content.findAll();

      if (!contentData) {
        res.status(404).json({"message": "No content data available"});
      }
  
      res.status(200).json(contentData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.delete('/:id', async (req, res) => {
  const contentId = req.params.id;
  try {
    const responseData = await Content.destroy({
      where: {
        id: contentId,
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(responseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
      const contentData = await Content.create({
          ...req.body,
        });;

      console.log('req body');
      console.log(req.body);
      console.log(contentData);

      res.status(200).json(contentData);
  } catch (err) {
      res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  const contentId = req.params.id;
  console.log('in put request');
  try {
      const contentData = await Content.update({
        name: req.body.name,
        content: req.body.content,
      },
      {
        where: {
          id: contentId,
        }
      });;

      console.log('req body');
      console.log(req.body);
      console.log(contentData);

      res.status(200).json(contentData);
  } catch (err) {
      res.status(400).json(err);
  }
});

module.exports = router;
