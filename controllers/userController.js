const connection = require('../database/db');
const bcrypt = require('bcrypt');
const test = "123";

// 로그인 처리 함수
exports.loginUser = (req, res) => {
    const { username, password } = req.body;
  
    // 데이터베이스에서 사용자 조회
    connection.query('SELECT * FROM userstable WHERE username = ?', [username], (err, results) => {
      if (err) {
        console.error('DB 오류:', err);
        return res.status(500).send('서버 오류');
      }
  
      if (results.length === 0) {
        return res.status(401).send('사용자 이름 또는 비밀번호가 잘못되었습니다.');
      }
  
      // 비밀번호 검증
      const user = results[0];
      if (password !== user.password) {
        return res.status(401).send('사용자 이름 또는 비밀번호가 잘못되었습니다.');
      }
      return res.status(200).send('로그인 성공!');
      // bcrypt.compare(password, user.password, (err, isMatch) => {
      //   if (err) {
      //     console.error('비밀번호 비교 오류:', err);
      //     return res.status(500).send('서버 오류');
      //   }

      //   if (!isMatch) {
      //     return res.status(401).send('사용자 이름 또는 비밀번호가 잘못되었습니다.');
      //   }

      //   res.status(200).send('로그인 성공');
      // });
    });
};
  
// 회원가입 처리 함수
exports.registerUser = (req, res) => {
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

        // 비밀번호 암호화
        // bcrypt.hash(password, 10, (err, hashedPassword) => {
        //     if (err) {
        //         console.error('비밀번호 암호화 오류:', err);
        //         return res.status(500).send('서버 오류');
        //     }

            // 중복되지 않는 경우 회원가입 처리 password 변수 이름을 hashedPassword로 변경하면 배밀번호 암호화가 된다
            const sql = "INSERT INTO userstable (username, password, email, marketing) VALUES (?, ?, ?, ?)";
            connection.query(sql, [username, password, email, marketingValue || null], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send('회원가입 오류');
                }

                res.status(200).send('회원가입 성공');
            });
        // });
    });
};