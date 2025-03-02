const connection = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // .env 파일 로드

exports.loginUser = (req, res, next) => {
  // console.log("로그인 기능 실행됨")
  
  const { username, password } = req.body;

  // 데이터베이스에서 사용자 조회
  const loginsql = 'SELECT * FROM userstable WHERE username = ?'
  connection.query(loginsql, [username], (err, results) => {
    if (err) {
      console.error('DB 오류:', err);
      return res.status(500).send('서버 오류 1');
    }

    if (results.length === 0) {
      return res.status(401).send('사용자 이름 또는 비밀번호가 잘못되었습니다.1');
    }

  const user = results[0];
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      console.error('비밀번호 비교 오류:', err);
      return res.status(500).send('서버 오류 2');
    }

    if (!isMatch) {
      return res.status(401).send('사용자 이름 또는 비밀번호가 잘못되었습니다.2');
    }

    if(isMatch){
      req.user = { id: user.id, username: user.username, role: user.role };
      next();
    } 

    // JWT 토큰 생성
    const payload = { username: user.username, userId: user.id };  // 토큰에 담을 정보
    const secretKey = process.env.KEY;  // 환경 변수로 관리
    const options = { expiresIn: '1h' };

    // JWT 생성
    jwt.sign(payload, secretKey, options, (err, token) => {
      if (err) {
        console.error('토큰 생성 오류:', err);
        return res.render('login', { message : '서버 오류 3' });
      }

      return res.status(200).json({ token: token, });
      });
    });
  });
};
  
// 회원가입 처리 함수
exports.registerUser = (req, res) => {
  console.log("회원가입 기능 실행됨")
    const { username, password, email, marketing } = req.body;
    const marketingValue = marketing === 'on' ? 1 : 0;

    // 아이디 중복 체크
    const checkSql = "SELECT * FROM userstable WHERE username = ?";
    connection.query(checkSql, [username], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('서버 오류');
        }

        if (result.length > 0) {
            // 아이디가 이미 존재하는 경우
            return res.status(400).send('이미 존재하는 아이디입니다.');
        }
        bcrypt.hash(password, 10, (err, hashPassword) => {
          if (err) {
            console.error('비밀번호 암호화 오류:', err);
            return res.status(500).send('서버 오류');
        }
            // 중복되지 않는 경우 회원가입 처리
            const sql = "INSERT INTO userstable (username, password, email, marketing) VALUES (?, ?, ?, ?)";
            connection.query(sql, [username, hashPassword, email, marketingValue || null], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('회원가입 오류');
                }
                res.status(200).send('회원가입 성공');
            });
        });
    });
};

exports.checkRole = (req, res, next) => {
  const { role } = req.user;

  if (role !== 'admin') {
    // return res.status(403).send('권한이 없습니다.');
    res.render('main');
  } else
  // res.status(200).send('로그인 성공, 관리자 권한 확인됨');
  res.render('admin');
};