const express = require('express'); // express 모듈
const app = express(); // express 객체
const path = require('path'); // path 모듈
const userRoutes = require('./routes/userRoutes');  // userRoutes 파일
const connection = require('./database/db.js'); // MySQL DB
const bodyParser = require('body-parser'); // //body-parser 모듈 
require('dotenv').config(); // .env 파일 로드

// 뷰 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // views 폴더

// 폼 데이터
app.use(express.urlencoded({ extended: true }));  // URL-encoded 데이터 처리
app.use(bodyParser.json()); 

// 라우트 설정
app.use('/', userRoutes);  // /userRoutes <--- 주소 설정

// 서버 시작
const PORT = process.env.PORT || 4444;  // 서버 포트 값 4444
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});