import type { Lesson } from "@/lib/lessonTypes";

export const DS_LESSONS: Lesson[] = [
  {
    slug: "array",
    title: "배열과 동적 배열",
    level: "초급",
    tag: "Array",
    estimatedTime: "20분",
    summary:
      "배열은 가장 기본적인 자료구조입니다. 메모리에 연속적으로 저장되는 특성 덕분에 인덱스로 O(1) 접근이 가능하지만, 크기가 고정된다는 한계가 있습니다. 동적 배열은 이 한계를 어떻게 극복했는지 살펴봅니다.",
    relatedSlugs: ["linked-list", "stack-queue", "hash-table"],
    steps: [
      {
        number: 1,
        title: "배열이란 무엇인가",
        body: [
          "배열(Array)은 동일한 타입의 데이터를 메모리에 연속적으로 저장하는 자료구조입니다.",
          "연속적 저장의 핵심 장점은 임의 접근(Random Access)입니다. 첫 번째 원소의 주소와 인덱스만 알면 어느 위치든 O(1)에 접근할 수 있습니다.",
        ],
        points: [
          "인덱스 기반 접근: O(1)",
          "데이터 검색 (선형 탐색): O(n)",
          "메모리 연속 저장 → 캐시 효율 높음",
        ],
      },
      {
        number: 2,
        title: "메모리 구조 이해하기",
        body: [
          "int[] arr = new int[5]를 선언하면, 시스템은 int 크기(4 bytes) × 5 = 20 bytes의 연속된 메모리 공간을 확보합니다.",
          "arr[i]의 주소는 base_address + i × element_size 공식으로 계산됩니다. 이 단순한 산술 연산 덕분에 O(1) 접근이 가능합니다.",
        ],
        points: [
          "배열 선언 시 크기가 컴파일 타임 또는 런타임에 고정됨",
          "크기 초과 시 새 배열을 할당하고 복사해야 함",
          "중간 삽입·삭제 시 원소 이동이 필요: O(n)",
        ],
      },
      {
        number: 3,
        title: "동적 배열의 등장",
        body: [
          "정적 배열의 고정 크기 문제를 해결하기 위해 동적 배열(Dynamic Array)이 등장했습니다. Java의 ArrayList, Python의 list, C++의 vector가 대표적입니다.",
          "동적 배열은 내부적으로 정적 배열을 사용하되, 용량이 가득 차면 더 큰 배열을 새로 할당하고 기존 데이터를 복사합니다. 이 과정을 '리사이징(resizing)'이라 합니다.",
        ],
        points: [
          "보통 용량이 꽉 차면 현재 크기의 2배로 확장 (growth factor)",
          "리사이징 비용: O(n) — 하지만 드물게 발생",
          "분할 상환 분석(Amortized): 평균 삽입 비용 O(1)",
        ],
        code: {
          python: `arr = []
arr.append(1)   # push: O(1) amortized
arr.append(2)
arr.append(3)

# 현재 크기 vs 할당 용량
import sys
print(len(arr), sys.getsizeof(arr))  # 크기 / 바이트

# 중간 삽입: O(n)
arr.insert(1, 10)
print(arr)  # [1, 10, 2, 3]`,
          javascript: `const arr = [];
arr.push(1);  // O(1) amortized
arr.push(2);
arr.push(3);

// 중간 삽입: O(n) — 뒤 원소 이동 필요
arr.splice(1, 0, 10);
console.log(arr);  // [1, 10, 2, 3]`,
          java: `import java.util.ArrayList;
ArrayList<Integer> list = new ArrayList<>();
list.add(1);   // O(1) amortized
list.add(2);
list.add(3);

// 중간 삽입: O(n)
list.add(1, 10);
System.out.println(list);  // [1, 10, 2, 3]`,
          cpp: `#include <vector>
std::vector<int> v;
v.push_back(1);  // O(1) amortized
v.push_back(2);
v.push_back(3);

// 크기 vs 용량
std::cout << v.size() << " " << v.capacity();

// 중간 삽입: O(n)
v.insert(v.begin() + 1, 10);`,
          csharp: `var list = new List<int>();
list.Add(1);  // O(1) amortized
list.Add(2);
list.Add(3);

// 중간 삽입: O(n)
list.Insert(1, 10);
Console.WriteLine(string.Join(", ", list));`,
        },
        codePosition: "bottom",
      },
      {
        number: 4,
        title: "시간 복잡도 정리",
        body: [
          "동적 배열의 각 연산에 대한 시간 복잡도를 명확히 이해하는 것이 중요합니다. 같은 O(1)이라도 최악의 경우와 평균의 경우가 다를 수 있습니다.",
          "특히 append 연산은 평소에는 O(1)이지만, 리사이징이 발생하는 순간 O(n)이 됩니다. 그러나 리사이징은 n번에 한 번꼴로 발생하므로 분할 상환하면 O(1)입니다.",
        ],
        points: [
          "접근(Access): O(1)",
          "탐색(Search): O(n)",
          "맨 뒤 삽입(Append): O(1) amortized",
          "중간 삽입/삭제(Insert/Delete): O(n)",
        ],
      },
    ],
    en: {
      title: "Arrays & Dynamic Arrays",
      summary:
        "Arrays are the most fundamental data structure. Continuous memory storage enables O(1) index-based access, but the fixed size is a limitation. See how dynamic arrays overcome this constraint.",
      steps: [
        {
          title: "What is an Array?",
          body: [
            "An array is a data structure that stores elements of the same type in contiguous memory locations.",
            "The key advantage of contiguous storage is random access. Knowing the address of the first element and an index, you can access any position in O(1).",
          ],
          points: [
            "Index-based access: O(1)",
            "Linear search: O(n)",
            "Contiguous memory → excellent cache performance",
          ],
        },
        {
          title: "Understanding Memory Layout",
          body: [
            "Declaring int[] arr = new int[5] reserves 4 bytes × 5 = 20 bytes of contiguous memory.",
            "The address of arr[i] is computed as base_address + i × element_size. This simple arithmetic enables O(1) access.",
          ],
          points: [
            "Size is fixed at compile time or runtime",
            "Exceeding capacity requires allocating and copying to a new array",
            "Mid-array insertions/deletions require shifting elements: O(n)",
          ],
        },
        {
          title: "Enter the Dynamic Array",
          body: [
            "The dynamic array was introduced to overcome the fixed-size limitation. Java's ArrayList, Python's list, and C++'s vector are classic examples.",
            "A dynamic array uses a static array internally but allocates a larger array and copies data when full. This process is called resizing.",
          ],
          points: [
            "Typically doubles capacity when full (growth factor)",
            "Resizing cost: O(n) — but occurs infrequently",
            "Amortized analysis: average insertion cost is O(1)",
          ],
        },
        {
          title: "Time Complexity Summary",
          body: [
            "It's important to clearly understand the time complexity of each dynamic array operation. Even O(1) can differ between worst-case and average-case.",
            "Append is normally O(1), but becomes O(n) when resizing occurs. Since resizing happens roughly every n operations, the amortized cost remains O(1).",
          ],
          points: [
            "Access: O(1)",
            "Search: O(n)",
            "Append: O(1) amortized",
            "Insert/Delete at middle: O(n)",
          ],
        },
      ],
    },
  },
  {
    slug: "linked-list",
    title: "연결 리스트",
    level: "초급",
    tag: "LinkedList",
    estimatedTime: "25분",
    summary:
      "연결 리스트는 각 원소가 다음 원소를 가리키는 포인터를 갖는 자료구조입니다. 배열과 달리 연속된 메모리가 필요 없어 삽입·삭제가 빠르지만, 임의 접근이 불가능합니다.",
    relatedSlugs: ["array", "stack-queue", "bst"],
    steps: [
      {
        number: 1,
        title: "연결 리스트란",
        body: [
          "연결 리스트(Linked List)는 노드(Node)들이 포인터로 연결된 자료구조입니다. 각 노드는 데이터와 다음 노드를 가리키는 참조(next)로 구성됩니다.",
          "배열과의 가장 큰 차이는 메모리 배치입니다. 배열은 연속적 메모리가 필요하지만, 연결 리스트는 메모리 어디에나 노드를 배치하고 포인터로 연결할 수 있습니다.",
        ],
        points: [
          "단방향 연결 리스트: next 포인터만 존재",
          "양방향 연결 리스트: next + prev 포인터",
          "원형 연결 리스트: 마지막 노드가 첫 노드를 가리킴",
        ],
      },
      {
        number: 2,
        title: "삽입과 삭제 연산",
        body: [
          "연결 리스트의 핵심 장점은 삽입과 삭제가 O(1)이라는 점입니다. 단, 삽입/삭제할 위치의 노드에 대한 참조를 이미 갖고 있을 때의 이야기입니다.",
          "특정 위치에 삽입하려면 그 위치까지 순회(O(n))해야 하므로, 위치 탐색 시간을 포함하면 O(n)이 됩니다. 헤드(맨 앞) 삽입/삭제는 항상 O(1)입니다.",
        ],
        points: [
          "헤드 삽입: O(1)",
          "헤드 삭제: O(1)",
          "임의 위치 삽입/삭제: O(n) (탐색) + O(1) (작업)",
          "테일 삽입: tail 포인터 있으면 O(1), 없으면 O(n)",
        ],
      },
      {
        number: 3,
        title: "배열 vs 연결 리스트",
        body: [
          "두 자료구조는 상호 보완적입니다. 접근 패턴에 따라 어느 것이 더 적합한지가 결정됩니다.",
          "읽기가 잦고 크기가 고정적이면 배열, 삽입·삭제가 잦고 크기가 유동적이면 연결 리스트가 유리합니다. 실무에서는 캐시 지역성(cache locality) 때문에 배열이 더 자주 선택됩니다.",
        ],
        points: [
          "임의 접근: 배열 O(1) vs 연결 리스트 O(n)",
          "헤드 삽입: 배열 O(n) vs 연결 리스트 O(1)",
          "메모리: 배열은 연속 필요, 연결 리스트는 포인터 오버헤드",
          "캐시 성능: 배열 유리 (공간 지역성)",
        ],
      },
      {
        number: 4,
        title: "실제 활용 사례",
        body: [
          "연결 리스트는 단독으로 사용하기보다 다른 자료구조의 내부 구현에 자주 사용됩니다.",
          "해시 테이블의 체이닝(chaining) 충돌 해결, LRU 캐시 구현, 운영체제의 프로세스 관리 테이블 등이 연결 리스트를 활용하는 대표 사례입니다.",
        ],
        points: [
          "해시 테이블 체이닝",
          "LRU 캐시 (이중 연결 리스트 + 해시맵)",
          "OS 프로세스 스케줄링 큐",
          "스택·큐의 내부 구현",
        ],
      },
    ],
    en: {
      title: "Linked Lists",
      summary:
        "A linked list is a data structure where each element holds a pointer to the next. Unlike arrays, no contiguous memory is required, enabling fast insertions and deletions, but random access is not possible.",
      steps: [
        {
          title: "What is a Linked List?",
          body: [
            "A linked list is a data structure where nodes are connected by pointers. Each node contains data and a reference (next) pointing to the next node.",
            "The key difference from arrays is memory layout. Arrays require contiguous memory, but linked lists can place nodes anywhere in memory and connect them with pointers.",
          ],
          points: [
            "Singly linked list: only a next pointer",
            "Doubly linked list: next + prev pointers",
            "Circular linked list: last node points back to the first",
          ],
        },
        {
          title: "Insertion and Deletion",
          body: [
            "The core advantage of linked lists is O(1) insertion and deletion — assuming you already hold a reference to the target node.",
            "Inserting at a specific position requires traversal (O(n)), so including lookup the total is O(n). Head insertions and deletions are always O(1).",
          ],
          points: [
            "Head insertion: O(1)",
            "Head deletion: O(1)",
            "Arbitrary position insert/delete: O(n) (traversal) + O(1) (operation)",
            "Tail insertion: O(1) with a tail pointer, O(n) without",
          ],
        },
        {
          title: "Arrays vs Linked Lists",
          body: [
            "The two structures are complementary. The right choice depends on your access pattern.",
            "Arrays win for frequent reads and fixed sizes; linked lists win for frequent insertions/deletions and dynamic sizes. In practice, cache locality often makes arrays the default choice.",
          ],
          points: [
            "Random access: Array O(1) vs Linked List O(n)",
            "Head insertion: Array O(n) vs Linked List O(1)",
            "Memory: Array needs contiguous block; Linked List has pointer overhead",
            "Cache performance: Array wins (spatial locality)",
          ],
        },
        {
          title: "Real-World Use Cases",
          body: [
            "Linked lists are more commonly used as building blocks inside other data structures than standalone.",
            "Hash table chaining for collision resolution, LRU cache implementation, and OS process scheduling tables are classic examples.",
          ],
          points: [
            "Hash table chaining",
            "LRU Cache (doubly linked list + hash map)",
            "OS process scheduling queue",
            "Internal implementation of stacks and queues",
          ],
        },
      ],
    },
  },
  {
    slug: "stack-queue",
    title: "스택과 큐",
    level: "초급",
    tag: "Stack · Queue",
    estimatedTime: "20분",
    summary:
      "스택과 큐는 삽입·삭제 순서가 정해진 선형 자료구조입니다. 스택은 LIFO(후입선출), 큐는 FIFO(선입선출) 방식으로 동작하며, 다양한 알고리즘과 시스템의 기반이 됩니다.",
    relatedSlugs: ["array", "linked-list", "bst"],
    steps: [
      {
        number: 1,
        title: "스택(Stack) — LIFO",
        body: [
          "스택은 Last In, First Out 구조입니다. 가장 마지막에 넣은 데이터가 가장 먼저 나옵니다. 접시를 쌓는 것을 떠올리면 직관적입니다.",
          "push(삽입)와 pop(꺼내기) 두 연산이 핵심입니다. 둘 다 스택의 top에서만 이루어지므로 O(1)입니다.",
        ],
        points: [
          "push: top에 원소 추가 O(1)",
          "pop: top에서 원소 제거 O(1)",
          "peek: top 원소 확인 (제거 없이) O(1)",
          "활용: 함수 콜 스택, 괄호 유효성 검사, 브라우저 뒤로 가기",
        ],
      },
      {
        number: 2,
        title: "큐(Queue) — FIFO",
        body: [
          "큐는 First In, First Out 구조입니다. 먼저 넣은 데이터가 먼저 나옵니다. 줄 서기(대기열)를 떠올리면 됩니다.",
          "enqueue(뒤에 삽입)와 dequeue(앞에서 제거) 연산이 핵심입니다. 배열로 구현 시 dequeue마다 원소를 앞으로 당겨야 해서 O(n)이 될 수 있습니다. 이를 피하려면 원형 큐나 연결 리스트를 사용합니다.",
        ],
        points: [
          "enqueue: rear에 삽입 O(1)",
          "dequeue: front에서 제거 O(1) (연결 리스트 구현 시)",
          "활용: BFS 탐색, 프린터 스풀, 프로세스 스케줄링",
          "변형: 덱(Deque), 우선순위 큐(Priority Queue)",
        ],
      },
      {
        number: 3,
        title: "구현 방법 비교",
        body: [
          "스택과 큐는 배열 또는 연결 리스트로 구현할 수 있습니다. 각각 장단점이 있습니다.",
          "배열 기반은 캐시 친화적이고 구현이 단순하지만 크기 제한이 있습니다. 연결 리스트 기반은 동적 크기를 지원하지만 포인터 오버헤드와 캐시 미스가 발생합니다.",
        ],
        points: [
          "배열 기반: 간단, 캐시 효율 좋음, 크기 고정",
          "연결 리스트 기반: 동적 크기, 포인터 오버헤드",
          "Python: list (스택), collections.deque (큐)",
          "Java: Deque 인터페이스 (ArrayDeque 구현체 권장)",
        ],
      },
      {
        number: 4,
        title: "콜 스택과 재귀",
        body: [
          "프로그래밍 언어의 함수 호출 메커니즘은 스택으로 구현됩니다. 함수를 호출할 때마다 스택 프레임이 push되고, 함수가 종료되면 pop됩니다.",
          "재귀 함수가 너무 깊이 호출되면 스택이 가득 차서 Stack Overflow가 발생합니다. 재귀를 반복문으로 바꾸면 명시적 스택을 사용해 이 문제를 피할 수 있습니다.",
        ],
        points: [
          "각 함수 호출 시 스택 프레임 생성 (로컬 변수, 반환 주소 저장)",
          "재귀 깊이 제한: Python 기본값 1000",
          "꼬리 재귀 최적화(TCO): 일부 언어에서 스택 프레임 재사용",
          "DFS 구현: 재귀 ↔ 명시적 스택으로 상호 변환 가능",
        ],
      },
    ],
    en: {
      title: "Stacks & Queues",
      summary:
        "Stacks and queues are linear data structures with a defined insertion and removal order. Stacks operate LIFO (last-in, first-out) and queues FIFO (first-in, first-out), forming the backbone of many algorithms and systems.",
      steps: [
        {
          title: "Stack — LIFO",
          body: [
            "A stack is a Last In, First Out structure. The last element pushed is the first to be popped. Think of a stack of plates.",
            "The two core operations are push (insert) and pop (remove). Both act on the top of the stack, so they run in O(1).",
          ],
          points: [
            "push: add element to top O(1)",
            "pop: remove element from top O(1)",
            "peek: view top element without removing O(1)",
            "Uses: function call stack, bracket validation, browser back button",
          ],
        },
        {
          title: "Queue — FIFO",
          body: [
            "A queue is a First In, First Out structure. The first element enqueued is the first dequeued. Think of a line of people waiting.",
            "The core operations are enqueue (insert at rear) and dequeue (remove from front). A naive array-based dequeue shifts all elements: O(n). Use a circular buffer or linked list to avoid this.",
          ],
          points: [
            "enqueue: insert at rear O(1)",
            "dequeue: remove from front O(1) (linked list implementation)",
            "Uses: BFS traversal, printer spooling, process scheduling",
            "Variants: Deque, Priority Queue",
          ],
        },
        {
          title: "Implementation Comparison",
          body: [
            "Stacks and queues can be implemented with arrays or linked lists, each with trade-offs.",
            "Array-based implementations are cache-friendly and simple but have a fixed size. Linked-list-based implementations support dynamic sizes but add pointer overhead and cache misses.",
          ],
          points: [
            "Array-based: simple, good cache efficiency, fixed size",
            "Linked-list-based: dynamic size, pointer overhead",
            "Python: list (stack), collections.deque (queue)",
            "Java: Deque interface (ArrayDeque recommended)",
          ],
        },
        {
          title: "Call Stack and Recursion",
          body: [
            "Programming languages implement function calls with a stack. Each call pushes a stack frame; returning from a function pops it.",
            "If recursion goes too deep, the stack overflows. Converting recursion to iteration with an explicit stack avoids this problem.",
          ],
          points: [
            "Each call creates a stack frame (local variables, return address)",
            "Recursion depth limit: Python default is 1000",
            "Tail-call optimization (TCO): reuses stack frames in some languages",
            "DFS: recursion and explicit stack are interchangeable",
          ],
        },
      ],
    },
  },
  {
    slug: "hash-table",
    title: "해시 테이블",
    level: "중급",
    tag: "HashTable",
    estimatedTime: "30분",
    summary:
      "해시 테이블은 키-값 쌍을 저장하고 평균 O(1)에 탐색·삽입·삭제를 수행하는 자료구조입니다. 해시 함수의 설계와 충돌 해결 방법이 성능을 좌우합니다.",
    relatedSlugs: ["array", "linked-list", "bst"],
    steps: [
      {
        number: 1,
        title: "해시 테이블이란",
        body: [
          "해시 테이블(Hash Table)은 키(key)를 해시 함수에 통과시켜 배열의 인덱스로 변환하고, 그 위치에 값을 저장하는 자료구조입니다.",
          "핵심은 해시 함수입니다. 같은 키는 항상 같은 인덱스를 반환해야 하고(결정론적), 값이 배열 전체에 고루 분포되어야 합니다(균등 분포).",
        ],
        points: [
          "탐색·삽입·삭제 평균: O(1)",
          "최악(모든 키가 충돌): O(n)",
          "공간 복잡도: O(n)",
          "Python dict, Java HashMap, JavaScript Object가 대표 구현체",
        ],
      },
      {
        number: 2,
        title: "해시 충돌과 체이닝",
        body: [
          "서로 다른 키가 같은 인덱스로 해시되는 충돌(collision)은 불가피합니다. 가장 직관적인 해결책은 체이닝(Chaining)입니다.",
          "체이닝은 같은 인덱스에 해당하는 값들을 연결 리스트(또는 다른 자료구조)로 연결하는 방식입니다. Java의 HashMap이 이 방식을 사용하며, 체인이 길어지면 트리로 변환합니다(Java 8+).",
        ],
        points: [
          "각 버킷에 연결 리스트 유지",
          "평균 탐색: O(1 + α), α = 적재율(n/m)",
          "적재율이 높아지면 충돌 증가 → 리해싱 필요",
          "Java HashMap: 체인 길이 8 이상 시 레드블랙트리로 전환",
        ],
      },
      {
        number: 3,
        title: "오픈 어드레싱",
        body: [
          "오픈 어드레싱(Open Addressing)은 충돌 시 빈 슬롯을 찾아 그 자리에 저장하는 방식입니다. 모든 데이터가 배열 내에 저장되므로 포인터 오버헤드가 없습니다.",
          "슬롯 탐색 방법으로는 선형 탐사(Linear Probing), 이차 탐사(Quadratic Probing), 이중 해싱(Double Hashing)이 있습니다. Python의 dict는 오픈 어드레싱 방식을 사용합니다.",
        ],
        points: [
          "선형 탐사: 다음 빈 슬롯 순차 탐색 → 클러스터링 문제",
          "이차 탐사: i², 2i², ... 간격으로 탐색 → 2차 클러스터링",
          "이중 해싱: 두 번째 해시 함수로 간격 결정 → 가장 균등",
          "삭제 시 tombstone(삭제 표시) 필요",
        ],
      },
      {
        number: 4,
        title: "로드 팩터와 리해싱",
        body: [
          "로드 팩터(Load Factor)는 저장된 원소 수 / 버킷 수입니다. 로드 팩터가 높을수록 충돌이 많아져 성능이 저하됩니다.",
          "임계값(보통 0.75)을 초과하면 리해싱(Rehashing)이 일어납니다. 배열 크기를 2배로 늘리고 모든 원소를 새 위치에 재삽입합니다. O(n)이지만 드물게 발생하므로 분할 상환 O(1)입니다.",
        ],
        points: [
          "Java HashMap 기본 로드 팩터: 0.75",
          "리해싱 발생 시: O(n) — 모든 원소 재삽입",
          "로드 팩터 낮추면 메모리 낭비 증가, 높이면 충돌 증가",
          "분할 상환 분석으로 삽입 연산은 평균 O(1) 유지",
        ],
      },
    ],
    en: {
      title: "Hash Tables",
      summary:
        "A hash table stores key-value pairs and achieves average O(1) lookup, insertion, and deletion. The design of the hash function and the collision resolution strategy determine its performance.",
      steps: [
        {
          title: "What is a Hash Table?",
          body: [
            "A hash table passes a key through a hash function to produce an array index, then stores the value at that index.",
            "The hash function is the core. It must be deterministic (same key → same index) and distribute values uniformly across the array.",
          ],
          points: [
            "Average lookup/insert/delete: O(1)",
            "Worst case (all keys collide): O(n)",
            "Space complexity: O(n)",
            "Examples: Python dict, Java HashMap, JavaScript Object",
          ],
        },
        {
          title: "Collisions & Chaining",
          body: [
            "Collisions — different keys hashing to the same index — are inevitable. The most intuitive solution is chaining.",
            "Chaining stores colliding entries in a linked list (or another structure) at each bucket. Java's HashMap uses this and converts chains to trees when they grow long (Java 8+).",
          ],
          points: [
            "Each bucket maintains a linked list",
            "Average lookup: O(1 + α), α = load factor (n/m)",
            "High load factor → more collisions → rehashing needed",
            "Java HashMap: converts chain to red-black tree at length ≥ 8",
          ],
        },
        {
          title: "Open Addressing",
          body: [
            "Open addressing resolves collisions by finding an empty slot in the array and storing the entry there. All data stays within the array, eliminating pointer overhead.",
            "Probing strategies include linear probing, quadratic probing, and double hashing. Python's dict uses open addressing.",
          ],
          points: [
            "Linear probing: scan next slots sequentially → clustering problem",
            "Quadratic probing: probe at i², 2i², ... → secondary clustering",
            "Double hashing: use a second hash function for step size → most uniform",
            "Deletion requires a tombstone marker",
          ],
        },
        {
          title: "Load Factor & Rehashing",
          body: [
            "The load factor is the ratio of stored elements to bucket count. Higher load factors cause more collisions and degrade performance.",
            "When the load factor exceeds a threshold (typically 0.75), rehashing occurs: the array doubles in size and all entries are re-inserted. This is O(n) but happens infrequently, so the amortized cost stays O(1).",
          ],
          points: [
            "Java HashMap default load factor: 0.75",
            "Rehashing cost: O(n) — all entries re-inserted",
            "Lower load factor wastes memory; higher increases collisions",
            "Amortized analysis keeps insertion at average O(1)",
          ],
        },
      ],
    },
  },
  {
    slug: "bst",
    title: "이진 탐색 트리",
    level: "중급",
    tag: "BST",
    estimatedTime: "30분",
    summary:
      "이진 탐색 트리(BST)는 각 노드의 왼쪽 서브트리에 더 작은 값, 오른쪽에 더 큰 값이 위치하는 자료구조입니다. 탐색·삽입·삭제를 평균 O(log n)에 수행할 수 있습니다.",
    relatedSlugs: ["array", "heap", "avl-tree"],
    steps: [
      {
        number: 1,
        title: "BST의 구조와 속성",
        body: [
          "이진 탐색 트리는 모든 노드에 대해 왼쪽 자식 < 현재 노드 < 오른쪽 자식 불변식을 유지합니다.",
          "이 속성 덕분에 루트에서 시작해 값의 대소를 비교하며 내려가면 O(h) (h = 트리 높이)에 원소를 찾을 수 있습니다. 균형 잡힌 트리에서 h = log n입니다.",
        ],
        points: [
          "중위 순회(Inorder Traversal)하면 정렬된 순서로 출력됨",
          "평균 탐색·삽입·삭제: O(log n)",
          "최악(편향 트리): O(n)",
          "편향 트리는 연결 리스트와 동일한 구조가 됨",
        ],
      },
      {
        number: 2,
        title: "삽입과 탐색 구현",
        body: [
          "삽입은 탐색과 동일한 경로를 따라가다가, 삽입할 위치(null 자식)를 찾으면 새 노드를 연결하는 방식입니다.",
          "탐색은 루트에서 시작해 목표값과 현재 노드를 비교합니다. 작으면 왼쪽, 크면 오른쪽으로 이동을 반복합니다. 값을 찾거나 null에 도달하면 종료됩니다.",
        ],
        points: [
          "삽입: 새 노드는 항상 리프(Leaf)로 추가됨",
          "탐색: 루트 → 리프 방향으로 경로 단 하나",
          "중복 처리: 같은 값 허용 여부는 구현에 따라 다름",
          "재귀 또는 반복문 두 방식 모두 가능",
        ],
      },
      {
        number: 3,
        title: "삭제 연산 — 3가지 케이스",
        body: [
          "BST의 삭제는 세 가지 경우로 나뉩니다. 리프 노드 삭제는 간단하지만, 자식이 있는 노드 삭제는 트리 구조를 유지해야 합니다.",
          "두 자식이 있는 노드를 삭제할 때는 보통 오른쪽 서브트리의 최솟값(후계자, in-order successor)을 찾아 현재 노드 자리에 복사하고, 후계자를 삭제합니다.",
        ],
        points: [
          "Case 1: 자식 없음(리프) → 그냥 삭제",
          "Case 2: 자식 하나 → 자식으로 대체",
          "Case 3: 자식 둘 → 중위 후계자(또는 전임자)로 대체",
          "삭제 후에도 BST 불변식 유지됨을 증명해야 함",
        ],
      },
      {
        number: 4,
        title: "편향 트리 문제",
        body: [
          "정렬된 배열을 순서대로 BST에 삽입하면 모든 노드가 오른쪽 자식으로만 연결되는 편향 트리(Skewed Tree)가 됩니다.",
          "편향 트리의 높이는 n이므로 탐색이 O(n)으로 저하됩니다. 이를 해결하기 위해 AVL 트리, Red-Black 트리 같은 자가 균형 트리가 등장했습니다.",
        ],
        points: [
          "최선: 완전 이진 트리, h = log n",
          "최악: 편향 트리, h = n",
          "자가 균형 해결책: AVL 트리, Red-Black 트리",
          "실무: Java TreeMap, C++ std::map은 Red-Black 트리 사용",
        ],
      },
    ],
    en: {
      title: "Binary Search Trees",
      summary:
        "A Binary Search Tree (BST) keeps values smaller than each node on the left and larger values on the right. Search, insertion, and deletion run in O(log n) on average.",
      steps: [
        {
          title: "BST Structure and Properties",
          body: [
            "A BST maintains the invariant: left child < current node < right child for every node.",
            "This property lets you find an element in O(h) (h = tree height) by comparing and descending from the root. In a balanced tree, h = log n.",
          ],
          points: [
            "Inorder traversal produces elements in sorted order",
            "Average search/insert/delete: O(log n)",
            "Worst case (skewed tree): O(n)",
            "A skewed tree degenerates into a linked list",
          ],
        },
        {
          title: "Insertion and Search",
          body: [
            "Insertion follows the same path as search until it finds a null child slot, then attaches a new node there.",
            "Search starts at the root, comparing the target with the current node and moving left or right accordingly, until the value is found or null is reached.",
          ],
          points: [
            "Insertion: new node always added as a leaf",
            "Search: exactly one path from root to leaf",
            "Duplicate handling: implementation-dependent",
            "Both recursive and iterative approaches work",
          ],
        },
        {
          title: "Deletion — 3 Cases",
          body: [
            "BST deletion falls into three cases. Deleting a leaf is trivial, but deleting a node with children must preserve the tree structure.",
            "When deleting a node with two children, find the in-order successor (minimum of the right subtree), copy its value to the current node, then delete the successor.",
          ],
          points: [
            "Case 1: No children (leaf) → simply remove",
            "Case 2: One child → replace with child",
            "Case 3: Two children → replace with in-order successor (or predecessor)",
            "Must prove the BST invariant is maintained after deletion",
          ],
        },
        {
          title: "The Skewed Tree Problem",
          body: [
            "Inserting a sorted array into a BST in order creates a skewed tree where every node is a right child.",
            "A skewed tree has height n, degrading search to O(n). Self-balancing trees like AVL and Red-Black trees were invented to solve this.",
          ],
          points: [
            "Best case: complete binary tree, h = log n",
            "Worst case: skewed tree, h = n",
            "Self-balancing solutions: AVL tree, Red-Black tree",
            "In practice: Java TreeMap and C++ std::map use Red-Black trees",
          ],
        },
      ],
    },
  },
  {
    slug: "heap",
    title: "힙 자료구조",
    level: "중급",
    tag: "Heap",
    estimatedTime: "25분",
    summary:
      "힙은 부모 노드가 자식보다 항상 크거나(최대 힙) 작은(최소 힙) 완전 이진 트리입니다. 최솟값·최댓값을 O(1)에 확인하고 O(log n)에 삽입·삭제할 수 있어 우선순위 큐 구현에 사용됩니다.",
    relatedSlugs: ["bst", "avl-tree", "array"],
    steps: [
      {
        number: 1,
        title: "힙의 두 가지 속성",
        body: [
          "힙은 두 가지 속성을 동시에 만족해야 합니다. 첫째는 완전 이진 트리(Complete Binary Tree) 구조, 둘째는 힙 속성(Heap Property)입니다.",
          "최소 힙에서는 모든 부모 노드가 자식보다 작거나 같습니다. 따라서 루트가 항상 전체 최솟값입니다. 최대 힙은 반대입니다.",
        ],
        points: [
          "완전 이진 트리: 마지막 레벨을 제외하고 모두 채워진 트리",
          "최소 힙 속성: parent ≤ children (모든 노드에 대해)",
          "루트 = 최솟값(최소 힙) 또는 최댓값(최대 힙)",
          "배열로 효율적으로 구현 가능",
        ],
      },
      {
        number: 2,
        title: "배열로 힙 구현",
        body: [
          "완전 이진 트리는 배열로 낭비 없이 저장할 수 있습니다. 인덱스 i의 노드에 대해 부모는 (i-1)/2, 왼쪽 자식은 2i+1, 오른쪽 자식은 2i+2입니다.",
          "이 공식 덕분에 포인터 없이 배열 인덱스만으로 트리를 순회할 수 있어 메모리 효율이 뛰어납니다.",
        ],
        points: [
          "인덱스 0 기준: parent = (i-1)//2",
          "왼쪽 자식: 2*i + 1, 오른쪽 자식: 2*i + 2",
          "포인터 불필요 → 메모리 오버헤드 없음",
          "캐시 지역성 우수",
        ],
      },
      {
        number: 3,
        title: "Heapify — 삽입과 삭제",
        body: [
          "삽입 시 새 원소를 배열 끝에 추가하고, 부모와 비교하며 위로 이동하는 Sift Up(또는 Bubble Up)을 수행합니다.",
          "삭제(루트 제거) 시 루트를 마지막 원소와 교환하고 마지막 원소를 제거한 후, 루트에서 아래로 내려가며 자식과 비교하는 Sift Down(Heapify Down)을 수행합니다.",
        ],
        points: [
          "삽입(Sift Up): O(log n)",
          "최솟값 확인(Peek): O(1)",
          "최솟값 삭제(Extract-Min): O(log n)",
          "임의 삭제: O(log n) — 위치 탐색은 별도 필요",
        ],
      },
      {
        number: 4,
        title: "힙 정렬과 우선순위 큐",
        body: [
          "힙을 이용하면 O(n log n)의 힙 정렬(Heap Sort)을 구현할 수 있습니다. 먼저 배열 전체를 힙으로 만든(Build Heap, O(n)) 후, n번의 Extract를 수행합니다.",
          "우선순위 큐(Priority Queue)는 힙의 가장 대표적인 응용입니다. 다익스트라 알고리즘, Prim의 MST 알고리즘, CPU 스케줄링 등에 활용됩니다.",
        ],
        points: [
          "Build Heap: O(n) — 단순 반복 삽입 O(n log n)보다 효율적",
          "힙 정렬: O(n log n), in-place, 불안정 정렬",
          "Python: heapq 모듈 (최소 힙)",
          "Java: PriorityQueue 클래스",
        ],
      },
    ],
    en: {
      title: "Heap Data Structure",
      summary:
        "A heap is a complete binary tree where every parent is always greater than (max-heap) or less than (min-heap) its children. The minimum or maximum can be peeked in O(1) and inserted/deleted in O(log n), making it ideal for priority queues.",
      steps: [
        {
          title: "Two Properties of a Heap",
          body: [
            "A heap must satisfy two properties simultaneously: the complete binary tree structure and the heap property.",
            "In a min-heap, every parent node is less than or equal to its children, so the root is always the global minimum. A max-heap is the reverse.",
          ],
          points: [
            "Complete binary tree: all levels filled except possibly the last",
            "Min-heap property: parent ≤ children (for every node)",
            "Root = minimum (min-heap) or maximum (max-heap)",
            "Can be implemented efficiently with an array",
          ],
        },
        {
          title: "Implementing a Heap with an Array",
          body: [
            "A complete binary tree maps cleanly to an array. For node at index i: parent is at (i-1)/2, left child at 2i+1, right child at 2i+2.",
            "This formula lets you traverse the tree using only array indices — no pointers needed, which is memory-efficient.",
          ],
          points: [
            "0-indexed: parent = (i-1)//2",
            "Left child: 2*i + 1, Right child: 2*i + 2",
            "No pointers → zero pointer overhead",
            "Excellent cache locality",
          ],
        },
        {
          title: "Heapify — Insertion and Deletion",
          body: [
            "On insertion, append the new element to the end of the array and sift it up (bubble up) by comparing it with its parent.",
            "On deletion (extract root), swap the root with the last element, remove the last, then sift down from the root by comparing with children.",
          ],
          points: [
            "Insertion (Sift Up): O(log n)",
            "Peek min/max: O(1)",
            "Extract-Min/Max: O(log n)",
            "Arbitrary deletion: O(log n) — requires knowing the position",
          ],
        },
        {
          title: "Heap Sort and Priority Queue",
          body: [
            "A heap enables O(n log n) heap sort. First build the heap (O(n)), then perform n extractions.",
            "The priority queue is the heap's most common application. It is used in Dijkstra's algorithm, Prim's MST, and CPU scheduling.",
          ],
          points: [
            "Build Heap: O(n) — more efficient than n repeated insertions O(n log n)",
            "Heap Sort: O(n log n), in-place, unstable",
            "Python: heapq module (min-heap)",
            "Java: PriorityQueue class",
          ],
        },
      ],
    },
  },
  {
    slug: "avl-tree",
    title: "AVL 트리와 자가 균형",
    level: "고급",
    tag: "AVL Tree",
    estimatedTime: "35분",
    summary:
      "AVL 트리는 모든 노드에서 왼쪽과 오른쪽 서브트리 높이 차이가 1 이하로 유지되는 자가 균형 이진 탐색 트리입니다. 회전 연산으로 균형을 유지해 O(log n)을 보장합니다.",
    relatedSlugs: ["bst", "heap", "graph"],
    steps: [
      {
        number: 1,
        title: "균형 인수(Balance Factor)",
        body: [
          "AVL 트리는 각 노드마다 균형 인수(Balance Factor) = 왼쪽 서브트리 높이 - 오른쪽 서브트리 높이를 관리합니다.",
          "균형 인수가 -1, 0, +1이면 균형 상태입니다. ±2 이상이 되면 회전(Rotation)을 통해 균형을 복구합니다.",
        ],
        points: [
          "BF = height(left) - height(right)",
          "균형 조건: |BF| ≤ 1 (모든 노드)",
          "삽입/삭제 후 경로상의 모든 노드 BF 갱신 필요",
          "n개 노드의 AVL 트리 높이: O(log n) 보장",
        ],
      },
      {
        number: 2,
        title: "단순 회전 — LL, RR",
        body: [
          "LL 케이스: 루트의 왼쪽 자식의 왼쪽에 삽입 → 우회전(Right Rotation)으로 해결합니다.",
          "RR 케이스: 루트의 오른쪽 자식의 오른쪽에 삽입 → 좌회전(Left Rotation)으로 해결합니다. 회전은 O(1) 연산이며 BST 불변식을 유지합니다.",
        ],
        points: [
          "우회전: 왼쪽 자식이 새 루트, 기존 루트는 오른쪽 자식으로",
          "좌회전: 오른쪽 자식이 새 루트, 기존 루트는 왼쪽 자식으로",
          "회전 후 BST 속성 (왼쪽 < 루트 < 오른쪽) 유지됨 증명 필요",
          "각 회전: O(1)",
        ],
      },
      {
        number: 3,
        title: "이중 회전 — LR, RL",
        body: [
          "LR 케이스: 왼쪽 자식의 오른쪽에 삽입 → 먼저 왼쪽 자식을 좌회전, 그다음 루트를 우회전합니다.",
          "RL 케이스: 오른쪽 자식의 왼쪽에 삽입 → 먼저 오른쪽 자식을 우회전, 그다음 루트를 좌회전합니다.",
        ],
        points: [
          "LR = Left Rotate(left child) + Right Rotate(root)",
          "RL = Right Rotate(right child) + Left Rotate(root)",
          "총 4가지 케이스: LL, RR, LR, RL",
          "삽입 후 최대 1번의 회전(단순/이중) 만으로 균형 복구 가능",
        ],
      },
      {
        number: 4,
        title: "AVL vs Red-Black 트리",
        body: [
          "AVL 트리는 엄격한 균형(높이 차 ≤ 1)을 유지해 탐색이 빠르지만, 삽입/삭제 시 더 많은 회전이 필요합니다.",
          "Red-Black 트리는 느슨한 균형(높이 차 ≤ 2log n)을 허용해 삽입/삭제가 더 빠릅니다. 실무 라이브러리(Java TreeMap, C++ std::map)는 대부분 Red-Black 트리를 선택합니다.",
        ],
        points: [
          "AVL: 탐색 빠름, 삽입/삭제 회전 더 많음",
          "Red-Black: 삽입/삭제 빠름, 탐색 약간 느림",
          "두 트리 모두 최악 O(log n) 보장",
          "실무: 읽기 집중 → AVL, 쓰기 집중 → Red-Black",
        ],
      },
    ],
    en: {
      title: "AVL Trees & Self-Balancing",
      summary:
        "An AVL tree is a self-balancing BST that keeps the height difference between left and right subtrees at most 1 at every node. Rotations restore balance and guarantee O(log n) operations.",
      steps: [
        {
          title: "Balance Factor",
          body: [
            "Each node in an AVL tree tracks its balance factor (BF) = height(left subtree) − height(right subtree).",
            "BF of -1, 0, or +1 means the node is balanced. When BF reaches ±2, rotations restore balance.",
          ],
          points: [
            "BF = height(left) - height(right)",
            "Balance condition: |BF| ≤ 1 for all nodes",
            "BF of all ancestors must be updated after insertion/deletion",
            "Height of an n-node AVL tree: O(log n) guaranteed",
          ],
        },
        {
          title: "Single Rotations — LL and RR",
          body: [
            "LL case: insertion into the left subtree of the left child → resolved with a right rotation.",
            "RR case: insertion into the right subtree of the right child → resolved with a left rotation. Rotations are O(1) and preserve the BST invariant.",
          ],
          points: [
            "Right rotation: left child becomes new root, old root becomes right child",
            "Left rotation: right child becomes new root, old root becomes left child",
            "Must verify BST property (left < root < right) holds after rotation",
            "Each rotation: O(1)",
          ],
        },
        {
          title: "Double Rotations — LR and RL",
          body: [
            "LR case: insertion into the right subtree of the left child → left-rotate the left child, then right-rotate the root.",
            "RL case: insertion into the left subtree of the right child → right-rotate the right child, then left-rotate the root.",
          ],
          points: [
            "LR = Left Rotate(left child) + Right Rotate(root)",
            "RL = Right Rotate(right child) + Left Rotate(root)",
            "Four cases in total: LL, RR, LR, RL",
            "At most one rotation (single or double) needed to rebalance after insertion",
          ],
        },
        {
          title: "AVL vs Red-Black Trees",
          body: [
            "AVL trees maintain strict balance (height diff ≤ 1), making lookups faster, but require more rotations on insertion/deletion.",
            "Red-Black trees allow looser balance (height diff ≤ 2 log n), making updates faster. Production libraries (Java TreeMap, C++ std::map) typically choose Red-Black.",
          ],
          points: [
            "AVL: faster lookups, more rotations on updates",
            "Red-Black: faster updates, slightly slower lookups",
            "Both guarantee worst-case O(log n)",
            "Read-heavy workloads → AVL; write-heavy → Red-Black",
          ],
        },
      ],
    },
  },
  {
    slug: "graph",
    title: "그래프 표현 방법",
    level: "고급",
    tag: "Graph",
    estimatedTime: "30분",
    summary:
      "그래프는 정점(Vertex)과 간선(Edge)으로 이루어진 자료구조입니다. 인접 행렬과 인접 리스트 두 가지 표현 방식의 시간·공간 복잡도 트레이드오프를 이해하는 것이 핵심입니다.",
    relatedSlugs: ["bst", "avl-tree", "linked-list"],
    steps: [
      {
        number: 1,
        title: "그래프의 기본 개념",
        body: [
          "그래프 G = (V, E)는 정점 집합 V와 간선 집합 E로 정의됩니다. 방향 그래프(Directed)와 무방향 그래프(Undirected), 가중 그래프(Weighted)로 분류됩니다.",
          "트리는 사이클 없는 연결 그래프의 특수한 경우입니다. n개 정점을 가진 트리는 항상 n-1개의 간선을 갖습니다.",
        ],
        points: [
          "차수(Degree): 한 정점에 연결된 간선 수",
          "밀집 그래프(Dense): E ≈ V²",
          "희소 그래프(Sparse): E ≈ V",
          "연결 그래프: 모든 정점 쌍 사이에 경로 존재",
        ],
      },
      {
        number: 2,
        title: "인접 행렬",
        body: [
          "인접 행렬(Adjacency Matrix)은 V×V 크기의 2차원 배열로 그래프를 표현합니다. adj[u][v] = 1이면 u→v 간선 존재, 0이면 없음을 나타냅니다.",
          "간선 존재 여부를 O(1)에 확인할 수 있지만, V² 공간이 필요합니다. 밀집 그래프에 적합하며 희소 그래프에서는 메모리 낭비가 큽니다.",
        ],
        points: [
          "공간 복잡도: O(V²)",
          "간선 존재 확인: O(1)",
          "특정 정점의 모든 이웃 탐색: O(V)",
          "밀집 그래프, 플로이드-워셜 알고리즘에 적합",
        ],
      },
      {
        number: 3,
        title: "인접 리스트",
        body: [
          "인접 리스트(Adjacency List)는 각 정점마다 연결된 이웃 정점들의 리스트를 저장합니다. 배열 of 연결 리스트, 또는 배열 of 동적 배열로 구현합니다.",
          "공간이 O(V + E)로 희소 그래프에 효율적입니다. 대부분의 그래프 알고리즘(BFS, DFS, 다익스트라)은 인접 리스트를 기본으로 합니다.",
        ],
        points: [
          "공간 복잡도: O(V + E)",
          "특정 정점의 모든 이웃 탐색: O(degree(v))",
          "간선 존재 확인: O(degree(v))",
          "희소 그래프, BFS/DFS/다익스트라에 적합",
        ],
      },
      {
        number: 4,
        title: "표현 방식 선택 기준",
        body: [
          "어떤 표현을 선택할지는 그래프의 밀도와 수행할 연산에 따라 결정됩니다.",
          "소셜 네트워크(수백만 정점, 희소 연결)는 인접 리스트, 도로 교차로 최단 경로(비교적 밀집)는 인접 행렬이 유리할 수 있습니다. 실무에서는 대부분 인접 리스트를 선택합니다.",
        ],
        points: [
          "인접 행렬 선택: V 작음, 간선 존재 확인 빈번, 밀집 그래프",
          "인접 리스트 선택: E << V², 이웃 순회 빈번, 희소 그래프",
          "가중 그래프: 행렬에 가중치 저장 or 리스트에 (정점, 가중치) 쌍 저장",
          "암시적 그래프(예: 격자): 인접 행렬/리스트 없이 좌표 계산으로 이웃 접근",
        ],
      },
    ],
    en: {
      title: "Graph Representations",
      summary:
        "A graph is a data structure of vertices and edges. Understanding the time/space trade-offs between adjacency matrix and adjacency list representations is the key insight.",
      steps: [
        {
          title: "Graph Basics",
          body: [
            "A graph G = (V, E) is defined by a vertex set V and an edge set E. Graphs can be directed, undirected, or weighted.",
            "A tree is a special case of a connected acyclic graph. A tree with n vertices always has exactly n-1 edges.",
          ],
          points: [
            "Degree: number of edges connected to a vertex",
            "Dense graph: E ≈ V²",
            "Sparse graph: E ≈ V",
            "Connected graph: a path exists between every pair of vertices",
          ],
        },
        {
          title: "Adjacency Matrix",
          body: [
            "An adjacency matrix represents the graph as a V×V 2D array. adj[u][v] = 1 means there is an edge u→v; 0 means there is not.",
            "Edge existence can be checked in O(1), but the structure requires O(V²) space. It suits dense graphs but wastes memory on sparse ones.",
          ],
          points: [
            "Space complexity: O(V²)",
            "Edge existence check: O(1)",
            "Iterate all neighbors of a vertex: O(V)",
            "Best for dense graphs and Floyd-Warshall",
          ],
        },
        {
          title: "Adjacency List",
          body: [
            "An adjacency list stores, for each vertex, a list of its neighbors. Implemented as an array of linked lists or an array of dynamic arrays.",
            "Space is O(V + E), making it efficient for sparse graphs. Most graph algorithms (BFS, DFS, Dijkstra) are built around adjacency lists.",
          ],
          points: [
            "Space complexity: O(V + E)",
            "Iterate all neighbors of a vertex: O(degree(v))",
            "Edge existence check: O(degree(v))",
            "Best for sparse graphs and BFS/DFS/Dijkstra",
          ],
        },
        {
          title: "Choosing a Representation",
          body: [
            "The right representation depends on graph density and the operations you need.",
            "Social networks (millions of vertices, sparse edges) suit adjacency lists; road-intersection shortest-path problems (denser) may favor adjacency matrices. In practice, adjacency lists are the default.",
          ],
          points: [
            "Choose adjacency matrix: small V, frequent edge checks, dense graph",
            "Choose adjacency list: E << V², frequent neighbor iteration, sparse graph",
            "Weighted graph: store weights in matrix cells or (vertex, weight) pairs in lists",
            "Implicit graph (e.g., grid): compute neighbors via coordinate arithmetic",
          ],
        },
      ],
    },
  },
];

export const DS_LESSON_MAP = Object.fromEntries(
  DS_LESSONS.map((l) => [l.slug, l])
);
