const router = require('express').Router()
const { ensureAuthenticated } = require('../auth')
let Post = require('../models/post.model')
const mongoose = require('mongoose')

//List all the posts
router.get('/', (req, res) => {
    Post.find()
        .then(posts => {
            res.render('posts', {
                posts: posts
            });
        }) 
        .catch(err => console.log('Error found: ' + err));
})

router.get('/add', ensureAuthenticated, (req, res) => {
    console.log('Current user: ' + req.user );
    res.render('newPost');
})

//Add a post
router.post('/add', (req, res) => {
    const body = req.body.body;
    let errors = [];
    if (!body) {
        errors.push({ msg:'Please fill all the fields' });
        res.render('newPost', { errors });
    }
    const new_post = new Post({body, username: req.user.username});
    new_post.save()
        .then(post => {
            req.flash('success_msg', 'New post added!')
            res.redirect('/posts')
        })
        .catch(err => console.log('Error found:' + err));
})

router.get('/:id', ensureAuthenticated, (req, res) => {
    console.log(req.params.id);
    res.render('newComment');
})

router.post('/:id', (req, res) => {
    const body = req.body.body;
    let errors = [];
    if (!body) {
        errors.push({ msg:'Please fill all the fields' });
        res.render('newComment', { errors });
    }
    const new_comment = {body, username: req.user.username};
    Post.findById(req.params.id)
        .then(post => {
            post.username = post.username;
            post.likes = post.likes;
            post.body = post.body;
            post.comments.push(new_comment);
            post.comments = post.comments;

            post.save()
                .then(() => {
                    req.flash('success_msg', 'Comment added!')
                    res.redirect('/posts')
                })
                .catch(err => console.log('Error found:' + err));
        })
        .catch(err => console.log('Error found: ' + err));
})

module.exports = router;


