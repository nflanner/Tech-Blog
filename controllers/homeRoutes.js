const router = require('express').Router();
const { Content, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//     console.log('IN / ROUTE')
//   try {
//     res.render('home', {});
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/', async (req, res) => {
  try {

    const contentData = await Content.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // const user = userData.get({ plain: true });
    let allContent;
    try {
      allContent = contentData.map((content) => content.get({ plain: true }));
    } catch (err) {
      allContent = [contentData.get({ plain: true })];
    }
    console.log(allContent);

    res.render('home', {
      allContent,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/add-content', withAuth, (req, res) => {
  console.log(req);
  res.render('newcontent', { 
    logged_in: req.session.logged_in,
    req,
  });
})

router.get('/edit-content/:id', withAuth, async (req, res) => {
  console.log(req);

  const contentId = req.params.id;

  try {
    const contentData = await Content.findByPk(contentId);
    const content = contentData.get({ plain:true });

    res.render('editcontent', { 
      logged_in: req.session.logged_in,
      content,
    });
  } catch (err) {
    res.status(500).json(err);
  }

})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  
  res.render('signup');
});

router.get('/dashboard', withAuth, async (req, res) => {

  try {
    // Get all recipes and JOIN with user data
    const contentData = await Content.findAll({
      where: { user_id: req.session.user_id}
    });
    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain:true });

    // Serialize data so the template can read it
    let allContent;
    try {
      allContent = contentData.map((content) => content.get({ plain: true }));
    } catch (err) {
      allContent = [contentData.get({ plain: true })];
    }
    
    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      allContent,
      user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/comment/:id', withAuth, async (req, res) => {

  const contentId = req.params.id;
  console.log('IN /commment/:id ROUTE');

  try {
    const contentDatum = await Content.findByPk(contentId, {});
    console.log(contentId);
    const commentData = await Comment.findAll({
      where: { content_id: contentId}
    });
    console.log(commentData);


    // Serialize data so the template can read it
    content = contentDatum.get({ plain: true });
    let comments;
    try {
      comments = commentData.map((comments) => comments.get({ plain: true }));
    } catch (err) {
      comments = [commentData.get({ plain: true })];
    }

    const userDatum = await User.findByPk(content.user_id);
    user = userDatum.get({ plain: true });

    // Pass serialized data and session flag into template
    res.render('comment', { 
      content,
      comments,
      user,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
