# portfolio

이 레퍼지토리는 현재 작업중인 'mychelin'이 있습니다.

---

### 이전 회사에서 작업한 내용이 궁금하시다면 [ex_company](https://github.com/riccio-ryu/ex_company)

이전에 근무하였던 회사들의 작업물을 적어 놓았고, 간단한 설명과 근무하면서 고민하였던 코드들을 작성해 보았습니다.

---

### 혼자 공부하면서 개발하였던 장소는 [toy_project](https://github.com/riccio-ryu/toy_project)

개인 작업물을 모아 놓은 공간입니다. 혼자 공부하여 새로운 프로잭트를 진행하거나, 테스트를 통해서 배움을 얻어가는 공간으로 구성되어 있습니다.

# MYCHELIN

> 마이슐렝 : 나의 음식 이야기를 적고, 사람들과 공유를 할 수 있는 프로젝트
> MICHELIN의 이름에서 MI를 My로 하여 자신의 맛집, 맛있는 음식 등 다른 사람들과 맛집을 공유하고, 매장의 메뉴별로 별점을 달아서, 매장과 메뉴의 디테일한 평점을 남기는 것을 목적으로 한다.  
> 지도 어플을 통해서 해당 가게의 일반적인 평점을 볼 수 있으나 자신이 어떤 메뉴를 주문해야할지 고민이 될 때, 다른 사람의 평점을 보거나 자신이 이전에 남겼던 기록들을 통해서 자신에게 맞는 메뉴를 주문하기 쉽게 하기 위함이다.  
> 기존의 지도 어플에는 방문했던 곳이라도 각 메뉴를 일일히 기억하거나 그 전과의 맛변화를 일일히 개인 메모장에 적어 놓곤했는데, 간편하게 확인하고 비교하고, 변화된 맛에도 새로 반응을 하는 것이 조금 더 객관적인 맛 평가가 될 것이라고 생각해서 기획하게 되었습니다.  
> 공유를 하지 않더라도 본인만의 음식 기록 블로그로 사용해도 좋게 만들고자 한다.

> [!IMPORTANT]
> 중요 공지 :: 현재, 기존에 사용하던 planetscale의 유료화로 인해 DB가 없이 작업을 다시 하고 있습니다... mongoDB나 다른것을 채택하고 적용하면 DB쪽은 다시 손보겠습니다...

## 사용 언어

<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=typescript&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat-square&logo=React-query&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/Recoil-3578E5?style=flat-square&logo=recoil&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/PlanetScale-000000?style=flat-square&logo=planetscale&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white" />&nbsp;  
(The programming language can be added when it's used.)

## 확인 주소

[기획서 pdf](https://github.com/riccio-ryu/portfolio/blob/master/mychelin_portfolio.pdf)  
[디자인 figma](https://www.figma.com/proto/6rMF3YWiEWGa4CsoW6xwWp?node-id=0-1&mode=design&t=7DyYtzbc3YWOcYK1-6)

## 업데이트 예정

> 진행 상황: 1차 b 완료

1. 1차 업데이트 : 홈, 다이어리, 로그인, 회원가입 퍼블리싱 (23.10.08 gitHub push)
2. 2차 업데이트 : 홈, 다이어리, 로그인, 회원가입 api 설계 및, PlanetScale, aws 배포
3. 3차 업데이트 : 맵, 스토리지 퍼블리싱
4. 4차 업데이트 : 맵, 스토리지 api 설계 및, PlanetScale, aws 배포
5. 5차 업데이트 : 챗 퍼블리싱과 api 설계 및, PlanetScale, aws 배포

---

## 메뉴별 설명

- Home : 가장 처음 마주하는 페이지로, 다른 사람들이 등록한 글들을 볼 수 있다. 해당 페이지에서 'diary/detail'페이지로 이동하여 상세 글과 like, 댓글 등의 기능을 사용할 수 있다.
- Diary : 'diary'페이지는 본인의 다이어리를 작성한 리스트를 볼 수 있다. 수정, 삭제와 등록이 가능하다.
- Map : 지도를 보여주며 특정버튼들의 기능은 자신이 방문한 곳, 저장된 곳이 표시되고, 해당 가게에 방문한 글을 보거나, 적을 수 있게 개발 예정이다.
- Chat : 다른 사람에게 체팅을 할 수 있게 구현할 예정이고, 된다면 실시간 라이브 방송까지 구현해볼 예정이다.
- Storage : 자신이 저장하거나, 팔로잉한 유저들을 볼 수 있는 곳이다.
- Profile : 자신의 프로필을 수정하거나, 탈퇴 등을 할 수 있는 페이지, 타 유저의 프로필 페이지는 타유저의 프로필을 볼 수 있고, 타유저가 보이게 설정한 글 리스트를 볼 수 있게 구현할 예정이다.
- Join/Login : 회원가입과 로그인할 수 있는 페이지이다.

---

## 1차 업데이트 진행 과정

전반적으로 NextJs의 환경설정을 진행하였다. 진행하는 과정에서 eslint와 prettier를 설정하는 과정은 [블로그1](https://velog.io/@xmun74/Next.js-TS%EC%97%90%EC%84%9C-ESLint-Prettier-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)와 [블로그2](https://velog.io/@mayinjanuary/Next.js-%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0-ESLint-Prettier-%EC%84%A4%EC%A0%95) 해당 블로그를 참고하여 설정하였고, 처음 사용하는 tailwind에 적잖이 당황하였다.
작업 중간에 있는 별점에 시간이 가장 오래 걸렸고, 해당 내용은 javascript로 일단 구현은 해놓았다.

앞으로 해야할 일 : small(phone or tablet) 모드의 스타일 개선, prisma와 planetscale을 통한 회원가입과 글 등록을 할 예정이다.  
그에 따라 기존의 useState를 다량 변경할 것 같다.

추가 진행상황 : 모바일 버전의 tailwind 추가! 이제부터는 db와 api 작업을 할 예정이다. (2023.10.15)

### 1차 진행 캡쳐본

#### Home

<p>
  <img align="left" width="auto" height="300" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/mychelin_home.png">
데이터는 없기 때문에 예시 이미지 입니다.  
</p>
<br clear='left' />

#### Sign-up

<p>
<img align="left" width="auto" height="300" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/mychelin_join1.png">
<img align="left" width="auto" height="300" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/mychelin_join2.png">  
<br />
회원가입 페이지로, 회원의 기본정보를 입력하고 약관 동의를 받습니다. react-hook-form을 사용하여 data를 체크합니다  
주소는 '/signup'
</p>
<br clear='left' />

#### Sign-in

<p>
<img align="left" width="auto" height="300" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/mychelin_login.png">
로그인 페이지로, 회원가입 했던 이메일과 비밀번호를 입력하하면 됩니다. react-hook-form을 사용하여 data를 유효성검사를 합니다  
주소는 '/signin'
</p>
<br clear='left' />

#### Diary

<p>
<img align="left" width="480" height="auto" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/mychelin_diary.png">
본인이 작성한 글 리스트를 볼 수 있는 화면입니다.  
주소는 '/diary'
</p>
<br clear='left' />
<br />
<p>
<img align="left" width="480" height="auto" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/mychelin_diary_detail.png">
본인이 작성한 글이나 다른 유저가 공개한 글을 볼 수 있는 화면입니다.  
주소는 '/diary/[글번호]'
</p>
<br clear='left' />
<br />
<p>
<img align="left" width="480" height="auto" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/mychelin_diary_upload.png">
본인이 글을 작성할 때에 볼 수 있는 화면입니다.  
주소는 '/diary/upload'
</p>
<br clear='left' />
<br />

#### Profile-user

<p>
<img align="left" width="auto" height="300" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/mychelin_profile_user.png">
다른 유저의 프로필과 작성하고 공개한 글 리스트를 볼 수 있는 화면입니다.  
주소는 '/profile/[userid]'
</p>
<br clear='left' />

#### mobile

<p>
<img align="left" width="auto" height="200" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/mob-mychelin_home.png">
<img align="left" width="auto" height="200" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/mob-mychelin_join1.png">
</p>
<img align="left" width="auto" height="200" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/mob-mychelin_join2.png">
<img align="left" width="auto" height="200" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/mob-mychelin_login.png">
<img align="left" width="auto" height="200" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/mob-mychelin_diary.png">
<img align="left" width="auto" height="200" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/mob-mychelin_diary_detail.png">
<img align="left" width="auto" height="200" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/mob-mychelin_diary_upload.png">
<img align="left" width="auto" height="200" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/mob-mychelin_profile_user.png">
<br clear='left' />

## 2차 업데이트 진행 과정

prisma를 설치 'npm install prisma -D'하고  
'npx prisma init'를 통해 실행  
prisma에서 prettier가 동작하지 않아 vscode에 설정을 [참고 블로그](https://velog.io/@pengoose_dev/schema.prismaprettier) 참고하여 변경  
회원가입, 로그인의 api쪽과 prisma를 통해 server쪽을 작성중에 Loading을 어떻게 표현할지 고민을 하다가 화면 전체를 감싸는 Loading 페이지를 만들어야 겠다고 생각을 했다. 해당 컴포넌트를 loadingFull의 이름을 만들었다.

### 'libs'폴더

libs라는 폴더는 'client'와 'server'로 구성되어 있고, 'client'는 화면을 구성하는 프론트 작업을 하는 데에 사용하고, 'server'는 백엔드 작업을 할 때 사용한다.  
'libs/client/useMutation.tsx'는 'react-query'처럼 사용할 수 있다.  
'libs/server/withHandler.ts'는 method와 함수를 받아와 리턴한다.  
'api/users'폴더는 회원가입, 로그인과 관련된 파일이 있다.

### auth

e-mail과 nickname을 서버에서 체크해서 있다면 만들지 못하게 하고, 없다면 회원가입을 가능하게 하였다.
'bcrypt'를 사용해서 password를 암호화 하는 작업을 하였다. 또한 로그인 할 때에 입력된 비밀번호와 서버에 등록된 암호를 비교하여 로그인가능하도록 하였다.  
<img align="left" width="auto" height="200" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/bcrypt.png">

### JWT, Access Token & Refresh Token

로그인 진행시에 Access Token 만을 통한 인증 방식의 문제는 만일 제 3자에게 탈취당할 경우 보안에 취약하다는 점이 있어서, 이를 위해 JWT를 통해서 토큰을 두개를 발급한다.  
Refresh Token만 서버측의 DB에 저장하며, Refresh Token과 Access Token을 쿠키 혹은 웹스토리지에 저장한다.  
사용자가 인증이 필요한 API에 접근하고자 하면, 가장 먼저 토큰을 검사한다.

- case1 : access token과 refresh token 모두가 만료된 경우 → 에러 발생 (재 로그인하여 둘다 새로 발급)
- case2 : access token은 만료됐지만, refresh token은 유효한 경우 →  refresh token을 검증하여 access token 재발급
- case3 : access token은 유효하지만, refresh token은 만료된 경우 →  access token을 검증하여 refresh token 재발급
- case4 : access token과 refresh token 모두가 유효한 경우 → 정상 처리

로그아웃을 하면 Access Token과 Refresh Token을 모두 만료시킨다.

위의 과정을 만든다.

### 도중에 마주친 'Warning : Props 'className' did not match'

해당내용의 에러는 구글링하여 해결 하였다.

> 첫 페이지는 SSR로 작동하며 이후 CSR로 화면을 렌더링하게 되는데, 이때 서버에서 받은 해시+클래스명과 이후 클라이언트에서 작동하는 해시+클래스 명이 달라지면서 스타일을 불러올수 없는 문제가 발생한다.

바벨 플러그인 설정을 통해 위 문제를 해결할 수 있다고 한다.  
npm i babel-plugin-styled-components 설치  
루트 폴더에 .babelrc 파일 생성

```
{
  "presets": ["next/babel"],
  "plugins": [
    [
      "babel-plugin-styled-components",
      { "fileName": true, "displayName": true, "pure": true }
    ]
  ]
}
```

를 작성한다.  
fileName: 코드가 포함된 파일명을 알려줌  
displayName : 클래스명에 해당 스타일 정보 추가  
pure : 사용하지 않은 속성 제거

출처 : <https://velog.io/@hwang-eunji/Styled-components-nextjs%EC%97%90%EC%84%9C-className-%EC%98%A4%EB%A5%98>

### Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.

해당 에러 또한 마주쳤다. 깃과 구글등 다양한 곳에서도 비슷한 에러를 경험한 개발자들이 있었고, 해당 내용에대해 페이스북 개발자가 언급한 부분이 있었다.

- 렌더링하는 동안 setState를 사용하면 안 됩니다. 수업은 항상 이것에 대해 경고했습니다.
- 해당 함수 구성 요소 본문은 본질적으로 클래스 구성 요소 렌더링 메서드와 동일합니다.

즉, 이 경고 메세지는 규칙이 변경된 것이 아니고 규칙을 지킬 수 있도록 이전에 하지않던 경고를 주는 것 이라고 한다.  
해결 방안으로는 useEffect를 활용하여 렌더링 되고 난 후에 조건 충족시 setState 진행이 되게 하였다.

<img align="left" width="auto" height="200" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/error_Too_many_re_renders.png">
<img align="left" width="auto" height="200" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/error_Too_many_re_renders_code.png">

### diary & diary upload

diary의 페이지를 컨텐츠마다 박스를 기준으로 컴포넌트를 만들어 구성. 선택시 해당 페이지의 디테일 페이지로 이동한다.  
diary upload 페이지에는 사진 등록, 가게 선택(카카오 맵)등이 포함 되어 있습니다. 사진을 등록할 때 input의 type을 이용하여 하려고 했지만, 'react-dropzone'을 사용하는 것이 커스터마이징하기에 더 편한 것 같아 해당 라이브러리를 사용하기로 함.  
맵도 naver를 이용하려고 했는데, 가게를 검색할 수 있는 기능이 사라졌기에 카카오맵을 사용하기로 결정했습니다.

<img align="left" width="auto" height="200" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/diary_upload_01.png">
<img align="left" width="auto" height="200" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/diary_upload_02.png">
<img align="left" width="auto" height="200" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/diary_upload_03.png">
<img align="left" width="auto" height="200" src="https://github.com/riccio-ryu/portfolio/blob/master/readmeCapture/diary_detail.png">

### planetscale의 유료화...

잘 사용하고 있던 MySQL database platform인 planetscale의 유료화.... DB를 제외하고 나머지를 진행하자.
