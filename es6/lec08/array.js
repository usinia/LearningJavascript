/* 8.3 배열 검색 */
class Person {
    constructor(name) {
        this.name = name;
        this.id = Person.nextId++;
    }
}
Person.nextId = 0;
const jamie = new Person("Jamie"),
        juliet = new Person("Juliet"),
        peter = new Person("peter"),
        jay = new Person("Jay");
const arr = [jamie, juliet, peter, jay];

// 옵션 1: ID를 직접 비교하는 방법
console.log(
arr.find(p => p.id === juliet.id)   /* Person { name: 'Juliet', id: 1 } */
)

// 옵션 2: "this" 매개변수를 이용하는 방법
console.log(
arr.find(function (p) {
    return p.id === this.id;        /* Person { name: 'Juliet', id: 1 } */
}, juliet)
);

// 일부 요소의 조건 여부만 찾을 땐 some, 모든 요소가 조건에 맞을 땐 every



/* 8.4 map과 filter */
// map은 배열 요소를 변형한다. 일정한 형식의 배열을 다른 형식으로 바꿔야 할 때 사용
const cart = [ {name: "Widget", price: 9.95}, {name: "Gadget", price:22.95} ];
const names = cart.map(x=>x.name);              // [ 'Widget', 'Gadget' ]
const prices = cart.map(x=>x.price);            // [ 9.95, 22.95 ]
const discountPrices = prices.map(x=>x*0.8);    // [ 7.96, 18.36 ]
console.log(names, prices, discountPrices);

// 콜백 함수는 각 요소에서 호출될 때 요소 자체와 요소 인덱스, 배열 전체를 매개별수로 받는다.
const items = ["Widget", "Gadget"];
const prices2 = [9.95, 22.95];
const cart2 = items.map((x,i) => ({name:x, price:prices2[i]})); // @객체를 괄호로 감싼 이유는, 화살표 표기법에서 객체 리터럴의 중괄호를 블록으로 판단하기 떄문
console.log(cart2)  // [ { name: 'Widget', price: 9.95 }, { name: 'Gadget', price: 22.95 } ]

// filter는 배열에서 필요한 것들만 남길 목적으로 만들어졌다. map과 마찬가지로 사본을 반환하며 새 배열에는 필요 요소만 남는다.
// 카드 덱을 만듭니다.
const cards = [];
for (let suit of ['H', 'C', 'D', 'S'])  // 하트, 클로버, 다이아몬드, 스페이스
    for (let value=1; value<=13; value++)
        cards.push({suit, value});

// value가 2인 카드
console.log(
    cards.filter(c => c.value === 2)
);
// 다이아몬드
console.log(
    cards.filter(c => c.suit === 'D')
);
// 킹, 퀸, 주니어
console.log(
    cards.filter(c => c.value > 10)
);
// 하트의 킹, 퀸, 주니어
console.log(
    cards.filter(c => c.value > 10 && c.suit === 'H')
);

// map과 filter 결합
function cardToString(c) {
    const suits = { 'H': '\u2665', 'C': '\u2663', 'D': '\u2666', 'S': '\u2660' };
    const values = { 1: 'A', 11: 'J', 12: 'Q', 13: 'K' };
    // cardToString을 호출할 때마다 매번 값을 만드는건 그리 효율적인 방법은 아니다.
    for (let i=2; i<=10; i++)   values[i] = i;
    return values[c.value] + suits[c.suit];
}

// value가 2인 카드
console.log(
    "value가 2인 카드",
    cards.filter(c=>c.value===2),
    cards.filter(c=>c.value===2).map(cardToString)
);
// 하트의 킹, 퀸, 주니어
console.log(
    "하트의 킹, 퀸, 주니어",
    cards.filter(c=>c.value>10 && c.suit==='H'),
    cards.filter(c=>c.value>10 && c.suit==='H').map(cardToString)
);



/* 8.5 배열의 마법 reduce */
// reduce(accumulator, element of array, current index, array itself)
// accumulator : 배열이 줄어드는 대상인 어큐뮬레이터
const arr2 = [5,7,2,4];
const sum2 = arr2.reduce((a, x) => a += x, 0); // 18; 초기값 0부터 배열 원소를 더해 나간다.
const sum3 = arr2.reduce((a, x) => a += x); // 18; 첫번째 요소 5 이후부터 배열 원소를 더해 나간다. 배열의 첫 번째 요소가 초깃값이 될 수 있을 때 생략 가능.
console.log(sum2, sum3);

// reduce는 보통 숫자나 문자열 같은 원시 값을 누적값으로 사용하지만, 객체 또한 누적값이 될 수 있고, 이를 통해 다양한 활용을 할 수 있다.
// 영단어로 이루어진 배열과 각 단어를 첫 글자에 따라 묶는 예제
const words = ["Beachball", "rodeo", "Angel", "Aardvark", "Xylophone", "November", "Chocolate", "Papaya", "Uniform", "Joker", "Clover", "Bali"];
const alphabetical = words.reduce((a, x) => {
    if (!a[x[0]]) a[x[0]] = [];     // 누적 객체 a에 배열 원소 x의 첫 번째 단어로 시작하는 프로퍼티가 없으면 빈 배열로 추가
    a[x[0]].push(x);                // 배열 원소 x로 시작하는 단어 배열에 원소 x 저장
    return a;                       // 누적 객체 a 리턴
}, {});
console.log(alphabetical);
/*
{ B: [ 'Beachball', 'Bali' ],
  r: [ 'rodeo' ],
  A: [ 'Angel', 'Aardvark' ],
  X: [ 'Xylophone' ],
  N: [ 'November' ],
  C: [ 'Chocolate', 'Clover' ],
  P: [ 'Papaya' ],
  U: [ 'Uniform' ],
  J: [ 'Joker' ] }
*/

// reduce는 통계에도 사용할 수 있다. 데이터 셋의 평균mean가 분산variance 계산 예제
const data = [3.3, 5, 7.2, 12, 4, 6, 10.3];
// 도널드 커누스Danald Knuth가 분산 계산을 위해 만든 알고리즘
// 컴퓨터 프로그래밍의 예술: 준수치적 알고리즘(개정 3판)
const stats = data.reduce((a, x) => {
    a.N++;
    let delta = x - a.mean;
    a.mean += delta/a.N;
    a.M2 += delta*(x - a.mean);
    return a;
}, {N: 0, mean: 0, M2: 0});
if (stats.N > 2) {
    stats.variance = stats.M2 / (stats.N - 1);
    stats.stdev = Math.sqrt(stats.variance);
} // 원한다면 N대신 인덱스에서 1을 뺀 값을 써도 된다.
/*
{ N: 7,
    mean: 6.828571428571428,
    M2: 63.41428571428572,
    variance: 10.56904761904762,
    stdev: 3.2510071699471257 }
*/

// 문자열 누적값을 사용하는 reduce / filter와 join을 써서 같은 결과를 얻을 수 있다.
// const words = ["Beachball", "rodeo", "Angel", "Aardvark", "Xylophone", "November", "Chocolate", "Papaya", "Uniform", "Joker", "Clover", "Bali"];
const longWords = words.reduce((a, w) => w.length>6?a+" "+w:a, "").trim();
console.log(longWords); // Beachball Aardvark Xylophone November Chocolate Uniform



/* 8.6 삭제되거나 정의되지 않은 요소들 */
//  map과 filter, reduce는 삭제되거나 정의되지 않은 요소들에서 콜백 함수를 호출하지 않는다.
const arr3 = Array(10).map(function(x) { return 5 });
console.log(arr3); // [ <10 empty items> ]; arr 의 요소는 전부 undefined다.
// 이와 비슷하게 배열 중간의 요소를 삭제하고 map을 호출하면 배열 가운데 '구멍'이 생긴다.

const arr4 = [1,2,3,4,5];
delete arr4[2];
console.log(
    arr4.map(x=>0) // [ 0, 0, <1 empty item>, 0, 0 ]
);



/* 8.7 문자열 병합 */
// Array.prototype.join : 배열의 문자열을 구분자로 합칠 때 사용하는 메소드, 매개변수로 구분자 하나를 받고, 요소들을 하나로 합친 문자열을 반환한다.
// 기본 문자열은 쉼표이며 정의되지 않은 요소, 삭제된 요소, null, undefined는 모두 빈 문자열로 취급한다.
const arr5 = [1, null, "hello", "world", true, undefined];
delete arr5[3];
console.log(
    arr5.join(), // 1,,hello,,true,
    arr5.join(''), // 1hellotrue
    arr5.join(' -- ') // 1 --  -- hello --  -- true --
);

const attributes = ["Nimble", "Perceptive", "Generous"];
const html = '<ul><li>' + attributes.join('</li><li>') + '</li></ul>';
console.log(html); // <ul><li>Nimble</li><li>Perceptive</li><li>Generous</li></ul>



/* 8.8 요약 */
// 자바스크립트 Array 클래스에는 강력하고 유연한 메서드가 많다.