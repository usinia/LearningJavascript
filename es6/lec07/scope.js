/* 7.2 정적 스코프와 동적 스코프 */
const x = 3;
function f() {
    console.log(x);     // 정의될 때 스코프에 존재하는 변수
    //console.log(y);   // 호출할 때 스코프에 존재하는 변수
}
{   // 새 스코프
    const y = 5;    // 호출할 때 스코프에 존재하는 변수
    f();            // 변수 x는 접근 가능하지만 y에는 접근 불가. 스코프에 없다.
    // 정적 스코프 : 전역global, 블록block, 함수function 스코프
}



/* 7.3 전역 스코프 */
let name = "Irena"; // 전역
let age = 25;       // 전역
function greet() {
    console.log(`Hello, ${name}!`);
}
function getBirthYear() {
    return new Date().getFullYear() - age;
}
console.log("=== 1. 전역 ====");
greet();
console.log(getBirthYear());
// => 함수가 호출하는 컨텍스트(스코프)에 대단히 의존적이다. 어떤 함수, 프로그램 어디서든 상관없이 name값을 바꿀 수 있다.

let user = {
    name : "Ireana",
    age : 25
}
function greet2() {
    console.log(`Hello, ${user.name}!`);
}
function getBirthYear2() {
    return new Date().getFullYear() - user.age;
}
console.log("=== 2. 단일객체 ===");
greet2();
console.log(getBirthYear2());
// => 사용자 정보를 단일 객체에 보관하는 방법
// => 여전히 전역 user에 의존하며, 객체를 어디서든 수정할 수 있다.

function greet3(user) {
    console.log(`Hello, ${user.name}!`);
}
function getBirthYear3(user) {
    return new Date().getFullYear() - user.age;
}
console.log("=== 3. 함수 매개변수 ===");
greet3(user);
console.log(getBirthYear3(user));
// => 전역 스코프에 의존하지 않고, 모든 스코프에서 호출할 수 있다.



/* 7.4 블록 스코프 */
console.log('before block');
{// 중괄호로 묶은 블록의 스코프에서만 보이는 식별자
    console.log('inside block');
    const x = 3;
    console.log(x);                     // 3
}
console.log(`outside block; x=${x}`);   // ReferenceError: x는 정의되지 않았다.



/* 7.5 변수 숨기기 */
{
    // block 1
    const x = 'blue';
    console.log(x);     // 'blue'
}
console.log(typeof x);  // "undefined"; x는 스코프 밖에 존재
{
    // block 2
    const x = 3;
    console.log(x);     // 3
}
console.log(typeof x);  // "undefined"; x는 스코프 밖에 존재

//
{
    // 외부 블록
    let x = 'blue';
    console.log(x);     // 'blue'
    {
        // 내부 블록
        let x = 3;      // @변수 숨김 variable masking, 두 변수 x가 같은 스코프에 있지만 외부 x는 가려져 보이지 않는다. 접근X
        console.log(x); // 3
    }
    console.log(x);     // 'blue'
}
console.log(typeof x);  // "undefined"; x는 스코프에 있지 않다.

//
{
    // 외부 블록
    let x = { color : 'blue' };
    let y = x;
    let z = 3;
    {
        // 내부 블록
        let x = 5;              // 바깥의 x는 가려졌다.
        console.log(x);         // 5
        console.log(y.color);   // 'blue'; y가 가르키는, 외부 스코프의 x가 가리키는 객체는 스코프 안에 있다.
        y.color = "red";
        console.log(z);         // 3; z는 숨겨져있지 않다.
    }
    console.log(x.color);       // "red"; 객체는 내부 스코프에서 수정되었다.
    console.log(y.color);       // "red"; x와 y는 같은 객체를 가리킨다.
    console.log(z);             // 3;
}
// => 외부 스코프에 있는 같은 이름의 변수에 그늘이 진 듯 만든다는 의미에서 변수 숨김을 변수 섀도우 shadowing라 부르기도 한다.
// 하지만 그늘이 진다 해도 완벽히 가려지는 것이 아니라 어두워질 뿐이다. 변수를 숨기면 해당 이름으로는 절대 접근할 수 없다.
// 스코프의 계층적인 성격 때문에 어떤 변수가 스코프에 있는지 확인하는 스코프 체인 scope chain이란 개념이 생겼다.
// 스코프 체인에 있는 모든 변수는 스코프에 있는 것이며, 숨겨지지 않았다면 접근할 수 있다.



/* 7.6 함수, 클로저, 정적 스코프 */
// 함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에서 정의하는 경우, 클로저closure라고 부른다. 스코프를 함수 주변으로 좁히는 closing 것.
let globalFunc;             // 정의되지 않은 전역 함수
{
    let blockVar = 'a';     // 블록 스코프에 있는 변수
    globalFunc = function() {   // @블록 안에서 값을 할당 받았다. 이 블록 스코프와 부모인 전역 스코프가 클로저를 형성한다.
        console.log(blockVar);  // @globalFunc 함수를 어디서 호출하든, 이 함수는 클로저에 들어있는 식별자에 접근할 수 있다.
    }
}
globalFunc();               // "a";
// => globalFunc를 호출하면 스코프에서 빠져나왔음에도 불구하고 blockVar에 접근할 수 있다. ***
// 일반적으로 스코프에서 빠져나가면 해당 스코프에서 선언한 변수는 메모리에서 제거되지만,
// 여기서는 스코프 안에서 함수를 정의했고, 해당 함수는 스코프 밖에서도 참조할 수 있으므로 자바스크립트는 스코프를 계속 유지한다.
// 즉, 스코프 안에서 함수를 정의하면 해당 스코프는 더 오래 유지된다. 일반적으로는 접근할 수 없는 것에 접근할 수 있는 효과도 있다.

let f2;
{
    let o = { note : 'Safe' };
    f2 = function() {
        return o;
    }
}
let oRef = f2();
oRef.note = "Not so safe after all!";
// => 일반적으로는 스코프 바깥쪽에 있는 것들에는 접근할 수 없다.
// => 함수를 정의해 클로저를 만들면 접근할 수 없었던 것들에 접근할 방법이 생긴다.***



/* 7.7 즉시 호출하는 함수 표현식 */
// 즉시 호출하는 함수 표현식(IIFE, immediately invoke function expression)
// const f = function() { .. };
(function() {
    // IIFE 바디
})();
// 함수 표현식으로 익명 함수를 만들고 그 함수를 즉시 호출한다.
// IIFE의 장점은 내부에 있는 것들이 모두 자신만의 스코프를 가지지만, IIFE 자체는 함수이므로 그 스코프 밖으로 무언가를 내보낼 수 있다는 것

const message = (function() {
    const secret = "I'm a secret!";
    return `The secret is ${secret.length} characters long.`;
})();
console.log(message);
// => 변수 secret은 IIFE의 스코프 안에서 안전하게 보호되며 외부에서 접근할 수 없다.

const f3 = (function() {    // @바로 실행해버림
    let count = 0;          // @f3 스코프에 정의된 변수
    return function() {     // @실제 f3을 정의하는 함수. function f3() { return `I have been..`; }, IIFE는 뭐든 반환할 수 있다.
        return `I have been called ${++count} time(s).`;
    }
})();
console.log(f3());  // @f3() 실행시 `I have..` 문자열이 반환된다. 1;
console.log(f3());  // 2;
// 자신이 몇 번 호출됐는지 보고하는 함수. 이 함수가 몇 번 호출됐는지 저장한 값을 외부에서는 절대 손댈 수 없다.
// => ES6에서 블록 스코프 변수를 도입하면서 IIFE가 필요한 경우가 줄어들긴 했지만 여전히 매우 널리 쓰인다.
// 클로저를 만들고 클로저에서 무언가 반환받을 때에는 유용하게 쓸 수 있다.

const f4 = (function() {
    let count = 0;
    return `I have been called ${++count} time(s).`;    //@f4는 문자열
})();
console.log(f4);    // @문자열을 생성하고 반환하고 끝이므로 count가 되지 않는다.
console.log(f4);    // @매번 새로운 문자열이 생성 됨



/* 7.8 함수 스코프와 호이스팅 */
// let으로 변수를 선언하면, 그 변수는 선언하기 전에는 존재하지 않는다.
// var로 선언한 변수는 현재 스코프 안이라면 어디서든 사용할 수 있으며, 심지어 선언하기도 전에 사용할 수 있다.
// 선언되지 않은 변수와 값이 undefined인 변수는 다르다. 전자는 오류, 후자는 오류가 아니다.
let var1;
let var2 = undefined;
var1;   // undefined
var2;   // undefined
// undefinedVar;    // ReferenceError: undefinedVar is not defined

// x2;
// let x2 = 3; // ReferenceError: x2 is not defined

console.log(x3);    // undefined
var x3 = 3;
console.log(x3);    // 3
// => var로 선언한 변수는 끌어올린다는 뜻의 호이스팅 hoisting 이라는 매커니즘을 따른다.
// 자바스크립트는 함수나 전역스코프 전체를 살펴보고 var로 선언한 변수를 맨 위로 끌어올린다.
// 선언만 끌어올려지며 할당은 끌어올려지지 않는다.

// var x3;  // 선언(할당은 아닌)이 끌어올려진다.
// x3;      // undefined
// x3 = 3;  // @할당
// x3;      // 3

// 호이스팅 예제 1.
// 원래 코드
if (x4!==3) {
    console.log(y4);
    var y4 = 5;
    if (y4===5) {
        var x4 = 3;
    }
    console.log(y4);
}
if (x4===3) {
    console.log(y4);
}
// 자바스크립트 해석 코드
// var x4;
// var y4;
// if (x4!==3) {
//     console.log(y4);
//     y4 = 5;
//     if (y4===5) {
//         x4 = 3;
//     }
//     console.log(y4);
// }
// if (x4===3) {
//     console.log(y4);
// }

// 호이스팅 예제 2.
// 원래 코드
var x5 = 3;
if (x5===3) {
    var x5 = 2;
    console.log(x5);
}
console.log(x5);

// 자바스크립트 해석 코드
// var x5;
// x5 = 3;
// if (x5===3) {
//     x5 = 2;
//     console.log(x5);
// }
// console.log(x5);
// => var를 이용해 변수를 선언하면 자바스크립트는 같은 변수를 여러 번 정의하더라도 무시한다.
// 같은 함수나 전역 스코프 안에서는 var로 새 변수를 만들 수 없으며, let으로 가능했던 변수 숨김도 불가능하다.



/* 7.9 함수 호이스팅 */
// var로 선언된 변수와 마찬가지로, 함수 선언도 스코프 맨 위로 끌어올려진다. 따라서 함수를 선언하기 전에 호출할 수 있다.
f5();   // "f"
function f5() {
    console.log("f");
}
// 변수에 할당한 함수 표현식은 끌어올려지지 않는다. 변수의 스코프 규칙을 그대로 따른다.
// f6();   // f6 is not defined
let f6 = function() {
    console.log("f");
}



/* 7.10 사각지대 */
// 사각지대 temporal dead zone 란, let으로 선언하는 변수는 선언하기 전까지 존재하지 않는다는 직관적 표현.
// 스코프 안에서 변수의 사각지대는 변수가 선언되기 전의 코드
// ES6 전의 자바스크립트에서는 안전한 방법으로 사용되던 typeof는, ES6의 let에서는 오류가 발생하므로 유의해야한다.
if (typeof x === "undefined") { // @typeof 연산자를 사용해 변수가 선언됐는지 알아보고 존재를 확인하는 안전한 방법
    console.log("x doesn't exist or is undefined");
} else {
    // x를 사용해도 안전한 코드
}
// => x가 let으로 선언되면 존재하지 않는 변수에 접근하는 것이므로 오류가 발생한다.



/* 7.11 스트릭트 모드 */
// ES5 문법에서는 암시적 전역변수 implicit global 라는 것이 생길 수 있었다.
// var로 변수를 선언하는 것을 잊으면 자바스크립트는 전역 변수를 참조하려 한다고 간주하고, 전역변수가 존재하지 않으면 스스로 만들었다.
// 암시적 전역 변수를 허용하지 않는 스트릭트 모드 strict mode를 도입했다.
// use "strict" (작은 따옴표 가능)
// 코드 맨 앞에 쓰면 스크립트 전체가 스트릭트 모드로 실행되고, 함수 안에서 사용하면 해당 함수만 스트릭트 모드로 실행된다.
// 다양한 스크립트를 불러서 실행하는 코드에서 전체를 스트릭트 모드로 실행하는 것은 위험부담이 크므로, 함수별 스트릭트 모드를 실행한다.
// 함수마다 use strict를 사용하기 보단 코드 전체를 즉시 실행되는 함수 하나로 감싸면 된다.
(function() {
    'use strict';

    // 코드를 전부 이 안에 작성
    // 이 코드는 스트릭트 모드로 동작하지만, 함께 동작하는 다른 스크립트는 스트릭트 모드에 영향 받지 않는다.
})();
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode



/* 7.12 요약 */
// 스코프는 반드시 이해해야 할 중요한 부분이다.
// 클로저는 자바스크립트 개발자들이 아주 유용하게 사용하고 있으며, 최신 자바스크립트 개발에서 중요한 위치를 차지하고 있다.