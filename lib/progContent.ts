import type { Lesson } from "@/lib/lessonTypes";

export const PROG_LESSONS: Lesson[] = [
  {
    slug: "variables-types",
    title: "변수, 타입, 그리고 스코프",
    level: "초급",
    tag: "기초",
    estimatedTime: "20분",
    summary:
      "프로그래밍 언어가 변수를 다루는 방식, 정적·동적 타입 시스템의 차이, 렉시컬 스코프의 동작 원리를 설명합니다. 클로저까지 이어지는 스코프의 깊은 이해를 다룹니다.",
    relatedSlugs: ["functions-first-class", "oop-intro", "type-system-generics"],
    steps: [
      {
        number: 1,
        title: "변수와 바인딩",
        body: [
          "변수(Variable)는 값에 이름을 붙이는 것입니다. 더 정확히는 이름(identifier)을 메모리 주소나 값에 바인딩(binding)하는 것입니다. 언어마다 바인딩 방식이 다릅니다. Python에서 변수는 객체에 대한 참조이고, C에서 변수는 메모리 위치 자체입니다.",
          "불변(Immutable) vs 가변(Mutable): const/val/let의 차이처럼, 선언 후 재할당 가능 여부가 다릅니다. 불변 변수를 기본으로 사용하면 코드를 추론하기 쉬워지고 버그가 줄어듭니다.",
        ],
        points: [
          "Python: 변수는 객체 참조 (int, str도 객체)",
          "C: 변수는 메모리 주소 (포인터로 직접 접근 가능)",
          "JavaScript: let(재할당 가능), const(재할당 불가, 내용 변경 가능)",
          "Rust: 기본 불변(let), 가변 명시(let mut)",
        ],
      },
      {
        number: 2,
        title: "정적 타입 vs 동적 타입",
        body: [
          "정적 타입(Static Typing) 언어는 컴파일 시점에 변수의 타입이 결정됩니다. Java, C++, Rust, TypeScript가 이에 해당합니다. 타입 오류를 실행 전에 잡을 수 있어 대규모 코드베이스에서 안전합니다.",
          "동적 타입(Dynamic Typing) 언어는 실행 시점에 타입이 결정됩니다. Python, JavaScript, Ruby가 대표적입니다. 코드가 짧고 유연하며 빠르게 작성할 수 있지만, 런타임 타입 오류가 발생할 수 있습니다. TypeScript는 JavaScript에 정적 타입을 추가한 절충안입니다.",
        ],
        points: [
          "정적 타입: 컴파일 시 오류 감지, IDE 지원 강력",
          "동적 타입: 유연함, 빠른 프로토타이핑",
          "강타입(Strong): 암묵적 변환 거의 없음 (Python)",
          "약타입(Weak): 암묵적 변환 많음 (JavaScript: '1' + 1 = '11')",
        ],
        code: {
          python: `# 동적 타입 — 타입 힌트 없이 동작
def add(a, b):
    return a + b

add(1, 2)        # 3
add("1", "2")    # "12"  (런타임에 타입 결정)

# 타입 힌트 (Python 3.5+) — 강제가 아닌 힌트
def add_typed(a: int, b: int) -> int:
    return a + b`,
          javascript: `// 동적 타입 JavaScript
let x = 5;
x = "hello";  // 가능 — 런타임에 타입 변경

// 약타입: 암묵적 변환
console.log("1" + 1);  // "11" (문자열 연결)
console.log("5" - 1);  // 4   (숫자로 변환)`,
          java: `// 정적 타입 Java — 컴파일 시 타입 검사
int x = 5;
// x = "hello";  // 컴파일 오류!

String name = "Alice";
int len = name.length();  // IDE가 정확한 메서드 제안`,
          csharp: `// 정적 타입 C# — var로 타입 추론 가능
var x = 5;        // int로 추론
var name = "Bob"; // string으로 추론

// 컴파일 오류 예시
// int age = "30";  // CS0029 오류`,
          cpp: `// 정적 타입 C++
int x = 5;
// x = "hello";  // 컴파일 오류

auto y = 3.14;  // double로 추론 (C++11)
auto z = std::string("hi");  // std::string으로 추론`,
        },
      },
      {
        number: 3,
        title: "스코프 규칙",
        body: [
          "스코프(Scope)는 변수가 유효한 범위입니다. 렉시컬 스코프(Lexical Scope, 정적 스코프)는 코드 작성 시점의 블록 구조에 따라 스코프가 결정됩니다. JavaScript, Python, Java 등 대부분의 현대 언어가 렉시컬 스코프를 사용합니다.",
          "변수 탐색은 안쪽 스코프에서 바깥쪽으로 진행됩니다. 내부 스코프에서 변수를 찾지 못하면 외부 스코프를 탐색합니다. 전역 스코프는 가장 바깥쪽입니다. 같은 이름의 변수가 내부에 있으면 외부 변수를 가립니다(shadowing).",
        ],
        points: [
          "블록 스코프: {}로 정의 (let, const, 대부분의 언어)",
          "함수 스코프: var (JavaScript) — 함수 내에서만 유효",
          "전역 스코프: 어디서나 접근 가능 (주의: 오염 위험)",
          "변수 섀도잉: 내부 스코프 동명 변수가 외부 가림",
        ],
      },
      {
        number: 4,
        title: "클로저",
        body: [
          "클로저(Closure)는 함수가 자신이 생성될 때의 렉시컬 환경을 기억하는 것입니다. 외부 함수의 실행이 끝난 후에도 내부 함수가 외부 함수의 변수에 접근할 수 있습니다.",
          "클로저의 실용 예시: 카운터 팩토리 함수, 이벤트 핸들러에서 외부 변수 참조, 부분 적용(Partial Application), 모듈 패턴(외부에서 접근 불가능한 private 상태 구현). 클로저는 함수형 프로그래밍의 핵심 도구입니다.",
        ],
        points: [
          "클로저: 함수 + 생성 시점의 렉시컬 환경",
          "자유 변수: 클로저가 외부에서 참조하는 변수",
          "메모리: 클로저가 살아있는 한 참조된 변수도 GC 안 됨",
          "실용: 카운터, 커링, 이벤트 핸들러, 모듈 패턴",
        ],
      },
    ],
    en: {
      title: "Variables, Types, and Scope",
      summary:
        "How programming languages handle variables, the difference between static and dynamic type systems, and how lexical scope works through to closures.",
      steps: [
        {
          title: "Variables and Bindings",
          body: [
            "A variable binds a name to a memory address or value. Binding semantics differ by language: in Python a variable is a reference to an object; in C it is the memory location itself.",
            "Immutable vs mutable: const/val vs let/var determines whether a binding can be reassigned. Using immutable bindings by default makes code easier to reason about and reduces bugs.",
          ],
          points: [
            "Binding: associating a name with a value or address",
            "const/val: immutable binding — value cannot be reassigned",
            "let/var: mutable binding",
            "Python: rebinding a name doesn't mutate the original object",
          ],
        },
        {
          title: "Static vs Dynamic Typing",
          body: [
            "Static typing checks types at compile time (TypeScript, Java, Kotlin, Rust). Dynamic typing checks at runtime (Python, JavaScript, Ruby). Static typing catches many bugs before execution; dynamic typing is more flexible and concise.",
            "Strongly typed vs weakly typed: strong typing disallows implicit type coercion (Python, Java); weak typing allows it (JavaScript, C). Type inference (TypeScript, Kotlin) provides static safety without verbose type annotations.",
          ],
          points: [
            "Static: type errors caught at compile time, better IDE support",
            "Dynamic: faster to write, more flexible, harder to refactor",
            "Strong vs weak typing: implicit coercion behavior",
            "Type inference: static safety without explicit annotation",
          ],
        },
        {
          title: "Lexical Scope",
          body: [
            "Scope defines where a name is accessible. Lexical (static) scope means a name's scope is determined by where it is written in the source code, not where it is called from.",
            "Most modern languages use lexical scope: JavaScript, Python, Kotlin, Swift, Rust. A name is looked up in the enclosing scope at the point of definition, working outward.",
          ],
          points: [
            "Global scope: accessible anywhere in the module/file",
            "Local scope: limited to the function or block where declared",
            "Scope chain: inner → outer scope lookup",
            "let/const: block scope; var: function scope (avoid)",
          ],
        },
        {
          title: "Closures",
          body: [
            "A closure is a function that remembers its lexical environment at the time it was created. The inner function can access outer function variables even after the outer function has returned.",
            "Practical uses: counter factories, partial application, module patterns (private state). Closures are a fundamental tool in functional programming.",
          ],
          points: [
            "Closure: function + lexical environment at creation time",
            "Free variable: a variable the closure references from outside",
            "Memory: referenced variables are not GC'd while the closure lives",
            "Uses: counters, currying, event handlers, module pattern",
          ],
        },
      ],
    },
  },
  {
    slug: "functions-first-class",
    title: "함수와 일급 객체",
    level: "초급",
    tag: "Functional",
    estimatedTime: "20분",
    summary:
      "함수를 값으로 다루는 일급 객체 개념, 고차 함수(map·filter·reduce)의 활용, 순수 함수의 이점을 정리합니다. 함수형 프로그래밍의 기초를 이해합니다.",
    relatedSlugs: ["variables-types", "async-event-loop", "clean-code"],
    steps: [
      {
        number: 1,
        title: "일급 객체로서의 함수",
        body: [
          "일급 객체(First-Class Citizen)란 변수에 저장하고, 함수의 인수로 전달하고, 함수의 반환값으로 사용할 수 있는 값을 말합니다. 대부분의 현대 언어(JavaScript, Python, Kotlin, Swift)에서 함수는 일급 객체입니다.",
          "함수를 일급 객체로 다루면 코드의 추상화 수준이 높아집니다. 반복되는 로직의 '어떻게'는 변수로, '무엇을'은 함수로 전달해 유연하고 재사용 가능한 코드를 작성할 수 있습니다.",
        ],
        points: [
          "변수 저장: const greet = (name) => `Hello, ${name}`",
          "인수 전달: setTimeout(callback, 1000)",
          "반환값: function makeAdder(x) { return (y) => x + y }",
          "Java에도 Lambda, 메서드 참조로 일급 객체처럼 사용 가능",
        ],
      },
      {
        number: 2,
        title: "고차 함수 — map, filter, reduce",
        body: [
          "고차 함수(Higher-Order Function)는 함수를 인수로 받거나 반환하는 함수입니다. 배열의 map, filter, reduce가 대표적입니다. map은 각 원소를 변환하고, filter는 조건을 만족하는 원소만 남기고, reduce는 전체를 하나의 값으로 집계합니다.",
          "고차 함수를 조합하면 데이터 변환 파이프라인을 선언적으로 표현할 수 있습니다. 명령형(for 루프)보다 코드가 간결하고 의도가 명확해집니다. 단, 각 단계마다 중간 배열이 생성되므로 성능이 중요한 경우엔 for 루프가 나을 수 있습니다.",
        ],
        points: [
          "map: [1,2,3].map(x => x*2) → [2,4,6]",
          "filter: [1,2,3,4].filter(x => x%2===0) → [2,4]",
          "reduce: [1,2,3].reduce((acc,x) => acc+x, 0) → 6",
          "체이닝: .filter().map().reduce() 파이프라인",
        ],
        code: {
          javascript: `const numbers = [1, 2, 3, 4, 5];

// map: 각 원소 변환
const doubled = numbers.map(x => x * 2);
// [2, 4, 6, 8, 10]

// filter: 조건 만족 원소만
const evens = numbers.filter(x => x % 2 === 0);
// [2, 4]

// reduce: 전체를 하나로
const sum = numbers.reduce((acc, x) => acc + x, 0);
// 15

// 체이닝: 짝수의 제곱합
const result = numbers
  .filter(x => x % 2 === 0)
  .map(x => x ** 2)
  .reduce((acc, x) => acc + x, 0);
// 20`,
          python: `numbers = [1, 2, 3, 4, 5]

# map
doubled = list(map(lambda x: x * 2, numbers))
# [2, 4, 6, 8, 10]

# filter
evens = list(filter(lambda x: x % 2 == 0, numbers))
# [2, 4]

# reduce
from functools import reduce
total = reduce(lambda acc, x: acc + x, numbers, 0)
# 15

# Python 리스트 컴프리헨션 (더 Pythonic)
doubled_lc = [x * 2 for x in numbers]
evens_lc = [x for x in numbers if x % 2 == 0]`,
          java: `import java.util.*;
import java.util.stream.*;

List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// Stream API (Java 8+)
List<Integer> doubled = numbers.stream()
    .map(x -> x * 2)
    .collect(Collectors.toList());

List<Integer> evens = numbers.stream()
    .filter(x -> x % 2 == 0)
    .collect(Collectors.toList());

int sum = numbers.stream()
    .reduce(0, Integer::sum);`,
          csharp: `var numbers = new[] { 1, 2, 3, 4, 5 };

// LINQ (C#)
var doubled = numbers.Select(x => x * 2).ToList();
var evens   = numbers.Where(x => x % 2 == 0).ToList();
var sum     = numbers.Aggregate(0, (acc, x) => acc + x);

// 메서드 체이닝
var result = numbers
    .Where(x => x % 2 == 0)
    .Select(x => x * x)
    .Sum();`,
        },
      },
      {
        number: 3,
        title: "순수 함수와 부수 효과",
        body: [
          "순수 함수(Pure Function)는 같은 입력에 항상 같은 출력을 반환하고, 함수 외부 상태를 변경하지 않는(부수 효과 없음) 함수입니다. 수학의 함수와 동일한 개념입니다.",
          "부수 효과(Side Effect)는 외부 상태 변경(전역 변수 수정, 파일 읽기/쓰기, 네트워크 요청, 콘솔 출력 등)을 말합니다. 부수 효과를 최소화하고 순수 함수를 최대화하면 코드 테스트, 디버깅, 병렬 처리가 쉬워집니다.",
        ],
        points: [
          "순수 함수: 동일 입력 → 동일 출력, 외부 상태 불변",
          "참조 투명성: 함수 호출을 결과값으로 교체 가능",
          "부수 효과를 경계(I/O 레이어)로 밀어내는 것이 함수형 설계",
          "순수 함수는 테스트가 쉽고 병렬 실행 안전",
        ],
      },
      {
        number: 4,
        title: "커링과 함수 합성",
        body: [
          "커링(Currying)은 여러 인수를 받는 함수를 하나의 인수를 받는 함수들의 연쇄로 변환하는 것입니다. f(a, b, c) → f(a)(b)(c). 부분 적용(Partial Application)을 통해 특정 인수를 고정한 새 함수를 만들 수 있습니다.",
          "함수 합성(Function Composition)은 두 함수를 결합해 새 함수를 만드는 것입니다. compose(f, g)(x) = f(g(x)). 단순한 함수들을 조합해 복잡한 변환을 표현할 수 있어 재사용성이 높아집니다.",
        ],
        points: [
          "커링: add(1)(2)(3) — 함수 특화(Specialization) 가능",
          "부분 적용: const add5 = add.bind(null, 5)",
          "함수 합성: const process = compose(trim, toLowerCase, split)",
          "Ramda, Lodash/fp: 함수형 유틸리티 라이브러리",
        ],
      },
    ],
    en: {
      title: "Functions and First-Class Objects",
      summary:
        "Treating functions as values, leveraging higher-order functions (map, filter, reduce), and understanding the benefits of pure functions — the foundation of functional programming.",
      steps: [
        {
          title: "Functions as First-Class Citizens",
          body: [
            "A first-class citizen is a value that can be stored in a variable, passed as a function argument, and returned from a function. In most modern languages (JavaScript, Python, Kotlin, Swift), functions are first-class citizens.",
            "Treating functions as values raises the level of abstraction. You can separate the 'how' of repeated logic into a variable and the 'what' into a function argument, producing flexible, reusable code.",
          ],
          points: [
            "Store: const greet = (name) => `Hello, ${name}`",
            "Pass: setTimeout(callback, 1000)",
            "Return: function makeAdder(x) { return (y) => x + y }",
            "Java: lambdas and method references approximate first-class functions",
          ],
        },
        {
          title: "Higher-Order Functions — map, filter, reduce",
          body: [
            "A higher-order function takes a function as an argument or returns one. The canonical examples are map, filter, and reduce: map transforms each element, filter keeps only matching elements, and reduce aggregates everything into a single value.",
            "Chaining higher-order functions produces declarative data-transformation pipelines. The code is more concise and intention-revealing than imperative for-loops. Note that each step creates an intermediate array, so for-loops may be faster when performance is critical.",
          ],
          points: [
            "map: [1,2,3].map(x => x*2) → [2,4,6]",
            "filter: [1,2,3,4].filter(x => x%2===0) → [2,4]",
            "reduce: [1,2,3].reduce((acc,x) => acc+x, 0) → 6",
            "Chaining: .filter().map().reduce() pipeline",
          ],
        },
        {
          title: "Pure Functions and Side Effects",
          body: [
            "A pure function always returns the same output for the same input and does not mutate external state (no side effects). It is identical to the mathematical notion of a function.",
            "Side effects are mutations of external state: modifying a global variable, reading/writing a file, making a network request, logging to the console. Minimizing side effects and maximizing pure functions makes code easier to test, debug, and run in parallel.",
          ],
          points: [
            "Pure function: same input → same output, no external mutation",
            "Referential transparency: the call can be replaced with its result",
            "Functional design: push side effects to the boundary (I/O layer)",
            "Pure functions are easy to test and safe to run in parallel",
          ],
        },
        {
          title: "Currying and Function Composition",
          body: [
            "Currying transforms a multi-argument function into a chain of single-argument functions: f(a, b, c) → f(a)(b)(c). Partial application fixes some arguments to create a specialized new function.",
            "Function composition combines two functions into a new one: compose(f, g)(x) = f(g(x)). Composing simple functions to express complex transformations increases reusability.",
          ],
          points: [
            "Currying: add(1)(2)(3) — enables function specialization",
            "Partial application: const add5 = add.bind(null, 5)",
            "Composition: const process = compose(trim, toLowerCase, split)",
            "Ramda, Lodash/fp: functional utility libraries",
          ],
        },
      ],
    },
  },
  {
    slug: "oop-intro",
    title: "객체지향 프로그래밍 입문",
    level: "초급",
    tag: "OOP",
    estimatedTime: "25분",
    summary:
      "클래스, 인스턴스, 캡슐화, 상속, 다형성의 네 가지 원칙을 실제 예시와 함께 소개합니다. 객체지향의 강점과 흔한 오용 패턴도 살펴봅니다.",
    relatedSlugs: ["variables-types", "design-patterns-creational", "clean-code"],
    steps: [
      {
        number: 1,
        title: "클래스와 인스턴스",
        body: [
          "클래스(Class)는 객체의 설계도입니다. 인스턴스(Instance)는 그 설계도로 만든 실제 객체입니다. 예를 들어 '자동차' 클래스를 정의하면, 내 차와 네 차는 같은 설계도를 가진 서로 다른 인스턴스입니다.",
          "클래스는 필드(상태)와 메서드(행동)로 구성됩니다. 생성자(Constructor)는 인스턴스가 만들어질 때 호출되어 초기 상태를 설정합니다. this 키워드는 현재 인스턴스를 가리킵니다.",
        ],
        points: [
          "클래스: 상태(필드)와 행동(메서드)의 청사진",
          "인스턴스: new 키워드로 생성, 힙 메모리에 저장",
          "생성자: 객체 초기화 담당",
          "this: 현재 인스턴스 참조",
        ],
        code: {
          python: `class Dog:
    def __init__(self, name: str, breed: str):
        self.name = name      # 인스턴스 필드
        self.breed = breed

    def bark(self) -> str:
        return f"{self.name}: Woof!"

# 인스턴스 생성
dog1 = Dog("Buddy", "Labrador")
dog2 = Dog("Max", "Poodle")
print(dog1.bark())  # Buddy: Woof!
print(dog2.name)    # Max`,
          javascript: `class Dog {
  constructor(name, breed) {
    this.name = name;
    this.breed = breed;
  }

  bark() {
    return \`\${this.name}: Woof!\`;
  }
}

const dog1 = new Dog("Buddy", "Labrador");
const dog2 = new Dog("Max", "Poodle");
console.log(dog1.bark()); // Buddy: Woof!`,
          java: `public class Dog {
    private String name;
    private String breed;

    public Dog(String name, String breed) {
        this.name = name;
        this.breed = breed;
    }

    public String bark() {
        return name + ": Woof!";
    }
}

Dog dog1 = new Dog("Buddy", "Labrador");
System.out.println(dog1.bark()); // Buddy: Woof!`,
          csharp: `public class Dog {
    public string Name { get; }
    public string Breed { get; }

    public Dog(string name, string breed) {
        Name = name;
        Breed = breed;
    }

    public string Bark() => $"{Name}: Woof!";
}

var dog1 = new Dog("Buddy", "Labrador");
Console.WriteLine(dog1.Bark()); // Buddy: Woof!`,
          cpp: `#include <string>
#include <iostream>

class Dog {
private:
    std::string name;
    std::string breed;
public:
    Dog(const std::string& name, const std::string& breed)
        : name(name), breed(breed) {}

    std::string bark() const {
        return name + ": Woof!";
    }
};

Dog dog1("Buddy", "Labrador");
std::cout << dog1.bark(); // Buddy: Woof!`,
        },
      },
      {
        number: 2,
        title: "캡슐화",
        body: [
          "캡슐화(Encapsulation)는 객체의 내부 구현을 외부에 숨기고, 정의된 인터페이스(메서드)를 통해서만 접근하게 하는 원칙입니다. 필드를 private으로 선언하고 getter/setter로만 접근하는 것이 대표적입니다.",
          "캡슐화의 핵심 이점은 유연성입니다. 내부 구현을 변경해도 인터페이스가 그대로이면 외부 코드에 영향이 없습니다. 또한 유효성 검증을 setter에 집중시켜 객체가 항상 유효한 상태를 유지하도록 보장할 수 있습니다.",
        ],
        points: [
          "private 필드: 외부에서 직접 수정 불가",
          "public 메서드: 허용된 방식으로만 상태 변경",
          "불변 객체: 모든 필드가 final/readonly → 외부 변경 불가",
          "Tell, Don't Ask: 데이터를 꺼내지 말고 객체에게 일 시키기",
        ],
      },
      {
        number: 3,
        title: "상속",
        body: [
          "상속(Inheritance)은 기존 클래스(부모/슈퍼)의 속성과 메서드를 새 클래스(자식/서브)가 재사용하는 메커니즘입니다. 코드 중복을 줄이고 공통 기능을 부모에 집중시킬 수 있습니다.",
          "그러나 상속은 남용하면 안 됩니다. 깊은 상속 계층은 코드 이해를 어렵게 하고, 부모 클래스의 변경이 모든 자식에 영향을 미칩니다. '상속보다 구성(Composition over Inheritance)' 원칙이 현대 OOP의 지침입니다.",
        ],
        points: [
          "is-a 관계: Dog is a Animal → 상속 적합",
          "has-a 관계: Car has a Engine → 구성(Composition) 적합",
          "super: 부모 클래스의 메서드 호출",
          "다중 상속 문제(다이아몬드): C++만 지원, 대부분 인터페이스로 해결",
        ],
      },
      {
        number: 4,
        title: "다형성",
        body: [
          "다형성(Polymorphism)은 같은 인터페이스로 다른 구현을 다룰 수 있는 성질입니다. 런타임 다형성(동적 디스패치): 메서드 오버라이딩으로 같은 메서드 호출이 실제 타입에 따라 다르게 동작합니다.",
          "다형성을 활용하면 코드가 구체 타입에 의존하지 않고 추상화된 인터페이스에 의존해 유연해집니다. SOLID 원칙의 OCP(개방-폐쇄 원칙): 새 타입을 추가할 때 기존 코드를 수정하지 않고 확장할 수 있습니다.",
        ],
        points: [
          "오버라이딩: 자식이 부모 메서드를 재정의",
          "오버로딩: 같은 이름, 다른 매개변수 (정적 다형성)",
          "인터페이스/추상 클래스: 구현 강제",
          "LSP(리스코프 치환): 자식은 부모를 대체 가능해야 함",
        ],
      },
    ],
    en: {
      title: "Object-Oriented Programming Introduction",
      summary:
        "An introduction to the four OOP pillars — classes and instances, encapsulation, inheritance, and polymorphism — with real examples, strengths, and common misuse patterns.",
      steps: [
        {
          title: "Classes and Instances",
          body: [
            "A class is a blueprint for objects. An instance is a concrete object created from that blueprint. For example, a 'Car' class defines the template; your car and mine are separate instances of the same class.",
            "A class consists of fields (state) and methods (behavior). The constructor runs when an instance is created and sets up initial state. The 'this' keyword refers to the current instance.",
          ],
          points: [
            "Class: blueprint of state (fields) and behavior (methods)",
            "Instance: created with 'new', stored on the heap",
            "Constructor: responsible for initializing the object",
            "this: reference to the current instance",
          ],
        },
        {
          title: "Encapsulation",
          body: [
            "Encapsulation hides an object's internal implementation and allows access only through a defined interface (methods). Declaring fields private and exposing only getters/setters is the canonical example.",
            "The core benefit of encapsulation is flexibility. Changing internal implementation does not break external code as long as the interface stays the same. Validation logic can be centralized in setters to guarantee the object always stays in a valid state.",
          ],
          points: [
            "Private fields: cannot be modified directly from outside",
            "Public methods: state can only change through allowed operations",
            "Immutable objects: all fields are final/readonly — no external mutation",
            "Tell, Don't Ask: tell the object to do work instead of extracting its data",
          ],
        },
        {
          title: "Inheritance",
          body: [
            "Inheritance lets a child class reuse fields and methods from a parent (super) class. It reduces code duplication and centralizes common behavior in the parent.",
            "However, inheritance is easily overused. Deep hierarchies make code hard to follow, and changes to the parent ripple to all children. 'Composition over Inheritance' is the guiding principle in modern OOP.",
          ],
          points: [
            "is-a relationship: Dog is an Animal → inheritance fits",
            "has-a relationship: Car has an Engine → composition fits",
            "super: calls the parent class method",
            "Diamond problem: only C++ supports multiple inheritance; most languages use interfaces instead",
          ],
        },
        {
          title: "Polymorphism",
          body: [
            "Polymorphism means the same interface can work with different underlying implementations. Runtime polymorphism (dynamic dispatch): method overriding makes the same method call behave differently depending on the actual type.",
            "Polymorphism lets code depend on an abstract interface rather than concrete types, keeping it flexible. The OCP (Open-Closed Principle): you can extend behavior by adding new types without modifying existing code.",
          ],
          points: [
            "Overriding: child redefines a parent method",
            "Overloading: same name, different parameters (static polymorphism)",
            "Interface / abstract class: enforces a contract",
            "LSP (Liskov Substitution): a child must be substitutable for its parent",
          ],
        },
      ],
    },
  },
  {
    slug: "async-event-loop",
    title: "비동기 처리와 이벤트 루프",
    level: "중급",
    tag: "Async",
    estimatedTime: "25분",
    summary:
      "콜백·프로미스·async/await의 진화 과정과 JavaScript 이벤트 루프의 동작 원리를 분석합니다. 비동기 코드를 올바르게 작성하고 디버깅하는 방법을 이해합니다.",
    relatedSlugs: ["functions-first-class", "type-system-generics", "clean-code"],
    steps: [
      {
        number: 1,
        title: "동기 vs 비동기",
        body: [
          "동기(Synchronous) 실행은 한 작업이 끝나야 다음 작업이 시작됩니다. 비동기(Asynchronous) 실행은 작업을 시작한 후 완료를 기다리지 않고 다음 코드를 실행합니다. 파일 읽기, 네트워크 요청 같은 I/O 작업은 대기 시간이 길어 비동기 처리가 효율적입니다.",
          "JavaScript는 싱글 스레드 언어입니다. 동기적으로 실행하면 네트워크 응답을 기다리는 동안 브라우저가 완전히 멈춥니다. 이벤트 루프와 비동기 API로 이 문제를 해결합니다.",
        ],
        points: [
          "I/O 바운드 작업: 비동기가 효율적",
          "CPU 바운드 작업: 멀티스레딩/멀티프로세싱 필요",
          "Blocking: 현재 스레드를 멈춤",
          "Non-Blocking: 작업을 요청하고 즉시 반환",
        ],
      },
      {
        number: 2,
        title: "콜백과 콜백 헬",
        body: [
          "콜백(Callback)은 비동기 작업 완료 후 호출될 함수를 미리 전달하는 패턴입니다. 초기 JavaScript의 기본 비동기 처리 방식입니다. setTimeout, addEventListener, fs.readFile(Node.js) 등이 콜백을 사용합니다.",
          "콜백은 중첩이 깊어질수록 코드가 오른쪽으로 들여써지는 '콜백 헬(Callback Hell)' 또는 '피라미드 오브 둠'이 발생합니다. 에러 처리도 각 단계마다 해야 하고, 코드 흐름을 추적하기 어려워집니다.",
        ],
        points: [
          "콜백 패턴: fs.readFile(path, (err, data) => {})",
          "에러 우선 콜백(Node.js): 첫 인수가 에러",
          "콜백 헬: 중첩된 콜백 → 읽기 어렵고 오류 처리 복잡",
          "이벤트 이미터 패턴: on('event', callback)",
        ],
      },
      {
        number: 3,
        title: "Promise와 async/await",
        body: [
          "Promise는 비동기 작업의 미래 결과를 나타내는 객체입니다. Pending(대기) → Fulfilled(성공)/Rejected(실패) 세 가지 상태를 가집니다. .then()으로 성공 처리, .catch()로 에러 처리를 체이닝할 수 있어 콜백 헬이 해소됩니다.",
          "async/await는 Promise를 동기 코드처럼 보이게 작성할 수 있는 문법 설탕입니다. async 함수 내에서 await로 Promise 결과를 기다립니다. try/catch로 에러를 처리할 수 있어 동기 코드 스타일로 비동기 로직을 표현할 수 있습니다.",
        ],
        points: [
          "Promise: 미래 값의 컨테이너 (then/catch/finally)",
          "Promise.all: 여러 비동기 병렬 실행, 모두 완료 대기",
          "async/await: Promise의 문법 설탕 — 더 읽기 쉬움",
          "await 없이 async: Promise 반환만 하고 기다리지 않음 (실수 주의)",
        ],
        code: {
          javascript: `// Promise 체이닝
fetch('/api/user')
  .then(res => res.json())
  .then(user => fetchPosts(user.id))
  .then(posts => console.log(posts))
  .catch(err => console.error(err));

// async/await — 같은 로직, 더 읽기 쉽게
async function loadUserPosts() {
  try {
    const res  = await fetch('/api/user');
    const user = await res.json();
    const posts = await fetchPosts(user.id);
    console.log(posts);
  } catch (err) {
    console.error(err);
  }
}

// 병렬 실행
const [user, settings] = await Promise.all([
  fetchUser(id),
  fetchSettings(id),
]);`,
          python: `import asyncio
import aiohttp

# async/await (Python 3.5+)
async def fetch_user(session, user_id):
    async with session.get(f'/api/users/{user_id}') as resp:
        return await resp.json()

async def main():
    async with aiohttp.ClientSession() as session:
        # 병렬 실행
        users = await asyncio.gather(
            fetch_user(session, 1),
            fetch_user(session, 2),
        )
        print(users)

asyncio.run(main())`,
          java: `import java.util.concurrent.CompletableFuture;

// CompletableFuture (Java 8+)
CompletableFuture<User> futureUser = CompletableFuture
    .supplyAsync(() -> fetchUser(userId))
    .thenApply(user -> enrichUser(user))
    .exceptionally(ex -> defaultUser());

// 병렬 실행
CompletableFuture<Void> all = CompletableFuture.allOf(
    fetchUserAsync(id),
    fetchSettingsAsync(id)
);
all.join();`,
          csharp: `// async/await (C# 5+)
async Task<User> LoadUserPostsAsync(int userId) {
    try {
        var user  = await FetchUserAsync(userId);
        var posts = await FetchPostsAsync(user.Id);
        return user with { Posts = posts };
    } catch (HttpRequestException ex) {
        Console.WriteLine(ex.Message);
        throw;
    }
}

// 병렬 실행
var (user, settings) = await (
    FetchUserAsync(id),
    FetchSettingsAsync(id)
).WhenAll();`,
        },
      },
      {
        number: 4,
        title: "이벤트 루프의 동작",
        body: [
          "JavaScript 이벤트 루프는 콜 스택, 태스크 큐(Macro Task), 마이크로태스크 큐로 구성됩니다. 콜 스택이 비면 마이크로태스크 큐(Promise.then) 전부 처리 후, 태스크 큐(setTimeout, I/O) 하나를 실행합니다.",
          "이 순서를 이해하면 비동기 코드의 실행 순서를 예측할 수 있습니다. setTimeout(fn, 0)은 즉시 실행되지 않고 콜 스택이 비어야 실행됩니다. Promise.then은 setTimeout보다 먼저 실행됩니다(마이크로태스크 우선).",
        ],
        points: [
          "콜 스택: 현재 실행 중인 코드",
          "마이크로태스크: Promise.then, queueMicrotask → 스택 빌 때마다 전부 처리",
          "태스크 큐: setTimeout, setInterval, I/O → 마이크로태스크 후 하나씩",
          "실행 순서: 동기 → 마이크로태스크 → 태스크",
        ],
      },
    ],
    en: {
      title: "Async Processing and the Event Loop",
      summary:
        "The evolution from callbacks to Promises to async/await, and a deep dive into how the JavaScript event loop works. Learn to write and debug asynchronous code correctly.",
      steps: [
        {
          title: "Synchronous vs Asynchronous",
          body: [
            "Synchronous execution means each task must finish before the next one starts. Asynchronous execution starts a task and moves on without waiting for it to complete. Long-running I/O operations like file reads and network requests benefit greatly from async handling.",
            "JavaScript is single-threaded. Running network requests synchronously would freeze the browser entirely. The event loop and async APIs solve this problem.",
          ],
          points: [
            "I/O-bound work: async is the efficient choice",
            "CPU-bound work: needs multi-threading or multi-processing",
            "Blocking: halts the current thread",
            "Non-blocking: fires the request and returns immediately",
          ],
        },
        {
          title: "Callbacks and Callback Hell",
          body: [
            "A callback is a function passed in to be called when an async operation completes. It was JavaScript's original async mechanism: setTimeout, addEventListener, Node.js fs.readFile all use callbacks.",
            "Nesting callbacks produces 'callback hell' (the pyramid of doom) — code that drifts further right with every nested level. Error handling must happen at each level and the overall flow becomes hard to follow.",
          ],
          points: [
            "Callback pattern: fs.readFile(path, (err, data) => {})",
            "Error-first callbacks (Node.js): first argument is the error",
            "Callback hell: nested callbacks are hard to read and error-prone",
            "Event emitter pattern: on('event', callback)",
          ],
        },
        {
          title: "Promises and async/await",
          body: [
            "A Promise represents the future result of an async operation. It moves through three states: Pending → Fulfilled / Rejected. Chaining .then() for success and .catch() for errors eliminates callback hell.",
            "async/await is syntactic sugar over Promises that lets you write async code that reads like synchronous code. Await pauses inside an async function until a Promise settles. try/catch handles errors in the familiar synchronous style.",
          ],
          points: [
            "Promise: container for a future value (then/catch/finally)",
            "Promise.all: run multiple async operations in parallel, wait for all",
            "async/await: syntactic sugar over Promise — more readable",
            "Missing await: the Promise is returned but not waited on (common bug)",
          ],
        },
        {
          title: "How the Event Loop Works",
          body: [
            "JavaScript's event loop consists of the call stack, the task queue (macro-tasks), and the microtask queue. When the call stack empties, all microtasks (Promise .then) are processed first, then one task (setTimeout, I/O) is dequeued.",
            "Understanding this order lets you predict async execution sequences. setTimeout(fn, 0) does not run immediately — it waits until the call stack is empty. Promise.then always runs before setTimeout because microtasks are processed first.",
          ],
          points: [
            "Call stack: currently executing code",
            "Microtasks: Promise.then, queueMicrotask — all processed when stack empties",
            "Task queue: setTimeout, setInterval, I/O — one at a time, after microtasks",
            "Execution order: synchronous → microtasks → tasks",
          ],
        },
      ],
    },
  },
  {
    slug: "type-system-generics",
    title: "타입 시스템과 제네릭",
    level: "중급",
    tag: "TypeScript",
    estimatedTime: "25분",
    summary:
      "정적 타입이 버그를 사전에 차단하는 원리, 제네릭을 통한 타입 안전한 재사용 코드 작성법, 타입 추론과 타입 가드를 이해합니다.",
    relatedSlugs: ["variables-types", "async-event-loop", "oop-intro"],
    steps: [
      {
        number: 1,
        title: "타입 시스템의 목적",
        body: [
          "타입 시스템(Type System)은 변수와 표현식에 타입을 부여해 프로그램의 정확성을 컴파일 시점에 검증하는 체계입니다. 잘못된 타입 사용을 사전에 차단해 런타임 오류를 줄입니다.",
          "TypeScript가 JavaScript에 타입을 추가한 이유: 대규모 코드베이스에서 함수가 받는 인수 타입, 반환 타입이 명시적이면 IDE 자동완성이 정확해지고, 리팩토링 시 오류를 즉시 발견할 수 있습니다. 타입은 문서화 역할도 합니다.",
        ],
        points: [
          "컴파일 시 오류 감지: 런타임 오류 줄어듦",
          "IDE 지원: 자동완성, 리팩토링 도구 정확도 향상",
          "문서화: 함수 시그니처가 사용법을 설명",
          "점진적 타이핑: any 허용으로 기존 JS 코드에 점진적 도입 가능",
        ],
      },
      {
        number: 2,
        title: "제네릭이란",
        body: [
          "제네릭(Generics)은 타입을 매개변수로 받아 다양한 타입에 재사용 가능한 코드를 작성하는 기법입니다. 배열, Map, Promise가 대표적인 제네릭 타입입니다. Array<number>는 숫자만, Array<string>은 문자열만 담는 배열입니다.",
          "제네릭 없이 재사용성을 높이려면 any 타입을 써야 하는데, 이는 타입 안전성을 포기하는 것입니다. 제네릭을 쓰면 '이 함수는 어떤 타입이든 받되, 입력과 출력 타입이 일치한다'처럼 타입 정보를 유지하면서 재사용할 수 있습니다.",
        ],
        points: [
          "함수 제네릭: function identity<T>(arg: T): T { return arg }",
          "타입 제약: <T extends Comparable> — T가 특정 인터페이스 만족 강제",
          "여러 타입 매개변수: <K, V>",
          "유틸리티 타입: Partial<T>, Readonly<T>, Pick<T, K>",
        ],
        code: {
          javascript: `// TypeScript 제네릭
// any 사용 — 타입 안전성 X
function firstAny(arr) {
  return arr[0]; // 반환 타입 알 수 없음
}

// 제네릭 — 타입 정보 유지
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

const num = first([1, 2, 3]);    // number | undefined
const str = first(["a", "b"]);   // string | undefined

// 제네릭 인터페이스
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

type UserResponse = ApiResponse<{ id: number; name: string }>;`,
          java: `// Java 제네릭
public class Box<T> {
    private T value;

    public Box(T value) { this.value = value; }
    public T getValue() { return value; }
}

Box<Integer> intBox = new Box<>(42);
Box<String>  strBox = new Box<>("hello");

// 제네릭 메서드
public <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}`,
          csharp: `// C# 제네릭
public class Stack<T> {
    private readonly List<T> items = new();

    public void Push(T item) => items.Add(item);
    public T Pop() {
        var last = items[^1];
        items.RemoveAt(items.Count - 1);
        return last;
    }
}

var intStack = new Stack<int>();
intStack.Push(1);
var top = intStack.Pop(); // int`,
          cpp: `// C++ 템플릿 (제네릭)
template<typename T>
T max(T a, T b) {
    return a > b ? a : b;
}

int    m1 = max(3, 5);      // int
double m2 = max(3.1, 2.7);  // double

// 제네릭 컨테이너
template<typename T>
class Stack {
    std::vector<T> data;
public:
    void push(T val) { data.push_back(val); }
    T    pop()       { auto v=data.back(); data.pop_back(); return v; }
};`,
        },
      },
      {
        number: 3,
        title: "타입 추론",
        body: [
          "타입 추론(Type Inference)은 컴파일러가 코드에서 타입을 자동으로 추론하는 기능입니다. const x = 5에서 TypeScript는 x의 타입을 number로 자동 추론합니다. 명시적 타입 선언 없이도 타입 안전성을 유지할 수 있습니다.",
          "좋은 타입 추론은 코드를 간결하게 유지하면서 타입 안전성을 제공합니다. 단, 타입이 너무 넓게 추론되거나(widening) 의도와 다르게 추론될 때는 명시적 타입 선언이 필요합니다.",
        ],
        points: [
          "let x = 5: TypeScript가 number로 추론",
          "함수 반환 타입: 구현에서 추론 (명시 권장 in public API)",
          "const assertion: as const → 가장 좁은 타입으로 추론",
          "infer: 조건부 타입에서 타입 추출",
        ],
      },
      {
        number: 4,
        title: "타입 가드와 타입 좁히기",
        body: [
          "타입 좁히기(Type Narrowing)는 조건 검사를 통해 union 타입의 범위를 좁혀 더 구체적인 타입으로 다루는 것입니다. if (typeof x === 'string') 블록 안에서 TypeScript는 x를 string으로 인식합니다.",
          "사용자 정의 타입 가드(User-Defined Type Guard)는 is 키워드로 반환 타입을 명시해 TypeScript가 특정 조건에서 타입을 좁히도록 도와줍니다. instanceof, in 연산자, 리터럴 타입 체크도 타입 좁히기에 사용됩니다.",
        ],
        points: [
          "typeof: 'string' | 'number' | 'boolean' | 'object' 등 확인",
          "instanceof: 클래스 인스턴스 확인",
          "in: 프로퍼티 존재 확인 (유니온 판별에 유용)",
          "커스텀 타입 가드: function isError(x): x is Error { ... }",
        ],
      },
    ],
    en: {
      title: "Type Systems and Generics",
      summary:
        "How static types prevent bugs before runtime, writing type-safe reusable code with generics, and understanding type inference and type guards.",
      steps: [
        {
          title: "The Purpose of a Type System",
          body: [
            "A type system assigns types to variables and expressions and verifies program correctness at compile time. It catches incorrect type usage early, reducing runtime errors.",
            "TypeScript added types to JavaScript because explicit argument and return types in large codebases make IDE auto-completion accurate and let you catch refactoring errors immediately. Types also serve as inline documentation.",
          ],
          points: [
            "Compile-time error detection: fewer runtime surprises",
            "IDE support: accurate auto-completion and refactoring tools",
            "Documentation: function signatures explain intended usage",
            "Gradual typing: 'any' lets you adopt types incrementally in existing JS code",
          ],
        },
        {
          title: "What Are Generics?",
          body: [
            "Generics let you write code that is parameterized by a type, enabling reuse across many types. Arrays, Maps, and Promises are classic generic types. Array<number> holds only numbers; Array<string> holds only strings.",
            "Without generics, achieving reusability requires 'any', which sacrifices type safety. Generics say 'this function accepts any type, but the input and output types must match' — reusability with full type information preserved.",
          ],
          points: [
            "Function generic: function identity<T>(arg: T): T { return arg }",
            "Type constraint: <T extends Comparable> — T must satisfy an interface",
            "Multiple type parameters: <K, V>",
            "Utility types: Partial<T>, Readonly<T>, Pick<T, K>",
          ],
        },
        {
          title: "Type Inference",
          body: [
            "Type inference is the compiler's ability to deduce types automatically from code. TypeScript infers the type of 'const x = 5' as number without an explicit annotation. Type safety is maintained without verbosity.",
            "Good type inference keeps code concise while preserving safety. Explicit annotations are still needed when the inferred type is too wide or unexpected.",
          ],
          points: [
            "let x = 5: TypeScript infers number",
            "Function return types: inferred from implementation (explicit preferred for public APIs)",
            "const assertion: as const → narrowest possible type",
            "infer: extract a type inside conditional types",
          ],
        },
        {
          title: "Type Guards and Narrowing",
          body: [
            "Type narrowing uses conditional checks to refine a union type to a more specific type. Inside 'if (typeof x === \"string\")' TypeScript treats x as a string.",
            "User-defined type guards use the 'is' keyword as a return type so TypeScript narrows the type under a specific condition. instanceof, in, and literal type checks are also used for narrowing.",
          ],
          points: [
            "typeof: checks 'string' | 'number' | 'boolean' | 'object' etc.",
            "instanceof: checks class instance",
            "in: checks property existence (useful for discriminating unions)",
            "Custom type guard: function isError(x): x is Error { ... }",
          ],
        },
      ],
    },
  },
  {
    slug: "clean-code",
    title: "클린 코드 원칙",
    level: "중급",
    tag: "Clean Code",
    estimatedTime: "20분",
    summary:
      "읽기 쉬운 이름 짓기, 함수 분리, 주석의 올바른 사용법 등 코드 품질을 높이는 실천적 원칙들을 정리합니다. DRY, YAGNI, SOLID의 핵심을 이해합니다.",
    relatedSlugs: ["functions-first-class", "oop-intro", "design-patterns-creational"],
    steps: [
      {
        number: 1,
        title: "의미 있는 이름 짓기",
        body: [
          "좋은 이름은 주석 없이도 코드의 의도를 전달합니다. 변수명은 무엇을 담고 있는지, 함수명은 무엇을 하는지 명확히 표현해야 합니다. d, temp, data 같은 이름은 피하고 elapsedTimeInDays, userAge, fetchUserProfile처럼 구체적으로 짓습니다.",
          "Boolean 변수는 is, has, should, can 접두사를 사용합니다. 함수는 동사로 시작합니다(get, set, create, fetch, validate). 클래스는 명사로 시작합니다(UserRepository, PaymentService). 일관된 컨벤션이 코드 전체에 걸쳐 가독성을 높입니다.",
        ],
        points: [
          "명확함: d → elapsedTimeInDays",
          "발음 가능: genymdhms → generationTimestamp",
          "검색 가능: 7 → MAX_RETRY_COUNT",
          "컨텍스트 포함: firstName → customer.firstName (필요한 경우)",
        ],
      },
      {
        number: 2,
        title: "함수는 하나의 일만",
        body: [
          "단일 책임 원칙(Single Responsibility Principle): 함수는 하나의 일을, 그 일을 잘 해야 합니다. 100줄짜리 함수는 여러 책임을 가진 신호입니다. 함수를 더 작게 쪼개면 이름 짓기가 쉬워지고, 테스트하기 쉬워지고, 재사용성이 높아집니다.",
          "함수의 추상화 수준을 일관되게 유지하세요. 한 함수 안에 비즈니스 로직과 SQL 쿼리가 뒤섞이면 읽기 어렵습니다. 각 함수는 같은 수준의 추상화로 구성되어야 합니다.",
        ],
        points: [
          "함수 길이: 20줄 이하 권장 (Martin: 4~5줄)",
          "인수 수: 3개 이하 권장 (객체로 묶기)",
          "플래그 인수: boolean 인수는 함수를 둘로 분리하라는 신호",
          "부수 효과: 함수 이름이 말하는 것 외 하지 않기",
        ],
      },
      {
        number: 3,
        title: "주석과 코드",
        body: [
          "좋은 코드는 스스로 설명합니다. 주석이 필요하다면 대개 코드가 명확하지 않다는 신호입니다. 먼저 코드를 개선해 주석 없이도 이해 가능하게 만드세요.",
          "그러나 주석이 가치 있는 경우도 있습니다: 비즈니스 로직의 '왜'를 설명할 때, 특정 버그의 회피 방법을 기록할 때, 비직관적인 알고리즘의 의도를 설명할 때입니다. 무엇을 하는지보다 왜 이렇게 했는지를 설명하는 주석이 유용합니다.",
        ],
        points: [
          "나쁜 주석: // i 증가 → i++ (코드를 반복)",
          "좋은 주석: // RFC 2822 형식 필요 (외부 제약 설명)",
          "죽은 코드: 주석 처리 대신 삭제 (버전 관리가 있음)",
          "TODO 주석: 기한과 담당자 명시, 방치 주의",
        ],
      },
      {
        number: 4,
        title: "DRY, YAGNI, SOLID 핵심",
        body: [
          "DRY(Don't Repeat Yourself): 중복 지식을 제거하세요. 같은 로직이 두 곳 이상에 있으면 한 곳이 바뀔 때 나머지도 바꿔야 한다는 것을 잊기 쉽습니다. 단, 우연히 비슷해 보이는 코드를 무리하게 추상화하면 잘못된 DRY가 됩니다.",
          "YAGNI(You Aren't Gonna Need It): 지금 필요하지 않은 기능은 만들지 마세요. '나중에 쓸 것 같아서' 추가한 코드는 대개 쓰이지 않고 복잡도만 높입니다. SOLID 중 OCP와 DIP가 특히 중요: 변경에는 닫히고 확장에는 열려 있어야 하며, 추상화에 의존해야 합니다.",
        ],
        points: [
          "DRY: 지식의 중복 제거 (코드 중복과 다름)",
          "YAGNI: 필요할 때 만들기 — 추측 개발 금지",
          "OCP: 수정 없이 새 기능 추가 가능",
          "DIP: 구현이 아닌 인터페이스에 의존",
        ],
      },
    ],
    en: {
      title: "Clean Code Principles",
      summary:
        "Practical principles for raising code quality: meaningful naming, single-responsibility functions, correct use of comments, and the essentials of DRY, YAGNI, and SOLID.",
      steps: [
        {
          title: "Meaningful Names",
          body: [
            "Good names convey intent without comments. Variables should say what they hold; functions should say what they do. Avoid d, temp, or data — prefer elapsedTimeInDays, userAge, fetchUserProfile.",
            "Boolean variables use is/has/should/can prefixes. Functions start with verbs (get, set, create, fetch, validate). Classes start with nouns (UserRepository, PaymentService). Consistent conventions improve readability across the entire codebase.",
          ],
          points: [
            "Clarity: d → elapsedTimeInDays",
            "Pronounceable: genymdhms → generationTimestamp",
            "Searchable: 7 → MAX_RETRY_COUNT",
            "Context: firstName → customer.firstName (when context is missing)",
          ],
        },
        {
          title: "Functions Do One Thing",
          body: [
            "Single Responsibility Principle: a function should do one thing and do it well. A 100-line function is a signal of multiple responsibilities. Smaller functions are easier to name, test, and reuse.",
            "Keep the abstraction level consistent within a function. Mixing business logic with raw SQL queries in the same function is hard to read. Every function should operate at a single level of abstraction.",
          ],
          points: [
            "Function length: under 20 lines recommended (Martin: 4–5 lines)",
            "Argument count: 3 or fewer recommended (group into an object)",
            "Flag arguments: a boolean parameter is a signal to split into two functions",
            "Side effects: don't do anything beyond what the function name promises",
          ],
        },
        {
          title: "Comments and Code",
          body: [
            "Good code explains itself. If a comment is necessary, it usually signals that the code isn't clear enough. Try improving the code first so it is understandable without comments.",
            "Comments are still valuable when explaining the 'why': documenting a business constraint, recording a workaround for a specific bug, or clarifying a non-obvious algorithm. A comment explaining why beats one explaining what.",
          ],
          points: [
            "Bad comment: // increment i → i++ (just repeats the code)",
            "Good comment: // RFC 2822 format required (explains an external constraint)",
            "Dead code: delete it instead of commenting it out (version control has history)",
            "TODO comments: specify a date and owner, don't leave them abandoned",
          ],
        },
        {
          title: "DRY, YAGNI, and SOLID Essentials",
          body: [
            "DRY (Don't Repeat Yourself): eliminate duplicated knowledge. When the same logic lives in two places, one change requires updating both — easy to forget. But don't force abstractions onto code that only looks similar.",
            "YAGNI (You Aren't Gonna Need It): don't build features you don't need yet. Code added 'just in case' usually sits unused and increases complexity. From SOLID, OCP and DIP matter most: open for extension, closed for modification; depend on abstractions, not implementations.",
          ],
          points: [
            "DRY: eliminate knowledge duplication (not just code duplication)",
            "YAGNI: build when needed — no speculative development",
            "OCP: add new behavior without modifying existing code",
            "DIP: depend on interfaces, not concrete implementations",
          ],
        },
      ],
    },
  },
  {
    slug: "design-patterns-creational",
    title: "디자인 패턴 — 생성 패턴",
    level: "고급",
    tag: "Design Pattern",
    estimatedTime: "30분",
    summary:
      "싱글톤, 팩토리, 빌더 패턴의 실제 사용 사례와 남용 시 발생하는 문제, 대안적인 접근법을 비교합니다. 패턴은 목적이 아닌 도구입니다.",
    relatedSlugs: ["oop-intro", "clean-code", "memory-gc"],
    steps: [
      {
        number: 1,
        title: "디자인 패턴이란",
        body: [
          "디자인 패턴은 반복적으로 등장하는 설계 문제에 대한 재사용 가능한 해결책입니다. GoF(Gang of Four)의 23가지 패턴이 고전이며, 생성(Creational), 구조(Structural), 행동(Behavioral) 세 카테고리로 분류됩니다.",
          "패턴을 배우는 목적은 모든 코드에 패턴을 적용하는 것이 아닙니다. 개발자 간의 공통 어휘를 만들고(''이건 옵저버 패턴이야''), 비슷한 문제를 어떻게 풀었는지 선배들의 지혜를 배우는 것입니다. 패턴의 남용은 오히려 복잡성을 높입니다.",
        ],
        points: [
          "생성 패턴: 객체 생성 방식 — Singleton, Factory, Builder, Prototype",
          "구조 패턴: 클래스/객체 조합 — Adapter, Composite, Decorator",
          "행동 패턴: 객체 간 책임 분배 — Observer, Strategy, Command",
          "패턴 = 솔루션이 아닌 가이드라인",
        ],
      },
      {
        number: 2,
        title: "싱글톤 패턴",
        body: [
          "싱글톤(Singleton)은 클래스의 인스턴스가 하나만 존재하도록 보장하는 패턴입니다. 전역 설정, 로거, 데이터베이스 연결 풀 등 시스템 전체에서 하나만 있어야 하는 객체에 사용됩니다.",
          "싱글톤은 전역 상태와 강한 결합을 만들어 테스트하기 어렵게 합니다. 의존성 주입(Dependency Injection)으로 대체하면 테스트 시 목(Mock) 객체를 주입할 수 있어 더 유연합니다. 현대 개발에서 싱글톤은 '안티패턴에 가까운 패턴'으로 취급되기도 합니다.",
        ],
        points: [
          "구현: private 생성자 + static getInstance() 메서드",
          "문제: 전역 상태 → 테스트 어려움, 멀티스레드 안전성",
          "스레드 안전: Double-checked locking 또는 초기화 시점 보장",
          "대안: DI(의존성 주입) 컨테이너로 싱글톤 생명주기 관리",
        ],
      },
      {
        number: 3,
        title: "팩토리 패턴",
        body: [
          "팩토리 패턴은 객체 생성 로직을 별도 클래스(팩토리)로 분리하는 패턴입니다. 생성할 클래스가 런타임에 결정되거나, 생성 로직이 복잡하거나, 생성 과정을 캡슐화하고 싶을 때 사용합니다.",
          "팩토리 메서드 패턴은 부모 클래스에서 객체 생성 인터페이스를 정의하고 자식 클래스가 구체 클래스를 결정합니다. 추상 팩토리는 관련 객체들의 군(family)을 생성하는 인터페이스를 제공합니다.",
        ],
        points: [
          "정적 팩토리: Date.now(), List.of() — 생성자 대신 의미 있는 이름",
          "팩토리 메서드: 자식 클래스가 어떤 객체 생성할지 결정",
          "추상 팩토리: UI 테마 전환 시 Button, Input 등 관련 클래스 묶음",
          "new 직접 사용 줄이기 → 구체 클래스 의존 감소",
        ],
      },
      {
        number: 4,
        title: "빌더 패턴",
        body: [
          "빌더(Builder) 패턴은 복잡한 객체를 단계적으로 구성하는 패턴입니다. 생성자 인수가 너무 많아 읽기 어려운 경우, 선택적 인수가 많은 경우에 특히 유용합니다.",
          "Kotlin의 named arguments, Python의 keyword arguments로 빌더 패턴 없이도 가독성 있는 객체 생성이 가능합니다. Java/JavaScript에서는 빌더 패턴이 여전히 유용합니다. Lombok @Builder(Java), 각종 HTTP 클라이언트 빌더가 대표 예시입니다.",
        ],
        points: [
          "메서드 체이닝: HttpRequest.builder().url().method().header().build()",
          "불변 객체 생성: build()에서 최종 검증 후 불변 객체 반환",
          "필수 vs 선택 인수 구분 가능",
          "대안: Kotlin data class + named args, Python dataclass",
        ],
      },
    ],
    en: {
      title: "Design Patterns — Creational",
      summary:
        "Real use cases for Singleton, Factory, and Builder patterns alongside the problems they cause when overused, and alternative approaches. Patterns are tools, not goals.",
      steps: [
        {
          title: "What Are Design Patterns?",
          body: [
            "Design patterns are reusable solutions to recurring design problems. The GoF (Gang of Four) catalogued 23 classic patterns, categorized as Creational, Structural, and Behavioral.",
            "The point of learning patterns is not to apply them everywhere. It is to build a shared vocabulary between developers ('this is the Observer pattern') and to inherit the wisdom of how similar problems were solved before. Overusing patterns increases complexity.",
          ],
          points: [
            "Creational: object creation — Singleton, Factory, Builder, Prototype",
            "Structural: class/object composition — Adapter, Composite, Decorator",
            "Behavioral: responsibility distribution — Observer, Strategy, Command",
            "Pattern = guideline, not a prescribed solution",
          ],
        },
        {
          title: "Singleton Pattern",
          body: [
            "Singleton ensures that a class has exactly one instance. It is used for global configuration, loggers, database connection pools — anything that should exist only once in the system.",
            "Singleton creates global state and tight coupling, making testing difficult. Replacing it with Dependency Injection lets you inject a mock object during tests, giving you more flexibility. In modern development Singleton is often treated as an anti-pattern.",
          ],
          points: [
            "Implementation: private constructor + static getInstance() method",
            "Problems: global state → hard to test, thread-safety concerns",
            "Thread safety: double-checked locking or initialization-time guarantee",
            "Alternative: manage singleton lifetime in a DI container",
          ],
        },
        {
          title: "Factory Pattern",
          body: [
            "The Factory pattern extracts object-creation logic into a separate class. Use it when the class to instantiate is determined at runtime, when creation logic is complex, or when you want to encapsulate construction.",
            "The Factory Method pattern defines a creation interface in a parent class and lets subclasses decide which concrete class to instantiate. Abstract Factory provides an interface for creating families of related objects.",
          ],
          points: [
            "Static factory: Date.now(), List.of() — descriptive name instead of constructor",
            "Factory method: subclass decides which object to create",
            "Abstract factory: groups related classes (e.g., Button, Input) for a UI theme",
            "Reducing direct 'new' usage → less dependency on concrete classes",
          ],
        },
        {
          title: "Builder Pattern",
          body: [
            "The Builder pattern constructs complex objects step by step. It is especially useful when a constructor has too many arguments to read comfortably, or when many arguments are optional.",
            "Kotlin named arguments and Python keyword arguments often make a Builder unnecessary. In Java and JavaScript the Builder pattern remains practical. Lombok @Builder (Java) and HTTP client builders are canonical examples.",
          ],
          points: [
            "Method chaining: HttpRequest.builder().url().method().header().build()",
            "Immutable result: validate in build() then return an immutable object",
            "Distinguish required vs optional arguments",
            "Alternatives: Kotlin data class + named args, Python dataclass",
          ],
        },
      ],
    },
  },
  {
    slug: "memory-gc",
    title: "메모리 관리와 GC",
    level: "고급",
    tag: "Memory",
    estimatedTime: "30분",
    summary:
      "참조 카운팅과 마크-앤-스윕 방식의 가비지 컬렉션 전략, 메모리 누수의 원인과 탐지 방법, 그리고 GC가 성능에 미치는 영향을 이해합니다.",
    relatedSlugs: ["variables-types", "design-patterns-creational", "async-event-loop"],
    steps: [
      {
        number: 1,
        title: "수동 메모리 관리",
        body: [
          "C/C++에서는 개발자가 직접 malloc/free(C) 또는 new/delete(C++)로 메모리를 할당하고 해제합니다. 해제하지 않으면 메모리 누수(Memory Leak), 이미 해제한 메모리를 또 해제하면 Double Free, 해제 후 접근하면 Use-After-Free 버그가 발생합니다.",
          "Rust는 소유권(Ownership) 시스템으로 컴파일 시점에 메모리 안전성을 보장합니다. GC 없이도 메모리 누수와 댕글링 포인터를 방지합니다. C++ 스마트 포인터(unique_ptr, shared_ptr)도 유사한 접근입니다.",
        ],
        points: [
          "스택: 함수 종료 시 자동 해제 (크기 컴파일 타임 결정)",
          "힙: 수동 또는 GC로 해제 (동적 크기)",
          "메모리 누수: 할당 후 해제 안 함",
          "Rust: 소유권으로 컴파일 시 메모리 안전성 보장",
        ],
      },
      {
        number: 2,
        title: "참조 카운팅",
        body: [
          "참조 카운팅(Reference Counting)은 각 객체에 자신을 참조하는 수를 기록하는 GC 방식입니다. 카운트가 0이 되는 순간 즉시 메모리를 해제합니다. CPython(Python의 C 구현체)이 기본 GC로 사용합니다.",
          "참조 카운팅의 치명적 한계는 순환 참조(Circular Reference)입니다. A가 B를 참조하고 B가 A를 참조하면 둘 다 카운트가 0이 되지 않아 영원히 해제되지 않습니다. Python은 보조 GC로 순환 참조를 별도 처리합니다. Swift의 ARC(Automatic Reference Counting)도 같은 방식입니다.",
        ],
        points: [
          "즉시 해제: 카운트 0이 되는 순간 메모리 반환",
          "결정론적: 언제 해제되는지 예측 가능",
          "순환 참조: A→B→A 사이클 → 카운트 0이 안 됨",
          "Swift ARC: weak 참조로 순환 참조 방지",
        ],
      },
      {
        number: 3,
        title: "마크-앤-스윕과 세대별 GC",
        body: [
          "마크-앤-스윕(Mark-and-Sweep)은 GC 루트(전역 변수, 스택 변수)에서 시작해 도달 가능한 모든 객체를 마킹하고, 마킹되지 않은 객체를 쓸어냅니다. 순환 참조를 자연스럽게 처리할 수 있습니다.",
          "세대별 GC(Generational GC)는 대부분의 객체가 금방 죽는다는 약한 세대 가설(Weak Generational Hypothesis)에 기반합니다. 새로 생성된 객체(Young Generation)를 자주, 오래된 객체(Old Generation)를 가끔 수집합니다. Java, V8, .NET의 GC가 이 방식입니다.",
        ],
        points: [
          "마크 단계: GC 루트에서 그래프 탐색해 도달 가능 객체 표시",
          "스윕 단계: 마킹 안 된 객체 해제",
          "Stop-the-World: GC 실행 중 애플리케이션 일시 정지",
          "Young Gen: 자주 수집(Minor GC), Old Gen: 가끔 수집(Major GC)",
        ],
      },
      {
        number: 4,
        title: "GC와 메모리 누수 탐지",
        body: [
          "GC 언어에서도 메모리 누수가 발생합니다. GC는 도달 불가능한 객체만 수집합니다. 의도치 않게 살아있는 참조를 유지하면(예: 이벤트 리스너 미해제, 캐시 무한 증가) GC가 해제하지 못해 메모리가 계속 증가합니다.",
          "메모리 누수 탐지 도구: Java는 VisualVM, Eclipse MAT, 브라우저는 Chrome DevTools Memory 탭, Node.js는 --inspect 플래그 + HeapSnapshot. 메모리 사용량이 시간에 따라 계속 증가한다면 누수를 의심해야 합니다.",
        ],
        points: [
          "GC 언어 누수: 참조가 남아있어 GC가 수집 못하는 경우",
          "흔한 원인: 이벤트 리스너, 타이머, 클로저, 전역 캐시",
          "WeakMap/WeakRef: 약한 참조 — GC 수집 허용",
          "힙 스냅샷 비교: 메모리 증가 원인 추적",
        ],
      },
    ],
    en: {
      title: "Memory Management and GC",
      summary:
        "Reference counting vs mark-and-sweep garbage collection strategies, the causes and detection of memory leaks, and how GC affects application performance.",
      steps: [
        {
          title: "Manual Memory Management",
          body: [
            "In C/C++ developers allocate and free memory manually with malloc/free (C) or new/delete (C++). Forgetting to free causes memory leaks; freeing twice causes double-free; accessing after free causes use-after-free bugs.",
            "Rust's ownership system guarantees memory safety at compile time without a GC, preventing both leaks and dangling pointers. C++ smart pointers (unique_ptr, shared_ptr) take a similar approach.",
          ],
          points: [
            "Stack: freed automatically when the function returns (size fixed at compile time)",
            "Heap: freed manually or by GC (dynamic size)",
            "Memory leak: allocated but never freed",
            "Rust: ownership guarantees memory safety at compile time",
          ],
        },
        {
          title: "Reference Counting",
          body: [
            "Reference counting tracks how many references point to each object. When the count reaches zero the memory is freed immediately. CPython (Python's C implementation) uses this as its primary GC mechanism.",
            "The fatal weakness of reference counting is circular references. If A references B and B references A, neither count reaches zero and both objects are never freed. Python handles this with a supplemental cycle collector. Swift's ARC (Automatic Reference Counting) works the same way.",
          ],
          points: [
            "Immediate release: memory is returned the moment count hits zero",
            "Deterministic: predictable deallocation timing",
            "Circular references: A→B→A cycle — count never reaches zero",
            "Swift ARC: use 'weak' references to break reference cycles",
          ],
        },
        {
          title: "Mark-and-Sweep and Generational GC",
          body: [
            "Mark-and-Sweep starts from GC roots (global variables, stack variables), marks all reachable objects, then sweeps away unmarked ones. It handles circular references naturally.",
            "Generational GC is based on the weak generational hypothesis: most objects die young. It collects newly created objects (Young Generation) frequently and long-lived objects (Old Generation) rarely. Java, V8, and .NET all use this strategy.",
          ],
          points: [
            "Mark phase: graph traversal from GC roots, mark all reachable objects",
            "Sweep phase: free unmarked objects",
            "Stop-the-World: application pauses while GC runs",
            "Young Gen: frequent Minor GC; Old Gen: infrequent Major GC",
          ],
        },
        {
          title: "GC and Memory Leak Detection",
          body: [
            "Memory leaks still occur in GC languages. GC only collects unreachable objects. Accidentally holding live references — for example, unremoved event listeners or infinitely growing caches — prevents GC from collecting them, and memory keeps growing.",
            "Detection tools: Java has VisualVM and Eclipse MAT; browsers have Chrome DevTools Memory tab; Node.js uses --inspect + HeapSnapshot. Steadily increasing memory usage over time is the primary signal of a leak.",
          ],
          points: [
            "GC leak: references kept alive unintentionally so GC cannot collect",
            "Common causes: event listeners, timers, closures, global caches",
            "WeakMap/WeakRef: weak references — allow GC to collect the target",
            "Heap snapshot comparison: trace the source of memory growth",
          ],
        },
      ],
    },
  },
];

export const PROG_LESSON_MAP = Object.fromEntries(
  PROG_LESSONS.map((l) => [l.slug, l])
);
