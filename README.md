# Browser History & Tab Manager — DSA Interactive Learning Website

A modern, responsive, scroll-and-hover educational platform demonstrating how core **Data Structures and Algorithms (DSA)** power a real web browser's history and tab management systems.

Designed specifically for **2nd-year BTech Computer Science / IT students** for semester practicals and course demonstrations.

---

## 🛠️ Technology Stack
- **HTML5:** Semantic structure, accessible layout, simulated browser window chrome.
- **CSS3:** Modern dark aesthetic (black/dark background, high-contrast white content, electric yellow highlighting), custom properties, responsive flexbox & grid, transitions, animations.
- **Vanilla JavaScript (ES6+):** Pure object-oriented and functional implementations of Stacks, Doubly Linked Lists, Dynamic Arrays, Linear Search, and Hash Tables. **Zero frameworks or external libraries.**

---

## 📚 Mapped DSA Concepts & Browser Features

| Browser Feature | Underlying DSA Concept | Time Complexity | Practical Purpose in Browsers |
| :--- | :--- | :--- | :--- |
| **Back Navigation** | **Stack** (LIFO) | $O(1)$ push / pop | Restores the most recently departed URL in reverse chronological order. |
| **Forward Navigation** | **Stack** (LIFO) | $O(1)$ push / pop | Stores pages stepped back from; automatically cleared when visiting a new URL. |
| **Page Connections** | **Doubly Linked List** | $O(1)$ prev/next step | Connects history records with bidirectional pointers (`prev` and `next`). |
| **Tab Management** | **Array / Dynamic Array** | $O(1)$ index lookup, $O(n)$ shift | Provides contiguous indexed slots for tabs (`tabs[0]`, `tabs[1]`, etc.). |
| **History Search** | **Linear Search** | $O(n)$ comparisons | Sequentially scans through unsorted, timestamped history logs. |
| **Website Lookup / Cache** | **Hash Table** | Average $O(1)$ lookup | Instant retrieval of cached page details and DNS metadata using URL keys. |

---

## ✨ Key Features & Interactive Sandboxes

1. **Section 1: "Inside Your Browser" (Hero Mockup)**
   - Interactive browser chrome mockup featuring address bar, tabs, back/forward buttons, and history icon.
   - Live hover tooltips revealing the DSA concepts powering each browser UI element.

2. **Section 2: Back & Forward Navigation — Stack Simulation**
   - Visual two-stack layout (**Back Stack** and **Forward Stack**) with active website display.
   - Implements strict **LIFO (Last In, First Out)** logic.
   - Push, Pop, and auto-clearing of the Forward Stack upon new URL visits.
   - Includes preset demo sequence (`Google → YouTube → Wikipedia → GitHub`).

3. **Section 3: Doubly Linked List — Page Connections**
   - Horizontal node visualization (`Google ⇄ YouTube ⇄ Wikipedia ⇄ GitHub`).
   - Displays `prev` pointer, `data` payload, and `next` pointer on every node.
   - Bidirectional navigation controls (`current = current.prev` / `current = current.next`) and dynamic node insertion.

4. **Section 4: Tab Management — Dynamic Array**
   - Visual tab bar coupled with contiguous indexed array memory slots (`Index 0`, `Index 1`, ...).
   - Demonstrates random access $O(1)$, array append (`push`) $O(1)$ amortized, and deletion (`splice`) with element shifting $O(n)$.

5. **Section 5: Browsing History Search — Linear Search**
   - Step-by-step and animated sequential scanner through history entries.
   - Real-time comparison metrics (target, current element, match status, and comparison count).
   - Time complexity explanation: $O(n)$.

6. **Section 6: Hash Table — URL & Cache Lookup**
   - Key-value mapping simulation with URL as key and metadata as value.
   - Hash formula visualizer (`hash(key) % capacity`) demonstrating instant $O(1)$ retrieval.

7. **Section 7: Summary & Conclusion**
   - Complete comparison table with complexity and architectural reasoning.
   - Comprehensive reference mapping every browser capability to its fundamental computer science data structure.

8. **Left Sidebar Navigation (Desktop Slide Indicator)**
   - Persistent vertical sidebar on the left representing each slide/section (`01 Overview` through `07 Summary`).
   - Dynamic scrollspy highlighting the active section as you scroll.

9. **App-Style Mobile Bottom Tab Bar**
   - Fixed to the bottom of the viewport on mobile devices with crisp icons and labels (`Overview`, `Stacks`, `DLL`, `Tabs`, `Search`, `Hash`, `Summary`).
   - Frosted glass effect (`backdrop-filter`), safe-area inset padding for modern phones, and synchronized real-time scrollspy active state.

10. **Universal Hover Tooltip System**
    - Hovering over any data structure element reveals a concise explanation card detailing the DSA concept, time complexity, and practical purpose.

---

## 🚀 How to Run

Simply open `index.html` in any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari):

```bash
# Double-click index.html or open via command line / browser:
start index.html
```
No installation, npm packages, or server setup required.
