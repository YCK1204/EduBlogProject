---
title: "연결 리스트(Linked List) 개념과 구현"
description: "단순 연결 리스트의 구조와 삽입, 삭제, 탐색 연산을 Python으로 직접 구현해봅니다."
date: "2026-05-08"
category: "자료구조"
tags: ["LinkedList", "연결리스트", "포인터"]
---

## 연결 리스트란?

연결 리스트는 각 **노드(Node)**가 데이터와 다음 노드의 **포인터(참조)**를 가지는 선형 자료구조입니다.

배열과의 주요 차이점:

| 항목 | 배열 | 연결 리스트 |
|------|------|------------|
| 접근 | O(1) | O(n) |
| 삽입/삭제 (앞) | O(n) | O(1) |
| 메모리 | 연속 | 비연속 |

## 노드 구조

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None  # 다음 노드 참조
```

## 연결 리스트 구현

```python
class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        """맨 뒤에 노드 추가 - O(n)"""
        new_node = Node(data)
        if self.head is None:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    def prepend(self, data):
        """맨 앞에 노드 추가 - O(1)"""
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def delete(self, data):
        """특정 값의 노드 삭제 - O(n)"""
        if self.head is None:
            return
        if self.head.data == data:
            self.head = self.head.next
            return
        current = self.head
        while current.next:
            if current.next.data == data:
                current.next = current.next.next
                return
            current = current.next

    def display(self):
        """전체 출력"""
        result = []
        current = self.head
        while current:
            result.append(str(current.data))
            current = current.next
        print(" -> ".join(result))
```

## 사용 예시

```python
ll = LinkedList()
ll.append(1)
ll.append(2)
ll.append(3)
ll.prepend(0)
ll.display()   # 0 -> 1 -> 2 -> 3

ll.delete(2)
ll.display()   # 0 -> 1 -> 3
```

## 언제 사용할까?

- 삽입/삭제가 빈번하고 순서가 중요할 때
- 데이터 크기가 가변적일 때
- 스택, 큐, 그래프의 인접 리스트 구현 시

배열은 랜덤 접근이 필요할 때, 연결 리스트는 삽입/삭제가 많을 때 유리합니다.
