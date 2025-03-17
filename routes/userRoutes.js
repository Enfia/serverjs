const express = require('express'); // express 모듈
const router = express.Router(); // express.Router 객체

// 컨트롤러
const { loginUser, registerUser, checkRole } = require('../controllers/userController');

// /login 경로
router.get('/login', (req, res) => {
  res.render('login', { message: null });
});

// /register 경로
router.get('/register', (req, res) => {
  res.render('register');
});

// 로그인 라우터
router.post('/login', loginUser, checkRole);

// 회원가입 처리
router.post('/register', registerUser);

// 'main.ejs' 파일을 렌더링
router.get('/main', (req, res) => {
  res.render('main'); 
});

// 'main.ejs' 파일을 렌더링
router.get('/logout', (req, res) => {
  res.render('main'); 
});

// 라우터 
module.exports = router;