import type { Lesson } from "@/lib/lessonTypes";

export const CS_LESSONS: Lesson[] = [
  {
    slug: "os-intro",
    title: "운영체제란 무엇인가",
    level: "초급",
    tag: "OS",
    estimatedTime: "20분",
    summary:
      "운영체제(OS)는 하드웨어와 응용 프로그램 사이의 중재자입니다. 커널과 사용자 공간의 구분, 프로세스·스레드의 기본 개념, 시스템 콜의 역할을 처음부터 정리합니다.",
    relatedSlugs: ["process-thread", "virtual-memory", "cpu-cache"],
    steps: [
      {
        number: 1,
        title: "운영체제의 역할",
        body: [
          "운영체제(Operating System)는 컴퓨터 하드웨어를 관리하고 응용 프로그램에게 서비스를 제공하는 시스템 소프트웨어입니다. CPU 스케줄링, 메모리 관리, 파일 시스템, 입출력 장치 제어가 주요 기능입니다.",
          "OS가 없다면 각 응용 프로그램이 하드웨어를 직접 제어해야 합니다. OS는 추상화(abstraction)를 제공해 개발자가 하드웨어 세부사항 없이 파일, 프로세스, 네트워크 등 고수준 개념만으로 프로그래밍할 수 있게 합니다.",
        ],
        points: [
          "자원 관리: CPU, 메모리, 디스크, 네트워크",
          "추상화: 파일, 프로세스, 소켓 등 고수준 인터페이스 제공",
          "보호: 프로세스 간 격리, 하드웨어 직접 접근 차단",
          "대표 OS: Linux, macOS(XNU), Windows NT",
        ],
      },
      {
        number: 2,
        title: "커널과 사용자 공간",
        body: [
          "OS는 커널(Kernel)과 사용자 공간(User Space)으로 나뉩니다. 커널은 가장 높은 권한(Ring 0)으로 하드웨어에 직접 접근하고, 응용 프로그램은 낮은 권한(Ring 3)의 사용자 공간에서 실행됩니다.",
          "이 구분은 보안과 안정성을 위해 필수입니다. 사용자 프로그램이 잘못 작성되어 있어도 커널 영역에 접근하지 못하므로 OS 전체가 무너지지 않습니다. 사용자 공간에서 커널 기능이 필요하면 시스템 콜을 통해 요청합니다.",
        ],
        points: [
          "커널 모드(Ring 0): 하드웨어 직접 제어, 모든 메모리 접근",
          "사용자 모드(Ring 3): 제한된 권한, 하드웨어 직접 접근 불가",
          "모드 전환: 시스템 콜, 인터럽트, 예외 발생 시",
          "모드 전환 비용: 상태 저장/복원 → 성능 오버헤드",
        ],
      },
      {
        number: 3,
        title: "프로세스와 스레드 기초",
        body: [
          "프로세스(Process)는 실행 중인 프로그램의 인스턴스입니다. 각 프로세스는 독립된 메모리 공간(코드, 데이터, 힙, 스택)을 갖습니다. 프로세스 간에는 기본적으로 메모리를 공유하지 않아 한 프로세스의 오류가 다른 프로세스에 영향을 주지 않습니다.",
          "스레드(Thread)는 프로세스 내에서 실행되는 경량 실행 단위입니다. 같은 프로세스의 스레드들은 코드, 데이터, 힙 메모리를 공유합니다. 컨텍스트 스위칭 비용이 프로세스보다 낮지만, 공유 메모리 때문에 동기화 문제가 발생할 수 있습니다.",
        ],
        points: [
          "프로세스: 독립 메모리, 격리됨, 생성 비용 큼",
          "스레드: 메모리 공유, 경량, 생성 비용 작음",
          "멀티프로세스 vs 멀티스레드: 격리 vs 효율 트레이드오프",
          "GIL(Python): 한 번에 하나의 스레드만 실행",
        ],
      },
      {
        number: 4,
        title: "시스템 콜",
        body: [
          "시스템 콜(System Call)은 사용자 프로그램이 OS 커널의 서비스를 요청하는 인터페이스입니다. 파일 읽기/쓰기(read, write), 프로세스 생성(fork, exec), 메모리 할당(mmap) 등이 모두 시스템 콜입니다.",
          "시스템 콜 호출 시 사용자 모드에서 커널 모드로 전환됩니다. 이 전환에는 레지스터 저장, 스택 전환, 권한 변경 등이 포함되어 일반 함수 호출보다 수십~수백 배 느립니다. 따라서 불필요한 시스템 콜을 줄이는 것이 성능 최적화의 기초입니다.",
        ],
        points: [
          "파일 I/O: open, read, write, close",
          "프로세스: fork(복제), exec(실행), wait(대기), exit(종료)",
          "메모리: mmap, brk",
          "네트워크: socket, connect, send, recv",
        ],
      },
    ],
    en: {
      title: "What is an Operating System?",
      summary:
        "An OS mediates between hardware and applications. Learn the kernel/user-space split, the basics of processes and threads, and the role of system calls.",
      steps: [
        {
          title: "The Role of an OS",
          body: [
            "An Operating System manages computer hardware and provides services to applications. Key functions are CPU scheduling, memory management, the file system, and I/O device control.",
            "Without an OS, every application would need to control hardware directly. The OS provides abstractions — files, processes, sockets — so developers can program at a high level.",
          ],
          points: [
            "Resource management: CPU, memory, disk, network",
            "Abstraction: high-level interfaces like files, processes, sockets",
            "Protection: process isolation, blocking direct hardware access",
            "Examples: Linux, macOS (XNU), Windows NT",
          ],
        },
        {
          title: "Kernel and User Space",
          body: [
            "The OS is split into the kernel and user space. The kernel runs at the highest privilege (Ring 0) and accesses hardware directly. Applications run at lower privilege (Ring 3) in user space.",
            "This separation is essential for security and stability. A buggy user program cannot reach kernel memory, so the entire OS cannot be brought down. Kernel services are requested via system calls.",
          ],
          points: [
            "Kernel mode (Ring 0): direct hardware control, full memory access",
            "User mode (Ring 3): restricted privileges, no direct hardware access",
            "Mode switch: triggered by system calls, interrupts, exceptions",
            "Mode switch cost: save/restore state → performance overhead",
          ],
        },
        {
          title: "Processes and Threads — Basics",
          body: [
            "A process is a running instance of a program with its own isolated memory (code, data, heap, stack). Processes don't share memory by default, so one crashing process doesn't affect others.",
            "A thread is a lightweight execution unit within a process. Threads share the code, data, and heap of their process. Context switching is cheaper than for processes, but shared memory introduces synchronization challenges.",
          ],
          points: [
            "Process: isolated memory, high creation cost",
            "Thread: shared memory, lightweight, low creation cost",
            "Multi-process vs multi-thread: isolation vs efficiency trade-off",
            "GIL (Python): only one thread executes at a time",
          ],
        },
        {
          title: "System Calls",
          body: [
            "A system call is the interface through which user programs request OS kernel services. File I/O (read, write), process creation (fork, exec), and memory allocation (mmap) are all system calls.",
            "Calling a system call switches from user mode to kernel mode. This switch requires saving registers, switching stacks, and changing privileges — tens to hundreds of times slower than a regular function call.",
          ],
          points: [
            "File I/O: open, read, write, close",
            "Process: fork (clone), exec (execute), wait, exit",
            "Memory: mmap, brk",
            "Network: socket, connect, send, recv",
          ],
        },
      ],
    },
  },
  {
    slug: "http-https",
    title: "HTTP와 HTTPS의 차이",
    level: "초급",
    tag: "Network",
    estimatedTime: "20분",
    summary:
      "HTTP는 웹의 기반이 되는 요청-응답 프로토콜입니다. 상태 코드, 헤더, 메서드의 역할과 TLS 핸드셰이크를 통해 HTTPS가 어떻게 보안 통신을 제공하는지 설명합니다.",
    relatedSlugs: ["tcp-ip", "compiler-interpreter", "os-intro"],
    steps: [
      {
        number: 1,
        title: "HTTP 요청-응답 모델",
        body: [
          "HTTP(HyperText Transfer Protocol)는 클라이언트-서버 모델의 비연결성(stateless) 프로토콜입니다. 클라이언트가 요청(Request)을 보내면 서버가 응답(Response)을 반환하는 단순한 구조입니다.",
          "HTTP 메서드는 의도를 나타냅니다. GET(조회), POST(생성), PUT/PATCH(수정), DELETE(삭제)가 REST API의 기본입니다. URL + 메서드 조합으로 어떤 자원에 어떤 작업을 할지 표현합니다.",
        ],
        points: [
          "Stateless: 각 요청은 독립적 — 이전 상태 저장 안 함",
          "GET: 데이터 조회 (캐싱 가능, body 없음)",
          "POST: 데이터 생성 (body에 데이터 포함)",
          "멱등성: GET/PUT/DELETE는 같은 요청 반복해도 결과 동일",
        ],
      },
      {
        number: 2,
        title: "상태 코드와 헤더",
        body: [
          "HTTP 상태 코드는 응답의 결과를 숫자로 표현합니다. 2xx(성공), 3xx(리다이렉션), 4xx(클라이언트 오류), 5xx(서버 오류) 범주로 나뉩니다.",
          "HTTP 헤더는 요청/응답의 메타데이터를 전달합니다. Content-Type(데이터 형식), Authorization(인증 토큰), Cache-Control(캐시 정책), Accept-Encoding(압축 방식) 등이 대표적입니다.",
        ],
        points: [
          "200 OK, 201 Created, 204 No Content",
          "301 Moved Permanently, 302 Found (임시 리다이렉트)",
          "400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found",
          "500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable",
        ],
      },
      {
        number: 3,
        title: "HTTPS와 TLS 핸드셰이크",
        body: [
          "HTTPS는 HTTP에 TLS(Transport Layer Security) 암호화를 추가한 것입니다. 세 가지를 보장합니다: 기밀성(도청 방지), 무결성(중간 변조 방지), 인증(진짜 서버인지 확인).",
          "TLS 핸드셰이크는 연결 시 한 번 수행됩니다. 클라이언트와 서버가 암호화 방식을 협상하고, 서버의 인증서를 검증하고, 세션 키를 안전하게 교환합니다. 이후 통신은 대칭 키로 빠르게 암호화됩니다.",
        ],
        points: [
          "TLS 1.3: 핸드셰이크 1-RTT(기존 2-RTT) — 더 빠름",
          "인증서: CA(Certificate Authority)가 서버 공개키 서명",
          "대칭 키 교환: ECDH(키 교환) → 세션 키 생성",
          "HSTS: 브라우저에 HTTPS만 허용 지시",
        ],
      },
      {
        number: 4,
        title: "HTTP 버전 비교",
        body: [
          "HTTP/1.1은 연결당 하나의 요청을 처리해 여러 리소스 로딩 시 병렬 연결을 여러 개 열어야 했습니다. HTTP/2는 하나의 연결에서 멀티플렉싱으로 여러 스트림을 동시에 처리해 성능을 크게 개선했습니다.",
          "HTTP/3는 TCP 대신 QUIC(UDP 기반) 프로토콜을 사용합니다. TCP의 head-of-line blocking 문제를 해결하고 연결 수립 속도를 높입니다. 현재 주요 웹사이트와 브라우저가 HTTP/3를 지원합니다.",
        ],
        points: [
          "HTTP/1.1: 연결 재사용(Keep-Alive), HOL blocking 문제",
          "HTTP/2: 멀티플렉싱, 헤더 압축(HPACK), 서버 푸시",
          "HTTP/3: QUIC(UDP 기반), 더 빠른 핸드셰이크",
          "실무: 서버에서 HTTP/2 활성화가 성능 개선의 첫 단계",
        ],
      },
    ],
    en: {
      title: "HTTP vs HTTPS",
      summary:
        "HTTP is the request-response protocol that powers the web. Learn about status codes, headers, methods, and how TLS handshakes enable secure HTTPS communication.",
      steps: [
        {
          title: "HTTP Request-Response Model",
          body: [
            "HTTP (HyperText Transfer Protocol) is a stateless client-server protocol. The client sends a request; the server returns a response.",
            "HTTP methods express intent. GET (read), POST (create), PUT/PATCH (update), DELETE (remove) form the basis of REST APIs. The URL + method combination describes what resource to act on.",
          ],
          points: [
            "Stateless: each request is independent — no previous state stored",
            "GET: retrieve data (cacheable, no body)",
            "POST: create data (body contains payload)",
            "Idempotent: GET/PUT/DELETE return the same result when repeated",
          ],
        },
        {
          title: "Status Codes and Headers",
          body: [
            "HTTP status codes express the result of a request numerically. Ranges: 2xx (success), 3xx (redirection), 4xx (client error), 5xx (server error).",
            "HTTP headers carry metadata for requests and responses: Content-Type (data format), Authorization (auth token), Cache-Control (caching policy), Accept-Encoding (compression).",
          ],
          points: [
            "200 OK, 201 Created, 204 No Content",
            "301 Moved Permanently, 302 Found (temporary redirect)",
            "400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found",
            "500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable",
          ],
        },
        {
          title: "HTTPS and TLS Handshake",
          body: [
            "HTTPS adds TLS (Transport Layer Security) encryption to HTTP. It provides three guarantees: confidentiality (no eavesdropping), integrity (no tampering), and authentication (verifying the server).",
            "The TLS handshake runs once on connection. The client and server negotiate a cipher suite, verify the server certificate, and securely exchange a session key. Subsequent communication uses fast symmetric encryption.",
          ],
          points: [
            "TLS 1.3: 1-RTT handshake (vs 2-RTT before) — faster",
            "Certificate: CA (Certificate Authority) signs server's public key",
            "Key exchange: ECDH → session key generation",
            "HSTS: instructs browsers to only use HTTPS",
          ],
        },
        {
          title: "HTTP Version Comparison",
          body: [
            "HTTP/1.1 processes one request per connection, requiring multiple parallel connections for multiple resources. HTTP/2 uses multiplexing to handle many streams over one connection.",
            "HTTP/3 replaces TCP with QUIC (UDP-based). It eliminates TCP's head-of-line blocking and speeds up connection setup. Major sites and browsers now support HTTP/3.",
          ],
          points: [
            "HTTP/1.1: connection reuse (Keep-Alive), HOL blocking",
            "HTTP/2: multiplexing, header compression (HPACK), server push",
            "HTTP/3: QUIC (UDP-based), faster handshake",
            "Enabling HTTP/2 on your server is the first performance step",
          ],
        },
      ],
    },
  },
  {
    slug: "compiler-interpreter",
    title: "컴파일러 vs 인터프리터",
    level: "초급",
    tag: "PL",
    estimatedTime: "20분",
    summary:
      "소스 코드가 실행되기까지의 과정을 이해하고, 컴파일 언어와 인터프리터 언어의 차이와 각각의 장단점을 비교합니다. JIT 컴파일이 두 방식을 어떻게 결합하는지도 살펴봅니다.",
    relatedSlugs: ["os-intro", "http-https", "process-thread"],
    steps: [
      {
        number: 1,
        title: "소스 코드에서 실행까지",
        body: [
          "프로그래머가 작성한 소스 코드는 CPU가 직접 이해할 수 없습니다. CPU는 기계어(0과 1)만 이해하므로, 소스 코드를 기계어로 변환하거나 해석하는 과정이 필요합니다.",
          "이 변환 방식에 따라 컴파일(Compile)과 인터프리트(Interpret)로 나뉩니다. 컴파일은 실행 전 전체를 변환하고, 인터프리트는 실행 중 한 줄씩 해석합니다.",
        ],
        points: [
          "어휘 분석(Lexing) → 구문 분석(Parsing) → 의미 분석 → 코드 생성",
          "어셈블리: 기계어보다 읽기 쉬운 저수준 언어",
          "링킹(Linking): 여러 오브젝트 파일 결합 → 실행 파일",
          "런타임: 프로그램 실행 환경 (메모리 할당, OS 서비스)",
        ],
      },
      {
        number: 2,
        title: "컴파일러",
        body: [
          "컴파일러(Compiler)는 소스 코드 전체를 분석해 한 번에 기계어(또는 중간 코드)로 변환합니다. C, C++, Rust, Go가 대표적입니다. 컴파일 단계에서 타입 오류 등 많은 버그를 잡아낼 수 있습니다.",
          "실행 시에는 이미 기계어로 변환된 파일을 바로 실행하므로 매우 빠릅니다. 단, 플랫폼(CPU 아키텍처, OS)에 종속된 실행 파일이 생성되므로 다른 환경에서 재컴파일이 필요합니다.",
        ],
        points: [
          "실행 속도: 빠름 (기계어 직접 실행)",
          "빌드 시간: 느림 (전체 분석 필요)",
          "오류 감지: 컴파일 시 타입 오류 등 사전 검출",
          "플랫폼 의존: 각 OS/CPU용 빌드 필요",
        ],
      },
      {
        number: 3,
        title: "인터프리터와 JIT",
        body: [
          "인터프리터(Interpreter)는 소스 코드를 실행 시간에 한 줄씩 읽고 해석합니다. Python, Ruby, JavaScript(초기)가 이 방식입니다. 빌드 없이 바로 실행할 수 있고 플랫폼 독립적이지만, 매번 해석하므로 실행 속도가 느립니다.",
          "JIT(Just-In-Time) 컴파일은 두 방식의 장점을 결합합니다. 처음에는 인터프리트하다가 자주 실행되는 코드(Hot Path)를 감지하면 런타임에 그 부분만 기계어로 컴파일합니다. Java HotSpot VM, V8(JavaScript), PyPy가 JIT를 사용합니다.",
        ],
        points: [
          "인터프리터: 빠른 시작, 느린 실행, 플랫폼 독립",
          "JIT: 실행 중 컴파일 → 컴파일 언어에 근접한 속도",
          "AOT(Ahead-of-Time): 배포 전 전체 컴파일 (Dart, Swift)",
          "V8: JavaScript를 JIT로 C에 가까운 속도로 실행",
        ],
      },
      {
        number: 4,
        title: "언어별 분류와 선택 기준",
        body: [
          "현대 언어들은 순수 컴파일이나 순수 인터프리트보다 혼합 방식을 사용합니다. Java와 Python은 소스 코드를 중간 표현(바이트코드)으로 컴파일한 뒤 VM(가상 머신)에서 해석/JIT 실행합니다.",
          "언어 선택 기준: 실행 성능이 최우선이면 C/C++/Rust, 개발 생산성·스크립팅이면 Python/JavaScript/Ruby, 성능과 안전성 균형이면 Go/Java/Kotlin을 선택합니다.",
        ],
        points: [
          "Python: CPython은 인터프리터, PyPy는 JIT",
          "Java: 바이트코드 → JVM(JIT)",
          "JavaScript: V8 JIT, Deno, Bun 등 다양한 런타임",
          "Rust/Go: AOT 컴파일 → 빠른 실행, GC 없음(Rust)",
        ],
      },
    ],
    en: {
      title: "Compiler vs Interpreter",
      summary:
        "Understand how source code becomes a running program. Compare compiled and interpreted languages, their trade-offs, and how JIT compilation combines both approaches.",
      steps: [
        {
          title: "From Source Code to Execution",
          body: [
            "Source code written by programmers cannot be understood directly by the CPU. The CPU only understands machine code (0s and 1s), so source code must be translated or interpreted.",
            "This translation takes two forms: compilation (translate the whole program before running) and interpretation (read and execute one line at a time while running).",
          ],
          points: [
            "Lexing → Parsing → Semantic Analysis → Code Generation",
            "Assembly: low-level language more readable than machine code",
            "Linking: combine object files into an executable",
            "Runtime: execution environment (memory allocation, OS services)",
          ],
        },
        {
          title: "Compilers",
          body: [
            "A compiler analyzes the entire source code and converts it to machine code (or intermediate code) in one pass. C, C++, Rust, and Go are compiled. Many bugs (type errors) are caught at compile time.",
            "The generated binary runs directly, making execution very fast. However, the output is platform-specific (CPU architecture, OS), so recompilation is needed for different targets.",
          ],
          points: [
            "Execution speed: fast (direct machine code)",
            "Build time: slow (full analysis required)",
            "Error detection: type errors caught at compile time",
            "Platform-dependent: separate build per OS/CPU",
          ],
        },
        {
          title: "Interpreters and JIT",
          body: [
            "An interpreter reads and executes source code line by line at runtime. Python, Ruby, and early JavaScript use this. No build step is needed and the code is platform-independent, but execution is slower.",
            "JIT (Just-In-Time) compilation combines both approaches. It starts interpreting, then detects hot paths and compiles them to machine code at runtime. Java HotSpot, V8 (JavaScript), and PyPy use JIT.",
          ],
          points: [
            "Interpreter: fast startup, slow execution, platform-independent",
            "JIT: runtime compilation → near-compiled performance",
            "AOT (Ahead-of-Time): compile everything before deployment (Dart, Swift)",
            "V8: runs JavaScript at near-C speed via JIT",
          ],
        },
        {
          title: "Language Classification and Selection",
          body: [
            "Modern languages often use hybrid approaches. Java and Python compile to bytecode (an intermediate representation), then a VM interprets or JIT-compiles it.",
            "Selection guide: maximum performance → C/C++/Rust; developer productivity/scripting → Python/JavaScript/Ruby; balanced performance and safety → Go/Java/Kotlin.",
          ],
          points: [
            "Python: CPython is interpreted, PyPy uses JIT",
            "Java: bytecode → JVM (JIT)",
            "JavaScript: V8 JIT, various runtimes (Deno, Bun)",
            "Rust/Go: AOT compiled, fast execution, no GC (Rust)",
          ],
        },
      ],
    },
  },
  {
    slug: "process-thread",
    title: "프로세스와 스레드",
    level: "중급",
    tag: "OS",
    estimatedTime: "25분",
    summary:
      "프로세스는 독립 메모리를 가진 실행 단위이고, 스레드는 프로세스 내의 경량 실행 단위입니다. 메모리 공유, 컨텍스트 스위칭, 동기화 문제를 깊이 이해합니다.",
    relatedSlugs: ["os-intro", "virtual-memory", "cpu-cache"],
    steps: [
      {
        number: 1,
        title: "프로세스의 메모리 구조",
        body: [
          "프로세스는 코드(Text), 데이터(Data), 힙(Heap), 스택(Stack) 네 영역으로 이루어진 독립된 메모리 공간을 가집니다. 코드 영역에는 실행할 명령어가, 데이터 영역에는 전역·정적 변수가 저장됩니다.",
          "힙은 런타임에 동적 할당되는 메모리 영역(malloc/new)이고, 스택은 함수 호출 시 자동으로 쌓이는 지역 변수와 복귀 주소가 저장됩니다. 두 프로세스의 메모리는 OS가 격리해 서로 접근할 수 없습니다.",
        ],
        points: [
          "코드(Text): 실행 명령어 (읽기 전용)",
          "데이터: 전역/정적 변수 (BSS: 초기화 안 된 것)",
          "힙: 동적 할당 (낮은 주소 → 높은 주소로 성장)",
          "스택: 로컬 변수, 리턴 주소 (높은 주소 → 낮은 주소로 성장)",
        ],
      },
      {
        number: 2,
        title: "스레드의 메모리 공유",
        body: [
          "같은 프로세스 내의 스레드들은 코드, 데이터, 힙 영역을 공유합니다. 스레드마다 독립적인 것은 스택과 레지스터(실행 상태)뿐입니다. 이 공유 덕분에 스레드 간 통신이 쉽고 빠릅니다.",
          "그러나 공유 메모리는 경쟁 조건(Race Condition)의 원인이 됩니다. 두 스레드가 동시에 같은 변수를 읽고 수정하면 예측 불가능한 결과가 생깁니다. 뮤텍스(Mutex), 세마포어(Semaphore), 원자적 연산(Atomic)으로 이를 방지합니다.",
        ],
        points: [
          "공유: 코드, 데이터, 힙, 파일 디스크립터",
          "비공유: 스택, 레지스터, 프로그램 카운터",
          "경쟁 조건: 결과가 스레드 실행 순서에 의존",
          "임계 구역(Critical Section): 한 번에 하나의 스레드만 실행",
        ],
      },
      {
        number: 3,
        title: "컨텍스트 스위칭",
        body: [
          "OS는 여러 프로세스/스레드를 빠르게 번갈아 실행해 마치 동시에 실행되는 것처럼 보이게 합니다. 이 전환을 컨텍스트 스위칭(Context Switching)이라 합니다.",
          "컨텍스트 스위칭 시 CPU 레지스터, 프로그램 카운터, 스택 포인터 등을 저장하고 다음 프로세스의 상태를 복원합니다. 프로세스 전환은 메모리 맵도 교체해야 해 스레드 전환보다 비용이 훨씬 큽니다.",
        ],
        points: [
          "스레드 전환: 레지스터 + 스택만 교체 → 빠름",
          "프로세스 전환: 메모리 맵(TLB 플러시 포함) 교체 → 느림",
          "컨텍스트 스위칭 비용: 수 마이크로초 ~ 수십 마이크로초",
          "코루틴(Coroutine): 사용자 공간에서 협력적 전환 → 더 빠름",
        ],
      },
      {
        number: 4,
        title: "동기화 문제와 데드락",
        body: [
          "데드락(Deadlock)은 두 스레드가 서로 상대방이 가진 자원을 기다리며 영원히 멈추는 상황입니다. 데드락 발생 조건 네 가지가 모두 충족되어야 합니다: 상호 배제, 점유 대기, 비선점, 순환 대기.",
          "데드락을 예방하는 방법은 네 조건 중 하나를 제거하는 것입니다. 자원 순서를 항상 고정해 순환 대기를 방지하거나, 타임아웃을 사용해 교착 시 강제 포기하는 방법이 실용적입니다.",
        ],
        points: [
          "데드락 4조건: 상호배제, 점유대기, 비선점, 순환대기",
          "뮤텍스(Mutex): 한 번에 하나의 스레드만 잠금",
          "락 순서 고정: 항상 A → B 순으로 취득 (순환 방지)",
          "활성 잠금(Livelock): 서로 양보하며 진행 못 함",
        ],
      },
    ],
    en: {
      title: "Processes and Threads",
      summary:
        "A process is an execution unit with isolated memory; a thread is a lightweight unit within a process. Understand memory sharing, context switching, and synchronization issues.",
      steps: [
        {
          title: "Process Memory Layout",
          body: [
            "A process has four memory regions: code (text), data, heap, and stack. The code region holds executable instructions; the data region holds global and static variables.",
            "The heap is dynamically allocated at runtime (malloc/new); the stack stores local variables and return addresses for function calls. The OS isolates each process's memory.",
          ],
          points: [
            "Code (text): executable instructions (read-only)",
            "Data: global/static variables (BSS: uninitialized)",
            "Heap: dynamic allocation (grows upward)",
            "Stack: local variables, return addresses (grows downward)",
          ],
        },
        {
          title: "Thread Memory Sharing",
          body: [
            "Threads within the same process share the code, data, and heap regions. Each thread has its own stack and registers (execution state) only.",
            "Shared memory is the source of race conditions. Two threads reading and modifying the same variable simultaneously produce unpredictable results. Mutexes, semaphores, and atomic operations prevent this.",
          ],
          points: [
            "Shared: code, data, heap, file descriptors",
            "Not shared: stack, registers, program counter",
            "Race condition: result depends on thread scheduling order",
            "Critical section: only one thread executes at a time",
          ],
        },
        {
          title: "Context Switching",
          body: [
            "The OS rapidly switches between processes/threads to create the illusion of concurrent execution. This switch is called a context switch.",
            "A context switch saves the CPU registers, program counter, and stack pointer of the outgoing entity and restores those of the incoming one. Process switches are more expensive than thread switches because they also swap the memory map.",
          ],
          points: [
            "Thread switch: only registers + stack — fast",
            "Process switch: memory map (includes TLB flush) — slow",
            "Context switch cost: a few to tens of microseconds",
            "Coroutine: cooperative switch in user space → even faster",
          ],
        },
        {
          title: "Synchronization and Deadlock",
          body: [
            "A deadlock occurs when two threads wait for each other's resources indefinitely. Four conditions must all hold: mutual exclusion, hold-and-wait, no preemption, and circular wait.",
            "Preventing deadlock means breaking at least one condition. Fixing a global lock acquisition order eliminates circular wait; timeouts allow threads to abort and retry.",
          ],
          points: [
            "Deadlock 4 conditions: mutual exclusion, hold-and-wait, no preemption, circular wait",
            "Mutex: only one thread holds the lock at a time",
            "Fixed lock order: always acquire A → B (prevents circular wait)",
            "Livelock: threads keep yielding to each other without progress",
          ],
        },
      ],
    },
  },
  {
    slug: "tcp-ip",
    title: "TCP/IP 4계층 모델",
    level: "중급",
    tag: "Network",
    estimatedTime: "25분",
    summary:
      "TCP/IP 모델은 인터넷 통신의 근간입니다. 애플리케이션·전송·인터넷·링크 계층의 역할과 데이터가 각 계층을 통과하며 캡슐화되는 과정을 이해합니다.",
    relatedSlugs: ["http-https", "os-intro", "process-thread"],
    steps: [
      {
        number: 1,
        title: "계층화된 네트워크 모델",
        body: [
          "TCP/IP 모델은 네트워크 통신을 4개 계층으로 나눠 각 계층이 독립적인 역할을 담당하게 합니다. 계층화의 핵심 이점은 각 계층이 상위/하위 계층의 구현에 의존하지 않아 교체와 발전이 독립적으로 가능하다는 것입니다.",
          "OSI 7계층 모델이 이론적 참조 모델이라면, TCP/IP 4계층은 실제 인터넷에서 사용되는 실용적 모델입니다. HTTP는 애플리케이션, TCP/UDP는 전송, IP는 인터넷, Ethernet/Wi-Fi는 링크 계층에 해당합니다.",
        ],
        points: [
          "애플리케이션 계층: HTTP, FTP, DNS, SMTP",
          "전송 계층: TCP, UDP (포트 번호)",
          "인터넷 계층: IP (IP 주소, 라우팅)",
          "링크 계층: Ethernet, Wi-Fi (MAC 주소)",
        ],
      },
      {
        number: 2,
        title: "TCP — 신뢰성 있는 전송",
        body: [
          "TCP(Transmission Control Protocol)는 연결 지향적이고 신뢰성 있는 전송을 보장합니다. 3-way 핸드셰이크(SYN → SYN-ACK → ACK)로 연결을 수립하고, 패킷 손실 시 재전송, 순서 보장, 흐름 제어를 제공합니다.",
          "TCP는 흐름 제어(Flow Control)와 혼잡 제어(Congestion Control)를 통해 네트워크가 과부하 없이 효율적으로 동작하게 합니다. 이 복잡한 기능들 덕분에 HTTP, 이메일, 파일 전송 등 신뢰성이 중요한 프로토콜이 TCP를 사용합니다.",
        ],
        points: [
          "3-way 핸드셰이크: SYN → SYN-ACK → ACK",
          "신뢰성: ACK 확인, 타임아웃 시 재전송",
          "순서 보장: 시퀀스 번호로 재조립",
          "흐름 제어: 수신 측 버퍼 넘침 방지",
        ],
      },
      {
        number: 3,
        title: "UDP — 빠른 비연결 전송",
        body: [
          "UDP(User Datagram Protocol)는 연결 수립 없이 데이터그램을 전송합니다. 신뢰성, 순서 보장, 흐름 제어가 없어 TCP보다 훨씬 빠르고 오버헤드가 적습니다.",
          "UDP가 적합한 경우: 실시간 스트리밍(약간의 패킷 손실은 허용), 온라인 게임(낮은 지연이 신뢰성보다 중요), DNS 조회(짧은 1회성 요청). HTTP/3(QUIC)는 UDP 위에서 신뢰성을 자체 구현합니다.",
        ],
        points: [
          "연결 없음: 핸드셰이크 없이 바로 전송",
          "최소 오버헤드: 헤더 8바이트(TCP는 20바이트 이상)",
          "순서/신뢰성 없음: 응용 계층에서 직접 처리 필요",
          "활용: DNS, VoIP, 게임, 스트리밍, QUIC",
        ],
      },
      {
        number: 4,
        title: "캡슐화와 실제 패킷의 여정",
        body: [
          "데이터가 전송될 때 각 계층은 헤더를 추가하는 캡슐화(Encapsulation)를 수행합니다. HTTP 데이터 → TCP 헤더 추가(세그먼트) → IP 헤더 추가(패킷) → Ethernet 헤더 추가(프레임) 순으로 포장됩니다.",
          "수신 측에서는 반대로 각 계층이 자신의 헤더를 제거하며 역캡슐화(Decapsulation)를 수행합니다. 각 계층은 자신의 헤더만 처리하고 상위 계층 데이터는 그대로 전달합니다.",
        ],
        points: [
          "캡슐화: 데이터 → 세그먼트 → 패킷 → 프레임",
          "각 계층은 자신의 헤더만 읽고 추가/제거",
          "NAT: 사설 IP ↔ 공인 IP 변환 (라우터)",
          "DNS: 도메인 → IP 변환 (UDP 포트 53)",
        ],
      },
    ],
    en: {
      title: "TCP/IP 4-Layer Model",
      summary:
        "The TCP/IP model is the foundation of internet communication. Understand the role of each layer (application, transport, internet, link) and how data is encapsulated as it passes through them.",
      steps: [
        {
          title: "Layered Network Model",
          body: [
            "The TCP/IP model divides network communication into 4 layers, each with an independent responsibility. Layering means each layer can evolve without affecting others.",
            "The OSI 7-layer model is a theoretical reference; the TCP/IP 4-layer model is what the real internet uses. HTTP is application, TCP/UDP is transport, IP is internet, and Ethernet/Wi-Fi is the link layer.",
          ],
          points: [
            "Application: HTTP, FTP, DNS, SMTP",
            "Transport: TCP, UDP (port numbers)",
            "Internet: IP (IP addresses, routing)",
            "Link: Ethernet, Wi-Fi (MAC addresses)",
          ],
        },
        {
          title: "TCP — Reliable Transport",
          body: [
            "TCP (Transmission Control Protocol) is connection-oriented and provides reliable delivery. It uses a 3-way handshake (SYN → SYN-ACK → ACK) and offers retransmission, ordering, and flow control.",
            "TCP flow control and congestion control prevent network overload. These features make TCP the choice for HTTP, email, and file transfer where reliability is critical.",
          ],
          points: [
            "3-way handshake: SYN → SYN-ACK → ACK",
            "Reliability: ACK confirmation, retransmit on timeout",
            "Ordering: sequence numbers for reassembly",
            "Flow control: prevents receiver buffer overflow",
          ],
        },
        {
          title: "UDP — Fast Connectionless Transport",
          body: [
            "UDP (User Datagram Protocol) sends datagrams without establishing a connection. No reliability, ordering, or flow control — much faster with less overhead than TCP.",
            "UDP is suitable for real-time streaming (some packet loss is acceptable), online games (low latency matters more than reliability), and DNS queries (short, one-shot requests). HTTP/3 (QUIC) implements its own reliability on top of UDP.",
          ],
          points: [
            "No connection: transmit immediately without a handshake",
            "Minimal overhead: 8-byte header (vs TCP's 20+ bytes)",
            "No ordering/reliability: must be handled at the application layer",
            "Uses: DNS, VoIP, gaming, streaming, QUIC",
          ],
        },
        {
          title: "Encapsulation and the Journey of a Packet",
          body: [
            "As data is sent, each layer adds a header — a process called encapsulation. HTTP data → TCP header (segment) → IP header (packet) → Ethernet header (frame).",
            "On the receiving end, each layer strips its own header (decapsulation). Each layer processes only its own header and passes the data portion up unchanged.",
          ],
          points: [
            "Encapsulation: data → segment → packet → frame",
            "Each layer reads, adds, or removes only its own header",
            "NAT: private IP ↔ public IP translation (router)",
            "DNS: domain → IP resolution (UDP port 53)",
          ],
        },
      ],
    },
  },
  {
    slug: "rdb-basics",
    title: "관계형 데이터베이스 기초",
    level: "중급",
    tag: "Database",
    estimatedTime: "30분",
    summary:
      "관계형 데이터베이스의 핵심 개념인 테이블, 기본 키, 외래 키, 정규화를 이해하고, SQL의 SELECT·JOIN 쿼리와 인덱스가 어떻게 동작하는지 설명합니다.",
    relatedSlugs: ["os-intro", "tcp-ip", "cpu-cache"],
    steps: [
      {
        number: 1,
        title: "관계형 모델이란",
        body: [
          "관계형 데이터베이스(RDB)는 데이터를 표(테이블) 형태로 저장하고, 테이블 간의 관계로 복잡한 데이터 구조를 표현합니다. 각 행(Row/Tuple)은 한 레코드, 각 열(Column/Attribute)은 데이터의 특성을 나타냅니다.",
          "SQL(Structured Query Language)로 데이터를 조회·삽입·수정·삭제합니다. SQL은 선언형(Declarative) 언어로, '어떻게 찾는가'가 아닌 '무엇을 원하는가'를 기술하면 쿼리 최적화기가 최적의 실행 계획을 찾습니다.",
        ],
        points: [
          "테이블: 동일한 구조의 레코드 집합",
          "스키마: 테이블 구조 정의 (열 이름, 타입, 제약)",
          "ACID: 원자성, 일관성, 고립성, 지속성",
          "대표 RDBMS: PostgreSQL, MySQL, SQLite, Oracle",
        ],
      },
      {
        number: 2,
        title: "기본 키, 외래 키, 정규화",
        body: [
          "기본 키(Primary Key)는 테이블의 각 행을 고유하게 식별하는 열입니다. 외래 키(Foreign Key)는 다른 테이블의 기본 키를 참조해 두 테이블 간의 관계를 정의합니다.",
          "정규화(Normalization)는 데이터 중복을 최소화하고 이상 현상(삽입·삭제·갱신 이상)을 방지하는 설계 기법입니다. 1NF → 2NF → 3NF → BCNF 순으로 더 엄격한 조건을 요구합니다. 과도한 정규화는 JOIN이 많아져 성능이 저하될 수 있어 실무에서는 적절히 비정규화합니다.",
        ],
        points: [
          "기본 키: NOT NULL + UNIQUE, 행 식별자",
          "외래 키: 참조 무결성 보장 (없는 값 참조 불가)",
          "1NF: 원자값, 2NF: 부분 함수 종속 제거, 3NF: 이행 종속 제거",
          "비정규화: 성능을 위해 의도적 중복 허용",
        ],
      },
      {
        number: 3,
        title: "JOIN의 종류와 동작",
        body: [
          "JOIN은 두 테이블을 특정 조건으로 연결해 하나의 결과 집합을 만듭니다. INNER JOIN은 두 테이블 모두 일치하는 행만, LEFT JOIN은 왼쪽 테이블 전체 + 오른쪽 일치하는 행을 반환합니다.",
          "N+1 쿼리 문제는 흔한 성능 함정입니다. 사용자 목록을 가져온 뒤(1번) 각 사용자의 게시글을 각각 조회(N번)하면 N+1개의 쿼리가 발생합니다. 이를 JOIN으로 한 번에 처리하거나 배치 로딩으로 해결합니다.",
        ],
        points: [
          "INNER JOIN: 양쪽 모두 일치하는 행",
          "LEFT JOIN: 왼쪽 전체 + 오른쪽 일치(없으면 NULL)",
          "N+1 문제: ORM에서 자주 발생, JOIN 또는 eager loading으로 해결",
          "서브쿼리 vs JOIN: 최신 옵티마이저는 성능 차이 거의 없음",
        ],
      },
      {
        number: 4,
        title: "인덱스의 동작 원리",
        body: [
          "인덱스는 테이블의 특정 열에 대한 검색 속도를 높이는 자료구조입니다. 대부분의 RDBMS는 B-Tree 인덱스를 기본으로 사용합니다. 인덱스가 없으면 전체 테이블 스캔(Full Table Scan) O(n), 인덱스가 있으면 O(log n)으로 줄어듭니다.",
          "인덱스는 읽기를 빠르게 하지만 쓰기(INSERT/UPDATE/DELETE)를 느리게 합니다. 인덱스를 유지하는 비용 때문입니다. 자주 조회하는 열, WHERE/JOIN/ORDER BY에 쓰는 열에 인덱스를 만들고, 쓰기가 매우 빈번한 열에는 신중하게 적용합니다.",
        ],
        points: [
          "B-Tree 인덱스: 범위 검색, 정렬에 강함",
          "Hash 인덱스: 등호 검색에만 사용 가능 (범위 불가)",
          "복합 인덱스: (A, B) 인덱스는 A 단독, A+B 조회에 사용 가능",
          "EXPLAIN: 쿼리 실행 계획 확인 — 인덱스 사용 여부 확인",
        ],
      },
    ],
    en: {
      title: "Relational Database Fundamentals",
      summary:
        "Understand tables, primary keys, foreign keys, and normalization in relational databases. Learn how SELECT/JOIN queries and indexes work.",
      steps: [
        {
          title: "What is the Relational Model?",
          body: [
            "A relational database stores data in tables. Each row is one record; each column is an attribute. Relationships between tables represent complex data structures.",
            "SQL (Structured Query Language) is declarative — you describe *what* you want, not *how* to find it. The query optimizer finds the best execution plan.",
          ],
          points: [
            "Table: a set of records with the same structure",
            "Schema: defines columns, types, and constraints",
            "ACID: Atomicity, Consistency, Isolation, Durability",
            "Examples: PostgreSQL, MySQL, SQLite, Oracle",
          ],
        },
        {
          title: "Primary Key, Foreign Key, Normalization",
          body: [
            "A primary key uniquely identifies each row. A foreign key references another table's primary key, defining relationships between tables.",
            "Normalization reduces data redundancy and prevents anomalies (insert/delete/update). 1NF → 2NF → 3NF → BCNF apply increasingly strict rules. Over-normalization increases joins, so some denormalization is common in practice.",
          ],
          points: [
            "Primary key: NOT NULL + UNIQUE, row identifier",
            "Foreign key: referential integrity (no dangling references)",
            "1NF: atomic values; 2NF: no partial dependencies; 3NF: no transitive dependencies",
            "Denormalization: intentional redundancy for performance",
          ],
        },
        {
          title: "Types of JOINs",
          body: [
            "A JOIN combines two tables on a condition into one result set. INNER JOIN returns rows matching in both tables; LEFT JOIN returns all rows from the left table plus matched rows from the right.",
            "The N+1 query problem is a common performance trap: fetching a list (1 query) then querying each item's details (N queries) causes N+1 total. Solve it with a JOIN or batch loading.",
          ],
          points: [
            "INNER JOIN: rows matching on both sides",
            "LEFT JOIN: all left rows + matching right rows (NULL if no match)",
            "N+1 problem: common with ORMs, solve with JOIN or eager loading",
            "Subquery vs JOIN: modern optimizers produce similar performance",
          ],
        },
        {
          title: "How Indexes Work",
          body: [
            "An index is a data structure that speeds up lookups on a column. Most RDBMS use B-Tree indexes by default. Without an index, a full table scan is O(n); with one, it is O(log n).",
            "Indexes speed up reads but slow down writes (INSERT/UPDATE/DELETE) due to maintenance cost. Create indexes on frequently queried columns used in WHERE/JOIN/ORDER BY; be cautious on high-write columns.",
          ],
          points: [
            "B-Tree index: fast for range queries and sorting",
            "Hash index: equality-only lookups (no range support)",
            "Composite index: (A, B) can satisfy queries on A alone or A+B",
            "EXPLAIN: check query execution plan — verify index usage",
          ],
        },
      ],
    },
  },
  {
    slug: "cpu-cache",
    title: "CPU 캐시와 메모리 계층",
    level: "고급",
    tag: "Architecture",
    estimatedTime: "30분",
    summary:
      "CPU와 메모리 간의 속도 차이를 메우는 캐시 계층의 원리, 캐시 미스의 종류와 비용, 그리고 캐시를 고려한 코드 작성법을 이해합니다.",
    relatedSlugs: ["virtual-memory", "process-thread", "os-intro"],
    steps: [
      {
        number: 1,
        title: "메모리 계층 구조",
        body: [
          "현대 컴퓨터는 속도와 용량이 반비례하는 메모리 계층을 가집니다. 위로 갈수록 빠르고 비싸며 용량이 작습니다: 레지스터 < L1 캐시 < L2 캐시 < L3 캐시 < 메인 메모리(RAM) < SSD < HDD.",
          "CPU가 데이터를 필요로 할 때 레지스터 → L1 → L2 → L3 → RAM 순으로 찾습니다. 위에서 찾으면(캐시 히트) 빠르게 처리, 없으면(캐시 미스) 아래 계층에서 가져와 상위에 저장합니다.",
        ],
        points: [
          "레지스터: ~1 사이클, 수십 바이트",
          "L1 캐시: ~4 사이클, 32~64KB",
          "L2 캐시: ~12 사이클, 256KB~1MB",
          "L3 캐시: ~40 사이클, 수 MB~수십 MB",
        ],
      },
      {
        number: 2,
        title: "캐시 미스의 종류",
        body: [
          "캐시 미스는 세 가지로 분류됩니다. Cold Miss(Compulsory Miss)는 처음 접근해 캐시에 없는 경우, Capacity Miss는 캐시 용량이 부족한 경우, Conflict Miss는 캐시 세트에 충돌이 발생한 경우입니다.",
          "캐시 미스 시 메인 메모리에서 캐시 라인(보통 64바이트) 단위로 데이터를 읽어옵니다. 메인 메모리 접근은 L1 대비 수백 배 느리므로, 캐시 미스를 줄이는 것이 성능 최적화의 핵심입니다.",
        ],
        points: [
          "Cold Miss: 최초 접근 — 불가피",
          "Capacity Miss: 작업 집합이 캐시보다 큼",
          "Conflict Miss: 동일 캐시 세트에 데이터 몰림",
          "캐시 라인: 64바이트 단위로 메모리 읽기/쓰기",
        ],
      },
      {
        number: 3,
        title: "공간 지역성과 시간 지역성",
        body: [
          "캐시는 두 가지 지역성(Locality) 원리를 활용합니다. 시간 지역성(Temporal Locality): 최근에 접근한 데이터는 곧 다시 접근될 가능성이 높습니다. 공간 지역성(Spatial Locality): 접근한 주소 근처의 주소도 곧 접근될 가능성이 높습니다.",
          "공간 지역성이 높은 코드 예시: 2차원 배열을 행(row) 기준으로 순회. 같은 배열을 열(column) 기준으로 순회하면 캐시 미스율이 크게 높아집니다. 배열 원소가 메모리에 행 우선으로 저장되어 있기 때문입니다.",
        ],
        points: [
          "시간 지역성: for 루프 내 같은 변수 반복 사용",
          "공간 지역성: 배열 순차 접근, 구조체 필드 순서",
          "행 우선 vs 열 우선: C/C++/Java/Python은 행 우선(Row-Major)",
          "행 기준 순회: 캐시 히트율 높음 (권장)",
        ],
      },
      {
        number: 4,
        title: "캐시 친화적 코드 작성",
        body: [
          "캐시를 고려한 코드 작성은 성능에 극적인 차이를 만들 수 있습니다. 같은 알고리즘이라도 메모리 접근 패턴에 따라 수배에서 수십 배 속도 차이가 날 수 있습니다.",
          "False Sharing은 멀티스레드 환경에서 다른 스레드가 사용하는 독립적인 변수들이 같은 캐시 라인에 있을 때 발생하는 성능 저하입니다. 한 스레드가 수정하면 다른 스레드의 캐시도 무효화됩니다. 변수 간 패딩을 추가해 캐시 라인을 분리하면 해결됩니다.",
        ],
        points: [
          "구조체: 자주 함께 쓰는 필드를 붙여 배치",
          "배열 vs 연결 리스트: 순차 접근엔 배열이 캐시 효율 압도적",
          "False Sharing: 멀티스레드에서 같은 캐시 라인 경쟁",
          "캐시 워밍: 사전에 데이터 접근해 캐시 채우기",
        ],
      },
    ],
    en: {
      title: "CPU Cache and Memory Hierarchy",
      summary:
        "Learn the cache hierarchy that bridges the CPU-memory speed gap, the types and cost of cache misses, and how to write cache-friendly code.",
      steps: [
        {
          title: "Memory Hierarchy",
          body: [
            "Modern computers have a memory hierarchy where speed and capacity are inversely related. From fastest to slowest: registers → L1 → L2 → L3 cache → RAM → SSD → HDD.",
            "When the CPU needs data, it searches registers → L1 → L2 → L3 → RAM in order. A cache hit is fast; a cache miss fetches from a lower level and populates higher levels.",
          ],
          points: [
            "Registers: ~1 cycle, tens of bytes",
            "L1 cache: ~4 cycles, 32–64 KB",
            "L2 cache: ~12 cycles, 256 KB–1 MB",
            "L3 cache: ~40 cycles, several MB",
          ],
        },
        {
          title: "Types of Cache Misses",
          body: [
            "Cache misses fall into three categories. Cold miss (compulsory): first access to data not yet in cache. Capacity miss: working set exceeds cache size. Conflict miss: multiple addresses map to the same cache set.",
            "On a miss, a full cache line (typically 64 bytes) is loaded from main memory. Main memory is hundreds of times slower than L1, so reducing cache misses is fundamental to performance optimization.",
          ],
          points: [
            "Cold miss: first access — unavoidable",
            "Capacity miss: working set larger than cache",
            "Conflict miss: data crowded into the same cache set",
            "Cache line: 64-byte unit for memory reads/writes",
          ],
        },
        {
          title: "Spatial and Temporal Locality",
          body: [
            "Caches exploit two locality principles. Temporal locality: recently accessed data is likely to be accessed again soon. Spatial locality: addresses near a recently accessed address are likely to be accessed soon.",
            "Example of high spatial locality: iterate a 2D array row-by-row. Column-by-column iteration causes far more cache misses because C/Java/Python store arrays in row-major order.",
          ],
          points: [
            "Temporal locality: reusing the same variable in a loop",
            "Spatial locality: sequential array access, struct field order",
            "Row-major vs column-major: C/C++/Java/Python use row-major",
            "Row-major traversal: higher cache hit rate (recommended)",
          ],
        },
        {
          title: "Writing Cache-Friendly Code",
          body: [
            "Cache-aware coding can produce dramatic performance differences. The same algorithm with different memory access patterns can vary by 10× or more in speed.",
            "False sharing in multi-threaded code occurs when independent variables used by different threads share a cache line. One thread modifying its variable invalidates the other thread's cache. Adding padding between variables separates them into different cache lines.",
          ],
          points: [
            "Structs: place frequently co-accessed fields together",
            "Array vs linked list: array dominates cache efficiency for sequential access",
            "False sharing: threads competing over the same cache line",
            "Cache warming: pre-access data to populate the cache",
          ],
        },
      ],
    },
  },
  {
    slug: "virtual-memory",
    title: "가상 메모리와 페이징",
    level: "고급",
    tag: "OS",
    estimatedTime: "30분",
    summary:
      "가상 메모리는 각 프로세스에게 독립된 주소 공간을 제공하는 OS의 핵심 기능입니다. 페이지 테이블, TLB, 페이지 폴트 처리 과정을 이해합니다.",
    relatedSlugs: ["os-intro", "process-thread", "cpu-cache"],
    steps: [
      {
        number: 1,
        title: "가상 주소 공간",
        body: [
          "가상 메모리는 각 프로세스에게 마치 메모리 전체를 독점하는 것처럼 보이는 주소 공간을 제공합니다. 64비트 시스템에서 프로세스는 이론상 16EB(엑사바이트)의 가상 주소 공간을 갖습니다.",
          "실제 물리 메모리(RAM)는 여러 프로세스가 공유합니다. OS의 메모리 관리 유닛(MMU)이 프로세스가 사용하는 가상 주소를 실제 물리 주소로 변환합니다. 이 덕분에 프로세스 간 메모리 격리와 물리 메모리보다 큰 주소 공간 사용이 가능합니다.",
        ],
        points: [
          "가상 주소: 프로세스가 보는 주소 (0x0 ~ 최대)",
          "물리 주소: 실제 RAM의 주소",
          "MMU: CPU 내부 하드웨어로 주소 변환",
          "메모리 격리: 프로세스 A가 B의 메모리에 직접 접근 불가",
        ],
      },
      {
        number: 2,
        title: "페이지 테이블",
        body: [
          "페이지(Page)는 가상 메모리를 고정 크기(보통 4KB)로 나눈 단위입니다. 페이지 테이블은 가상 페이지 번호 → 물리 프레임 번호 매핑을 저장하는 자료구조입니다.",
          "주소 변환: 가상 주소 = 페이지 번호(상위 비트) + 오프셋(하위 비트). 페이지 테이블에서 페이지 번호에 해당하는 물리 프레임 번호를 찾아, 물리 주소 = 프레임 번호 + 오프셋으로 계산합니다.",
        ],
        points: [
          "페이지 크기: 보통 4KB (Huge Page: 2MB, 1GB)",
          "페이지 테이블 엔트리(PTE): 프레임 번호 + 보호 비트 + 존재 비트",
          "다단계 페이지 테이블: 페이지 테이블 자체의 메모리 절약",
          "페이지 테이블은 OS가 관리, RAM에 저장",
        ],
      },
      {
        number: 3,
        title: "TLB — 주소 변환 캐시",
        body: [
          "페이지 테이블은 메모리에 있으므로 매번 가상→물리 주소 변환에 메모리 접근이 필요합니다. 이를 해결하기 위해 CPU 내부에 TLB(Translation Lookaside Buffer)라는 주소 변환 캐시를 둡니다.",
          "TLB는 최근 사용한 페이지 테이블 엔트리를 저장합니다. TLB 히트 시 메모리 접근 없이 1사이클에 주소 변환이 가능합니다. TLB 미스 시 메모리에서 페이지 테이블을 읽어 TLB를 갱신합니다.",
        ],
        points: [
          "TLB 히트율: 보통 99% 이상",
          "TLB 플러시: 컨텍스트 스위칭 시 TLB 무효화 (비용 발생)",
          "ASID(Address Space ID): 컨텍스트 스위칭 시 TLB 플러시 방지",
          "Huge Page: TLB 엔트리 하나가 더 큰 영역 커버 → TLB 미스 감소",
        ],
      },
      {
        number: 4,
        title: "페이지 폴트와 스왑",
        body: [
          "페이지 폴트(Page Fault)는 접근하려는 페이지가 물리 메모리에 없을 때 발생하는 예외입니다. OS는 해당 페이지를 디스크(스왑 공간)에서 RAM으로 불러와 페이지 테이블을 갱신한 뒤 명령을 재실행합니다.",
          "물리 메모리가 부족하면 OS는 LRU(Least Recently Used) 등의 교체 알고리즘으로 사용 빈도가 낮은 페이지를 디스크로 내보냅니다(Page Out). 스왑이 과도해지면 시스템이 극도로 느려지는 Thrashing이 발생합니다.",
        ],
        points: [
          "Minor Fault: 다른 프로세스가 이미 메모리에 로드한 경우",
          "Major Fault: 디스크에서 읽어야 하는 경우 (수십 ms)",
          "LRU, Clock 알고리즘: 교체 페이지 선택",
          "Thrashing: 스왑 발생이 너무 잦아 CPU가 대부분 I/O 대기",
        ],
      },
    ],
    en: {
      title: "Virtual Memory and Paging",
      summary:
        "Virtual memory is a core OS feature that gives each process its own address space. Understand page tables, TLBs, and how page faults are handled.",
      steps: [
        {
          title: "Virtual Address Space",
          body: [
            "Virtual memory gives each process an address space that appears to own all of memory. On a 64-bit system, a process theoretically has 16 EB of virtual address space.",
            "Actual physical memory (RAM) is shared across processes. The OS's Memory Management Unit (MMU) translates virtual addresses to physical addresses. This enables process isolation and address spaces larger than physical RAM.",
          ],
          points: [
            "Virtual address: what the process sees (0x0 to maximum)",
            "Physical address: actual RAM address",
            "MMU: hardware inside the CPU for address translation",
            "Memory isolation: process A cannot directly access process B's memory",
          ],
        },
        {
          title: "Page Tables",
          body: [
            "A page is a fixed-size (typically 4 KB) chunk of virtual memory. The page table is a data structure mapping virtual page numbers to physical frame numbers.",
            "Address translation: virtual address = page number (high bits) + offset (low bits). Look up the physical frame number in the page table, then physical address = frame number + offset.",
          ],
          points: [
            "Page size: typically 4 KB (Huge Page: 2 MB, 1 GB)",
            "Page Table Entry (PTE): frame number + protection bits + present bit",
            "Multi-level page tables: save memory for the page table itself",
            "Page tables are managed by the OS and stored in RAM",
          ],
        },
        {
          title: "TLB — Address Translation Cache",
          body: [
            "Since the page table lives in memory, every virtual-to-physical address translation would require a memory access. The TLB (Translation Lookaside Buffer) inside the CPU caches recent page table entries.",
            "A TLB hit translates the address in 1 cycle with no memory access. A TLB miss reads the page table from memory and updates the TLB.",
          ],
          points: [
            "TLB hit rate: typically > 99%",
            "TLB flush: invalidated on context switch (costly)",
            "ASID (Address Space ID): avoids full TLB flush on context switch",
            "Huge Pages: one TLB entry covers a larger region → fewer misses",
          ],
        },
        {
          title: "Page Faults and Swap",
          body: [
            "A page fault is an exception that occurs when the accessed page is not in physical memory. The OS loads it from disk (swap space) into RAM, updates the page table, and re-executes the instruction.",
            "When physical memory is full, the OS uses a replacement algorithm (e.g., LRU) to evict infrequently used pages to disk. Excessive swapping causes thrashing, where the CPU spends most of its time waiting for I/O.",
          ],
          points: [
            "Minor fault: page already loaded by another process",
            "Major fault: must read from disk (tens of ms)",
            "LRU, Clock algorithm: select which page to evict",
            "Thrashing: too many page faults, CPU mostly waiting for I/O",
          ],
        },
      ],
    },
  },
];

export const CS_LESSON_MAP = Object.fromEntries(
  CS_LESSONS.map((l) => [l.slug, l])
);
