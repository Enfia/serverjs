const express = require('express');
const path = require('path');
const app = express();
const userRoutes = require('./routes/userRoutes');  // userRoutes 파일을 임포트
const connection = require('./database/db.js'); // 예시 경로
const bodyParser = require('body-parser');
require('dotenv').config(); // .env 파일 로드

// 뷰 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // views 폴더 경로 설정

// 폼 데이터 파싱 (POST 데이터 처리)
app.use(express.urlencoded({ extended: true }));  // URL-encoded 데이터 처리
app.use(bodyParser.json());

// 라우트 설정
app.use('/', userRoutes);  // 루트 경로에 userRoutes를 사용

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});