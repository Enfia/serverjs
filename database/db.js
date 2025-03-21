const mysql = require('mysql2'); // mysql12 모듈
require('dotenv').config(); // .env 파일 로드

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root', // MySQL 사용자명
  password: process.env.PASSWORD, // MySQL 비밀번호
  database: 'login_db' // DB 이름
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류:', err); // 오류 떴을 때
    return;
  }
  console.log('MySQL 연결 성공');
});

module.exports = connection; // 다른 파일에서 연결을 사용할 수 있게 내보냄