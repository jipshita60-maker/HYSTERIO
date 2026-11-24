/**
 * BROWSER HISTORY & TAB MANAGER — DSA INTERACTIVE PLATFORM
 * Educational Vanilla JavaScript Implementation
 * Target: BTech 2nd Year Computer Science / IT
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. GLOBAL HOVER TOOLTIP SYSTEM
     Provides concise, technical DSA explanations for all .dsa-hoverable items.
     ========================================================================== */
  const tooltip = document.getElementById('dsa-tooltip');
  const ttConcept = document.getElementById('tt-concept');
  const ttComplexity = document.getElementById('tt-complexity');
  const ttTitle = document.getElementById('tt-title');
  const ttDesc = document.getElementById('tt-desc');

  function initTooltip() {
    document.body.addEventListener('mouseover', (e) => {
      const target = e.target.closest('.dsa-hoverable');
      if (!target) return;

      const title = target.getAttribute('data-dsa-title') || 'DSA Component';
      const concept = target.getAttribute('data-dsa-concept') || 'Data Structure';
      const desc = target.getAttribute('data-dsa-desc') || 'Practical component in browser implementation.';
      const complexity = target.getAttribute('data-dsa-complexity') || 'O(1)';

      ttTitle.textContent = title;
      ttConcept.textContent = concept;
      ttDesc.textContent = desc;
      ttComplexity.textContent = complexity;

      tooltip.classList.add('visible');
      positionTooltip(e);
    });

    document.body.addEventListener('mousemove', (e) => {
      if (tooltip.classList.contains('visible')) {
        positionTooltip(e);
      }
    });

    document.body.addEventListener('mouseout', (e) => {
      const target = e.target.closest('.dsa-hoverable');
      if (target) {
        tooltip.classList.remove('visible');
      }
    });
  }

  function positionTooltip(e) {
    const tooltipWidth = 270;
    const tooltipHeight = tooltip.offsetHeight || 100;
    const padding = 15;

    let left = e.clientX + padding;
    let top = e.clientY + padding;

    // Prevent right overflow
    if (left + tooltipWidth > window.innerWidth) {
      left = e.clientX - tooltipWidth - padding;
    }
    // Prevent bottom overflow
    if (top + tooltipHeight > window.innerHeight) {
      top = e.clientY - tooltipHeight - padding;
    }

    tooltip.style.left = `${Math.max(10, left)}px`;
    tooltip.style.top = `${Math.max(10, top)}px`;
  }

  initTooltip();


  /* ==========================================================================
     2. SECTION 2: BACK & FORWARD NAVIGATION — STACK SIMULATION
     Back Stack and Forward Stack using LIFO principle
     ========================================================================== */
  class BrowserNavigationStacks {
    constructor() {
      this.backStack = [];
      this.forwardStack = [];
      this.currentPage = "Google";
      this.urlMap = {
        "Google": "https://www.google.com",
        "YouTube": "https://www.youtube.com",
        "Wikipedia": "https://www.wikipedia.org",
        "GitHub": "https://www.github.com",
        "StackOverflow": "https://stackoverflow.com",
        "Reddit": "https://www.reddit.com"
      };

      // DOM Elements
      this.backStackEl = document.getElementById('back-stack-visual');
      this.forwardStackEl = document.getElementById('forward-stack-visual');
      this.backCountEl = document.getElementById('back-stack-count');
      this.fwdCountEl = document.getElementById('fwd-stack-count');
      this.currentDisplayEl = document.getElementById('current-website-display');
      this.currentUrlEl = document.getElementById('current-website-url');
      this.actionLogEl = document.getElementById('stack-action-log');
      
      this.btnBack = document.getElementById('btn-stack-back');
      this.btnForward = document.getElementById('btn-stack-forward');
      this.btnVisit = document.getElementById('btn-visit');
      this.btnDemo = document.getElementById('btn-stack-demo');
      this.btnReset = document.getElementById('btn-stack-reset');
      this.urlSelect = document.getElementById('new-url-select');

      this.initEventListeners();
      this.render();
    }

    initEventListeners() {
      this.btnVisit.addEventListener('click', () => {
        const selected = this.urlSelect.value;
        this.visit(selected);
      });

      this.btnBack.addEventListener('click', () => this.back());
      this.btnForward.addEventListener('click', () => this.forward());
      this.btnReset.addEventListener('click', () => this.reset());
      this.btnDemo.addEventListener('click', () => this.runDemoSequence());
    }

    visit(website) {
      if (website === this.currentPage) {
        this.log(`Already visiting <strong>${website}</strong>.`);
        return;
      }
      // Push current page onto back stack
      this.backStack.push(this.currentPage);
      // Clear forward stack when visiting new website
      const clearedCount = this.forwardStack.length;
      this.forwardStack = [];
      this.currentPage = website;

      this.log(`Visited <strong>${website}</strong>. Pushed old page to Back Stack. ${clearedCount > 0 ? `Cleared ${clearedCount} item(s) from Forward Stack.` : ''}`);
      this.render();
    }

    back() {
      if (this.backStack.length === 0) {
        this.log(`⚠️ Cannot go Back: <strong>Back Stack is empty</strong>.`);
        return;
      }
      // Push current page onto forward stack
      this.forwardStack.push(this.currentPage);
      // Pop previous page from back stack
      const previousPage = this.backStack.pop();
      this.currentPage = previousPage;

      this.log(`Navigated <strong>Back</strong> ← Restored <strong>${previousPage}</strong> from Back Stack.`);
      this.render();
    }

    forward() {
      if (this.forwardStack.length === 0) {
        this.log(`⚠️ Cannot go Forward: <strong>Forward Stack is empty</strong>.`);
        return;
      }
      // Push current page onto back stack
      this.backStack.push(this.currentPage);
      // Pop next page from forward stack
      const nextPage = this.forwardStack.pop();
      this.currentPage = nextPage;

      this.log(`Navigated <strong>Forward</strong> → Restored <strong>${nextPage}</strong> from Forward Stack.`);
      this.render();
    }

    reset() {
      this.backStack = [];
      this.forwardStack = [];
      this.currentPage = "Google";
      this.log(`Stacks reset to initial state. Active page: Google.`);
      this.render();
    }

    async runDemoSequence() {
      this.btnDemo.disabled = true;
      this.reset();
      
      const sequence = ["YouTube", "Wikipedia", "GitHub"];
      for (const site of sequence) {
        await new Promise(r => setTimeout(r, 700));
        this.visit(site);
      }
      await new Promise(r => setTimeout(r, 900));
      this.back(); // GitHub -> Wikipedia
      await new Promise(r => setTimeout(r, 900));
      this.back(); // Wikipedia -> YouTube
      await new Promise(r => setTimeout(r, 900));
      this.forward(); // YouTube -> Wikipedia
      
      this.btnDemo.disabled = false;
      this.log(`✅ Demo sequence completed (Google → YouTube → Wikipedia → GitHub with Back & Forward steps).`);
    }

    log(msg) {
      this.actionLogEl.innerHTML = `<span class="log-indicator">Action Log:</span> ${msg}`;
    }

    render() {
      // Update Current Page Card
      this.currentDisplayEl.textContent = this.currentPage;
      this.currentUrlEl.textContent = this.urlMap[this.currentPage] || `https://www.${this.currentPage.toLowerCase()}.com`;

      // Render Back Stack (bottom-to-top layout)
      this.renderStack(this.backStackEl, this.backStack, "Back Stack Item", "LIFO Back History Item");
      this.backCountEl.textContent = `${this.backStack.length} item${this.backStack.length === 1 ? '' : 's'}`;

      // Render Forward Stack
      this.renderStack(this.forwardStackEl, this.forwardStack, "Forward Stack Item", "LIFO Forward History Item");
      this.fwdCountEl.textContent = `${this.forwardStack.length} item${this.forwardStack.length === 1 ? '' : 's'}`;

      // Update button disabled states
      this.btnBack.disabled = this.backStack.length === 0;
      this.btnForward.disabled = this.forwardStack.length === 0;
    }

    renderStack(containerEl, stackArray, title, desc) {
      containerEl.innerHTML = '';
      if (stackArray.length === 0) {
        containerEl.innerHTML = '<div class="stack-empty-msg">Stack is empty</div>';
        return;
      }

      stackArray.forEach((item, index) => {
        const itemEl = document.createElement('div');
        const isTop = index === stackArray.length - 1;
        itemEl.className = `stack-item dsa-hoverable ${isTop ? 'top-item' : ''}`;
        itemEl.setAttribute('data-dsa-title', `${item} (${title})`);
        itemEl.setAttribute('data-dsa-concept', isTop ? 'Top Element (Next to Pop)' : 'Stack Element');
        itemEl.setAttribute('data-dsa-desc', isTop ? 'Top of stack. Will be popped first in O(1) time.' : 'Stored deeper in the stack. Accessible only after elements above are popped.');
        itemEl.setAttribute('data-dsa-complexity', 'O(1) Pop Access');

        itemEl.innerHTML = `
          <span>${item}</span>
          ${isTop ? '<span class="item-badge">TOP</span>' : ''}
        `;
        containerEl.appendChild(itemEl);
      });
    }
  }

  const stackManager = new BrowserNavigationStacks();


  /* ==========================================================================
     3. SECTION 3: DOUBLY LINKED LIST SIMULATION
     Google ⇄ YouTube ⇄ Wikipedia ⇄ GitHub
     ========================================================================== */
  class DLLNode {
    constructor(name, url) {
      this.name = name;
      this.url = url;
      this.prev = null;
      this.next = null;
    }
  }

  class DoublyLinkedListHistory {
    constructor() {
      this.head = null;
      this.tail = null;
      this.current = null;
      this.containerEl = document.getElementById('dll-nodes-container');
      this.actionLogEl = document.getElementById('dll-action-log');

      this.btnPrev = document.getElementById('btn-dll-prev');
      this.btnNext = document.getElementById('btn-dll-next');
      this.btnInsert = document.getElementById('btn-dll-insert');
      this.btnReset = document.getElementById('btn-dll-reset');
      this.insertInput = document.getElementById('dll-insert-name');

      this.initDefaultChain();
      this.initEventListeners();
      this.render();
    }

    initDefaultChain() {
      const sites = [
        { name: "Google", url: "google.com" },
        { name: "YouTube", url: "youtube.com" },
        { name: "Wikipedia", url: "wikipedia.org" },
        { name: "GitHub", url: "github.com" }
      ];

      this.head = null;
      this.tail = null;
      let prevNode = null;

      sites.forEach(s => {
        const node = new DLLNode(s.name, s.url);
        if (!this.head) {
          this.head = node;
        } else {
          prevNode.next = node;
          node.prev = prevNode;
        }
        prevNode = node;
        this.tail = node;
      });

      this.current = this.head; // Start at Google
    }

    initEventListeners() {
      this.btnPrev.addEventListener('click', () => this.traversePrev());
      this.btnNext.addEventListener('click', () => this.traverseNext());
      this.btnInsert.addEventListener('click', () => {
        const val = this.insertInput.value.trim();
        if (val) {
          this.insertAfterCurrent(val);
          this.insertInput.value = '';
        }
      });
      this.btnReset.addEventListener('click', () => {
        this.initDefaultChain();
        this.log(`Reset Doubly Linked List to default 4-node chain.`);
        this.render();
      });
    }

    traversePrev() {
      if (this.current && this.current.prev) {
        this.current = this.current.prev;
        this.log(`Traversed backward (<code>current = current.prev</code>) to <strong>${this.current.name}</strong>.`);
        this.render();
      } else {
        this.log(`⚠️ Reached Head of list. No previous node.`);
      }
    }

    traverseNext() {
      if (this.current && this.current.next) {
        this.current = this.current.next;
        this.log(`Traversed forward (<code>current = current.next</code>) to <strong>${this.current.name}</strong>.`);
        this.render();
      } else {
        this.log(`⚠️ Reached Tail of list. No next node.`);
      }
    }

    insertAfterCurrent(name) {
      const newNode = new DLLNode(name, `${name.toLowerCase()}.com`);
      newNode.prev = this.current;
      newNode.next = null; // Truncate forward history when navigating to a fresh branch

      if (this.current) {
        this.current.next = newNode;
      }
      this.tail = newNode;
      this.current = newNode;

      this.log(`Inserted new node <strong>${name}</strong> after current position. Forward branch updated.`);
      this.render();
    }

    log(msg) {
      this.actionLogEl.innerHTML = `<span class="log-indicator">DLL Pointer:</span> ${msg}`;
    }

    render() {
      this.containerEl.innerHTML = '';
      let temp = this.head;

      while (temp) {
        const isCurrent = temp === this.current;
        const prevLabel = temp.prev ? temp.prev.name : "NULL";
        const nextLabel = temp.next ? temp.next.name : "NULL";

        // Node Visual Container
        const nodeDiv = document.createElement('div');
        nodeDiv.className = `dll-node-box dsa-hoverable ${isCurrent ? 'current' : ''}`;
        nodeDiv.setAttribute('data-dsa-title', `${temp.name} (DLL Node)`);
        nodeDiv.setAttribute('data-dsa-concept', 'Doubly Linked List Node');
        nodeDiv.setAttribute('data-dsa-desc', 'A node in a doubly linked list stores data along with pointers to its previous and next nodes.');
        nodeDiv.setAttribute('data-dsa-complexity', 'O(1) Prev/Next Step');

        nodeDiv.innerHTML = `
          ${isCurrent ? '<div class="current-indicator-tag">ACTIVE POINTER</div>' : ''}
          <div class="node-title-bar">Node: ${temp.name}</div>
          <div class="node-pointers-grid">
            <div class="node-ptr prev-ptr" title="Previous pointer">← ${prevLabel}</div>
            <div class="node-ptr next-ptr" title="Next pointer">${nextLabel} →</div>
          </div>
          <div class="node-content-body">
            <div class="node-site-name">${temp.name}</div>
            <div class="node-site-url">${temp.url}</div>
          </div>
        `;

        this.containerEl.appendChild(nodeDiv);

        // Arrow between nodes
        if (temp.next) {
          const arrowDiv = document.createElement('div');
          arrowDiv.className = 'dll-link-arrow';
          arrowDiv.innerHTML = `
            <span>⇄</span>
            <span class="arrow-caption">prev/next</span>
          `;
          this.containerEl.appendChild(arrowDiv);
        }

        temp = temp.next;
      }

      this.btnPrev.disabled = !this.current || !this.current.prev;
      this.btnNext.disabled = !this.current || !this.current.next;
    }
  }

  const dllManager = new DoublyLinkedListHistory();


  /* ==========================================================================
     4. SECTION 4: TAB MANAGEMENT — ARRAY / DYNAMIC ARRAY
     Index 0: Google, Index 1: YouTube, Index 2: Wikipedia, Index 3: GitHub
     ========================================================================== */
  class TabArrayManager {
    constructor() {
      this.tabs = ["Google", "YouTube", "Wikipedia", "GitHub"];
      this.activeTabIndex = 0;

      this.tabBarEl = document.getElementById('live-tab-bar');
      this.memoryGridEl = document.getElementById('array-memory-display');
      this.actionLogEl = document.getElementById('tab-action-log');

      this.tabInput = document.getElementById('tab-name-input');
      this.btnAdd = document.getElementById('btn-add-tab');
      this.btnCloseActive = document.getElementById('btn-close-active-tab');
      this.btnReset = document.getElementById('btn-reset-tabs');

      this.initEventListeners();
      this.render();
    }

    initEventListeners() {
      this.btnAdd.addEventListener('click', () => {
        const val = this.tabInput.value.trim();
        if (val) {
          this.addTab(val);
          this.tabInput.value = '';
        } else {
          this.addTab(`New Tab (${this.tabs.length})`);
        }
      });

      this.btnCloseActive.addEventListener('click', () => {
        if (this.tabs.length > 1) {
          this.closeTab(this.activeTabIndex);
        } else {
          this.log(`⚠️ Cannot close the last remaining tab in the browser.`);
        }
      });

      this.btnReset.addEventListener('click', () => {
        this.tabs = ["Google", "YouTube", "Wikipedia", "GitHub"];
        this.activeTabIndex = 0;
        this.log(`Reset tabs to default array: [Google, YouTube, Wikipedia, GitHub].`);
        this.render();
      });
    }

    addTab(title) {
      this.tabs.push(title);
      this.activeTabIndex = this.tabs.length - 1;
      this.log(`Added tab <strong>"${title}"</strong> at <code>tabs[${this.activeTabIndex}]</code> using <code>push()</code> in amortized O(1) time.`);
      this.render();
    }

    closeTab(index) {
      if (this.tabs.length <= 1) return;
      const closedTitle = this.tabs[index];
      this.tabs.splice(index, 1);

      if (this.activeTabIndex >= this.tabs.length) {
        this.activeTabIndex = this.tabs.length - 1;
      }

      this.log(`Closed <strong>"${closedTitle}"</strong> at index [${index}]. Elements to the right were shifted left by 1 position in O(n) time.`);
      this.render();
    }

    switchTab(index) {
      this.activeTabIndex = index;
      this.log(`Switched to tab <strong>"${this.tabs[index]}"</strong> at index [${index}] using direct pointer index access in O(1) time.`);
      this.render();
    }

    log(msg) {
      this.actionLogEl.innerHTML = `<span class="log-indicator">Array Status:</span> ${msg}`;
    }

    render() {
      // 1. Render Browser Tab Strip (Visual UI)
      this.tabBarEl.innerHTML = '';
      this.tabs.forEach((tab, index) => {
        const tabEl = document.createElement('div');
        const isActive = index === this.activeTabIndex;
        tabEl.className = `interactive-tab dsa-hoverable ${isActive ? 'active' : ''}`;
        tabEl.setAttribute('data-dsa-title', `Tab UI Component [Index ${index}]`);
        tabEl.setAttribute('data-dsa-concept', 'Array Element Access');
        tabEl.setAttribute('data-dsa-desc', 'An array stores multiple tab references using indexed positions, allowing the system to access a particular tab by its index.');
        tabEl.setAttribute('data-dsa-complexity', 'O(1) Random Access');

        tabEl.innerHTML = `
          <span>${tab}</span>
          ${this.tabs.length > 1 ? `<span class="tab-x-btn" title="Close Tab [Index ${index}]">&times;</span>` : ''}
        `;

        // Switch on tab click
        tabEl.addEventListener('click', (e) => {
          if (e.target.classList.contains('tab-x-btn')) {
            e.stopPropagation();
            this.closeTab(index);
          } else {
            this.switchTab(index);
          }
        });

        this.tabBarEl.appendChild(tabEl);
      });

      // 2. Render Array Memory Slots Grid
      this.memoryGridEl.innerHTML = '';
      this.tabs.forEach((tab, index) => {
        const slotEl = document.createElement('div');
        const isActive = index === this.activeTabIndex;
        slotEl.className = `array-slot-card dsa-hoverable ${isActive ? 'active' : ''}`;
        slotEl.setAttribute('data-dsa-title', `Array Index [${index}]`);
        slotEl.setAttribute('data-dsa-concept', 'Contiguous Memory Slot');
        slotEl.setAttribute('data-dsa-desc', 'An array stores multiple tab references using indexed positions, allowing the system to access a particular tab by its index.');
        slotEl.setAttribute('data-dsa-complexity', 'O(1) Direct Indexing');

        // Simulated contiguous memory address: 0x1000 + (index * 4)
        const hexAddr = `0x${(0x1040 + index * 4).toString(16).toUpperCase()}`;

        slotEl.innerHTML = `
          <div class="slot-index">Index ${index}</div>
          <div class="slot-value">${tab}</div>
          <div class="slot-address">${hexAddr}</div>
        `;

        slotEl.addEventListener('click', () => this.switchTab(index));
        this.memoryGridEl.appendChild(slotEl);
      });
    }
  }

  const tabManager = new TabArrayManager();


  /* ==========================================================================
     5. SECTION 5: BROWSING HISTORY SEARCH — LINEAR SEARCH
     List: Google, Instagram, YouTube, Wikipedia, GitHub
     Manual step-by-step or animated sequential comparison
     ========================================================================== */
  class HistoryLinearSearch {
    constructor() {
      this.history = ["Google", "Instagram", "YouTube", "Wikipedia", "GitHub"];
      this.currentIndex = -1;
      this.target = "Wikipedia";
      this.comparisons = 0;
      this.isSearching = false;

      // DOM Elements
      this.containerEl = document.getElementById('history-items-container');
      this.inputEl = document.getElementById('history-search-input');
      this.btnRun = document.getElementById('btn-run-search');
      this.btnStep = document.getElementById('btn-step-search');
      this.btnReset = document.getElementById('btn-reset-search');

      this.metricTarget = document.getElementById('metric-target');
      this.metricCurrent = document.getElementById('metric-current');
      this.metricMatch = document.getElementById('metric-match');
      this.metricComparisons = document.getElementById('metric-comparisons');
      this.metricResult = document.getElementById('metric-result');

      this.initEventListeners();
      this.render();
    }

    initEventListeners() {
      this.btnRun.addEventListener('click', () => {
        const val = this.inputEl.value.trim();
        if (val) this.runAnimatedSearch(val);
      });

      this.btnStep.addEventListener('click', () => {
        const val = this.inputEl.value.trim();
        if (val) this.stepSearch(val);
      });

      this.btnReset.addEventListener('click', () => this.reset());
    }

    reset() {
      this.currentIndex = -1;
      this.comparisons = 0;
      this.isSearching = false;
      this.metricCurrent.textContent = '-';
      this.metricMatch.textContent = 'Idle';
      this.metricComparisons.textContent = '0';
      this.metricResult.textContent = 'Ready';
      this.render();
    }

    stepSearch(targetTerm) {
      this.target = targetTerm;
      this.metricTarget.textContent = this.target;

      // If finished previously, reset start
      if (this.currentIndex >= this.history.length - 1 || this.metricResult.textContent.includes('Found')) {
        this.currentIndex = -1;
        this.comparisons = 0;
      }

      this.currentIndex++;
      if (this.currentIndex < this.history.length) {
        this.comparisons++;
        this.metricComparisons.textContent = this.comparisons;
        const currentItem = this.history[this.currentIndex];
        this.metricCurrent.textContent = `[${this.currentIndex}] ${currentItem}`;

        const isMatch = currentItem.toLowerCase() === this.target.toLowerCase();
        this.metricMatch.textContent = isMatch ? "YES (Match!)" : "NO (Mismatch)";

        if (isMatch) {
          this.metricResult.textContent = `Found at index [${this.currentIndex}] in ${this.comparisons} comparisons`;
        } else if (this.currentIndex === this.history.length - 1) {
          this.metricResult.textContent = `Not found after ${this.comparisons} comparisons`;
        } else {
          this.metricResult.textContent = `Searching... (Step ${this.currentIndex + 1}/${this.history.length})`;
        }
      }
      this.render();
    }

    async runAnimatedSearch(targetTerm) {
      if (this.isSearching) return;
      this.isSearching = true;
      this.btnRun.disabled = true;
      this.btnStep.disabled = true;

      this.target = targetTerm;
      this.metricTarget.textContent = this.target;
      this.currentIndex = -1;
      this.comparisons = 0;
      this.render();

      for (let i = 0; i < this.history.length; i++) {
        this.currentIndex = i;
        this.comparisons++;
        this.metricComparisons.textContent = this.comparisons;
        const currentItem = this.history[i];
        this.metricCurrent.textContent = `[${i}] ${currentItem}`;

        const isMatch = currentItem.toLowerCase() === this.target.toLowerCase();
        this.metricMatch.textContent = isMatch ? "YES (Match!)" : "NO (Mismatch)";

        if (isMatch) {
          this.metricResult.textContent = `Found at index [${i}] in ${this.comparisons} comparisons!`;
          this.render();
          break;
        } else {
          this.metricResult.textContent = `Checking index [${i}]...`;
          this.render();
          await new Promise(r => setTimeout(r, 650));
        }

        if (i === this.history.length - 1) {
          this.metricResult.textContent = `Not found after ${this.comparisons} comparisons.`;
        }
      }

      this.isSearching = false;
      this.btnRun.disabled = false;
      this.btnStep.disabled = false;
    }

    render() {
      this.containerEl.innerHTML = '';
      this.history.forEach((site, index) => {
        const itemEl = document.createElement('div');
        let stateClass = '';
        let statusTag = 'Unchecked';

        if (this.currentIndex >= 0) {
          if (index === this.currentIndex) {
            const isMatch = site.toLowerCase() === this.target.toLowerCase();
            stateClass = isMatch ? 'matched' : 'checking';
            statusTag = isMatch ? 'MATCH FOUND' : 'CHECKING';
          } else if (index < this.currentIndex) {
            stateClass = 'passed';
            statusTag = 'Passed (No Match)';
          }
        }

        itemEl.className = `history-row-item dsa-hoverable ${stateClass}`;
        itemEl.setAttribute('data-dsa-title', `History Item [Index ${index}]`);
        itemEl.setAttribute('data-dsa-concept', 'Linear Search Inspection');
        itemEl.setAttribute('data-dsa-desc', 'Linear Search checks elements sequentially until the required element is found or the list ends. Time complexity: O(n).');
        itemEl.setAttribute('data-dsa-complexity', 'O(n) Linear Time');

        itemEl.innerHTML = `
          <div class="item-left">
            <span class="history-index">Index [${index}]</span>
            <span class="history-name">${site}</span>
          </div>
          <span class="history-status-tag">${statusTag}</span>
        `;

        this.containerEl.appendChild(itemEl);
      });
    }
  }

  const searchManager = new HistoryLinearSearch();


  /* ==========================================================================
     6. SECTION 6: HASH TABLE — URL & CACHE LOOKUP
     Key: website URL -> Value: website metadata/details
     Average O(1) constant time lookup
     ========================================================================== */
  class HashTableManager {
    constructor() {
      this.bucketCount = 5;
      this.tableData = {
        "youtube.com": {
          title: "YouTube — Video Streaming Platform",
          protocol: "HTTPS / HTTP/3",
          visits: 142,
          cacheStatus: "Valid (304 Not Modified)",
          dnsIP: "142.250.190.46",
          favicon: "▶️"
        },
        "google.com": {
          title: "Google Search",
          protocol: "HTTPS / TLS 1.3",
          visits: 389,
          cacheStatus: "Fresh (max-age=86400)",
          dnsIP: "142.250.180.206",
          favicon: "🔍"
        },
        "wikipedia.org": {
          title: "Wikipedia, the free encyclopedia",
          protocol: "HTTPS / TLS 1.3",
          visits: 54,
          cacheStatus: "Cached (200 OK)",
          dnsIP: "208.80.154.224",
          favicon: "📖"
        },
        "github.com": {
          title: "GitHub: Where the world builds software",
          protocol: "HTTPS / SSH",
          visits: 210,
          cacheStatus: "Valid (ETag verified)",
          dnsIP: "140.82.121.4",
          favicon: "🐙"
        },
        "stackoverflow.com": {
          title: "Stack Overflow — Developer Q&A",
          protocol: "HTTPS / TLS 1.3",
          visits: 98,
          cacheStatus: "Cached (200 OK)",
          dnsIP: "151.101.65.69",
          favicon: "🥞"
        }
      };

      this.selectKey = document.getElementById('hash-key-select');
      this.btnLookup = document.getElementById('btn-hash-lookup');
      this.formulaEl = document.getElementById('hash-formula-display');
      this.bucketsContainer = document.getElementById('hash-buckets-container');
      this.resultBox = document.getElementById('hash-result-box');

      this.initBuckets();
      this.initEventListeners();
    }

    computeHash(key) {
      let sum = 0;
      for (let i = 0; i < key.length; i++) {
        sum += key.charCodeAt(i);
      }
      return sum % this.bucketCount;
    }

    initBuckets() {
      this.bucketsContainer.innerHTML = '';
      for (let i = 0; i < this.bucketCount; i++) {
        const bucketEl = document.createElement('div');
        bucketEl.className = 'hash-bucket-item dsa-hoverable';
        bucketEl.id = `bucket-slot-${i}`;
        bucketEl.setAttribute('data-dsa-title', `Hash Bucket [Index ${i}]`);
        bucketEl.setAttribute('data-dsa-concept', 'Hash Table Bucket');
        bucketEl.setAttribute('data-dsa-desc', 'Key-value slot reached instantaneously via hash(key) % capacity in average O(1) time.');
        bucketEl.setAttribute('data-dsa-complexity', 'Average O(1)');

        bucketEl.innerHTML = `
          <span>Bucket [${i}]</span>
          <span class="bucket-key-label" id="bucket-key-${i}">Empty</span>
        `;
        this.bucketsContainer.appendChild(bucketEl);
      }
    }

    initEventListeners() {
      this.btnLookup.addEventListener('click', () => {
        const key = this.selectKey.value;
        this.lookupKey(key);
      });
    }

    lookupKey(key) {
      const bucketIndex = this.computeHash(key);
      const data = this.tableData[key];

      // Update Formula Text
      this.formulaEl.innerHTML = `hash("<strong>${key}</strong>") % 5 = <strong>Bucket [${bucketIndex}]</strong>`;

      // Highlight target bucket
      document.querySelectorAll('.hash-bucket-item').forEach(b => b.classList.remove('active'));
      const activeBucket = document.getElementById(`bucket-slot-${bucketIndex}`);
      if (activeBucket) {
        activeBucket.classList.add('active');
        const keyLabel = document.getElementById(`bucket-key-${bucketIndex}`);
        if (keyLabel) keyLabel.textContent = key;
      }

      // Display Retrieved Value Object
      if (data) {
        this.resultBox.innerHTML = `
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
            <span style="font-size:1.4rem;">${data.favicon}</span>
            <div>
              <strong style="font-size:1rem; color:var(--text-main);">${data.title}</strong>
              <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">${key}</div>
            </div>
          </div>
          <div style="font-size:0.825rem; line-height:1.6; border-top:1px dashed var(--border-color); padding-top:0.5rem;">
            <div><strong>Protocol:</strong> ${data.protocol}</div>
            <div><strong>Cached IP:</strong> <code>${data.dnsIP}</code></div>
            <div><strong>Cache Status:</strong> <span class="badge-green">${data.cacheStatus}</span></div>
            <div><strong>Lifetime Visits:</strong> ${data.visits} times</div>
          </div>
        `;
      }
    }
  }

  const hashManager = new HashTableManager();


  /* ==========================================================================
     7. HERO MOCKUP LIVE INTERACTIVITY
     ========================================================================== */
  const mockupTabs = document.querySelectorAll('.mockup-tab');
  const heroAddress = document.querySelector('#browser-hero-mockup .url-text');
  
  mockupTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      mockupTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const title = tab.querySelector('.tab-title').textContent.toLowerCase();
      heroAddress.textContent = `https://www.${title}.com`;
    });
  });


  /* ==========================================================================
     8. SCROLLSPY ACTIVE NAVIGATION (DESKTOP SIDEBAR & MOBILE BOTTOM TABS)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.sidebar-nav .nav-link');
  const mobileTabLinks = document.querySelectorAll('.mobile-bottom-bar .mobile-tab-item');

  function updateActiveNavigation() {
    let current = '';
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    if (current) {
      desktopNavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
      });
      mobileTabLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
      });
    }
  }

  window.addEventListener('scroll', updateActiveNavigation);
  updateActiveNavigation(); // Run on initial page load

});
