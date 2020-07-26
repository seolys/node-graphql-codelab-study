## 서버 세팅 과정.

### 1. node서버 init
```shell
# init(package.json 생성)
npm init -y

# module 설치
npm install

# 서버 실행
node ./src/index.js 
```

### 2. 아폴로 설치
```shell
npm i apollo-server

node ./src/index.js
```

### 3. nodemon 설치
```shell
npm i --save-dev nodemon
```

package.json에 script추가
```
{
    /* 생략 */
    "scripts": {
        /* 생략 */
        "dev": "nodemon ./src/index.js"
    },
    /* 생략 */
}
```
실행
```shell
npm run dev
```