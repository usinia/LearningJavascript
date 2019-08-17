# Learning Javascript

러닝 자바 스크립트 - 이선 브라운 / 한빛미디어

자바스크립트 레퍼런스 메뉴얼 : [모질라 개발자 네트워크(MDN)](https://`develop`er.mozilla.org/ko/docs/Web/JavaScript)

---
## 1. 시작하기
브라우저
>파이어폭스

창 모드 에디터
>아톰, 서브라임 텍스트, 코다, 비주얼 스튜디오, 노트패드++, 텍스트패드, Xcode


## 2. 자바스크립트 개발도구
* git : 프로젝트가 커져도 쉽게 관리할 수 있고 다른 개발자와 협력할 수 있게 돕는 버전 컨트롤 도구
* node : 브라우저 밖에서 자바스크립트를 실행할 수 있게 하는 도구. 노드와 함께 설치되는 npm은 이 리스트의 다른 도구를 설치할 때 필요
* gulp : 반복적인 개발 작업을 자동화하는 빌드 도구. grunt도 널리 쓰임
* babel : es6 코드를 es5 코드로 변환하는 트랜스컴파일러
* ESLint : 자주 하는 실수를 피하고 더 나은 프로그래머가 되도록 돕는 린트 프로그램


## 2-1. 참고 사이트
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

### @1. GIT 기본 명령어
>https://duzi077.tistory.com/127

```shell
$ cd [project foler] # 프로젝트 폴더 이동
$ git init # git folder 설정
$ git status # git 폴더 소스 상태. 추가/변경/삭제 등 파일 목록
$ git add [-A] # 소스 추가
$ git commit -m “comments” # 소스 커밋
$ git config --list # 현재 git 정보. 연결된 계정 정보 외
$ git remote # 현재 연결된 원격저장소 정보
$ git remote add `origin` [https://github.com/…] # 원격저장소 연결. [별칭] [github repository 저장소 주소]
$ git push `origin` master # 원격저장소 push. 실제 github 사이트에서 확인 가능
```

github 원격저장소 다운받기 (다운 받을 폴더 생성 후 이동)
```shell
$ git clone
```
```shell
$ git init
$ git remote origin https://github.com/…
$ git pull origin master
```

github 작업 중 pull 충돌시 작업 중 파일 백업 > head > pull > 복원
```shell
$ git stash # 현재 폴더 작업내역 클린 - stash에 저장
$ git statsh list # stath 내역보기
$ git pull # master pull 받기
$ git stash pop # stash 작업을 적용 후 stash 내역에서 삭제
$ git stash apply # statsh 작업을 적용 후 statsh 내역에서 삭제하지 않음
$ git stash drop # 필요없는 stash 삭제
$ git stash clear # 전체 stash 삭제
```

branch 만들기
```shell
$ git branch `devlop` # 브런치 생성
$ git checkout `develop` # 새로 만든 브런치 사용
$ git push origin `develop` # 현재 브런치를 원격저장소에 저장
$ git merge master # 작업 이후 master에 merge
$ git clone -b “branch name” “git url” # 원격저장소 특정 branch clone (git remote branch clone)
```

branch 삭제
```shell
$ git ls-remote # 원격저장소 branch 목록
$ git push origin --delete `develop` # develop 브런치 삭제
```

---
### @2. 참고 사이트
>[마크다운 문법1](https://m.post.naver.com/viewer/postView.nhn?volumeNo=16304568&memberNo=42458017&vType=VERTICAL), [문법2](https://blog.kalkin7.com/2014/02/10/lets-write-using-markdown/)

---
## 2-2. 준비하기

1. [git 설치](https://git-scm.com)
    1. `$ git init`
    1. `.gitignore` 파일 생성
1. [node 설치](https://nodejs.org/en/)
    ```shell
    $ node -v # 버전확인
    $ npm -v # 버전확인
    $ cd [프로젝트 루트]
    $ npm install `underscore` # 패키지 인스톨
    $ npm install `underscore@1.8.0` # 버전명시
    $ npm init # 프로젝트에 필요한 패키지 의존성 관리 (package.json) (일반/개발의존성)
    $ npm install --save/--save-dev `underscore` # package.json에 저장되지 않는 개발의존성 패키지
    ```
1. gulp 설치
    ```shell
    $ npm install -g gulp # global 전역에 설치
    $ sudo npm install -g gulp # mac 권한 때문에 설치 오류시
    ```
    * ___그래도 안되면___
        ```shell
        $ sudo npm install -g gulp --unsafe-perm=true --allow-root
        ```
    * mac 권한 관련 명령어
        ```shell
        $ csrutil status # disable (재시동-복구모드-터미널 $ csrutil disable). rootless
        $ whoami # 현사용자
        $ sudo -s # root 사용자
        $ chown [-r] owner[:group] file(s) # 폴더[하위폴더] 소유자:그룹 권한 변경
        ```

1. [Babel 설치 - gulp](https://babeljs.io/setup#installation), [Babel option docs](https://babeljs.io/docs/en/options), [gulp-babel github](https://github.com/babel/gulp-babel)
    ```shell
    # Babel 6
    $ npm install --save-dev gulp-babel
    ```
    ```shell
    # Babel 7
    $ npm install --save-dev gulp-babel@next @babel/core
    ```
    ```javascript
    // gulpfile.js
    var gulp = require("gulp");
    var babel = require("gulp-babel");
    gulp.task("default", function () {
        return gulp.src("src/app.js") // es6 폴더 경로
            .pipe(babel())              // 바벨이 es6 -> es5 변환. 트랜스 컴파일
            .pipe(gulp.dest("dist"));   // es5 폴더 경로. gulp가 소스 경로를 그대로 유지
    });
    ```

    * es6 preset
    ```shell
    # Babel 6
    $ npm install babel-preset-env --save-dev
    ```
    ```shell
    # Babel 7
    $ npm install @babel/preset-env --save-dev
    ```
    * .babelrc
        * Babel 6
        ```json
        {
        "presets": ["env"]
        }
        ```
        * Babel 7
        ```json
        {
        "presets": ["@babel/preset-env"]
        }
        ```
    
    * 버전 때문에 꼬였을 경우
        ```shell
        # 현재 설치 된 npm 버전 확인 후 uninstall/remove 후 버전 명시하여 재설치
        npm list --depth=0
        ```
        * node_modules 폴더 삭제

    1. 설치 완료
        1. 터미널에서 `gulp` 명령어 실행. es6 파일이 es5로 변환되었는지 es5 폴더에서 확인
    1. 실행
    ```shell
        $ gulp
        $ node es6/test.js # es6 파일
        $ node dist/test.js # es5 파일
    ```
    
1. [ESLint 설치](https://eslint.org/)
```shell
# gulp eslint 설치
$ sudo npm install -g eslint
# .eslintrc 설정파일 만들기
$ eslint --init
# gulp eslint 실행 패키지 설치
$ sudo npm install --save-dev gulp-eslint
```
```javascript
// gulpfile.js
var gulp = require("gulp");
var babel = require("gulp-babel");
var eslint = require("gulp-eslint")
gulp.task("default", function (done) {
    // ESLint 실행
    gulp.src(["es6/**/*.js", "public/es6/**/*.js"]) // **은 서브디렉터리를 포함한 모든 디렉터리
        .pipe(eslint())
        .pipe(eslint.format());
    // 노드 소스
    gulp.src("es6/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
    // 브라우저 소스
    gulp.src("public/es6/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("public/dist"));
    done();
});
```
    1. 설치 완료
        1. 터미널에서 `gulp` 명령어로 틀린 문법 검사
    1. 실행
        ```shell
        $ gulp
        $ node dist/example.js
        ```
        ```shell
        $ babel-node es6/example.js
        ```