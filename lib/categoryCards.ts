export type CardLevel = "초급" | "중급" | "고급";

export interface DummyCard {
  id: number;
  level: CardLevel;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  tag: string;
  slug?: string;
}

export const CATEGORY_CARDS: Record<string, DummyCard[]> = {
  "data-structures": [
    { id: 1, level: "초급", title: "배열과 동적 배열", titleEn: "Array and Dynamic Array", description: "배열의 기본 개념과 메모리 구조, 동적 배열(Dynamic Array)이 어떻게 크기를 조절하는지 알아봅니다.", descriptionEn: "The fundamentals of arrays, memory layout, and how dynamic arrays resize automatically.", tag: "Array", slug: "array" },
    { id: 2, level: "초급", title: "연결 리스트 (Linked List)", titleEn: "Linked List", description: "노드와 포인터로 구성된 연결 리스트의 구조와 삽입·삭제 연산의 시간 복잡도를 분석합니다.", descriptionEn: "Structure of linked lists built from nodes and pointers, and the time complexity of insertion and deletion.", tag: "LinkedList", slug: "linked-list" },
    { id: 3, level: "초급", title: "스택과 큐", titleEn: "Stack and Queue", description: "LIFO와 FIFO 구조의 차이, 실제 프로그램에서 스택과 큐가 어떻게 활용되는지 살펴봅니다.", descriptionEn: "LIFO vs FIFO structures and how stacks and queues are used in real programs.", tag: "Stack · Queue", slug: "stack-queue" },
    { id: 4, level: "중급", title: "해시 테이블", titleEn: "Hash Table", description: "해시 함수의 동작 원리, 충돌 해결 방법(체이닝, 오픈 어드레싱)과 평균 O(1) 탐색의 조건을 정리합니다.", descriptionEn: "Hash function mechanics, collision resolution (chaining, open addressing), and the conditions for average O(1) lookup.", tag: "HashTable", slug: "hash-table" },
    { id: 5, level: "중급", title: "이진 탐색 트리 (BST)", titleEn: "Binary Search Tree (BST)", description: "BST의 삽입·삭제·탐색 연산, 편향 트리 문제와 이를 해결하는 균형 잡힌 트리 개념을 소개합니다.", descriptionEn: "BST insert/delete/search operations, the skewed tree problem, and balanced tree concepts.", tag: "BST", slug: "bst" },
    { id: 6, level: "중급", title: "힙 (Heap) 자료구조", titleEn: "Heap Data Structure", description: "최소 힙·최대 힙의 구조, heapify 연산과 우선순위 큐(Priority Queue) 구현에 대해 다룹니다.", descriptionEn: "Min-heap and max-heap structure, the heapify operation, and priority queue implementation.", tag: "Heap", slug: "heap" },
    { id: 7, level: "고급", title: "AVL 트리와 자가 균형", titleEn: "AVL Tree and Self-Balancing", description: "회전 연산을 이용한 AVL 트리의 균형 유지 메커니즘과 삽입·삭제 시 회전이 발생하는 조건을 분석합니다.", descriptionEn: "AVL tree balance maintenance via rotations and the conditions that trigger them on insert and delete.", tag: "AVL Tree", slug: "avl-tree" },
    { id: 8, level: "고급", title: "그래프 표현 방법", titleEn: "Graph Representation", description: "인접 행렬과 인접 리스트의 공간·시간 복잡도 트레이드오프, 희소 그래프 vs 밀집 그래프에서의 선택 기준을 정리합니다.", descriptionEn: "Trade-offs between adjacency matrix and adjacency list for sparse vs dense graphs.", tag: "Graph", slug: "graph" },
  ],
  "algorithms": [
    { id: 1, level: "초급", title: "버블 정렬과 선택 정렬", titleEn: "Bubble Sort and Selection Sort", description: "가장 직관적인 두 정렬 알고리즘의 동작 방식과 O(n²) 시간 복잡도의 한계를 이해합니다.", descriptionEn: "How these two intuitive sorting algorithms work and the limitations of their O(n²) time complexity.", tag: "Sort", slug: "bubble-selection-sort" },
    { id: 2, level: "초급", title: "이진 탐색 (Binary Search)", titleEn: "Binary Search", description: "정렬된 배열에서 O(log n)으로 원소를 찾는 이진 탐색의 원리와 경계값 처리 방법을 정리합니다.", descriptionEn: "O(log n) element lookup in sorted arrays and handling boundary values correctly.", tag: "Search", slug: "binary-search" },
    { id: 3, level: "초급", title: "재귀와 콜 스택", titleEn: "Recursion and the Call Stack", description: "재귀 함수의 동작 원리, 기저 사례(base case)의 중요성, 스택 오버플로를 피하는 방법을 다룹니다.", descriptionEn: "How recursive functions work, why base cases matter, and how to avoid stack overflow.", tag: "Recursion", slug: "recursion" },
    { id: 4, level: "중급", title: "병합 정렬 (Merge Sort)", titleEn: "Merge Sort", description: "분할 정복 전략으로 O(n log n)을 달성하는 병합 정렬의 구현과 안정 정렬로서의 특성을 분석합니다.", descriptionEn: "Divide-and-conquer O(n log n) sorting and its characteristics as a stable sort.", tag: "Divide & Conquer", slug: "merge-sort" },
    { id: 5, level: "중급", title: "BFS와 DFS 탐색", titleEn: "BFS and DFS Traversal", description: "그래프·트리 탐색의 두 축인 너비 우선 탐색과 깊이 우선 탐색의 구현과 적용 시나리오를 비교합니다.", descriptionEn: "Comparing breadth-first and depth-first search implementations and their applicable scenarios.", tag: "Graph Search", slug: "bfs-dfs" },
    { id: 6, level: "중급", title: "투 포인터 기법", titleEn: "Two Pointer Technique", description: "배열의 두 포인터를 이용해 O(n²)을 O(n)으로 줄이는 패턴과 대표 문제 유형을 정리합니다.", descriptionEn: "Reducing O(n²) to O(n) using two pointers, and common problem patterns.", tag: "Two Pointer", slug: "two-pointer" },
    { id: 7, level: "고급", title: "동적 프로그래밍 기초", titleEn: "Dynamic Programming Fundamentals", description: "메모이제이션과 탑다운·바텀업 접근법의 차이, 최적 부분 구조와 중복 부분 문제 조건을 이해합니다.", descriptionEn: "Memoization, top-down vs bottom-up approaches, optimal substructure, and overlapping subproblems.", tag: "DP", slug: "dynamic-programming" },
    { id: 8, level: "고급", title: "다익스트라 알고리즘", titleEn: "Dijkstra's Algorithm", description: "최단 경로 문제에서 우선순위 큐를 활용한 다익스트라의 O((V+E) log V) 구현과 음수 간선 제약을 다룹니다.", descriptionEn: "Shortest path with a priority queue: O((V+E) log V) implementation and the negative-edge constraint.", tag: "Shortest Path", slug: "dijkstra" },
  ],
  "cs-basics": [
    { id: 1, level: "초급", title: "운영체제란 무엇인가", titleEn: "What is an Operating System?", description: "OS의 역할과 커널, 사용자 공간의 구분, 프로세스·스레드의 기본 개념을 처음부터 정리합니다.", descriptionEn: "OS roles, kernel vs user space, and the fundamentals of processes and threads.", tag: "OS", slug: "os-intro" },
    { id: 2, level: "초급", title: "HTTP와 HTTPS의 차이", titleEn: "HTTP vs HTTPS", description: "요청-응답 모델, 상태 코드, 헤더의 역할, TLS 핸드셰이크로 HTTPS가 어떻게 보안을 제공하는지 설명합니다.", descriptionEn: "Request-response model, status codes, headers, and how TLS handshakes provide security.", tag: "Network", slug: "http-https" },
    { id: 3, level: "초급", title: "컴파일러 vs 인터프리터", titleEn: "Compiler vs Interpreter", description: "소스 코드가 실행되기까지의 과정, 컴파일 언어와 인터프리터 언어의 차이와 각각의 장단점을 비교합니다.", descriptionEn: "The path from source code to execution and the trade-offs of compiled vs interpreted languages.", tag: "PL", slug: "compiler-interpreter" },
    { id: 4, level: "중급", title: "프로세스와 스레드", titleEn: "Processes and Threads", description: "프로세스 간 격리, 스레드 간 메모리 공유, 컨텍스트 스위칭 비용과 멀티스레딩의 동기화 문제를 다룹니다.", descriptionEn: "Process isolation, memory sharing between threads, context-switching cost, and synchronization.", tag: "OS", slug: "process-thread" },
    { id: 5, level: "중급", title: "TCP/IP 4계층 모델", titleEn: "TCP/IP 4-Layer Model", description: "애플리케이션·전송·인터넷·링크 계층의 역할과 데이터가 각 계층을 통과하며 캡슐화되는 방식을 정리합니다.", descriptionEn: "Roles of the application, transport, internet, and link layers and how encapsulation works.", tag: "Network", slug: "tcp-ip" },
    { id: 6, level: "중급", title: "관계형 데이터베이스 기초", titleEn: "Relational Database Fundamentals", description: "테이블, 기본 키, 외래 키, 정규화의 개념과 SQL의 SELECT·JOIN·인덱스가 어떻게 동작하는지 설명합니다.", descriptionEn: "Tables, primary keys, foreign keys, normalization, and how SELECT, JOIN, and indexes work.", tag: "Database", slug: "rdb-basics" },
    { id: 7, level: "고급", title: "CPU 캐시와 메모리 계층", titleEn: "CPU Cache and Memory Hierarchy", description: "L1/L2/L3 캐시의 역할, 캐시 미스 종류, 공간·시간 지역성 개념과 코드 작성 시 캐시를 고려하는 방법을 다룹니다.", descriptionEn: "L1/L2/L3 cache roles, cache miss types, spatial and temporal locality, and cache-aware coding.", tag: "Architecture", slug: "cpu-cache" },
    { id: 8, level: "고급", title: "가상 메모리와 페이징", titleEn: "Virtual Memory and Paging", description: "가상 주소 공간, 페이지 테이블, TLB, 페이지 폴트 처리 과정과 메모리 과다 커밋(overcommit)의 원리를 분석합니다.", descriptionEn: "Virtual address space, page tables, TLB, page fault handling, and memory overcommit.", tag: "OS", slug: "virtual-memory" },
  ],
  "programming": [
    { id: 1, level: "초급", title: "변수, 타입, 그리고 스코프", titleEn: "Variables, Types, and Scope", description: "프로그래밍 언어가 변수를 다루는 방식, 정적·동적 타입 시스템의 차이, 렉시컬 스코프의 동작 원리를 설명합니다.", descriptionEn: "How languages handle variables, static vs dynamic type systems, and lexical scope through closures.", tag: "기초", slug: "variables-types" },
    { id: 2, level: "초급", title: "함수와 일급 객체", titleEn: "Functions and First-Class Objects", description: "함수를 값으로 다루는 개념, 고차 함수(map·filter·reduce)의 활용과 순수 함수의 이점을 정리합니다.", descriptionEn: "Functions as values, higher-order functions (map, filter, reduce), and the benefits of pure functions.", tag: "Functional", slug: "functions-first-class" },
    { id: 3, level: "초급", title: "객체지향 프로그래밍 입문", titleEn: "OOP Introduction", description: "클래스, 인스턴스, 캡슐화, 상속, 다형성의 네 가지 원칙을 실제 코드 예시와 함께 소개합니다.", descriptionEn: "Classes, instances, encapsulation, inheritance, and polymorphism with real code examples.", tag: "OOP", slug: "oop-intro" },
    { id: 4, level: "중급", title: "비동기 처리와 이벤트 루프", titleEn: "Async Processing and the Event Loop", description: "콜백·프로미스·async/await의 진화 과정, 자바스크립트 이벤트 루프와 태스크 큐의 동작 원리를 분석합니다.", descriptionEn: "The evolution from callbacks to Promises to async/await, and how the JS event loop works.", tag: "Async", slug: "async-event-loop" },
    { id: 5, level: "중급", title: "타입 시스템과 제네릭", titleEn: "Type Systems and Generics", description: "정적 타입이 버그를 어떻게 사전에 차단하는지, 제네릭을 통한 타입 안전한 재사용 코드 작성법을 다룹니다.", descriptionEn: "How static types prevent bugs, writing type-safe reusable code with generics, and type inference.", tag: "TypeScript", slug: "type-system-generics" },
    { id: 6, level: "중급", title: "클린 코드 원칙", titleEn: "Clean Code Principles", description: "읽기 쉬운 이름 짓기, 함수 분리, 주석의 올바른 사용법 등 코드 품질을 높이는 실천적 원칙들을 정리합니다.", descriptionEn: "Meaningful naming, single-responsibility functions, and the essentials of DRY, YAGNI, and SOLID.", tag: "Clean Code", slug: "clean-code" },
    { id: 7, level: "고급", title: "디자인 패턴 — 생성 패턴", titleEn: "Design Patterns — Creational", description: "싱글톤, 팩토리, 빌더 패턴의 실제 사용 사례와 남용 시 발생하는 문제, 대안적인 접근법을 비교합니다.", descriptionEn: "Real use cases for Singleton, Factory, and Builder patterns and how to avoid overusing them.", tag: "Design Pattern", slug: "design-patterns-creational" },
    { id: 8, level: "고급", title: "메모리 관리와 GC", titleEn: "Memory Management and GC", description: "참조 카운팅과 마크-앤-스윕 방식의 가비지 컬렉션 전략, 메모리 누수의 원인과 탐지 방법을 살펴봅니다.", descriptionEn: "Reference counting vs mark-and-sweep GC, memory leak causes, and detection methods.", tag: "Memory", slug: "memory-gc" },
  ],
};
