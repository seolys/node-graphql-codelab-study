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
브라우저로 Playground 접속
```
http://localhost:3000/
```

### 3. nodemon 설치(node서버 자동 deploy)
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

---
블로그는 어떤 세계(월드)인가?
- 카테고리
- 게시글
- 댓글
- 유저
- 좋아요
- 이미지

---
query 호출 예시
```graphql
query {
  articles(where: {
    	categoryId: 1
  }) {
    id
    title
    createdAt
    updatedAt
    deletedAt
    category {
      id
    }
    
    author {
      id
      nickname
      image {
        id
        url
      }
    }
    comments {
      author {
        id
        nickname
      }
    }
  }
}
```

변수 활용.
```graphql
query getArticles($where: ArticlesWhereInput!) {
  articles(where: $where) {
    id
    title
    createdAt
    updatedAt
    deletedAt
    category {
      id
    }
    
    author {
      id
      nickname
      image {
        id
        url
      }
    }
    comments {
      author {
        id
        nickname
      }
    }
  }
}
```
QUERY VALIABLES (Playground 왼쪽 하단)
```json
{
  "where": {
    "categoryId": 1
  }
}
```