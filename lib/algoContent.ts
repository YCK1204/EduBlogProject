import type { Lesson } from "@/lib/lessonTypes";

export const ALGO_LESSONS: Lesson[] = [
  {
    slug: "bubble-selection-sort",
    title: "버블 정렬과 선택 정렬",
    level: "초급",
    tag: "Sort",
    estimatedTime: "20분",
    summary:
      "버블 정렬과 선택 정렬은 구현이 단순하지만 O(n²) 시간 복잡도 한계를 가진 정렬 알고리즘입니다. 두 알고리즘의 동작 원리를 비교하고, 더 효율적인 알고리즘이 왜 필요한지 파악합니다.",
    relatedSlugs: ["merge-sort", "binary-search"],
    steps: [
      {
        number: 1,
        title: "버블 정렬의 동작 원리",
        body: [
          "버블 정렬(Bubble Sort)은 인접한 두 원소를 비교해 순서가 잘못되었으면 교환하는 과정을 반복합니다. 한 번 전체를 순회하면 가장 큰 원소가 맨 뒤로 올라가는 모습이 거품(bubble)과 닮았다 해서 붙은 이름입니다.",
          "n개 원소를 정렬하려면 최대 n-1번 순회가 필요합니다. 각 순회에서 이미 정렬된 뒤쪽은 건너뛸 수 있으므로, 최선의 경우(이미 정렬된 배열) 한 번 순회만으로 완료됩니다.",
        ],
        points: [
          "비교 횟수: 최악/평균 O(n²), 최선 O(n)",
          "교환 횟수: 최악 O(n²) — 역순 정렬된 경우",
          "안정 정렬: 같은 값의 상대 순서 유지",
          "in-place: 추가 메모리 O(1)",
        ],
        code: {
          python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:   # 교환 없으면 이미 정렬됨
            break
    return arr`,
          javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // 조기 종료
  }
  return arr;
}`,
          c: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}`,
          cpp: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
          java: `void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
          csharp: `void BubbleSort(int[] arr) {
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}`,
        },
      },
      {
        number: 2,
        title: "선택 정렬의 동작 원리",
        body: [
          "선택 정렬(Selection Sort)은 매 순회에서 남은 원소 중 최솟값을 찾아 현재 위치와 교환합니다. i번째 순회가 끝나면 i번째 위치에 최솟값이 고정됩니다.",
          "선택 정렬은 비교 횟수가 항상 n(n-1)/2로 고정됩니다. 이미 정렬된 배열이어도 O(n²) 비교를 수행합니다. 반면 교환 횟수는 최대 n-1번으로, 교환 비용이 큰 환경에서는 버블 정렬보다 유리할 수 있습니다.",
        ],
        points: [
          "비교 횟수: 항상 O(n²) (최선·최악 동일)",
          "교환 횟수: 최대 O(n) — 상대적으로 적음",
          "불안정 정렬: 같은 값의 상대 순서 보장 안 됨",
          "in-place: 추가 메모리 O(1)",
        ],
        code: {
          python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
          javascript: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
          c: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        int tmp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = tmp;
    }
}`,
          java: `void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        int tmp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = tmp;
    }
}`,
        },
      },
      {
        number: 3,
        title: "두 알고리즘 비교 분석",
        body: [
          "버블 정렬과 선택 정렬은 둘 다 O(n²)이지만 특성이 다릅니다. 버블 정렬은 교환이 많지만 조기 종료(이미 정렬된 경우)가 가능합니다. 선택 정렬은 교환이 적지만 항상 전체를 순회합니다.",
          "안정성 측면에서도 차이가 있습니다. 버블 정렬은 인접한 원소만 교환하므로 안정 정렬이지만, 선택 정렬은 멀리 떨어진 원소와 교환해 같은 값의 상대 순서가 바뀔 수 있습니다.",
        ],
        points: [
          "버블: 교환 많음, 최선 O(n), 안정",
          "선택: 교환 적음, 항상 O(n²), 불안정",
          "캐시 성능: 둘 다 인접 접근 → 캐시 친화적",
          "실무에서는 두 알고리즘 모두 거의 사용 안 함",
        ],
      },
      {
        number: 4,
        title: "한계와 개선된 정렬 알고리즘",
        body: [
          "O(n²) 정렬은 데이터가 수천 개 이상이 되면 급격히 느려집니다. n=10,000이면 비교 횟수가 약 5천만 번이 됩니다. 실무에서는 병합 정렬(Merge Sort)이나 퀵 정렬(Quick Sort) 같은 O(n log n) 알고리즘을 사용합니다.",
          "그렇다면 왜 배우나요? 정렬 알고리즘의 기초 개념(비교, 교환, 안정성, in-place)을 직관적으로 이해할 수 있기 때문입니다. 또한 소규모 데이터(n < 50)에서는 구현 오버헤드가 없어 충분히 빠를 수 있습니다.",
        ],
        points: [
          "n=1,000: O(n²) ≈ 100만 연산, O(n log n) ≈ 1만 연산",
          "삽입 정렬: 거의 정렬된 데이터에서 O(n) — 실용적인 경우 있음",
          "Tim Sort: 삽입 정렬 + 병합 정렬 혼합, Python/Java의 기본 정렬",
          "정렬 하한(Comparison Sort): Ω(n log n) 증명됨",
        ],
      },
    ],
    en: {
      title: "Bubble Sort & Selection Sort",
      summary:
        "Bubble sort and selection sort are simple O(n²) algorithms. Compare how each works and see why more efficient algorithms are needed.",
      steps: [
        {
          title: "How Bubble Sort Works",
          body: [
            "Bubble sort repeatedly compares adjacent elements and swaps them when out of order. After one pass, the largest element has 'bubbled' to the end.",
            "Sorting n elements requires at most n-1 passes. In the best case (already sorted), one pass confirms this in O(n) using the early-exit optimization.",
          ],
          points: [
            "Comparisons: worst/average O(n²), best O(n)",
            "Swaps: worst O(n²) — for reverse-sorted input",
            "Stable sort: preserves relative order of equal elements",
            "In-place: O(1) extra space",
          ],
        },
        {
          title: "How Selection Sort Works",
          body: [
            "Selection sort finds the minimum in the unsorted portion and places it at the current position. After pass i, the i-th position holds its final value.",
            "Comparisons are always n(n-1)/2 regardless of input. However, swaps are at most n-1, which can be an advantage when swapping is expensive.",
          ],
          points: [
            "Comparisons: always O(n²) — same for best and worst case",
            "Swaps: at most O(n) — relatively few",
            "Unstable sort: relative order of equal elements not guaranteed",
            "In-place: O(1) extra space",
          ],
        },
        {
          title: "Comparative Analysis",
          body: [
            "Both are O(n²), but differ in behavior. Bubble sort has many swaps but can exit early on sorted input. Selection sort has few swaps but always scans the full array.",
            "Stability also differs. Bubble sort only swaps adjacent elements, so it is stable. Selection sort swaps distant elements, breaking the relative order of equal values.",
          ],
          points: [
            "Bubble: many swaps, best O(n), stable",
            "Selection: few swaps, always O(n²), unstable",
            "Cache performance: both access adjacent memory → cache-friendly",
            "Neither is used in production code",
          ],
        },
        {
          title: "Limitations and Better Alternatives",
          body: [
            "O(n²) sorts become very slow beyond a few thousand elements. At n=10,000, comparisons exceed 50 million. In practice, use O(n log n) algorithms like merge sort or quicksort.",
            "Why study them? They convey foundational concepts (comparison, swap, stability, in-place) intuitively, and are fast enough for very small inputs (n < 50).",
          ],
          points: [
            "n=1,000: O(n²) ≈ 1M ops vs O(n log n) ≈ 10K ops",
            "Insertion sort: O(n) on nearly-sorted data — sometimes practical",
            "Tim Sort: insertion + merge sort hybrid, default in Python/Java",
            "Comparison sort lower bound: Ω(n log n) proven",
          ],
        },
      ],
    },
  },
  {
    slug: "binary-search",
    title: "이진 탐색",
    level: "초급",
    tag: "Search",
    estimatedTime: "15분",
    summary:
      "이진 탐색은 정렬된 배열에서 O(log n)에 원소를 찾는 알고리즘입니다. 단순해 보이지만 경계값 처리가 까다롭고, 파라메트릭 서치까지 응용 범위가 넓습니다.",
    relatedSlugs: ["bubble-selection-sort", "two-pointer", "dynamic-programming"],
    steps: [
      {
        number: 1,
        title: "이진 탐색이란",
        body: [
          "이진 탐색(Binary Search)은 정렬된 배열에서 탐색 범위를 절반씩 줄여가는 알고리즘입니다. 중간값(mid)을 목표값과 비교해 목표가 더 크면 오른쪽 절반, 작으면 왼쪽 절반만 탐색합니다.",
          "선형 탐색이 n개를 모두 확인하는 O(n)인 반면, 이진 탐색은 매 단계마다 범위를 절반으로 좁히므로 O(log n)입니다. n=1,000,000이면 최대 20번 비교만으로 찾을 수 있습니다.",
        ],
        points: [
          "전제 조건: 배열이 정렬되어 있어야 함",
          "시간 복잡도: O(log n)",
          "공간 복잡도: 반복 구현 O(1), 재귀 구현 O(log n) 스택",
          "n=10억이어도 최대 30번 비교로 탐색 완료",
        ],
      },
      {
        number: 2,
        title: "구현 방법과 반복 불변식",
        body: [
          "이진 탐색의 핵심은 left, right, mid 세 포인터입니다. mid = (left + right) / 2로 중간 인덱스를 구하고, arr[mid]와 목표값을 비교해 범위를 좁힙니다.",
          "주의: left + right가 정수 오버플로우를 일으킬 수 있습니다. 안전한 계산은 mid = left + (right - left) / 2입니다. 반복 불변식(Loop Invariant)을 명확히 정의하면 경계값 오류를 방지할 수 있습니다.",
        ],
        points: [
          "while(left <= right): 정확히 같은 위치도 확인",
          "mid = left + (right - left) / 2: 오버플로우 방지",
          "찾으면 즉시 반환, 못 찾으면 -1 반환",
          "반복 불변식: 답이 [left, right] 범위에 있다",
        ],
        code: {
          python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1  # 없으면 -1`,
          javascript: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
          c: `int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
          cpp: `int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
          java: `int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
          csharp: `int BinarySearch(int[] arr, int target) {
    int left = 0, right = arr.Length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
        },
      },
      {
        number: 3,
        title: "경계값 처리의 핵심",
        body: [
          "이진 탐색 버그의 90%는 경계값 처리 실수에서 발생합니다. while(left < right)를 쓸지 while(left <= right)를 쓸지, right를 mid-1로 갱신할지 mid로 할지 선택에 따라 동작이 달라집니다.",
          "목표에 따라 구현이 달라집니다. '정확히 일치하는 원소 찾기'와 '첫 번째로 조건을 만족하는 위치 찾기(lower_bound)'는 다른 구현이 필요합니다.",
        ],
        points: [
          "정확 탐색: while(left <= right), 찾으면 return mid",
          "lower_bound: 조건 만족 시 right = mid (답 후보 보존)",
          "upper_bound: 조건 초과 시 left = mid + 1",
          "off-by-one: 항상 작은 예시(n=2,3)로 검증",
        ],
      },
      {
        number: 4,
        title: "파라메트릭 서치 응용",
        body: [
          "이진 탐색은 값을 찾는 것 외에도 '최적값 탐색'에 강력하게 응용됩니다. '어떤 조건을 만족하는 최솟값/최댓값 찾기'를 이진 탐색으로 O(log(범위) × 조건확인 비용)에 풀 수 있습니다.",
          "예시: '밧줄을 k개로 잘라 각각 길이 m 이상이 되게 할 때 최대 m은?' 이 문제는 m 값에 이진 탐색을 적용하고, 각 m에 대해 조건 만족 여부를 O(n)에 확인합니다.",
        ],
        points: [
          "파라메트릭 서치: 답의 범위에 이진 탐색 적용",
          "조건 함수 f(x)가 단조(monotone)하면 적용 가능",
          "대표 문제: 나무 자르기, 랜선 자르기, 징검다리 건너기",
          "정수 범위 이진 탐색: O(log N), 실수 범위: eps 기반 반복",
        ],
      },
    ],
    en: {
      title: "Binary Search",
      summary:
        "Binary search finds an element in a sorted array in O(log n). It looks simple but boundary handling is tricky, and it extends into powerful parametric search applications.",
      steps: [
        {
          title: "What is Binary Search?",
          body: [
            "Binary search repeatedly halves the search range in a sorted array. It compares the midpoint to the target and discards the irrelevant half.",
            "Linear search is O(n); binary search halves the range each step, giving O(log n). For n=1,000,000, at most 20 comparisons are needed.",
          ],
          points: [
            "Prerequisite: array must be sorted",
            "Time complexity: O(log n)",
            "Space: iterative O(1), recursive O(log n) stack",
            "Even for n=1 billion, at most 30 comparisons",
          ],
        },
        {
          title: "Implementation and Loop Invariant",
          body: [
            "The key is three pointers: left, right, mid. Compute mid = left + (right - left) / 2 and compare arr[mid] with the target to narrow the range.",
            "Caution: left + right can overflow. Use mid = left + (right - left) / 2. A clear loop invariant prevents off-by-one errors.",
          ],
          points: [
            "while(left <= right): also checks the case left == right",
            "mid = left + (right - left) / 2: prevents overflow",
            "Return index on match, -1 if not found",
            "Loop invariant: the answer lies in [left, right]",
          ],
        },
        {
          title: "Boundary Handling",
          body: [
            "90% of binary search bugs come from boundary mistakes. Whether to use while(left < right) or while(left <= right), and whether to set right = mid or right = mid-1, changes the behavior.",
            "The implementation differs by goal. 'Find exact match' and 'find the first position satisfying a condition (lower_bound)' require different logic.",
          ],
          points: [
            "Exact search: while(left <= right), return mid on match",
            "lower_bound: when condition holds, set right = mid (preserve candidate)",
            "upper_bound: when condition exceeds, set left = mid + 1",
            "off-by-one: always verify with small examples (n=2, 3)",
          ],
        },
        {
          title: "Parametric Search",
          body: [
            "Beyond finding values, binary search powerfully solves 'find the optimal value satisfying a condition' in O(log(range) × check cost).",
            "Example: 'Cut a rope into k pieces each ≥ m; maximize m.' Apply binary search on m and check feasibility in O(n) for each candidate.",
          ],
          points: [
            "Parametric search: binary search on the answer space",
            "Applicable when condition function f(x) is monotone",
            "Classic problems: cable cutting, stepping stones",
            "Integer range: O(log N); real range: epsilon-based iteration",
          ],
        },
      ],
    },
  },
  {
    slug: "recursion",
    title: "재귀와 콜 스택",
    level: "초급",
    tag: "Recursion",
    estimatedTime: "20분",
    summary:
      "재귀 함수는 자기 자신을 호출하는 함수입니다. 기저 사례(base case)와 재귀 사례(recursive case)의 설계, 콜 스택의 동작 원리, 그리고 메모이제이션으로의 최적화를 다룹니다.",
    relatedSlugs: ["dynamic-programming", "bfs-dfs", "bubble-selection-sort"],
    steps: [
      {
        number: 1,
        title: "재귀의 기본 구조",
        body: [
          "재귀(Recursion)는 함수가 자기 자신을 호출하는 프로그래밍 기법입니다. 재귀 함수는 반드시 두 가지 요소를 갖춰야 합니다: 더 이상 재귀 호출 없이 값을 반환하는 기저 사례(base case)와, 문제를 더 작은 단위로 줄이며 자신을 호출하는 재귀 사례(recursive case)입니다.",
          "기저 사례 없는 재귀는 무한 루프에 빠져 스택 오버플로우를 일으킵니다. 재귀 사례는 항상 기저 사례에 가까워지는 방향으로 진행되어야 합니다.",
        ],
        points: [
          "기저 사례(base case): 재귀를 멈추는 조건",
          "재귀 사례(recursive case): 더 작은 문제로 분해",
          "팩토리얼: n! = n × (n-1)!, base case: 0! = 1",
          "피보나치: fib(n) = fib(n-1) + fib(n-2), base case: fib(0)=0, fib(1)=1",
        ],
        code: {
          python: `# 팩토리얼
def factorial(n):
    if n == 0:   # base case
        return 1
    return n * factorial(n - 1)  # recursive case

# 피보나치 (순수 재귀 — O(2^n))
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)`,
          javascript: `// 팩토리얼
function factorial(n) {
  if (n === 0) return 1;      // base case
  return n * factorial(n - 1); // recursive case
}

// 피보나치 (순수 재귀 — O(2^n))
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}`,
          java: `// 팩토리얼
int factorial(int n) {
    if (n == 0) return 1;         // base case
    return n * factorial(n - 1);  // recursive case
}

// 피보나치 (순수 재귀)
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}`,
          c: `// 팩토리얼
int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}

// 피보나치 (순수 재귀)
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}`,
        },
      },
      {
        number: 2,
        title: "콜 스택과 스택 프레임",
        body: [
          "함수를 호출할 때마다 콜 스택(Call Stack)에 스택 프레임(Stack Frame)이 쌓입니다. 스택 프레임에는 함수의 로컬 변수, 매개변수, 반환 주소가 저장됩니다.",
          "재귀 호출이 깊어질수록 스택 프레임이 계속 쌓입니다. 스택 메모리는 제한이 있어 너무 깊이 재귀하면 Stack Overflow가 발생합니다. Python 기본 재귀 한도는 1000번입니다.",
        ],
        points: [
          "각 재귀 호출마다 새 스택 프레임 생성",
          "공간 복잡도: 재귀 깊이 × 프레임 크기",
          "Python 기본 재귀 한도: 1000 (sys.setrecursionlimit으로 변경)",
          "Java 기본 스택 크기: ~500KB (스레드당)",
        ],
      },
      {
        number: 3,
        title: "재귀 vs 반복문",
        body: [
          "대부분의 재귀는 반복문으로, 반복문은 재귀로 변환 가능합니다. 재귀는 코드가 간결하고 트리·그래프 같은 재귀적 구조를 표현하기 좋습니다. 반복문은 스택 오버플로우 위험이 없고 일반적으로 더 빠릅니다.",
          "DFS(깊이 우선 탐색)는 재귀로 구현하면 매우 직관적이지만, 반복문 + 명시적 스택으로도 구현할 수 있습니다. 트리 순회(전위, 중위, 후위)도 재귀 표현이 훨씬 자연스럽습니다.",
        ],
        points: [
          "재귀 장점: 코드 간결, 재귀적 구조 표현에 자연스러움",
          "반복 장점: 스택 오버플로우 없음, 메모리 효율",
          "꼬리 재귀(Tail Recursion): 마지막 연산이 재귀 호출인 경우",
          "TCO(Tail Call Optimization): 일부 언어에서 스택 프레임 재사용",
        ],
      },
      {
        number: 4,
        title: "메모이제이션으로 최적화",
        body: [
          "순수 재귀로 피보나치를 구현하면 fib(n)의 시간 복잡도는 O(2ⁿ)입니다. 같은 인수에 대한 결과를 캐시에 저장하는 메모이제이션(Memoization)을 적용하면 O(n)으로 줄일 수 있습니다.",
          "메모이제이션은 동적 프로그래밍(DP)의 탑다운 방식과 동일합니다. 한 번 계산한 결과를 해시맵이나 배열에 저장해 중복 계산을 피합니다. 이것이 재귀에서 DP로 발전하는 핵심 아이디어입니다.",
        ],
        points: [
          "순수 재귀 fib(50): 수천억 번 연산",
          "메모이제이션 fib(50): 50번 연산",
          "Python @lru_cache / @cache 데코레이터로 간단 적용",
          "메모이제이션 = 탑다운 DP",
        ],
        code: {
          python: `from functools import lru_cache

# @lru_cache 데코레이터로 간단 적용
@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

# 직접 memo 딕셔너리 사용
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]`,
          javascript: `// Map을 캐시로 사용
function fib(n, memo = new Map()) {
  if (memo.has(n)) return memo.get(n);
  if (n <= 1) return n;
  const result = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, result);
  return result;
}`,
          java: `import java.util.HashMap;
import java.util.Map;

Map<Integer, Long> memo = new HashMap<>();

long fib(int n) {
    if (n <= 1) return n;
    if (memo.containsKey(n)) return memo.get(n);
    long result = fib(n - 1) + fib(n - 2);
    memo.put(n, result);
    return result;
}`,
        },
      },
    ],
    en: {
      title: "Recursion & the Call Stack",
      summary:
        "A recursive function calls itself. Learn how to design base cases and recursive cases, understand call stack mechanics, and optimize with memoization.",
      steps: [
        {
          title: "Basic Structure of Recursion",
          body: [
            "Recursion is a technique where a function calls itself. Every recursive function must have a base case (returns without further calls) and a recursive case (reduces the problem and calls itself).",
            "Recursion without a base case loops forever and causes a stack overflow. The recursive case must always move closer to the base case.",
          ],
          points: [
            "Base case: the condition that stops recursion",
            "Recursive case: break into a smaller instance",
            "Factorial: n! = n × (n-1)!, base case: 0! = 1",
            "Fibonacci: fib(n) = fib(n-1) + fib(n-2), base: fib(0)=0, fib(1)=1",
          ],
        },
        {
          title: "Call Stack and Stack Frames",
          body: [
            "Each function call pushes a stack frame onto the call stack. The frame holds local variables, parameters, and the return address.",
            "Deep recursion builds up many frames. Stack memory is limited, so too-deep recursion causes a stack overflow. Python's default limit is 1000.",
          ],
          points: [
            "Each call creates a new stack frame",
            "Space complexity: recursion depth × frame size",
            "Python default recursion limit: 1000 (change with sys.setrecursionlimit)",
            "Java default stack size: ~500 KB per thread",
          ],
        },
        {
          title: "Recursion vs Iteration",
          body: [
            "Most recursion can be converted to iteration and vice versa. Recursion is concise and natural for tree/graph traversal. Iteration has no stack overflow risk.",
            "DFS is very intuitive recursively, but can also use an explicit stack. Tree traversals are naturally expressed recursively.",
          ],
          points: [
            "Recursion advantage: concise, natural for recursive structures",
            "Iteration advantage: no stack overflow, more memory-efficient",
            "Tail recursion: last operation is the recursive call",
            "TCO: some languages reuse the stack frame for tail calls",
          ],
        },
        {
          title: "Optimizing with Memoization",
          body: [
            "Naive recursive Fibonacci is O(2ⁿ). Memoization caches results by argument, reducing it to O(n).",
            "Memoization is the top-down approach to dynamic programming. Store computed results in a hash map or array to avoid redundant work.",
          ],
          points: [
            "Naive fib(50): hundreds of billions of calls",
            "Memoized fib(50): 50 unique calls",
            "Python @lru_cache / @cache decorator for easy application",
            "Memoization = top-down DP",
          ],
        },
      ],
    },
  },
  {
    slug: "merge-sort",
    title: "병합 정렬",
    level: "중급",
    tag: "Divide & Conquer",
    estimatedTime: "25분",
    summary:
      "병합 정렬은 분할 정복 전략으로 O(n log n)을 보장하는 안정 정렬 알고리즘입니다. 재귀적 분할과 병합 과정을 이해하고, 퀵 정렬과 다른 특성을 비교합니다.",
    relatedSlugs: ["bubble-selection-sort", "bfs-dfs", "recursion"],
    steps: [
      {
        number: 1,
        title: "분할 정복 전략",
        body: [
          "분할 정복(Divide and Conquer)은 문제를 더 작은 부분 문제로 분할하고, 각각을 해결한 뒤 결과를 합치는 전략입니다. 병합 정렬, 퀵 정렬, 이진 탐색, FFT 등 수많은 알고리즘이 이 전략을 사용합니다.",
          "병합 정렬의 핵심 통찰: 두 개의 정렬된 배열을 하나의 정렬된 배열로 병합하는 것은 O(n)에 가능합니다. 이 성질을 재귀적으로 적용하면 전체를 O(n log n)에 정렬할 수 있습니다.",
        ],
        points: [
          "분할(Divide): 배열을 절반으로 나눔",
          "정복(Conquer): 각 절반을 재귀적으로 정렬",
          "결합(Combine): 두 정렬된 배열을 병합",
          "기저 사례: 원소가 1개이면 이미 정렬됨",
        ],
      },
      {
        number: 2,
        title: "병합(Merge) 연산 구현",
        body: [
          "병합 연산은 정렬된 두 배열에서 각각 포인터를 유지하며, 더 작은 원소를 결과 배열에 하나씩 채워 나갑니다. 한 쪽이 모두 소진되면 나머지를 그대로 복사합니다.",
          "병합에는 O(n) 크기의 임시 배열이 필요합니다. 이 때문에 병합 정렬의 공간 복잡도는 O(n)입니다. in-place 병합 정렬도 가능하지만 구현이 매우 복잡하고 상수 인자가 커집니다.",
        ],
        points: [
          "두 포인터 i, j가 각 배열 앞에서 시작",
          "arr[i] ≤ arr[j]이면 arr[i]를 결과에 추가 (안정 정렬 보장)",
          "한 쪽 소진 시 나머지를 그대로 복사",
          "병합 비용: O(n), 전체 트리 레벨: log n → 총 O(n log n)",
        ],
        code: {
          python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:  # <= 이면 안정 정렬
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
          javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
          java: `void mergeSort(int[] arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

void merge(int[] arr, int left, int mid, int right) {
    int[] tmp = Arrays.copyOfRange(arr, left, right + 1);
    int i = 0, j = mid - left + 1, k = left;
    while (i <= mid - left && j <= right - left)
        arr[k++] = tmp[i] <= tmp[j] ? tmp[i++] : tmp[j++];
    while (i <= mid - left) arr[k++] = tmp[i++];
    while (j <= right - left) arr[k++] = tmp[j++];
}`,
        },
      },
      {
        number: 3,
        title: "시간과 공간 복잡도 분석",
        body: [
          "병합 정렬의 재귀 트리는 log n 레벨을 가지며, 각 레벨에서 수행되는 전체 병합 작업은 O(n)입니다. 따라서 총 시간 복잡도는 O(n log n)이고, 이는 최선·평균·최악 모두 동일합니다.",
          "이 일관성이 병합 정렬의 강점입니다. 퀵 정렬은 평균 O(n log n)이지만 최악 O(n²)이 될 수 있는 반면, 병합 정렬은 어떤 입력에도 O(n log n)을 보장합니다.",
        ],
        points: [
          "시간 복잡도: 최선/평균/최악 모두 O(n log n)",
          "공간 복잡도: O(n) — 임시 배열 필요",
          "퀵 정렬과 달리 최악 케이스 없음",
          "재귀 호출 스택: O(log n) 추가 공간",
        ],
      },
      {
        number: 4,
        title: "안정 정렬과 실무 활용",
        body: [
          "병합 정렬은 안정 정렬(Stable Sort)입니다. 같은 값을 가진 원소들의 상대 순서가 정렬 후에도 유지됩니다. 예를 들어 이름 기준 정렬 후 나이 기준 재정렬 시 이름 순서가 유지되길 원할 때 중요합니다.",
          "Python의 내장 sort()와 Java의 Arrays.sort(객체 배열)는 Tim Sort를 사용하는데, Tim Sort는 병합 정렬을 기반으로 삽입 정렬을 결합한 하이브리드 알고리즘입니다. 실제 데이터의 부분 정렬된 특성을 활용해 실용적인 성능을 냅니다.",
        ],
        points: [
          "안정 정렬: 동일 값의 상대 순서 보존",
          "외부 정렬(External Sort): 디스크 기반 대용량 정렬에 병합 정렬 사용",
          "Tim Sort: Python, Java의 내장 정렬 알고리즘",
          "퀵 정렬이 평균적으로 더 빠른 이유: 캐시 지역성, 낮은 상수 인자",
        ],
      },
    ],
    en: {
      title: "Merge Sort",
      summary:
        "Merge sort is a divide-and-conquer algorithm that guarantees O(n log n) and is stable. Understand the recursive split and merge process, and compare it with quicksort.",
      steps: [
        {
          title: "Divide and Conquer Strategy",
          body: [
            "Divide and conquer splits a problem into smaller sub-problems, solves each, then combines the results. Merge sort, quicksort, binary search, and FFT all use this strategy.",
            "Key insight: merging two sorted arrays into one sorted array takes O(n). Applying this recursively produces O(n log n) total.",
          ],
          points: [
            "Divide: split the array in half",
            "Conquer: recursively sort each half",
            "Combine: merge the two sorted halves",
            "Base case: an array of one element is already sorted",
          ],
        },
        {
          title: "Implementing the Merge Step",
          body: [
            "The merge step maintains two pointers over the sorted halves and repeatedly appends the smaller element to the result. When one half is exhausted, append the rest.",
            "Merge requires an O(n) temporary array, which is why merge sort's space complexity is O(n). In-place merge sort is possible but complex.",
          ],
          points: [
            "Two pointers i, j start at the front of each half",
            "arr[i] ≤ arr[j] → append arr[i] (preserves stability)",
            "When one side is exhausted, copy the remaining elements",
            "Merge cost: O(n) per level × log n levels = O(n log n) total",
          ],
        },
        {
          title: "Time and Space Complexity",
          body: [
            "The recursion tree has log n levels; each level performs O(n) total merge work. So total time is O(n log n) for best, average, and worst cases.",
            "This consistency is merge sort's strength. Quicksort averages O(n log n) but can degrade to O(n²), while merge sort guarantees O(n log n) for any input.",
          ],
          points: [
            "Time: O(n log n) — best, average, and worst",
            "Space: O(n) — temporary array needed",
            "No worst-case input unlike quicksort",
            "Recursion stack: O(log n) additional space",
          ],
        },
        {
          title: "Stable Sort and Practical Use",
          body: [
            "Merge sort is a stable sort: elements with equal keys retain their original relative order. This matters when re-sorting by a secondary key.",
            "Python's built-in sort() and Java's Arrays.sort(Object[]) use Tim Sort, a hybrid of merge sort and insertion sort that takes advantage of partially sorted data.",
          ],
          points: [
            "Stable sort: equal elements preserve their original order",
            "External sort: merge sort is used for large disk-based sorting",
            "Tim Sort: the default sort in Python and Java",
            "Quicksort is faster on average due to cache locality and lower constant factors",
          ],
        },
      ],
    },
  },
  {
    slug: "bfs-dfs",
    title: "BFS와 DFS 탐색",
    level: "중급",
    tag: "Graph Search",
    estimatedTime: "25분",
    summary:
      "BFS(너비 우선 탐색)와 DFS(깊이 우선 탐색)는 그래프와 트리를 탐색하는 두 가지 핵심 알고리즘입니다. 각각의 구현 방식과 어떤 문제에 적합한지 비교합니다.",
    relatedSlugs: ["recursion", "dynamic-programming", "dijkstra"],
    steps: [
      {
        number: 1,
        title: "그래프 탐색이란",
        body: [
          "그래프 탐색은 시작 정점에서 출발해 연결된 모든 정점을 방문하는 과정입니다. 핵심 문제는 '어떤 순서로 방문하는가'이며, 이 순서에 따라 BFS와 DFS로 나뉩니다.",
          "방문한 정점을 기록하지 않으면 사이클이 있는 그래프에서 무한 루프가 발생합니다. 따라서 visited 집합(또는 배열)을 유지해 이미 방문한 정점은 다시 방문하지 않도록 합니다.",
        ],
        points: [
          "그래프 탐색의 목적: 연결성 확인, 경로 탐색, 사이클 감지 등",
          "visited 집합: 방문 여부 O(1) 확인",
          "시간 복잡도: 인접 리스트 O(V+E), 인접 행렬 O(V²)",
          "트리는 사이클 없음 → visited 없이도 BFS/DFS 가능",
        ],
      },
      {
        number: 2,
        title: "BFS — 너비 우선 탐색",
        body: [
          "BFS(Breadth-First Search)는 큐(Queue)를 사용해 시작 정점에서 가까운 정점부터 차례로 방문합니다. 같은 거리의 정점들을 모두 방문한 후 그 다음 거리로 나아갑니다.",
          "BFS의 가장 중요한 성질은 '최단 경로 보장'입니다. 가중치 없는 그래프에서 BFS로 처음 방문한 경로가 항상 최단 경로입니다. 미로 탈출, 최소 이동 횟수 문제 등에 사용됩니다.",
        ],
        points: [
          "자료구조: Queue (선입선출)",
          "방문 순서: 거리 1 → 거리 2 → 거리 3 ...",
          "최단 경로 보장: 가중치 없는 그래프에서",
          "레벨별 탐색: 각 레이어 처리 후 다음 레이어",
        ],
        code: {
          python: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    while queue:
        node = queue.popleft()
        print(node)           # 방문 처리
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)`,
          javascript: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  while (queue.length) {
    const node = queue.shift();
    console.log(node);        // 방문 처리
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
          java: `void bfs(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();
    visited.add(start);
    queue.offer(start);
    while (!queue.isEmpty()) {
        int node = queue.poll();
        System.out.println(node);  // 방문 처리
        for (int neighbor : graph.getOrDefault(node, List.of())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.offer(neighbor);
            }
        }
    }
}`,
        },
      },
      {
        number: 3,
        title: "DFS — 깊이 우선 탐색",
        body: [
          "DFS(Depth-First Search)는 스택(또는 재귀)을 사용해 한 방향으로 최대한 깊이 들어간 뒤, 막히면 되돌아와 다른 방향을 탐색합니다.",
          "DFS는 재귀로 구현하면 코드가 매우 직관적입니다. 방문 중인 경로를 스택 프레임이 자연스럽게 추적해 줍니다. 사이클 감지, 위상 정렬, 강한 연결 요소(SCC) 등에 활용됩니다.",
        ],
        points: [
          "자료구조: Stack (또는 재귀 호출 스택)",
          "방문 순서: 한 방향으로 깊이 들어간 후 백트랙",
          "경로 추적: 현재 방문 중인 정점 집합 관리",
          "응용: 사이클 감지, 위상 정렬, SCC, 백트래킹",
        ],
        code: {
          python: `def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    print(node)              # 방문 처리
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

# 반복 구현 (명시적 스택)
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            print(node)
            stack.extend(graph[node])`,
          javascript: `// 재귀 구현
function dfs(graph, node, visited = new Set()) {
  visited.add(node);
  console.log(node);       // 방문 처리
  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}`,
          java: `void dfs(Map<Integer, List<Integer>> graph, int node, Set<Integer> visited) {
    visited.add(node);
    System.out.println(node);   // 방문 처리
    for (int neighbor : graph.getOrDefault(node, List.of())) {
        if (!visited.contains(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}`,
        },
      },
      {
        number: 4,
        title: "BFS vs DFS — 언제 무엇을 선택할까",
        body: [
          "BFS가 적합한 경우: 최단 경로, 최소 이동 횟수, 레이어별 처리가 필요한 경우. DFS가 적합한 경우: 경로 존재 여부, 완전 탐색, 백트래킹이 필요한 경우.",
          "메모리 사용도 다릅니다. BFS는 같은 거리의 모든 정점을 큐에 저장해야 해 최대 O(V) 메모리가 필요합니다. DFS는 재귀 깊이만큼의 스택 공간이 필요해 트리 높이 O(h)입니다.",
        ],
        points: [
          "최단 경로(가중치 없음): BFS",
          "경로 존재, 완전 탐색, 백트래킹: DFS",
          "BFS 메모리: O(V) (넓은 그래프에서 큼)",
          "DFS 메모리: O(h) (깊은 트리에서 Stack Overflow 주의)",
        ],
      },
    ],
    en: {
      title: "BFS & DFS Traversal",
      summary:
        "BFS (breadth-first search) and DFS (depth-first search) are the two core algorithms for traversing graphs and trees. Compare their implementations and learn which problems each is best suited for.",
      steps: [
        {
          title: "What is Graph Traversal?",
          body: [
            "Graph traversal visits all vertices reachable from a starting vertex. The key question is 'in what order?' — this difference defines BFS vs DFS.",
            "Without tracking visited vertices, cycles cause infinite loops. A visited set (or array) ensures each vertex is processed only once.",
          ],
          points: [
            "Purpose: connectivity check, path finding, cycle detection",
            "visited set: O(1) lookup for visit status",
            "Time complexity: adjacency list O(V+E), adjacency matrix O(V²)",
            "Trees have no cycles → BFS/DFS can skip the visited check",
          ],
        },
        {
          title: "BFS — Breadth-First Search",
          body: [
            "BFS uses a queue to visit vertices in order of their distance from the start. All vertices at distance d are visited before any at distance d+1.",
            "BFS's most important property is shortest path guarantee. The first time BFS reaches a vertex in an unweighted graph, it has found the shortest path.",
          ],
          points: [
            "Data structure: Queue (FIFO)",
            "Visit order: distance 1 → distance 2 → distance 3 ...",
            "Shortest path guarantee: for unweighted graphs",
            "Level-by-level processing: handle each layer before the next",
          ],
        },
        {
          title: "DFS — Depth-First Search",
          body: [
            "DFS uses a stack (or recursion) to go as deep as possible in one direction before backtracking to explore other branches.",
            "Recursive DFS is very intuitive — the call stack naturally tracks the current path. DFS is used for cycle detection, topological sort, and SCC.",
          ],
          points: [
            "Data structure: Stack (or recursion call stack)",
            "Visit order: go deep in one direction, then backtrack",
            "Path tracking: maintain the set of currently visited vertices",
            "Applications: cycle detection, topological sort, SCC, backtracking",
          ],
        },
        {
          title: "BFS vs DFS — When to Use Which",
          body: [
            "Use BFS for: shortest path, minimum moves, level-by-level processing. Use DFS for: path existence, exhaustive search, backtracking.",
            "Memory also differs. BFS queues all vertices at the same distance (up to O(V)). DFS uses O(h) stack space where h is the tree height.",
          ],
          points: [
            "Shortest path (unweighted): BFS",
            "Path existence, exhaustive search, backtracking: DFS",
            "BFS memory: O(V) — large on wide graphs",
            "DFS memory: O(h) — watch for stack overflow on deep trees",
          ],
        },
      ],
    },
  },
  {
    slug: "two-pointer",
    title: "투 포인터 기법",
    level: "중급",
    tag: "Two Pointer",
    estimatedTime: "20분",
    summary:
      "투 포인터는 배열의 두 위치를 가리키는 포인터를 이용해 O(n²) 브루트 포스를 O(n)으로 개선하는 패턴입니다. 양 끝 포인터와 슬라이딩 윈도우 두 가지 변형을 다룹니다.",
    relatedSlugs: ["binary-search", "dynamic-programming", "bubble-selection-sort"],
    steps: [
      {
        number: 1,
        title: "투 포인터 패턴이란",
        body: [
          "투 포인터(Two Pointer)는 배열 또는 연결 리스트에서 두 개의 포인터를 동시에 이동시켜 특정 조건을 만족하는 쌍이나 구간을 찾는 기법입니다. 이중 반복문 O(n²)을 O(n)으로 줄일 수 있습니다.",
          "핵심 조건: 배열이 정렬되어 있거나, 조건이 단조(monotone) 증가·감소여야 포인터를 방향성 있게 이동할 수 있습니다. 이 조건이 충족되면 두 포인터가 서로 교차하지 않고 진행합니다.",
        ],
        points: [
          "시간 복잡도: O(n) — 각 포인터가 최대 n번 이동",
          "공간 복잡도: O(1) — 추가 공간 불필요",
          "전제: 정렬된 배열 또는 단조 조건",
          "이중 반복문 O(n²)을 O(n)으로 대체 가능",
        ],
      },
      {
        number: 2,
        title: "양 끝 포인터 기법",
        body: [
          "가장 고전적인 패턴입니다. 배열 양 끝에 포인터 left, right를 두고 조건에 따라 한 쪽씩 안쪽으로 이동합니다. '정렬된 배열에서 두 수의 합이 target인 쌍 찾기'가 대표 문제입니다.",
          "arr[left] + arr[right] > target이면 right를 줄여 합을 낮추고, < target이면 left를 늘려 합을 높입니다. 포인터가 교차하면 종료합니다. 이 로직은 정렬된 배열이라는 성질에 의존합니다.",
        ],
        points: [
          "초기화: left = 0, right = n - 1",
          "합 > target: right--",
          "합 < target: left++",
          "합 = target: 정답 발견, left++ right-- 진행",
        ],
      },
      {
        number: 3,
        title: "슬라이딩 윈도우",
        body: [
          "슬라이딩 윈도우는 두 포인터가 같은 방향으로 움직이는 변형입니다. 왼쪽 경계 left와 오른쪽 경계 right로 윈도우(구간)를 유지하며, 오른쪽을 확장하고 조건 위반 시 왼쪽을 축소합니다.",
          "'합이 k 이하인 가장 긴 부분 배열', '중복 없는 가장 긴 부분 문자열' 등이 대표 문제입니다. right가 항상 앞으로만 이동하고 left가 right를 추격하므로 총 이동 횟수는 O(n)입니다.",
        ],
        points: [
          "초기화: left = 0, right = 0",
          "right 확장: 윈도우에 원소 추가",
          "조건 위반 시 left 축소",
          "대표 문제: 최장 부분 문자열, 최소 부분 합",
        ],
      },
      {
        number: 4,
        title: "대표 문제 유형 정리",
        body: [
          "투 포인터/슬라이딩 윈도우 패턴이 적용되는 문제 유형을 파악해 두면 문제를 보자마자 접근법을 떠올릴 수 있습니다.",
          "패턴 인식 훈련: 이중 반복문이 자연스럽게 떠오르는 문제에서 배열이 정렬되어 있거나 구간 합/길이를 묻는다면 투 포인터를 의심해봐야 합니다.",
        ],
        points: [
          "두 수의 합(정렬): 양 끝 포인터",
          "세 수의 합: 한 원소 고정 후 나머지 투 포인터",
          "중복 없는 최장 부분 문자열: 슬라이딩 윈도우 + 해시셋",
          "최소 크기 부분 배열(합 ≥ s): 슬라이딩 윈도우",
        ],
      },
    ],
    en: {
      title: "Two Pointer Technique",
      summary:
        "Two pointer uses two positions in an array to reduce O(n²) brute force to O(n). Covers two variants: the opposite-ends pointer and the sliding window.",
      steps: [
        {
          title: "What is the Two Pointer Pattern?",
          body: [
            "Two pointer moves two indices simultaneously over an array or linked list to find a pair or subarray satisfying a condition. It reduces nested loops from O(n²) to O(n).",
            "Key requirement: the array must be sorted, or the condition must be monotone so pointers can move directionally without crossing.",
          ],
          points: [
            "Time complexity: O(n) — each pointer moves at most n times",
            "Space complexity: O(1) — no extra space needed",
            "Prerequisite: sorted array or monotone condition",
            "Replaces O(n²) nested loops with O(n)",
          ],
        },
        {
          title: "Opposite-Ends Pointer",
          body: [
            "The classic pattern: place left at the start and right at the end. Move one pointer inward based on the condition. Classic problem: find a pair summing to a target in a sorted array.",
            "If arr[left] + arr[right] > target, decrement right; if less, increment left. Stop when they cross. This relies on the sorted property.",
          ],
          points: [
            "Initialize: left = 0, right = n - 1",
            "Sum > target: right--",
            "Sum < target: left++",
            "Sum == target: found, advance both",
          ],
        },
        {
          title: "Sliding Window",
          body: [
            "Sliding window is a variant where both pointers move in the same direction. A window [left, right] expands by moving right and shrinks by moving left when a condition is violated.",
            "Classic problems: 'longest subarray with sum ≤ k', 'longest substring without repeating characters'. Both pointers only move forward, so total moves are O(n).",
          ],
          points: [
            "Initialize: left = 0, right = 0",
            "Expand: move right to add an element to the window",
            "Shrink: move left when the condition is violated",
            "Classic problems: longest substring, minimum subarray sum",
          ],
        },
        {
          title: "Problem Type Reference",
          body: [
            "Recognizing which problems fit the two pointer/sliding window pattern lets you quickly identify the approach.",
            "Pattern recognition tip: when a nested loop feels natural but the array is sorted or involves a range sum/length, suspect two pointer.",
          ],
          points: [
            "Two-sum (sorted): opposite-ends pointer",
            "Three-sum: fix one element, two pointer for the rest",
            "Longest substring without repeats: sliding window + hash set",
            "Minimum size subarray (sum ≥ s): sliding window",
          ],
        },
      ],
    },
  },
  {
    slug: "dynamic-programming",
    title: "동적 프로그래밍 기초",
    level: "고급",
    tag: "DP",
    estimatedTime: "35분",
    summary:
      "동적 프로그래밍(DP)은 중복 부분 문제와 최적 부분 구조를 가진 문제를 효율적으로 푸는 기법입니다. 메모이제이션(탑다운)과 바텀업 방식, 그리고 대표 패턴을 학습합니다.",
    relatedSlugs: ["recursion", "bfs-dfs", "dijkstra"],
    steps: [
      {
        number: 1,
        title: "DP가 적용되는 조건",
        body: [
          "DP는 두 가지 조건이 모두 성립할 때 적용됩니다. 첫째, 최적 부분 구조(Optimal Substructure): 전체 문제의 최적해가 부분 문제의 최적해로 구성됩니다. 둘째, 중복 부분 문제(Overlapping Subproblems): 같은 부분 문제가 반복해서 나타납니다.",
          "분할 정복도 최적 부분 구조를 사용하지만 부분 문제가 중복되지 않습니다. DP는 중복 계산을 피하기 위해 계산 결과를 저장(메모이제이션)합니다. 피보나치, 최장 공통 부분 수열(LCS), 배낭 문제가 대표 예시입니다.",
        ],
        points: [
          "최적 부분 구조: 부분 문제의 최적해 → 전체 최적해",
          "중복 부분 문제: 같은 인수로 함수가 여러 번 호출",
          "그리디와 차이: DP는 모든 경우 탐색 후 최적 선택",
          "분할 정복과 차이: 부분 문제 중복 여부",
        ],
      },
      {
        number: 2,
        title: "탑다운 — 메모이제이션",
        body: [
          "탑다운(Top-Down) 방식은 재귀로 큰 문제부터 시작해 부분 문제로 내려가면서 이미 계산한 결과를 캐시에 저장합니다. 직관적이고 필요한 부분 문제만 계산하는 장점이 있습니다.",
          "구현은 간단합니다. 재귀 함수에 memo 딕셔너리/배열을 추가하고, 함수 시작 시 memo에 있으면 즉시 반환, 없으면 계산 후 저장합니다. Python의 @lru_cache 데코레이터가 이를 자동으로 처리합니다.",
        ],
        points: [
          "재귀 + 캐시(해시맵 또는 배열)",
          "장점: 직관적, 필요한 부분 문제만 계산",
          "단점: 재귀 스택 오버헤드, Stack Overflow 위험",
          "Python @lru_cache로 쉽게 적용 가능",
        ],
        code: {
          python: `from functools import lru_cache

# 계단 오르기: 1칸 또는 2칸씩 오를 수 있을 때 n번째 계단까지의 경우의 수
@lru_cache(maxsize=None)
def climb(n):
    if n <= 1:
        return 1
    return climb(n - 1) + climb(n - 2)

# 수동 메모이제이션
def climb_memo(n, memo={}):
    if n in memo: return memo[n]
    if n <= 1: return 1
    memo[n] = climb_memo(n-1, memo) + climb_memo(n-2, memo)
    return memo[n]`,
          javascript: `// 계단 오르기 (탑다운)
function climb(n, memo = new Map()) {
  if (n <= 1) return 1;
  if (memo.has(n)) return memo.get(n);
  const result = climb(n - 1, memo) + climb(n - 2, memo);
  memo.set(n, result);
  return result;
}`,
          java: `// 계단 오르기 (탑다운)
Map<Integer, Long> memo = new HashMap<>();

long climb(int n) {
    if (n <= 1) return 1;
    if (memo.containsKey(n)) return memo.get(n);
    long result = climb(n - 1) + climb(n - 2);
    memo.put(n, result);
    return result;
}`,
        },
      },
      {
        number: 3,
        title: "바텀업 — 테이블 채우기",
        body: [
          "바텀업(Bottom-Up) 방식은 가장 작은 부분 문제부터 시작해 테이블을 채워나가며 최종적으로 전체 문제의 답을 구합니다. 반복문으로 구현하므로 재귀 오버헤드가 없습니다.",
          "피보나치 바텀업: dp[0]=0, dp[1]=1로 초기화하고 dp[i] = dp[i-1] + dp[i-2]로 테이블을 채워나갑니다. 이 경우 dp[i-1]과 dp[i-2]만 필요하므로 공간을 O(n)에서 O(1)로 최적화할 수도 있습니다.",
        ],
        points: [
          "반복문으로 구현 → Stack Overflow 없음",
          "점화식(Recurrence Relation)이 핵심",
          "공간 최적화 가능: 이전 값만 유지",
          "단점: 모든 부분 문제를 계산 (탑다운은 필요한 것만)",
        ],
        code: {
          python: `# 피보나치 바텀업 — O(n) 시간, O(n) 공간
def fib_bottom_up(n):
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

# 공간 최적화 — O(1)
def fib_optimized(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a`,
          javascript: `// 피보나치 바텀업
function fibBottomUp(n) {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// 공간 최적화
function fibOptimized(n) {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}`,
          java: `// 피보나치 바텀업
long fibBottomUp(int n) {
    if (n <= 1) return n;
    long[] dp = new long[n + 1];
    dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i - 1] + dp[i - 2];
    return dp[n];
}`,
          c: `// 피보나치 바텀업 (공간 최적화)
long long fib(int n) {
    if (n <= 1) return n;
    long long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long long c = a + b;
        a = b; b = c;
    }
    return b;
}`,
        },
      },
      {
        number: 4,
        title: "대표 DP 패턴",
        body: [
          "DP 문제는 패턴을 인식하면 풀기 쉬워집니다. 1D DP(피보나치, 계단 오르기), 2D DP(LCS, 편집 거리), 배낭 문제(0/1 Knapsack), 구간 DP(행렬 연쇄 곱셈), 트리 DP 등이 주요 패턴입니다.",
          "DP 설계 4단계: (1) 부분 문제 정의 — dp[i]가 무엇을 의미하는지, (2) 점화식 세우기, (3) 초기값 설정, (4) 계산 순서 결정. 부분 문제 정의가 가장 중요하며, 이것이 결정되면 나머지는 따라옵니다.",
        ],
        points: [
          "1D DP: 계단 오르기, 도둑 문제, LIS(최장 증가 부분 수열)",
          "2D DP: LCS, 편집 거리, 최장 공통 부분 수열",
          "배낭(Knapsack): 0/1 배낭, 분할 가능 배낭",
          "DP 설계: 부분 문제 정의 → 점화식 → 초기값 → 순서",
        ],
      },
    ],
    en: {
      title: "Dynamic Programming Fundamentals",
      summary:
        "Dynamic programming efficiently solves problems with overlapping subproblems and optimal substructure. Learn memoization (top-down), bottom-up tabulation, and key patterns.",
      steps: [
        {
          title: "When DP Applies",
          body: [
            "DP applies when two conditions hold. First, optimal substructure: the optimal solution to the whole problem is composed of optimal solutions to subproblems. Second, overlapping subproblems: the same subproblem appears repeatedly.",
            "Divide and conquer uses optimal substructure but without overlapping subproblems. DP caches results (memoization) to avoid recomputation. Fibonacci, LCS, and the knapsack problem are classic examples.",
          ],
          points: [
            "Optimal substructure: subproblem optima → global optimum",
            "Overlapping subproblems: same arguments called multiple times",
            "vs greedy: DP explores all options before choosing",
            "vs divide & conquer: subproblems overlap in DP",
          ],
        },
        {
          title: "Top-Down — Memoization",
          body: [
            "Top-down starts from the full problem and recurses into subproblems, caching results. It is intuitive and only computes needed subproblems.",
            "Implementation: add a memo dict/array to the recursive function. At the start, return from cache if present; otherwise compute and store.",
          ],
          points: [
            "Recursion + cache (hash map or array)",
            "Advantage: intuitive, only solves needed subproblems",
            "Disadvantage: recursion overhead, stack overflow risk",
            "Python @lru_cache makes it trivial",
          ],
        },
        {
          title: "Bottom-Up — Table Filling",
          body: [
            "Bottom-up starts from the smallest subproblems and fills a table iteratively until the full problem is solved. No recursion overhead.",
            "Fibonacci bottom-up: initialize dp[0]=0, dp[1]=1, then dp[i] = dp[i-1] + dp[i-2]. Since only two previous values are needed, space can be optimized to O(1).",
          ],
          points: [
            "Iterative → no stack overflow",
            "Recurrence relation (transition) is the core",
            "Space optimization: keep only the previous values",
            "Disadvantage: computes all subproblems (top-down computes only needed)",
          ],
        },
        {
          title: "Key DP Patterns",
          body: [
            "Recognizing DP patterns makes problems much easier. Key patterns: 1D DP, 2D DP (LCS, edit distance), 0/1 Knapsack, interval DP, tree DP.",
            "DP design in 4 steps: (1) define the subproblem — what does dp[i] represent? (2) write the recurrence, (3) set base values, (4) determine computation order. Step 1 is the hardest.",
          ],
          points: [
            "1D DP: stair climbing, house robber, LIS",
            "2D DP: LCS, edit distance",
            "Knapsack: 0/1 knapsack, unbounded knapsack",
            "DP design: define subproblem → recurrence → base case → order",
          ],
        },
      ],
    },
  },
  {
    slug: "dijkstra",
    title: "다익스트라 알고리즘",
    level: "고급",
    tag: "Shortest Path",
    estimatedTime: "35분",
    summary:
      "다익스트라 알고리즘은 가중치 그래프에서 단일 출발점의 최단 경로를 구하는 알고리즘입니다. 그리디 전략과 우선순위 큐를 활용해 O((V+E) log V)를 달성합니다.",
    relatedSlugs: ["bfs-dfs", "dynamic-programming", "recursion"],
    steps: [
      {
        number: 1,
        title: "최단 경로 문제란",
        body: [
          "최단 경로 문제는 가중치 있는 그래프에서 두 정점 사이의 비용 합이 최소인 경로를 찾는 문제입니다. 네비게이션의 길찾기, 네트워크 라우팅, 게임의 A* 알고리즘의 기반이 됩니다.",
          "가중치 없는 그래프의 최단 경로는 BFS로 O(V+E)에 해결됩니다. 가중치가 있으면 BFS를 직접 사용할 수 없으며 다익스트라 또는 벨만-포드 알고리즘이 필요합니다.",
        ],
        points: [
          "단일 출발점 최단 경로(SSSP): 한 정점에서 모든 정점까지",
          "전체 쌍 최단 경로(APSP): 모든 쌍 → 플로이드-워셜",
          "가중치 없음: BFS O(V+E)",
          "양수 가중치: 다익스트라 O((V+E) log V)",
        ],
      },
      {
        number: 2,
        title: "다익스트라의 핵심 아이디어",
        body: [
          "다익스트라는 그리디(Greedy) 전략을 사용합니다. 출발점에서 현재까지 알려진 최단 거리 dist[] 배열을 유지하면서, 아직 처리되지 않은 정점 중 dist 값이 가장 작은 정점을 선택해 이웃을 갱신합니다.",
          "핵심 정리: 최단 거리가 확정된 정점에서 출발해 이웃을 이완(Relax)하면, 아직 확정되지 않은 정점들의 최단 거리 추정값이 개선됩니다. dist[u] + w(u,v) < dist[v]이면 dist[v]를 갱신합니다.",
        ],
        points: [
          "초기화: dist[start] = 0, 나머지 = ∞",
          "매 단계: 미확정 정점 중 dist 최솟값 선택",
          "이완(Relaxation): dist[u] + w(u,v) < dist[v]이면 갱신",
          "그리디 정당성: 음수 간선 없으면 항상 최적",
        ],
      },
      {
        number: 3,
        title: "우선순위 큐로 효율적 구현",
        body: [
          "순수 그리디 구현(매 단계 전체 탐색)은 O(V²)입니다. 우선순위 큐(최소 힙)를 사용하면 '미확정 정점 중 dist 최솟값 선택'을 O(log V)에 수행해 전체 복잡도를 O((V+E) log V)로 줄일 수 있습니다.",
          "큐에는 (dist[v], v) 쌍을 넣습니다. 이미 더 짧은 경로로 처리된 정점이 큐에 남아 있을 수 있으므로, 꺼낼 때 현재 dist[v]보다 큰 경우 무시합니다.",
        ],
        points: [
          "min-heap에 (거리, 정점) 삽입",
          "꺼낼 때: 현재 dist보다 크면 skip",
          "이완 성공 시: 새 (거리, 정점)을 큐에 push",
          "복잡도: O((V+E) log V) — 인접 리스트 사용 시",
        ],
        code: {
          python: `import heapq

def dijkstra(graph, start, V):
    dist = [float('inf')] * V
    dist[start] = 0
    heap = [(0, start)]  # (거리, 정점)

    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]:   # 이미 처리된 정점 skip
            continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(heap, (dist[v], v))
    return dist`,
          javascript: `// MinHeap 없이 간단 구현 (소규모 그래프)
function dijkstra(graph, start, V) {
  const dist = new Array(V).fill(Infinity);
  dist[start] = 0;
  const visited = new Set();

  for (let i = 0; i < V; i++) {
    // 미방문 중 최솟값 선택 O(V)
    let u = -1;
    for (let v = 0; v < V; v++)
      if (!visited.has(v) && (u === -1 || dist[v] < dist[u])) u = v;
    if (dist[u] === Infinity) break;
    visited.add(u);
    for (const [v, w] of graph[u])
      if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
  }
  return dist;
}`,
          java: `int[] dijkstra(List<int[]>[] graph, int start, int V) {
    int[] dist = new int[V];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[start] = 0;
    // (거리, 정점)
    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
    pq.offer(new int[]{0, start});

    while (!pq.isEmpty()) {
        int[] cur = pq.poll();
        int d = cur[0], u = cur[1];
        if (d > dist[u]) continue; // skip
        for (int[] edge : graph[u]) {
            int v = edge[0], w = edge[1];
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.offer(new int[]{dist[v], v});
            }
        }
    }
    return dist;
}`,
        },
      },
      {
        number: 4,
        title: "한계와 대안 알고리즘",
        body: [
          "다익스트라의 가장 큰 제약은 음수 가중치 간선을 처리하지 못한다는 점입니다. 음수 간선이 있으면 그리디 선택이 틀려집니다. 벨만-포드(Bellman-Ford) 알고리즘은 O(VE)로 느리지만 음수 간선과 음수 사이클 감지까지 처리합니다.",
          "실무에서 다익스트라는 길찾기(지도, 게임 A*), 네트워크 라우팅(OSPF), 의존성 분석 등에 광범위하게 쓰입니다. 음수 간선이 없는 대부분의 실제 문제에서 최선의 선택입니다.",
        ],
        points: [
          "음수 간선: 다익스트라 사용 불가 → 벨만-포드",
          "음수 사이클: 최단 경로 정의 불가 → 감지만 가능",
          "밀집 그래프: O(V²) 구현이 더 빠를 수 있음",
          "A*: 다익스트라 + 휴리스틱(목적지 방향 우선)",
        ],
      },
    ],
    en: {
      title: "Dijkstra's Algorithm",
      summary:
        "Dijkstra's algorithm finds the shortest path from a single source in a weighted graph. Using a greedy strategy and a priority queue, it achieves O((V+E) log V).",
      steps: [
        {
          title: "What is the Shortest Path Problem?",
          body: [
            "The shortest path problem finds the minimum-cost path between two vertices in a weighted graph. It underpins navigation, network routing, and game A*.",
            "Unweighted shortest paths can be solved with BFS in O(V+E). Weighted graphs require Dijkstra's or Bellman-Ford.",
          ],
          points: [
            "Single-source shortest path (SSSP): from one vertex to all others",
            "All-pairs shortest path (APSP): all pairs → Floyd-Warshall",
            "Unweighted: BFS O(V+E)",
            "Positive weights: Dijkstra O((V+E) log V)",
          ],
        },
        {
          title: "Core Idea of Dijkstra's",
          body: [
            "Dijkstra uses a greedy strategy. It maintains a dist[] array of the shortest known distance from the source, repeatedly picks the unprocessed vertex with the smallest dist, and relaxes its neighbors.",
            "Key theorem: once a vertex's distance is finalized, its shortest path is known. Relaxation: if dist[u] + w(u,v) < dist[v], update dist[v].",
          ],
          points: [
            "Initialize: dist[start] = 0, all others = ∞",
            "Each step: pick unprocessed vertex with minimum dist",
            "Relax: if dist[u] + w(u,v) < dist[v], update dist[v]",
            "Greedy correctness: guaranteed with no negative edges",
          ],
        },
        {
          title: "Efficient Implementation with a Priority Queue",
          body: [
            "Naive implementation (scan all vertices each step) is O(V²). Using a min-heap to select the minimum-distance vertex in O(log V) reduces the total to O((V+E) log V).",
            "Push (dist[v], v) pairs into the heap. When popping, skip entries whose stored distance exceeds the current dist[v] — they are outdated.",
          ],
          points: [
            "Push (distance, vertex) pairs into min-heap",
            "On pop: skip if stored distance > current dist[v]",
            "On successful relaxation: push new (distance, vertex)",
            "Complexity: O((V+E) log V) with adjacency list",
          ],
        },
        {
          title: "Limitations and Alternatives",
          body: [
            "Dijkstra cannot handle negative edge weights — the greedy selection breaks. Bellman-Ford is O(VE) but handles negative edges and detects negative cycles.",
            "In practice, Dijkstra powers navigation (maps, game A*) and network routing (OSPF). It is the best choice for most real-world problems with no negative edges.",
          ],
          points: [
            "Negative edges: use Bellman-Ford instead",
            "Negative cycle: shortest path is undefined — detection only",
            "Dense graphs: O(V²) implementation may be faster",
            "A*: Dijkstra + heuristic (prioritizes direction toward destination)",
          ],
        },
      ],
    },
  },
];

export const ALGO_LESSON_MAP = Object.fromEntries(
  ALGO_LESSONS.map((l) => [l.slug, l])
);
