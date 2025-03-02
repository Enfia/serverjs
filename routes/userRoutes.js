const express = require('express');
const router = express.Router();

// 컨트롤러에서 로그인, 회원가입 함수 임포트
const { loginUser, registerUser } = require('../controllers/userController');

// /login 경로로 로그인 페이지 렌더링
router.get('/login', (req, res) => {
  res.render('login', { message: null }); // ✅ message 기본값 설정
});

// /register 경로로 회원가입 페이지 렌더링
router.get('/register', (req, res) => {
  res.render('register'); // 'register.ejs' 파일을 렌더링
});

// 로그인 처리 (POST 방식)
router.post('/login', loginUser); // 로그인 처리 함수

// 회원가입 처리 (POST 방식)
router.post('/register', registerUser); // 회원가입 처리 함수

router.get('/main', (req, res) => {
  res.render('main'); // 'main.ejs' 파일을 렌더링
});

router.get('/logout', (req, res) => {
  res.render('main'); // 'main.ejs' 파일을 렌더링
});


module.exports = router;