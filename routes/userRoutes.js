const express = require('express');
const router = express.Router();
const sibal = 0;

// 컨트롤러에서 로그인, 회원가입 함수 임포트
const { loginUser, registerUser } = require('../controllers/userController');

// /login 경로로 로그인 페이지 렌더링
router.get('/login', (req, res) => {
  res.render('login'); // 'login.ejs' 파일을 렌더링
});

// /register 경로로 회원가입 페이지 렌더링
router.get('/register', (req, res) => {
  res.render('register'); // 'register.ejs' 파일을 렌더링
});

// 로그인 처리 (POST 방식)
router.post('/login', loginUser); // 로그인 처리 함수

// 회원가입 처리 (POST 방식)
router.post('/register', registerUser); // 회원가입 처리 함수

module.exports = router;