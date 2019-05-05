# Learning Javascript


#### 자바스크립트 개발도구
* git : 프로젝트가 커져도 쉽게 관리할 수 있고 다른 개발자와 협력할 수 있게 돕는 버전 컨트롤 도구
* node : 브라우저 밖에서 자바스크립트를 실행할 수 있게 하는 도구. 노드와 함께 설치되는 npm은 이 리스트의 다른 도구를 설치할 때 필요
* gulp : 반복적인 개발 작업을 자동화하는 빌드 도구. grunt도 널리 쓰임
* babel : es6 코드를 es5 코드로 변환하는 트랜스컴파일러
* ESLint : 자주 하는 실수를 피하고 더 나은 프로그래머가 되도록 돕는 린트 프로그램

---
#### 참고 사이트
- [css와 HTML 무료 강좌](https://www.codecademy.com/learn/learn-html)

- [ES6와 ES7 기능별 호환성 테이블](http://kangax.github.io/compat-table/es6/)

- [git 설치](https://git-scm.com)

- [bash terminal 강좌, 트리하우스 콘솔 기초 강의](https://teamtreehouse.com/library/introduction-to-the-terminal)

- [github 초보용 자료](http://try.github.io)

- [github 한글 깃문서](https://git-scm.com/book/ko/v2)

- [패키지 관리 도구 npm 설치 - node.js 홈페이지](https://nodejs.org/en/)

- [트랜스컴파일러 - 바벨](https://babeljs.io), [바벨 API](https://babeljs.io/docs/en/options)
- [트랜스컴파일러 - 트레이서](https://github.com/google/traceur-compiler)
---

### `GIT 기본 명령어`
```shell
$ cd [target foler]
$ git init — git folder 설정
$ git status — git 폴더 소스 상태. 추가/변경/삭제 등
$ git add [-A] — 소스 추가
$ git commit -m “comments” — 소스 커밋
$ git config --list — 현재 git 정보. 연결된 계정 정보 외
$ git remote — 연결된 원격저장소
$ git remote add [origin] [https://github.com/…] — 원격저장소 연결. [별칭] [github repository 저장소 주소]
$ git push [origin] master — 원격저장소 push. 실제 github 사이트에서 확인 가능
```

`github 원격저장소 다운받기`

1. 다운 받을 폴더 생성
```shell
$ git clone
```
```shell
$ git init
$ git remote origin https://github.com/…
$ git pull origin master
```

`github 작업 중 pull 충돌시 작업중 파일 백업하고 head로 되돌린 후 pull 이후 변경사항 되돌리기`
```shell
$ git stash — 현재 폴더 작업내역 클린 - stash에 저장
$ git statsh list — stath 내역보기
$ git pull — master pull 받기
$ git stash pop — stash 작업을 적용 후 stash 내역에서 삭제
$ git stash apply — statsh 작업을 적용 후 statsh 내역에서 삭제하지 않음
$ git stash drop — 필요없는 stash 삭제
$ git stash clear — 전체 stash 삭제
```

`branch 만들기`
```shell
$ git branch [devlop] — 브런치 생성
$ git checkout develop — 새로 만든 브런치 사용
$ git push origin develop — 현재 브런치를 원격저장소에 저장
$ git merge master — 작업 이후 master에 merge
git clone -b “branch name” “git url” — 원격저장소 특정 branch clone (git remote branch clone)
```

`branch 삭제`
```shell
$ git ls-remote — 원격저장소 branch 목록
$ git push origin --delte develop — develop 브런치 삭제
```

>(참고 : https://duzi077.tistory.com/127)

---

 [README.md 마크다운](https://m.post.naver.com/viewer/postView.nhn?volumeNo=16304568&memberNo=42458017&vType=VERTICAL)

 ---
 ### `npm 명령어`
 ```shell
 $ node -v - 버전확인
 $ npm -v - 버전확인
 $ cd [프로젝트 루트]
 $ npm install underscore - 패키지 인스톨
 $ npm install underscore@1.8.0 - 버전명시
 $ npm init - 프로젝트에 필요한 패키지 의존성 관리 (package.json)
 $ npm install --save/--save-dev underscore - package.json에 저장되지 않는 개발의존성 패키지
 ```
`gulp 설치`
```shell
$ npm install -g gulp - global 전역에 설치
```
mac 권한 때문에 설치 오류시
```shell
$ csrutil status - disable (재시동-복구모드-터미널 $ csrutil disable)
$ sudo npm install -g gulp
```
___`그래도 안되면`___
```bash
$ sudo npm install -g gulp --unsafe-perm=true --allow-root
```

mac bash root 사용자
```shell
$ whoami - 현사용자
$ sudo -s - root 사용자
```
[바벨 설치](https://babeljs.io/setup#installation), [바벨 option docs](https://babeljs.io/docs/en/options)

```bash
# Babel 6
npm install --save-dev gulp-babel

# Babel 7
npm install --save-dev gulp-babel@next @babel/core

# cli
npm install --save-dev @babel/core @babel/cli
npm install @babel/preset-env --save-dev
```
[gulp-babel github](https://github.com/babel/gulp-babel)