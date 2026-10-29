import { LanguageConfig, SupportedLanguage } from './types';

export const LANGUAGE_CONFIGS: Record<SupportedLanguage, LanguageConfig> = {
  python: {
    id: 'python',
    name: 'Python',
    fileExtension: '.py',
    defaultFilename: 'solution.py',
    version: 'Python 3.11 (Engine)',
    paradigm: 'Multi-paradigm (Dynamic, Object-Oriented)',
    icon: 'FileCode2',
    monacoLang: 'python',
    description: 'Clean, expressive syntax widely used in AI, data science, scientific computing, and automation.',
    templates: [
      {
        id: 'py-primes',
        name: 'Sieve of Eratosthenes & Primes',
        description: 'Finds all prime numbers up to N and computes statistical distribution.',
        difficulty: 'Beginner',
        code: `# Sieve of Eratosthenes Algorithm in Python 3
import math

def find_primes(limit):
    """Generate all primes up to limit using the Sieve algorithm."""
    sieve = [True] * (limit + 1)
    sieve[0] = sieve[1] = False
    
    for current in range(2, int(math.isqrt(limit)) + 1):
        if sieve[current]:
            for multiple in range(current * current, limit + 1, current):
                sieve[multiple] = False
                
    primes = [i for i, is_prime in enumerate(sieve) if is_prime]
    return primes

print("========================================")
print("     PYTHON 3 PRIME NUMBERS FINDER      ")
print("========================================")

limit = 50
primes = find_primes(limit)

print(f"Primes up to {limit}: {primes}")
print(f"Total count: {len(primes)}")
print(f"Sum of primes: {sum(primes)}")
print(f"Largest prime: {max(primes)}")
print(f"Average: {round(sum(primes) / len(primes), 2)}")
print("Execution completed successfully.")
`
      },
      {
        id: 'py-fibonacci',
        name: 'Fibonacci & Golden Ratio',
        description: 'Dynamic programming Fibonacci sequence with Golden Ratio convergence.',
        difficulty: 'Intermediate',
        code: `# Fibonacci Sequence & Golden Ratio (Phi)
def fibonacci_series(n):
    if n <= 0:
        return []
    if n == 1:
        return [0]
        
    sequence = [0, 1]
    for _ in range(2, n):
        sequence.append(sequence[-1] + sequence[-2])
    return sequence

print("Generating first 15 Fibonacci numbers:")
nums = fibonacci_series(15)
for idx, val in enumerate(nums):
    ratio_str = ""
    if idx > 1 and nums[idx - 1] > 0:
        ratio = val / nums[idx - 1]
        ratio_str = f"| Ratio: {ratio:.6f}"
    print(f"F({idx:02d}) = {val:<6} {ratio_str}")

print("\\nNotice convergence to Golden Ratio Phi = 1.618034")
`
      },
      {
        id: 'py-oop',
        name: 'Object-Oriented Bank Account',
        description: 'Classes, encapsulation, transaction histories, and methods.',
        difficulty: 'Intermediate',
        code: `# Object-Oriented Programming: Bank Account
class BankAccount:
    def __init__(self, owner, starting_balance=0.0):
        self.owner = owner
        self.balance = float(starting_balance)
        self.transactions = []
        self._record("Account opened", starting_balance)

    def _record(self, desc, amount):
        self.transactions.append((desc, amount, self.balance))

    def deposit(self, amount):
        if amount <= 0:
            print(f"Error: Invalid deposit amount {amount}")
            return False
        self.balance += amount
        self._record("Deposit", amount)
        print(f"✓ Deposited USD {amount:.2f} | New balance: USD {self.balance:.2f}")
        return True

    def withdraw(self, amount):
        if amount > self.balance:
            print(f"✗ Insufficient funds for withdrawal of USD {amount:.2f}")
            return False
        self.balance -= amount
        self._record("Withdrawal", -amount)
        print(f"✓ Withdrew USD {amount:.2f} | Remaining: USD {self.balance:.2f}")
        return True

account = BankAccount("Ada Lovelace", 500.0)
account.deposit(250.0)
account.withdraw(120.0)
account.withdraw(900.0)

print("\\n--- Transaction Ledger ---")
for desc, amt, bal in account.transactions:
    print(f"{desc:<16}: {amt:+8.2f} -> Balance: USD {bal:.2f}")
`
      }
    ]
  },

  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    fileExtension: '.js',
    defaultFilename: 'index.js',
    version: 'ECMAScript 2022',
    paradigm: 'Multi-paradigm (Event-driven, Functional)',
    icon: 'FileCode',
    monacoLang: 'javascript',
    description: 'The native language of the modern web, high-performance V8 engine, and asynchronous runtimes.',
    templates: [
      {
        id: 'js-quicksort',
        name: 'QuickSort & Performance Metrics',
        description: 'In-place recursive QuickSort algorithm with random array generation.',
        difficulty: 'Intermediate',
        code: `// High-Performance In-Place QuickSort in JavaScript
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// Generate test data
const dataset = [64, 34, 25, 12, 22, 11, 90, 88, 45, 5, 71, 19];
console.log("Original Array:", dataset);

const sorted = quickSort([...dataset]);
console.log("Sorted Array:  ", sorted);

// Binary search on sorted array
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

const target = 45;
const foundIndex = binarySearch(sorted, target);
console.log("Binary Search for " + target + ": found at sorted index " + foundIndex);
`
      },
      {
        id: 'js-async',
        name: 'Async Pipeline & Array Transforms',
        description: 'Map, filter, reduce data processing pipeline with simulated async latency.',
        difficulty: 'Beginner',
        code: `// Functional Data Transformation Pipeline
const students = [
  { name: "Isaac", scores: [88, 92, 79], active: true },
  { name: "Marie", scores: [95, 98, 94], active: true },
  { name: "Albert", scores: [72, 85, 90], active: true },
  { name: "Hypatia", scores: [99, 94, 97], active: true },
  { name: "Carl", scores: [65, 70, 68], active: false }
];

console.log("--- Student Academic Report ---");

const reports = students
  .filter(student => student.active)
  .map(student => {
    const total = student.scores.reduce((sum, s) => sum + s, 0);
    const avg = Number((total / student.scores.length).toFixed(1));
    return {
      name: student.name,
      average: avg,
      honors: avg >= 90
    };
  })
  .sort((a, b) => b.average - a.average);

console.table ? console.table(reports) : console.log(reports);

const classAvg = reports.reduce((acc, r) => acc + r.average, 0) / reports.length;
console.log("Class Active Average: " + classAvg.toFixed(2) + "%");
`
      }
    ]
  },

  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    fileExtension: '.ts',
    defaultFilename: 'main.ts',
    version: 'TypeScript 5.x',
    paradigm: 'Statically Typed JavaScript',
    icon: 'FileCode2',
    monacoLang: 'typescript',
    description: 'Typed superset of JavaScript that compiles to clean, readable JS with type guards and interfaces.',
    templates: [
      {
        id: 'ts-generic-stack',
        name: 'Type-Safe Generic Stack with Interface',
        description: 'Generic data structure with strict interface, peek, pop, and type guard.',
        difficulty: 'Intermediate',
        code: `// Type-Safe Generic Stack Data Structure
interface IStack<T> {
  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  size(): number;
  isEmpty(): boolean;
}

class Stack<T> implements IStack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

// Concrete generic usage with numbers
const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
numberStack.push(30);

console.log("Stack size:", numberStack.size());
console.log("Peek top:", numberStack.peek());
console.log("Popped element:", numberStack.pop());
console.log("Remaining size:", numberStack.size());

// Concrete generic usage with string tokens
const tokenStack = new Stack<string>();
tokenStack.push("fn");
tokenStack.push("main");
tokenStack.push("()");
console.log("Tokens in stack:", tokenStack.size());
`
      }
    ]
  },

  c: {
    id: 'c',
    name: 'C',
    fileExtension: '.c',
    defaultFilename: 'program.c',
    version: 'C11 / GCC Standard',
    paradigm: 'Procedural, Low-Level Memory Control',
    icon: 'Binary',
    monacoLang: 'c',
    description: 'The foundation of modern computing: operating systems, embedded hardware, and high-performance kernels.',
    templates: [
      {
        id: 'c-pointers',
        name: 'Pointers & Dynamic Memory',
        description: 'Pointer arithmetic, address dereferencing, and array sum.',
        difficulty: 'Beginner',
        code: `// C Pointer Arithmetic & Memory Addressing
#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    printf("========================================\\n");
    printf("   C LANGUAGE POINTER & MEMORY DEMO     \\n");
    printf("========================================\\n\\n");

    int x = 42;
    int y = 99;
    int *ptr_x = &x;

    printf("Original values:\\n");
    printf("  x = %d (address: %p)\\n", x, (void*)&x);
    printf("  y = %d (address: %p)\\n", y, (void*)&y);

    swap(&x, &y);
    printf("\\nAfter swap(&x, &y):\\n");
    printf("  x = %d, y = %d\\n", x, y);

    // Array traversal with pointer increment
    int numbers[5] = {10, 20, 30, 40, 50};
    int *p = numbers;
    int sum = 0;

    printf("\\nArray traversal via pointers:\\n");
    for (int i = 0; i < 5; i++) {
        printf("  *(p + %d) = %d (address: %p)\\n", i, *(p + i), (void*)(p + i));
        sum += *(p + i);
    }
    printf("Total sum: %d\\n", sum);

    return 0;
}
`
      },
      {
        id: 'c-matrix',
        name: 'Matrix Multiplication (2x2)',
        description: 'Square matrix multiplication with 2D array traversal.',
        difficulty: 'Intermediate',
        code: `#include <stdio.h>

int main() {
    int A[2][2] = { {1, 2}, {3, 4} };
    int B[2][2] = { {5, 6}, {7, 8} };
    int C[2][2] = { {0, 0}, {0, 0} };

    printf("Multiplying 2x2 Matrices A and B:\\n");

    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            for (int k = 0; k < 2; k++) {
                C[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    printf("\\nResult Matrix C = A * B:\\n");
    for (int i = 0; i < 2; i++) {
        printf("  [ %d  %d ]\\n", C[i][0], C[i][1]);
    }

    return 0;
}
`
      }
    ]
  },

  cpp: {
    id: 'cpp',
    name: 'C++',
    fileExtension: '.cpp',
    defaultFilename: 'main.cpp',
    version: 'C++20',
    paradigm: 'Object-Oriented, Generic, High Performance',
    icon: 'Cpu',
    monacoLang: 'cpp',
    description: 'High-performance systems programming language with classes, templates, and standard libraries.',
    templates: [
      {
        id: 'cpp-oop',
        name: 'Shape Hierarchy & Polymorphism',
        description: 'Abstract base class, virtual methods, inheritance, and dynamic dispatch.',
        difficulty: 'Intermediate',
        code: `// C++ Class Inheritance & Polymorphic Dispatch
#include <iostream>
#include <cmath>

class Shape {
public:
    virtual double area() const = 0;
    virtual void print() const = 0;
    virtual ~Shape() {}
};

class Rectangle : public Shape {
private:
    double width, height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    double area() const override { return width * height; }
    void print() const override {
        std::cout << "Rectangle [" << width << " x " << height << "] -> Area: " << area() << std::endl;
    }
};

class Circle : public Shape {
private:
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override { return 3.14159265 * radius * radius; }
    void print() const override {
        std::cout << "Circle [radius " << radius << "] -> Area: " << area() << std::endl;
    }
};

int main() {
    std::cout << "=== C++ OOP & Polymorphism Demo ===" << std::endl;

    Rectangle rect(10.0, 5.0);
    Circle circle(7.0);

    rect.print();
    circle.print();

    std::cout << "Execution completed successfully." << std::endl;
    return 0;
}
`
      },
      {
        id: 'cpp-algorithms',
        name: 'Vector Algorithms & Binary Search',
        description: 'Iterative array processing, sorting metrics, and O(log n) binary search.',
        difficulty: 'Beginner',
        code: `// C++ Vector & Binary Search Algorithm
#include <iostream>
#include <vector>
#include <algorithm>

int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    std::cout << "=== C++ Algorithms & Binary Search ===" << std::endl;

    std::vector<int> numbers = { 3, 7, 12, 19, 24, 31, 45, 58, 62, 79, 88, 95 };
    std::cout << "Dataset size: " << numbers.size() << " elements" << std::endl;

    int query = 45;
    int index = binarySearch(numbers, query);

    if (index != -1) {
        std::cout << "Found target " << query << " at index " << index << std::endl;
    } else {
        std::cout << "Target " << query << " was not found." << std::endl;
    }

    std::cout << "Process completed with exit code 0." << std::endl;
    return 0;
}
`
      }
    ]
  },

  rust: {
    id: 'rust',
    name: 'Rust',
    fileExtension: '.rs',
    defaultFilename: 'main.rs',
    version: 'Rust 2021 Edition',
    paradigm: 'Memory-Safe Systems, Zero-Cost Abstractions',
    icon: 'Shield',
    monacoLang: 'rust',
    description: 'Empowering everyone to build reliable and efficient software with compile-time memory safety.',
    templates: [
      {
        id: 'rust-ownership',
        name: 'Structs, Enums & Pattern Matching',
        description: 'Option types, match patterns, immutable bindings, and methods.',
        difficulty: 'Intermediate',
        code: `// Rust Idiomatic Enums, Structs and Pattern Matching

#[derive(Debug)]
enum Status {
    Active,
    Pending(u32), // Pending with days remaining
    Terminated,
}

#[derive(Debug)]
struct Member {
    id: u64,
    name: String,
    status: Status,
}

impl Member {
    fn new(id: u64, name: &str, status: Status) -> Self {
        Member {
            id,
            name: name.to_string(),
            status,
        }
    }

    fn describe(&self) {
        match &self.status {
            Status::Active => {
                println!("Member #{} ({}) is in good standing.", self.id, self.name);
            }
            Status::Pending(days) => {
                println!("Member #{} ({}) is PENDING with {} days left.", self.id, self.name, days);
            }
            Status::Terminated => {
                println!("Member #{} ({}) has been TERMINATED.", self.id, self.name);
            }
        }
    }
}

fn main() {
    println!("=== RUST MEMORY-SAFE DOMAIN DEMO ===");

    let m1 = Member::new(101, "Alan Turing", Status::Active);
    let m2 = Member::new(102, "Grace Hopper", Status::Pending(14));
    let m3 = Member::new(103, "Ada Lovelace", Status::Terminated);

    m1.describe();
    m2.describe();
    m3.describe();
}
`
      }
    ]
  },

  sql: {
    id: 'sql',
    name: 'SQL',
    fileExtension: '.sql',
    defaultFilename: 'query.sql',
    version: 'ANSI SQL / PostgreSQL Dialect',
    paradigm: 'Declarative Relational Database Queries',
    icon: 'Database',
    monacoLang: 'sql',
    description: 'Structured Query Language for managing schemas, querying data, and relational table joins.',
    templates: [
      {
        id: 'sql-university',
        name: 'Student Enrollment & Grade Analytics',
        description: 'Creates tables, seeds records, joins students with courses, and computes GPAs.',
        difficulty: 'Beginner',
        code: `-- Relational Database Schema & Analytical Queries
CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50)
);

CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50),
    dept_id INT,
    gpa DECIMAL(3,2)
);

INSERT INTO departments VALUES (1, 'Computer Science');
INSERT INTO departments VALUES (2, 'Physics');
INSERT INTO departments VALUES (3, 'Biochemistry');

INSERT INTO students VALUES (101, 'Ada Lovelace', 1, 3.95);
INSERT INTO students VALUES (102, 'Alan Turing', 1, 3.90);
INSERT INTO students VALUES (103, 'Marie Curie', 2, 4.00);
INSERT INTO students VALUES (104, 'Richard Feynman', 2, 3.85);
INSERT INTO students VALUES (105, 'Rosalind Franklin', 3, 3.92);

-- Query: Student Roster with Department Join & Honor Status
SELECT 
    s.student_id,
    s.name AS student_name,
    d.dept_name AS department,
    s.gpa
FROM students s
INNER JOIN departments d ON s.dept_id = d.dept_id
WHERE s.gpa >= 3.90
ORDER BY s.gpa DESC;
`
      }
    ]
  },

  html: {
    id: 'html',
    name: 'Web (HTML/CSS/JS)',
    fileExtension: '.html',
    defaultFilename: 'index.html',
    version: 'HTML5 / Modern DOM',
    paradigm: 'Declarative Markup, Cascading Styles & Scripting',
    icon: 'Layout',
    monacoLang: 'html',
    description: 'Interactive client-side web sandbox with live rendering, CSS styles, and reactive JavaScript.',
    templates: [
      {
        id: 'web-clock',
        name: 'Scientific Stopwatch & Lap Timer',
        description: 'Complete interactive stopwatch UI with millisecond precision and CSS glassmorphism.',
        difficulty: 'Intermediate',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0f172a;
      color: #f8fafc;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    .card {
      background: #1e293b;
      border: 1px solid #334155;
      padding: 2rem;
      border-radius: 1rem;
      text-align: center;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);
      width: 320px;
    }
    .timer {
      font-family: monospace;
      font-size: 2.5rem;
      font-weight: 700;
      margin: 1.5rem 0;
      letter-spacing: 2px;
      color: #38bdf8;
    }
    .controls button {
      background: #38bdf8;
      color: #0f172a;
      border: none;
      font-weight: 600;
      padding: 0.6rem 1.2rem;
      border-radius: 0.5rem;
      cursor: pointer;
      margin: 0 0.25rem;
      transition: opacity 0.15s;
    }
    .controls button:hover { opacity: 0.9; }
    .controls button.reset { background: #ef4444; color: white; }
  </style>
</head>
<body>
  <div class="card">
    <h2 style="margin: 0; font-size: 1.2rem;">Lab Stopwatch</h2>
    <div class="timer" id="display">00:00.00</div>
    <div class="controls">
      <button id="toggleBtn" onclick="toggle()">Start</button>
      <button class="reset" onclick="reset()">Reset</button>
    </div>
  </div>

  <script>
    let startTime = 0;
    let elapsed = 0;
    let timerId = null;

    function formatTime(ms) {
      const totalSec = Math.floor(ms / 1000);
      const minutes = Math.floor(totalSec / 60);
      const seconds = totalSec % 60;
      const centi = Math.floor((ms % 1000) / 10);
      return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0') + '.' + String(centi).padStart(2, '0');
    }

    function toggle() {
      const btn = document.getElementById('toggleBtn');
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
        btn.textContent = 'Start';
      } else {
        startTime = performance.now() - elapsed;
        timerId = setInterval(() => {
          elapsed = performance.now() - startTime;
          document.getElementById('display').textContent = formatTime(elapsed);
        }, 16);
        btn.textContent = 'Pause';
      }
    }

    function reset() {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
        document.getElementById('toggleBtn').textContent = 'Start';
      }
      elapsed = 0;
      document.getElementById('display').textContent = '00:00.00';
    }
  </script>
</body>
</html>
`
      }
    ]
  }
};
