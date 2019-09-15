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