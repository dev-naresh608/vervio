import type { TopicCategory } from '../types';

export const DEFAULT_CATEGORIES: TopicCategory[] = [
  {
  id: "javascript",
  name: "JavaScript",
  source: "default",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  iconName: "Code2",
  description:
    "JavaScript fundamentals, execution model, asynchronous programming, closures, prototypes, and production JavaScript",
  topics: {
    easy: [
      {
        id: "js-e-001",
        title: "What is the difference between var, let, and const?",
      },
      {
        id: "js-e-002",
        title:
          "What are primitive and reference data types in JavaScript?",
      },
      {
        id: "js-e-003",
        title: "What is the difference between == and ===?",
      },
      {
        id: "js-e-004",
        title:
          "What is scope in JavaScript? Explain global, function, and block scope.",
      },
      {
        id: "js-e-005",
        title: "What is hoisting in JavaScript?",
      },
      {
        id: "js-e-006",
        title: "What is a closure? Give a practical example.",
      },
      {
        id: "js-e-007",
        title:
          "What is the difference between regular functions and arrow functions?",
      },
      {
        id: "js-e-008",
        title: "What is the difference between null and undefined?",
      },
      {
        id: "js-e-009",
        title:
          "What are map(), filter(), and reduce() used for?",
      },
      {
        id: "js-e-010",
        title: "What is a Promise and why is it used?",
      },
    ],

    medium: [
      {
        id: "js-m-001",
        title: "How does the JavaScript event loop work?",
      },
      {
        id: "js-m-002",
        title:
          "What is the difference between the call stack, microtask queue, and macrotask queue?",
      },
      {
        id: "js-m-003",
        title:
          "How does this work in JavaScript in different invocation contexts?",
      },
      {
        id: "js-m-004",
        title:
          "What is the difference between call(), apply(), and bind()?",
      },
      {
        id: "js-m-005",
        title:
          "What is the prototype chain and how does property lookup work?",
      },
      {
        id: "js-m-006",
        title:
          "What is the difference between shallow copy and deep copy?",
      },
      {
        id: "js-m-007",
        title: "How does async/await work with Promises?",
      },
      {
        id: "js-m-008",
        title:
          "What is the difference between Promise.all(), Promise.allSettled(), Promise.race(), and Promise.any()?",
      },
      {
        id: "js-m-009",
        title:
          "What is the difference between debouncing and throttling, and when would you use each?",
      },
      {
        id: "js-m-010",
        title:
          "What is the Temporal Dead Zone (TDZ), and why does it exist?",
      },
    ],

    hard: [
      {
        id: "js-h-001",
        title:
          "Given synchronous code, setTimeout, Promise.then, and queueMicrotask, how would you determine the exact execution order and explain why?",
      },
      {
        id: "js-h-002",
        title:
          "How do closures work at runtime, and how can they contribute to memory leaks?",
      },
      {
        id: "js-h-003",
        title:
          "A search box sends an API request for every keystroke, and an older response sometimes overwrites a newer response. How would you prevent this race condition?",
      },
      {
        id: "js-h-004",
        title:
          "Explain how JavaScript's prototype-based inheritance works underneath the class syntax.",
      },
      {
        id: "js-h-005",
        title:
          "What happens when a Promise is resolved with another Promise or a thenable?",
      },
      {
        id: "js-h-006",
        title:
          "A CPU-intensive JavaScript operation freezes the browser UI. How would you diagnose and solve it?",
      },
      {
        id: "js-h-007",
        title:
          "How does garbage collection work at a high level in JavaScript, and how would you investigate a memory leak?",
      },
      {
        id: "js-h-008",
        title:
          "Multiple asynchronous operations update the same application state and occasionally produce inconsistent results. How would you identify and prevent the race condition?",
      },
      {
        id: "js-h-009",
        title:
          "Why can changing object shapes in V8 affect JavaScript performance?",
      },
      {
        id: "js-h-010",
        title:
          "Explain the JavaScript execution context, lexical environment, scope chain, and how they relate to closures and variable resolution.",
      },
    ],
  },
},{
  id: "react",
  name: "React",
  source: "default",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  iconName: "Atom",
  description:
    "React components, hooks, rendering, reconciliation, state management, performance, and production patterns",
  topics: {
    easy: [
      {
        id: "react-e-001",
        title: "What is React and what problem does it solve?",
      },
      {
        id: "react-e-002",
        title: "What is a React component?",
      },
      {
        id: "react-e-003",
        title: "What is the difference between props and state in React?",
      },
      {
        id: "react-e-004",
        title: "What is JSX and how is it different from HTML?",
      },
      {
        id: "react-e-005",
        title: "Why is the key prop important when rendering lists in React?",
      },
      {
        id: "react-e-006",
        title: "What is conditional rendering in React?",
      },
      {
        id: "react-e-007",
        title: "What is useState and when would you use it?",
      },
      {
        id: "react-e-008",
        title: "What is useEffect and what is it commonly used for?",
      },
      {
        id: "react-e-009",
        title: "What is a controlled component in React?",
      },
      {
        id: "react-e-010",
        title: "What is lifting state up and why is it useful?",
      },
    ],

    medium: [
      {
        id: "react-m-001",
        title:
          "How does React rendering work after a component's state or props change?",
      },
      {
        id: "react-m-002",
        title: "What is the Virtual DOM and how does React use it?",
      },
      {
        id: "react-m-003",
        title:
          "What is reconciliation in React and how do keys affect it?",
      },
      {
        id: "react-m-004",
        title:
          "What is the difference between useEffect and useLayoutEffect?",
      },
      {
        id: "react-m-005",
        title:
          "How does the dependency array of useEffect work, and what problems can incorrect dependencies cause?",
      },
      {
        id: "react-m-006",
        title:
          "What is useMemo and when does memoization make sense in a React application?",
      },
      {
        id: "react-m-007",
        title:
          "What is useCallback and how is it different from useMemo?",
      },
      {
        id: "react-m-008",
        title:
          "What is React.memo and when can it prevent unnecessary renders?",
      },
      {
        id: "react-m-009",
        title:
          "What is the Context API and when should you use it instead of passing props?",
      },
      {
        id: "react-m-010",
        title:
          "How would you design reusable custom hooks in a medium-sized React application?",
      },
    ],

    hard: [
      {
        id: "react-h-001",
        title:
          "A React component re-renders far more often than expected. How would you identify the cause and optimize it without adding unnecessary memoization?",
      },
      {
        id: "react-h-002",
        title:
          "Explain how reconciliation works and how an incorrect key can cause state to appear on the wrong list item.",
      },
      {
        id: "react-h-003",
        title:
          "A useEffect causes an API request loop. How would you diagnose and fix the dependency problem?",
      },
      {
        id: "react-h-004",
        title:
          "A search component sends multiple API requests and stale responses sometimes overwrite newer results. How would you prevent this?",
      },
      {
        id: "react-h-005",
        title:
          "What is React Fiber and why is its rendering architecture important for modern React applications?",
      },
      {
        id: "react-h-006",
        title:
          "A large React application has unnecessary Context re-renders. How would you redesign the state boundaries and provider structure?",
      },
      {
        id: "react-h-007",
        title:
          "How would you prevent expensive components from re-rendering when unrelated application state changes?",
      },
      {
        id: "react-h-008",
        title:
          "A React application has a memory leak after navigating between pages repeatedly. How would you investigate effects, subscriptions, timers, and event listeners?",
      },
      {
        id: "react-h-009",
        title:
          "How would you design state management for server state, local UI state, and shared application state in a production React application?",
      },
      {
        id: "react-h-010",
        title:
          "A React page becomes slow when rendering thousands of records. How would you diagnose and improve its rendering performance?",
      },
    ],
  },
},{
  id: "nodejs-backend",
  name: "Node.js & Backend",
  source: "default",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  iconName: "Server",
  description:
    "Node.js runtime, asynchronous programming, Express, middleware, backend architecture, error handling, and production backend engineering",
  topics: {
    easy: [
      {
        id: "node-e-001",
        title:
          "What is Node.js and why is it commonly used for backend development?",
      },
      {
        id: "node-e-002",
        title: "What is the Node.js event loop?",
      },
      {
        id: "node-e-003",
        title:
          "What is the difference between blocking and non-blocking code in Node.js?",
      },
      {
        id: "node-e-004",
        title:
          "What is npm and what role does package.json play in a Node.js project?",
      },
      {
        id: "node-e-005",
        title:
          "What is the difference between CommonJS and ES Modules in Node.js?",
      },
      {
        id: "node-e-006",
        title: "What is asynchronous I/O in Node.js?",
      },
      {
        id: "node-e-007",
        title:
          "What is middleware in Express.js and why is it useful?",
      },
      {
        id: "node-e-008",
        title:
          "What is the difference between req.params, req.query, and req.body in Express?",
      },
      {
        id: "node-e-009",
        title:
          "What are HTTP status codes and which status codes are commonly used in REST APIs?",
      },
      {
        id: "node-e-010",
        title:
          "How do you handle errors in an Express.js application?",
      },
    ],

    medium: [
      {
        id: "node-m-001",
        title:
          "Explain how the Node.js event loop works with the call stack, queues, and asynchronous operations.",
      },
      {
        id: "node-m-002",
        title:
          "What is libuv and what role does it play in Node.js?",
      },
      {
        id: "node-m-003",
        title:
          "How can Node.js handle many concurrent I/O operations even though JavaScript runs on a single main thread?",
      },
      {
        id: "node-m-004",
        title:
          "What is the difference between process.nextTick(), setImmediate(), and setTimeout()?",
      },
      {
        id: "node-m-005",
        title:
          "How does Express middleware execution work, and what happens when next() is called?",
      },
      {
        id: "node-m-006",
        title:
          "How would you structure controllers, services, middleware, and routes in a production Node.js API?",
      },
      {
        id: "node-m-007",
        title:
          "How would you design centralized error handling for a production Express API?",
      },
      {
        id: "node-m-008",
        title:
          "How would you validate and sanitize incoming request data in a Node.js API?",
      },
      {
        id: "node-m-009",
        title:
          "How would you implement authentication and authorization middleware in a Node.js API?",
      },
      {
        id: "node-m-010",
        title:
          "How would you safely handle file uploads in a Node.js and Express application?",
      },
    ],

    hard: [
      {
        id: "node-h-001",
        title:
          "Explain the Node.js event loop phases and reason about the execution order of different asynchronous callbacks.",
      },
      {
        id: "node-h-002",
        title:
          "A CPU-intensive operation blocks requests across your Node.js server. How would you diagnose and solve the problem?",
      },
      {
        id: "node-h-003",
        title:
          "When would you use worker_threads, child_process, or multiple Node.js processes?",
      },
      {
        id: "node-h-004",
        title:
          "A Node.js service experiences increasing memory usage over time. How would you investigate a possible memory leak?",
      },
      {
        id: "node-h-005",
        title:
          "How would you implement graceful shutdown for a production Node.js server?",
      },
      {
        id: "node-h-006",
        title:
          "A Node.js service makes many outbound API calls and starts exhausting connections. How would you design timeouts, retries, connection reuse, and concurrency limits?",
      },
      {
        id: "node-h-007",
        title:
          "How would you design rate limiting for a Node.js API running across multiple server instances?",
      },
      {
        id: "node-h-008",
        title:
          "A client retries an API request after not receiving the response, causing the same operation to execute twice. How would you make the API idempotent?",
      },
      {
        id: "node-h-009",
        title:
          "Multiple concurrent requests update the same resource and occasionally produce inconsistent results. How would you identify and prevent the race condition?",
      },
      {
        id: "node-h-010",
        title:
          "How would you design a production-grade Node.js backend for high traffic, including scaling, caching, observability, security, and failure handling?",
      },
    ],
  },
},{
  id: "mongodb-databases",
  name: "MongoDB & Databases",
  source: "default",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  iconName: "Database",
  description:
    "MongoDB, Mongoose, data modeling, queries, indexing, aggregation, transactions, concurrency, and production database engineering",
  topics: {
    easy: [
      {
        id: "mongo-e-001",
        title:
          "What is MongoDB and how is it different from a relational database?",
      },
      {
        id: "mongo-e-002",
        title: "What are documents and collections in MongoDB?",
      },
      {
        id: "mongo-e-003",
        title:
          "What is the difference between embedding and referencing documents in MongoDB?",
      },
      {
        id: "mongo-e-004",
        title:
          "What is an ObjectId in MongoDB and why is it commonly used?",
      },
      {
        id: "mongo-e-005",
        title:
          "What is a MongoDB index and why does it improve query performance?",
      },
      {
        id: "mongo-e-006",
        title:
          "What is the difference between find() and findOne() in MongoDB?",
      },
      {
        id: "mongo-e-007",
        title:
          "What are insertOne(), updateOne(), and deleteOne() used for?",
      },
      {
        id: "mongo-e-008",
        title: "What is the MongoDB aggregation pipeline?",
      },
      {
        id: "mongo-e-009",
        title:
          "What is Mongoose and why would you use it with MongoDB?",
      },
      {
        id: "mongo-e-010",
        title:
          "What is a Mongoose schema and what purpose does it serve?",
      },
    ],

    medium: [
      {
        id: "mongo-m-001",
        title:
          "How would you decide whether to embed or reference related data in a MongoDB schema?",
      },
      {
        id: "mongo-m-002",
        title:
          "How do MongoDB indexes work, and what are the trade-offs of creating too many indexes?",
      },
      {
        id: "mongo-m-003",
        title:
          "How would you design indexes for a collection frequently queried by userId, status, and createdAt?",
      },
      {
        id: "mongo-m-004",
        title:
          "What is a compound index in MongoDB and why does field order matter?",
      },
      {
        id: "mongo-m-005",
        title:
          "Explain common aggregation stages such as $match, $group, $lookup, $project, and $sort.",
      },
      {
        id: "mongo-m-006",
        title:
          "When would you use MongoDB aggregation instead of processing the data in Node.js?",
      },
      {
        id: "mongo-m-007",
        title:
          "How does Mongoose populate() work and what performance concerns should you consider?",
      },
      {
        id: "mongo-m-008",
        title:
          "How would you implement pagination for a large MongoDB collection?",
      },
      {
        id: "mongo-m-009",
        title:
          "What are MongoDB transactions and when would an application need one?",
      },
      {
        id: "mongo-m-010",
        title:
          "How would you validate MongoDB data using Mongoose while protecting the API from invalid input?",
      },
    ],

    hard: [
      {
        id: "mongo-h-001",
        title:
          "A MongoDB query becomes slow as the collection grows to millions of documents. How would you diagnose and fix it?",
      },
      {
        id: "mongo-h-002",
        title:
          "How would you use explain() to determine whether a MongoDB query is using an appropriate index?",
      },
      {
        id: "mongo-h-003",
        title:
          "A compound index exists but MongoDB still performs an inefficient query. What would you investigate?",
      },
      {
        id: "mongo-h-004",
        title:
          "How would you design a MongoDB schema for an e-commerce order system while preserving historical order data?",
      },
      {
        id: "mongo-h-005",
        title:
          "Two concurrent requests try to decrement the same inventory quantity. How would you prevent incorrect stock values?",
      },
      {
        id: "mongo-h-006",
        title:
          "When would you use a MongoDB transaction instead of an atomic update, and what trade-offs does a transaction introduce?",
      },
      {
        id: "mongo-h-007",
        title:
          "An aggregation pipeline becomes expensive in production. How would you identify the expensive stages and optimize it?",
      },
      {
        id: "mongo-h-008",
        title:
          "How would you design pagination for millions of MongoDB documents where users frequently move through sorted results?",
      },
      {
        id: "mongo-h-009",
        title:
          "A MongoDB-backed API has high read traffic and increasing latency. What database and application-level strategies would you consider?",
      },
      {
        id: "mongo-h-010",
        title:
          "How would you design MongoDB for a production application requiring high availability, backups, monitoring, and horizontal scaling?",
      },
    ],
  },
},{
  id: "typescript",
  name: "TypeScript",
  source: "default",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  iconName: "FileCode2",
  description:
    "TypeScript type system, interfaces, generics, type narrowing, utility types, advanced types, and production TypeScript patterns",
  topics: {
    easy: [
      {
        id: "ts-e-001",
        title: "What is TypeScript and why would you use it instead of plain JavaScript?",
      },
      {
        id: "ts-e-002",
        title: "What is the difference between a type and an interface in TypeScript?",
      },
      {
        id: "ts-e-003",
        title: "What is type inference in TypeScript?",
      },
      {
        id: "ts-e-004",
        title: "What is the difference between any, unknown, and never?",
      },
      {
        id: "ts-e-005",
        title: "What are union types and intersection types?",
      },
      {
        id: "ts-e-006",
        title: "What are optional properties and readonly properties?",
      },
      {
        id: "ts-e-007",
        title: "What are enums in TypeScript and what alternatives can be used instead?",
      },
      {
        id: "ts-e-008",
        title: "How do you type function parameters and return values in TypeScript?",
      },
      {
        id: "ts-e-009",
        title: "What is type narrowing and why is it useful?",
      },
      {
        id: "ts-e-010",
        title: "What are generic types and why are they useful?",
      },
    ],

    medium: [
      {
        id: "ts-m-001",
        title: "What is the difference between type assertions and type narrowing?",
      },
      {
        id: "ts-m-002",
        title: "How do generics improve type safety compared with using any?",
      },
      {
        id: "ts-m-003",
        title: "Explain keyof and how it can be used with generic types.",
      },
      {
        id: "ts-m-004",
        title: "What are TypeScript utility types such as Partial, Pick, Omit, Record, and Required used for?",
      },
      {
        id: "ts-m-005",
        title: "How do discriminated unions work and where would you use them?",
      },
      {
        id: "ts-m-006",
        title: "What is the difference between structural typing and nominal typing?",
      },
      {
        id: "ts-m-007",
        title: "How would you type an API response that can represent both success and failure states?",
      },
      {
        id: "ts-m-008",
        title: "How do generics work with functions, interfaces, and classes?",
      },
      {
        id: "ts-m-009",
        title: "What is the difference between interface extension, type intersections, and declaration merging?",
      },
      {
        id: "ts-m-010",
        title: "How would you gradually migrate a JavaScript project to TypeScript without rewriting the entire application?",
      },
    ],

    hard: [
      {
        id: "ts-h-001",
        title: "How would you design a strongly typed API client that derives request and response types from shared TypeScript definitions?",
      },
      {
        id: "ts-h-002",
        title: "Explain conditional types and give a practical example where they solve a real typing problem.",
      },
      {
        id: "ts-h-003",
        title: "How do mapped types work, and how would you create a custom utility type?",
      },
      {
        id: "ts-h-004",
        title: "How would you type a function that accepts different arguments and returns different types depending on the input?",
      },
      {
        id: "ts-h-005",
        title: "A TypeScript application contains many unsafe type assertions. How would you redesign the code to improve type safety without making it unnecessarily complex?",
      },
      {
        id: "ts-h-006",
        title: "How would you model complex application state using discriminated unions so that invalid states become difficult to represent?",
      },
      {
        id: "ts-h-007",
        title: "What are variance and assignability in TypeScript, and why can function parameter types behave unexpectedly?",
      },
      {
        id: "ts-h-008",
        title: "How would you design reusable generic React components while preserving accurate inference for their props?",
      },
      {
        id: "ts-h-009",
        title: "How would you type an event-driven system where different event names require different payload shapes?",
      },
      {
        id: "ts-h-010",
        title: "A large TypeScript project has slow compilation and increasingly complex types. How would you diagnose and improve its type-checking performance and maintainability?",
      },
    ],
  },
},{
  id: "web-fundamentals",
  name: "Web Fundamentals",
  source: "default",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  iconName: "Globe",
  description:
    "HTTP, HTTPS, DNS, browsers, cookies, CORS, caching, WebSockets, networking, and core web architecture",
  topics: {
    easy: [
      {
        id: "web-e-001",
        title: "What happens when you enter a URL into a browser and press Enter?",
      },
      {
        id: "web-e-002",
        title: "What is HTTP and how is HTTPS different from HTTP?",
      },
      {
        id: "web-e-003",
        title: "What are HTTP methods and what are GET, POST, PUT, PATCH, and DELETE commonly used for?",
      },
      {
        id: "web-e-004",
        title: "What are HTTP status codes and what do the 2xx, 3xx, 4xx, and 5xx categories represent?",
      },
      {
        id: "web-e-005",
        title: "What is DNS and why is it needed on the web?",
      },
      {
        id: "web-e-006",
        title: "What are cookies and what are they commonly used for?",
      },
      {
        id: "web-e-007",
        title: "What is CORS and why does a browser enforce it?",
      },
      {
        id: "web-e-008",
        title: "What is a CDN and why is it useful for web applications?",
      },
      {
        id: "web-e-009",
        title: "What is caching and where can caching happen in a web application?",
      },
      {
        id: "web-e-010",
        title: "What is a WebSocket and how is it different from a normal HTTP request?",
      },
    ],

    medium: [
      {
        id: "web-m-001",
        title: "Explain the complete lifecycle of an HTTPS request from the browser to the server.",
      },
      {
        id: "web-m-002",
        title: "What happens during a TLS handshake and how does HTTPS establish a secure connection?",
      },
      {
        id: "web-m-003",
        title: "What is the difference between cookies, localStorage, and sessionStorage?",
      },
      {
        id: "web-m-004",
        title: "Explain the same-origin policy and how CORS allows controlled cross-origin requests.",
      },
      {
        id: "web-m-005",
        title: "What are cache-control headers and how would you control browser and intermediary caching?",
      },
      {
        id: "web-m-006",
        title: "What is the difference between HTTP/1.1, HTTP/2, and HTTP/3 at a high level?",
      },
      {
        id: "web-m-007",
        title: "How does a browser render a web page after receiving HTML, CSS, and JavaScript?",
      },
      {
        id: "web-m-008",
        title: "What is the difference between short polling, long polling, Server-Sent Events, and WebSockets?",
      },
      {
        id: "web-m-009",
        title: "What is connection keep-alive and why can reusing connections improve web application performance?",
      },
      {
        id: "web-m-010",
        title: "How would you diagnose a web application where API requests are consistently taking much longer than expected?",
      },
    ],

    hard: [
      {
        id: "web-h-001",
        title: "A production website is fast for some users but very slow for users in another geographic region. How would you investigate the problem?",
      },
      {
        id: "web-h-002",
        title: "Explain how DNS resolution, connection establishment, TLS negotiation, request processing, and response delivery contribute to total page latency.",
      },
      {
        id: "web-h-003",
        title: "A browser sends a preflight OPTIONS request before an API call. Explain why it happens and how you would diagnose a failed preflight.",
      },
      {
        id: "web-h-004",
        title: "How would you design caching for a web application while preventing users from receiving stale or unauthorized data?",
      },
      {
        id: "web-h-005",
        title: "A WebSocket connection frequently disconnects in production. How would you diagnose the issue and design reliable reconnection?",
      },
      {
        id: "web-h-006",
        title: "How would you design a real-time browser application that needs to support thousands of simultaneous WebSocket connections?",
      },
      {
        id: "web-h-007",
        title: "A website has a good server response time but poor user-perceived performance. How would you identify and improve the browser-side bottlenecks?",
      },
      {
        id: "web-h-008",
        title: "How would you design HTTP caching and CDN behavior for versioned frontend assets while ensuring users receive new deployments correctly?",
      },
      {
        id: "web-h-009",
        title: "An API works correctly from Postman but fails from the browser. What browser-specific mechanisms would you investigate first?",
      },
      {
        id: "web-h-010",
        title: "How would you troubleshoot intermittent network failures across browser, CDN, load balancer, application server, and database layers?",
      },
    ],
  },
},{
  id: "rest-api-design",
  name: "REST APIs & API Design",
  source: "default",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  iconName: "Webhook",
  description:
    "REST principles, HTTP semantics, API architecture, validation, pagination, versioning, idempotency, rate limiting, and production API design",
  topics: {
    easy: [
      {
        id: "api-e-001",
        title: "What is a REST API and what are its core principles?",
      },
      {
        id: "api-e-002",
        title: "What is the difference between GET, POST, PUT, PATCH, and DELETE?",
      },
      {
        id: "api-e-003",
        title: "What is the difference between path parameters, query parameters, and request bodies?",
      },
      {
        id: "api-e-004",
        title: "What makes an HTTP request idempotent?",
      },
      {
        id: "api-e-005",
        title: "How should HTTP status codes be used in a well-designed REST API?",
      },
      {
        id: "api-e-006",
        title: "What is the difference between authentication and authorization in an API?",
      },
      {
        id: "api-e-007",
        title: "Why should an API validate incoming request data?",
      },
      {
        id: "api-e-008",
        title: "What is API pagination and why is it needed for large datasets?",
      },
      {
        id: "api-e-009",
        title: "What is API versioning and why might a production API need it?",
      },
      {
        id: "api-e-010",
        title: "What is rate limiting and why should public APIs use it?",
      },
    ],

    medium: [
      {
        id: "api-m-001",
        title: "How would you design resource-oriented REST endpoints for an e-commerce application?",
      },
      {
        id: "api-m-002",
        title: "How would you design consistent success and error response formats across a REST API?",
      },
      {
        id: "api-m-003",
        title: "How would you validate nested request data and return useful validation errors to clients?",
      },
      {
        id: "api-m-004",
        title: "How would you implement pagination, filtering, sorting, and searching for a large API resource?",
      },
      {
        id: "api-m-005",
        title: "What is idempotency and how would you implement idempotency for a payment or order creation endpoint?",
      },
      {
        id: "api-m-006",
        title: "How would you design authentication and authorization for a REST API with multiple user roles?",
      },
      {
        id: "api-m-007",
        title: "How would you implement rate limiting for an API and decide what should count toward a client's limit?",
      },
      {
        id: "api-m-008",
        title: "How would you handle long-running operations in a REST API without keeping the request open indefinitely?",
      },
      {
        id: "api-m-009",
        title: "How would you introduce a breaking API change without immediately breaking existing clients?",
      },
      {
        id: "api-m-010",
        title: "How would you design API error handling so clients can reliably distinguish validation, authentication, authorization, conflict, and server errors?",
      },
    ],

    hard: [
      {
        id: "api-h-001",
        title: "Design an idempotent order creation API that remains safe when clients retry requests because of network failures.",
      },
      {
        id: "api-h-002",
        title: "An API receives duplicate requests concurrently and both can create the same resource. How would you prevent the race condition?",
      },
      {
        id: "api-h-003",
        title: "How would you design a distributed rate limiter for an API running behind multiple application servers?",
      },
      {
        id: "api-h-004",
        title: "How would you design an API for a large dataset where offset pagination becomes slow at high page numbers?",
      },
      {
        id: "api-h-005",
        title: "How would you evolve a widely used REST API while supporting multiple client versions and avoiding inconsistent behavior?",
      },
      {
        id: "api-h-006",
        title: "A REST endpoint becomes slow because it performs several dependent database and service calls. How would you diagnose and redesign it?",
      },
      {
        id: "api-h-007",
        title: "How would you design retries, timeouts, and circuit breaking for an API that depends on unreliable downstream services?",
      },
      {
        id: "api-h-008",
        title: "How would you design an API for asynchronous file processing where the client needs to track job progress and final status?",
      },
      {
        id: "api-h-009",
        title: "How would you design API observability so production teams can trace requests across multiple backend services?",
      },
      {
        id: "api-h-010",
        title: "Design a production-grade REST API architecture that handles authentication, authorization, validation, rate limiting, idempotency, caching, observability, and failures.",
      },
    ],
  },
},{
  id: "authentication-security",
  name: "Authentication & Security",
  source: "default",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  iconName: "ShieldCheck",
  description:
    "Authentication, authorization, JWT, sessions, OAuth, RBAC, password security, common web vulnerabilities, and API security",
  topics: {
    easy: [
      {
        id: "security-e-001",
        title: "What is the difference between authentication and authorization?",
      },
      {
        id: "security-e-002",
        title: "What is JWT and what is it commonly used for?",
      },
      {
        id: "security-e-003",
        title: "What is the difference between session-based authentication and token-based authentication?",
      },
      {
        id: "security-e-004",
        title: "Why should passwords never be stored as plain text?",
      },
      {
        id: "security-e-005",
        title: "What are hashing and salting, and why are they important for password storage?",
      },
      {
        id: "security-e-006",
        title: "What is role-based access control (RBAC)?",
      },
      {
        id: "security-e-007",
        title: "What is CORS and is it an authentication or authorization mechanism?",
      },
      {
        id: "security-e-008",
        title: "What is HTTPS and why is it important for protecting authenticated communication?",
      },
      {
        id: "security-e-009",
        title: "What is an access token and what is a refresh token?",
      },
      {
        id: "security-e-010",
        title: "What is multi-factor authentication and why does it improve account security?",
      },
    ],

    medium: [
      {
        id: "security-m-001",
        title: "Explain the typical JWT authentication flow from login to an authenticated API request.",
      },
      {
        id: "security-m-002",
        title: "Where should access tokens and refresh tokens be stored in a browser application, and what are the security trade-offs?",
      },
      {
        id: "security-m-003",
        title: "How does refresh token rotation improve authentication security?",
      },
      {
        id: "security-m-004",
        title: "How would you implement role-based authorization in a Node.js API?",
      },
      {
        id: "security-m-005",
        title: "What is the difference between HttpOnly, Secure, and SameSite cookie attributes?",
      },
      {
        id: "security-m-006",
        title: "What is XSS and how would you protect a modern web application against it?",
      },
      {
        id: "security-m-007",
        title: "What is CSRF and when is a web application vulnerable to it?",
      },
      {
        id: "security-m-008",
        title: "How would you protect a login endpoint against brute-force and credential-stuffing attacks?",
      },
      {
        id: "security-m-009",
        title: "What is OAuth 2.0 and how is it different from JWT?",
      },
      {
        id: "security-m-010",
        title: "How would you securely implement password reset and email verification flows?",
      },
    ],

    hard: [
      {
        id: "security-h-001",
        title: "Design a production authentication system for a React and Node.js application using short-lived access tokens and refresh tokens.",
      },
      {
        id: "security-h-002",
        title: "A user's access token is stolen. How would you limit the attacker's ability to use it and revoke the affected session?",
      },
      {
        id: "security-h-003",
        title: "How would you design secure refresh token rotation across multiple devices and sessions?",
      },
      {
        id: "security-h-004",
        title: "An API has an authorization vulnerability where users can access another user's resources by changing an ID in the URL. How would you identify and prevent this?",
      },
      {
        id: "security-h-005",
        title: "How would you secure a multi-role application where customers, sellers, drivers, and administrators have different permissions?",
      },
      {
        id: "security-h-006",
        title: "How would you design authentication for multiple backend instances behind a load balancer without relying on in-memory session state?",
      },
      {
        id: "security-h-007",
        title: "A production application is vulnerable to XSS through user-generated content. How would you investigate the vulnerability and design a defense-in-depth solution?",
      },
      {
        id: "security-h-008",
        title: "How would you protect a public API against brute force, credential stuffing, token abuse, and automated attacks?",
      },
      {
        id: "security-h-009",
        title: "How would you securely integrate Google or another OAuth provider while preventing account takeover and incorrect account linking?",
      },
      {
        id: "security-h-010",
        title: "Perform a security review of a production React and Node.js application. What authentication, authorization, input validation, secret management, transport security, and common web vulnerabilities would you investigate?",
      },
    ],
  },
},{
  id: "system-design",
  name: "System Design",
  source: "default",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  iconName: "Network",
  description:
    "Scalability, caching, load balancing, databases, queues, concurrency, distributed systems, reliability, and production architecture",
  topics: {
    easy: [
      {
        id: "sd-e-001",
        title:
          "What is system design and why is it important when building production software?",
      },
      {
        id: "sd-e-002",
        title:
          "What is the difference between vertical scaling and horizontal scaling?",
      },
      {
        id: "sd-e-003",
        title:
          "What is a load balancer and why is it used?",
      },
      {
        id: "sd-e-004",
        title:
          "What is caching and why can it improve application performance?",
      },
      {
        id: "sd-e-005",
        title:
          "What is a database index and why is it important for scalable applications?",
      },
      {
        id: "sd-e-006",
        title:
          "What is a message queue and what problem does it solve?",
      },
      {
        id: "sd-e-007",
        title:
          "What is the difference between synchronous and asynchronous communication?",
      },
      {
        id: "sd-e-008",
        title:
          "What is a stateless backend and why is statelessness useful when scaling servers?",
      },
      {
        id: "sd-e-009",
        title:
          "What is a CDN and when would an application benefit from using one?",
      },
      {
        id: "sd-e-010",
        title:
          "What is the difference between availability, reliability, and scalability?",
      },
    ],

    medium: [
      {
        id: "sd-m-001",
        title:
          "How would you design a URL shortener like Bitly? Explain the major components and data flow.",
      },
      {
        id: "sd-m-002",
        title:
          "How would you design a rate limiter for a public REST API?",
      },
      {
        id: "sd-m-003",
        title:
          "How would you design caching for a frequently requested API endpoint, including cache invalidation?",
      },
      {
        id: "sd-m-004",
        title:
          "How would you design an API that needs to handle significantly more traffic than a single server can support?",
      },
      {
        id: "sd-m-005",
        title:
          "How would you design a background job system for sending emails or processing uploaded files?",
      },
      {
        id: "sd-m-006",
        title:
          "How would you design a notification system that delivers notifications asynchronously?",
      },
      {
        id: "sd-m-007",
        title:
          "How would you decide between SQL and NoSQL for a new application?",
      },
      {
        id: "sd-m-008",
        title:
          "How would you design pagination for an API serving millions of records?",
      },
      {
        id: "sd-m-009",
        title:
          "What is eventual consistency, and when is it acceptable in a distributed application?",
      },
      {
        id: "sd-m-010",
        title:
          "How would you design an e-commerce checkout flow while handling payment failures, retries, and duplicate requests?",
      },
    ],

    hard: [
      {
        id: "sd-h-001",
        title:
          "Design a multi-vendor e-commerce platform that supports customers, sellers, orders, inventory, payments, and delivery tracking at scale.",
      },
      {
        id: "sd-h-002",
        title:
          "Design a highly available URL shortener capable of handling very high read traffic and explain your storage, caching, and scaling strategy.",
      },
      {
        id: "sd-h-003",
        title:
          "Design a distributed rate-limiting system that works correctly when the API runs across many application servers.",
      },
      {
        id: "sd-h-004",
        title:
          "Design a notification platform that supports email, push notifications, retries, delayed delivery, and large message volumes.",
      },
      {
        id: "sd-h-005",
        title:
          "Design a real-time chat system and explain WebSocket connections, message delivery, persistence, reconnection, and scaling.",
      },
      {
        id: "sd-h-006",
        title:
          "Design a file upload and processing system for large files where processing happens asynchronously after upload.",
      },
      {
        id: "sd-h-007",
        title:
          "A production API suddenly receives 10 times its normal traffic. How would you keep the system available and degrade gracefully?",
      },
      {
        id: "sd-h-008",
        title:
          "Design an inventory reservation system that prevents overselling when many customers purchase the same limited-stock product simultaneously.",
      },
      {
        id: "sd-h-009",
        title:
          "Design a distributed job processing system that supports safe retries and prevents duplicate side effects.",
      },
      {
        id: "sd-h-010",
        title:
          "Design a production-grade backend architecture and explain how you would handle observability, failure recovery, caching, database scaling, security, and deployment.",
      },
    ],
  },
},{
  id: "dsa-problem-solving",
  name: "DSA & Problem Solving",
  source: "default",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  iconName: "Brackets",
  description:
    "Data structures, algorithms, complexity analysis, problem-solving patterns, and practical coding interview questions",
  topics: {
    easy: [
      {
        id: "dsa-e-001",
        title:
          "What is Big O notation and why is time complexity important when evaluating an algorithm?",
      },
      {
        id: "dsa-e-002",
        title:
          "What is the difference between an array and a linked list?",
      },
      {
        id: "dsa-e-003",
        title:
          "What is the difference between a stack and a queue?",
      },
      {
        id: "dsa-e-004",
        title:
          "What is a hash table and what is its average time complexity for lookup?",
      },
      {
        id: "dsa-e-005",
        title:
          "How would you find the largest and smallest element in an array efficiently?",
      },
      {
        id: "dsa-e-006",
        title:
          "How would you check whether a string is a palindrome?",
      },
      {
        id: "dsa-e-007",
        title:
          "How would you find duplicate values in an array?",
      },
      {
        id: "dsa-e-008",
        title:
          "What is binary search and when can you use it?",
      },
      {
        id: "dsa-e-009",
        title:
          "What is recursion and what are its advantages and disadvantages?",
      },
      {
        id: "dsa-e-010",
        title:
          "What is the difference between linear search and binary search?",
      },
    ],

    medium: [
      {
        id: "dsa-m-001",
        title:
          "How would you solve the Two Sum problem efficiently, and what is the time complexity?",
      },
      {
        id: "dsa-m-002",
        title:
          "How would you determine whether two strings are anagrams?",
      },
      {
        id: "dsa-m-003",
        title:
          "How would you find the first non-repeating character in a string?",
      },
      {
        id: "dsa-m-004",
        title:
          "How would you find the maximum sum subarray, and what algorithm would you use?",
      },
      {
        id: "dsa-m-005",
        title:
          "Explain the sliding window technique and give a problem where it is useful.",
      },
      {
        id: "dsa-m-006",
        title:
          "Explain the two-pointer technique and when it can reduce the complexity of a problem.",
      },
      {
        id: "dsa-m-007",
        title:
          "How would you detect a cycle in a linked list?",
      },
      {
        id: "dsa-m-008",
        title:
          "How would you reverse a singly linked list iteratively?",
      },
      {
        id: "dsa-m-009",
        title:
          "How would you validate whether a binary tree is a valid binary search tree?",
      },
      {
        id: "dsa-m-010",
        title:
          "How would you find the shortest path in an unweighted graph?",
      },
    ],

    hard: [
      {
        id: "dsa-h-001",
        title:
          "How would you find the length of the longest substring without repeating characters, and what technique would you use?",
      },
      {
        id: "dsa-h-002",
        title:
          "How would you merge overlapping intervals efficiently?",
      },
      {
        id: "dsa-h-003",
        title:
          "How would you find the top K most frequent elements in an array?",
      },
      {
        id: "dsa-h-004",
        title:
          "How would you find the Kth largest element in an unsorted array without fully sorting it?",
      },
      {
        id: "dsa-h-005",
        title:
          "How would you detect whether a directed graph contains a cycle?",
      },
      {
        id: "dsa-h-006",
        title:
          "How would you find the shortest path in a weighted graph with non-negative edge weights?",
      },
      {
        id: "dsa-h-007",
        title:
          "Explain dynamic programming and how you would identify whether a problem can be solved using it.",
      },
      {
        id: "dsa-h-008",
        title:
          "How would you solve the Longest Increasing Subsequence problem, and what complexity can you achieve?",
      },
      {
        id: "dsa-h-009",
        title:
          "How would you design an LRU cache with O(1) average-time get and put operations?",
      },
      {
        id: "dsa-h-010",
        title:
          "Given a large stream of data, how would you find or track the most frequent elements while minimizing memory usage?",
      },
    ],
  },
},{
  id: "testing-debugging",
  name: "Testing & Debugging",
  source: "default",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  iconName: "Bug",
  description:
    "Unit testing, integration testing, end-to-end testing, debugging, test strategy, mocking, logging, and production issue investigation",
  topics: {
    easy: [
      {
        id: "test-e-001",
        title: "What is software testing and why is it important?",
      },
      {
        id: "test-e-002",
        title: "What is the difference between unit testing and integration testing?",
      },
      {
        id: "test-e-003",
        title: "What is end-to-end testing and when would you use it?",
      },
      {
        id: "test-e-004",
        title: "What makes a good unit test?",
      },
      {
        id: "test-e-005",
        title: "What is test coverage and why should it not be treated as the only measure of test quality?",
      },
      {
        id: "test-e-006",
        title: "What is mocking and why is it useful in testing?",
      },
      {
        id: "test-e-007",
        title: "What is the difference between a test failure and a test error?",
      },
      {
        id: "test-e-008",
        title: "How would you debug a JavaScript error in a browser application?",
      },
      {
        id: "test-e-009",
        title: "What is logging and why is it important for debugging backend applications?",
      },
      {
        id: "test-e-010",
        title: "What is regression testing and when should it be performed?",
      },
    ],

    medium: [
      {
        id: "test-m-001",
        title: "How would you decide what parts of a full-stack application should have unit tests versus integration tests?",
      },
      {
        id: "test-m-002",
        title: "How would you test a REST API endpoint from request validation through its database interaction?",
      },
      {
        id: "test-m-003",
        title: "What should you mock in a unit test, and what should you avoid mocking?",
      },
      {
        id: "test-m-004",
        title: "How would you test authentication and authorization in a backend API?",
      },
      {
        id: "test-m-005",
        title: "How would you test a React component that depends on API data and asynchronous state?",
      },
      {
        id: "test-m-006",
        title: "How would you test error handling and failure scenarios instead of only testing successful requests?",
      },
      {
        id: "test-m-007",
        title: "A test passes locally but fails intermittently in CI. How would you investigate the flaky test?",
      },
      {
        id: "test-m-008",
        title: "How would you debug a bug that cannot be reproduced consistently on your local machine?",
      },
      {
        id: "test-m-009",
        title: "How would you structure automated tests in a Node.js and React project so they remain maintainable as the codebase grows?",
      },
      {
        id: "test-m-010",
        title: "What should happen in a CI pipeline when tests fail, and why should failing tests block a production deployment?",
      },
    ],

    hard: [
      {
        id: "test-h-001",
        title: "A production bug was not caught by your existing test suite. How would you determine what test coverage or testing strategy was missing?",
      },
      {
        id: "test-h-002",
        title: "How would you test a distributed workflow involving an API, database, queue, and background worker?",
      },
      {
        id: "test-h-003",
        title: "How would you test race conditions and concurrent requests that update the same resource?",
      },
      {
        id: "test-h-004",
        title: "A large test suite has become extremely slow. How would you identify the bottlenecks and reduce test execution time without sacrificing confidence?",
      },
      {
        id: "test-h-005",
        title: "How would you design tests for an idempotent API where the same request can safely be retried?",
      },
      {
        id: "test-h-006",
        title: "How would you test a payment or order workflow where external services can timeout, fail, or return duplicate responses?",
      },
      {
        id: "test-h-007",
        title: "A React application has many brittle tests that break whenever implementation details change. How would you redesign the testing strategy?",
      },
      {
        id: "test-h-008",
        title: "A production API has intermittent latency spikes. How would you use logs, metrics, traces, and controlled reproduction to identify the root cause?",
      },
      {
        id: "test-h-009",
        title: "How would you design a test strategy for a critical production application that balances unit, integration, contract, and end-to-end tests?",
      },
      {
        id: "test-h-010",
        title: "A critical production incident occurs after a deployment. Walk through how you would investigate, mitigate, identify the root cause, and prevent the issue from recurring.",
      },
    ],
  },
},{
  id: "git-software-engineering",
  name: "Git & Software Engineering",
  source: "default",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  iconName: "GitBranch",
  description:
    "Git workflows, branching, collaboration, code reviews, CI/CD, maintainability, engineering practices, and production software development",
  topics: {
    easy: [
      {
        id: "git-e-001",
        title: "What is Git and why is it used in software development?",
      },
      {
        id: "git-e-002",
        title: "What is the difference between git add, git commit, and git push?",
      },
      {
        id: "git-e-003",
        title: "What is a Git branch and why is branching useful?",
      },
      {
        id: "git-e-004",
        title: "What is the difference between git pull and git fetch?",
      },
      {
        id: "git-e-005",
        title: "What is a merge conflict and how do you resolve one?",
      },
      {
        id: "git-e-006",
        title: "What is a pull request and what is its purpose?",
      },
      {
        id: "git-e-007",
        title: "What is code review and why is it important?",
      },
      {
        id: "git-e-008",
        title: "What is CI/CD and why is it useful?",
      },
      {
        id: "git-e-009",
        title: "What is the difference between git revert and git reset?",
      },
      {
        id: "git-e-010",
        title: "What makes a good Git commit message?",
      },
    ],

    medium: [
      {
        id: "git-m-001",
        title: "What is the difference between git merge and git rebase, and when would you use each?",
      },
      {
        id: "git-m-002",
        title: "How would you structure a Git branching strategy for a team working on a production application?",
      },
      {
        id: "git-m-003",
        title: "You accidentally committed sensitive credentials to Git. What would you do immediately and how would you prevent the problem from happening again?",
      },
      {
        id: "git-m-004",
        title: "How would you safely undo a commit that has already been pushed to a shared branch?",
      },
      {
        id: "git-m-005",
        title: "What should you look for when reviewing a pull request from another developer?",
      },
      {
        id: "git-m-006",
        title: "How would you design a CI pipeline for a React and Node.js application?",
      },
      {
        id: "git-m-007",
        title: "How would you handle a long-running feature branch that has significantly diverged from the main branch?",
      },
      {
        id: "git-m-008",
        title: "What is semantic versioning and how does it help manage software releases?",
      },
      {
        id: "git-m-009",
        title: "How would you organize environment configuration for development, testing, staging, and production?",
      },
      {
        id: "git-m-010",
        title: "How would you balance delivering a feature quickly with keeping the codebase maintainable?",
      },
    ],

    hard: [
      {
        id: "git-h-001",
        title: "A developer force-pushed rewritten history to a shared branch and other developers now have conflicting local histories. How would you recover safely?",
      },
      {
        id: "git-h-002",
        title: "Design a production Git workflow for a team that needs code review, automated testing, staging deployments, and controlled production releases.",
      },
      {
        id: "git-h-003",
        title: "A critical production bug needs to be fixed immediately while several unrelated features are being developed. How would you structure the Git workflow?",
      },
      {
        id: "git-h-004",
        title: "How would you prevent secrets, credentials, generated files, and environment-specific configuration from entering a production repository?",
      },
      {
        id: "git-h-005",
        title: "A pull request contains a large amount of unrelated code mixed with the requested feature. How would you handle the review and improve the development workflow?",
      },
      {
        id: "git-h-006",
        title: "How would you design CI/CD checks that prevent broken, insecure, or untested code from reaching production?",
      },
      {
        id: "git-h-007",
        title: "A deployment passes tests but introduces a production regression. How would you design the release process to reduce the impact and support a fast rollback?",
      },
      {
        id: "git-h-008",
        title: "How would you handle database schema changes when multiple application versions may temporarily run during a deployment?",
      },
      {
        id: "git-h-009",
        title: "A team repeatedly accumulates technical debt while shipping features. How would you make technical debt visible and decide what should be addressed?",
      },
      {
        id: "git-h-010",
        title: "How would you establish engineering practices for a growing team covering code ownership, reviews, testing, releases, observability, and incident response?",
      },
    ],
  },
},{
  id: "project-discussion",
  name: "Project Discussion",
  source: "default",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  iconName: "FolderGit2",
  description:
    "Project architecture, technical decisions, implementation details, trade-offs, challenges, debugging, scalability, and production readiness",
  topics: {
    easy: [
      {
        id: "proj-e-001",
        title:
          "Give a concise overview of your project and explain what problem it solves.",
      },
      {
        id: "proj-e-002",
        title:
          "Who are the target users of your project and what are their main needs?",
      },
      {
        id: "proj-e-003",
        title:
          "What are the most important features of your project?",
      },
      {
        id: "proj-e-004",
        title:
          "Walk me through the main user flow from the frontend to the backend.",
      },
      {
        id: "proj-e-005",
        title:
          "Why did you choose your current technology stack for this project?",
      },
      {
        id: "proj-e-006",
        title:
          "Explain the overall architecture of your project.",
      },
      {
        id: "proj-e-007",
        title:
          "How does the frontend communicate with the backend in your project?",
      },
      {
        id: "proj-e-008",
        title:
          "How is your database structured and what are the main entities?",
      },
      {
        id: "proj-e-009",
        title:
          "Explain how authentication works in your project.",
      },
      {
        id: "proj-e-010",
        title:
          "What was the most challenging feature you implemented and why?",
      },
    ],

    medium: [
      {
        id: "proj-m-001",
        title:
          "Why did you choose this architecture instead of another approach?",
      },
      {
        id: "proj-m-002",
        title:
          "Walk me through one important feature from the user's action to the database and back.",
      },
      {
        id: "proj-m-003",
        title:
          "How did you design your API structure and decide where different responsibilities should live?",
      },
      {
        id: "proj-m-004",
        title:
          "How does authorization work when different users have different roles or permissions?",
      },
      {
        id: "proj-m-005",
        title:
          "How do you validate incoming data and handle invalid requests?",
      },
      {
        id: "proj-m-006",
        title:
          "How does your application handle API failures and unexpected server errors?",
      },
      {
        id: "proj-m-007",
        title:
          "What database indexes or query optimizations does your project use or need?",
      },
      {
        id: "proj-m-008",
        title:
          "How do you handle file uploads or other large payloads safely?",
      },
      {
        id: "proj-m-009",
        title:
          "What technical decision did you change during development, and why?",
      },
      {
        id: "proj-m-010",
        title:
          "If another developer joined your project tomorrow, which part of the codebase would be hardest for them to understand and why?",
      },
    ],

    hard: [
      {
        id: "proj-h-001",
        title:
          "Your project suddenly receives 10 times its normal traffic. Which components would become bottlenecks first and how would you scale them?",
      },
      {
        id: "proj-h-002",
        title:
          "Two users perform conflicting updates to the same resource at nearly the same time. How would your project prevent inconsistent data?",
      },
      {
        id: "proj-h-003",
        title:
          "An important API request succeeds on the server but the client does not receive the response and retries it. How would you prevent duplicate side effects?",
      },
      {
        id: "proj-h-004",
        title:
          "A database query that was fast during development becomes slow in production. How would you investigate and fix it?",
      },
      {
        id: "proj-h-005",
        title:
          "How would you redesign your project if you needed to support multiple backend instances behind a load balancer?",
      },
      {
        id: "proj-h-006",
        title:
          "How would you improve your authentication system if your application had to support a large number of concurrent users?",
      },
      {
        id: "proj-h-007",
        title:
          "How would you protect your project against broken authorization, injection, brute-force attacks, and malicious input?",
      },
      {
        id: "proj-h-008",
        title:
          "A critical production bug affects only a small percentage of users and cannot be reproduced locally. How would you investigate it?",
      },
      {
        id: "proj-h-009",
        title:
          "If you had to rewrite one major part of the project today, what would you change and what evidence supports that decision?",
      },
      {
        id: "proj-h-010",
        title:
          "What are the biggest production risks in your project today, and what would you prioritize fixing first?",
      },
    ],
  },
},{
  id: "hr-behavioral",
  name: "HR & Behavioral",
  source: "default",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  iconName: "Users",
  description:
    "Communication, teamwork, ownership, conflict resolution, failure, adaptability, motivation, leadership, and workplace behavior",
  topics: {
    easy: [
      {
        id: "hr-e-001",
        title: "Tell me about yourself.",
      },
      {
        id: "hr-e-002",
        title: "Why did you choose software development as a career?",
      },
      {
        id: "hr-e-003",
        title: "Why are you interested in this role?",
      },
      {
        id: "hr-e-004",
        title: "What are your strongest technical or professional skills?",
      },
      {
        id: "hr-e-005",
        title: "What is one skill you are currently trying to improve?",
      },
      {
        id: "hr-e-006",
        title: "Tell me about a project you are proud of.",
      },
      {
        id: "hr-e-007",
        title: "Tell me about a time you had to learn something quickly.",
      },
      {
        id: "hr-e-008",
        title:
          "How do you approach a task when the requirements are unclear?",
      },
      {
        id: "hr-e-009",
        title:
          "How do you prioritize multiple tasks with similar deadlines?",
      },
      {
        id: "hr-e-010",
        title:
          "What kind of engineering environment helps you do your best work?",
      },
    ],

    medium: [
      {
        id: "hr-m-001",
        title:
          "Tell me about a time you made a mistake in a project. What happened and what did you learn?",
      },
      {
        id: "hr-m-002",
        title:
          "Tell me about a difficult technical problem you solved and how you approached it.",
      },
      {
        id: "hr-m-003",
        title:
          "Tell me about a time you disagreed with a teammate about a technical decision.",
      },
      {
        id: "hr-m-004",
        title:
          "Tell me about a time you received critical feedback. How did you respond?",
      },
      {
        id: "hr-m-005",
        title:
          "Describe a situation where you had to work under significant time pressure.",
      },
      {
        id: "hr-m-006",
        title:
          "Tell me about a time you took ownership of something that was not explicitly assigned to you.",
      },
      {
        id: "hr-m-007",
        title:
          "Describe a time when you had incomplete requirements but still had to make progress.",
      },
      {
        id: "hr-m-008",
        title:
          "Tell me about a time you had to explain a technical concept to someone without a technical background.",
      },
      {
        id: "hr-m-009",
        title:
          "Tell me about a time when a deadline was at risk. What did you do?",
      },
      {
        id: "hr-m-010",
        title:
          "Describe a situation where you had to balance code quality with delivering a feature quickly.",
      },
    ],

    hard: [
      {
        id: "hr-h-001",
        title:
          "A senior engineer strongly disagrees with your technical approach during a code review. How would you handle the disagreement?",
      },
      {
        id: "hr-h-002",
        title:
          "You discover shortly before release that a feature you implemented has a serious bug. What would you do?",
      },
      {
        id: "hr-h-003",
        title:
          "Your manager asks you to deliver a feature by a deadline you believe is unrealistic. How would you respond?",
      },
      {
        id: "hr-h-004",
        title:
          "A teammate repeatedly misses their responsibilities and your project deadline is approaching. How would you handle the situation?",
      },
      {
        id: "hr-h-005",
        title:
          "You strongly believe a product decision is technically wrong, but the team decides to proceed anyway. What would you do?",
      },
      {
        id: "hr-h-006",
        title:
          "You inherit a poorly written codebase that must be maintained immediately. How would you improve it without stopping feature development?",
      },
      {
        id: "hr-h-007",
        title:
          "Tell me about a time when you were wrong about a technical decision. How did you recognize it and what did you change?",
      },
      {
        id: "hr-h-008",
        title:
          "A production incident happens and it appears your recent change may have caused it. How would you respond?",
      },
      {
        id: "hr-h-009",
        title:
          "You are given a task involving technology you have never used, with a short deadline. How would you approach it?",
      },
      {
        id: "hr-h-010",
        title:
          "Describe a situation where you had to negotiate scope with stakeholders while protecting the quality of the final product.",
      },
    ],
  },
},{
  id: "devops-deployment",
  name: "DevOps & Deployment",
  source: "default",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
  iconName: "CloudCog",
  description:
    "Deployment, Docker, CI/CD, environment configuration, cloud infrastructure, monitoring, logging, and production operations",
  topics: {
    easy: [
      {
        id: "devops-e-001",
        title: "What is DevOps and what problem does it solve in software development?",
      },
      {
        id: "devops-e-002",
        title: "What is CI/CD and what is the difference between continuous integration and continuous deployment?",
      },
      {
        id: "devops-e-003",
        title: "What is Docker and why is it useful for application deployment?",
      },
      {
        id: "devops-e-004",
        title: "What is a Docker image and how is it different from a Docker container?",
      },
      {
        id: "devops-e-005",
        title: "What are environment variables and why should configuration be separated from application code?",
      },
      {
        id: "devops-e-006",
        title: "What is the difference between development, staging, and production environments?",
      },
      {
        id: "devops-e-007",
        title: "What is a reverse proxy and why is it commonly used in production applications?",
      },
      {
        id: "devops-e-008",
        title: "What is a health check and why is it important for a production service?",
      },
      {
        id: "devops-e-009",
        title: "Why should application logs be collected and monitored in production?",
      },
      {
        id: "devops-e-010",
        title: "What is horizontal scaling and how can a deployed backend be scaled horizontally?",
      },
    ],

    medium: [
      {
        id: "devops-m-001",
        title: "How would you deploy a React frontend and Node.js backend to production?",
      },
      {
        id: "devops-m-002",
        title: "How would you design a CI/CD pipeline for a full-stack JavaScript application?",
      },
      {
        id: "devops-m-003",
        title: "How would you create a production Docker image for a Node.js application?",
      },
      {
        id: "devops-m-004",
        title: "What is a multi-stage Docker build and why can it improve production images?",
      },
      {
        id: "devops-m-005",
        title: "How would you securely manage secrets and environment variables in a CI/CD pipeline?",
      },
      {
        id: "devops-m-006",
        title: "How would you handle database migrations during a production deployment?",
      },
      {
        id: "devops-m-007",
        title: "How would you implement application logging and monitoring for a Node.js API in production?",
      },
      {
        id: "devops-m-008",
        title: "What should happen in a deployment pipeline when tests, linting, or security checks fail?",
      },
      {
        id: "devops-m-009",
        title: "How would you perform a zero-downtime deployment for a backend application?",
      },
      {
        id: "devops-m-010",
        title: "How would you investigate a production deployment where the application starts successfully but users receive errors?",
      },
    ],

    hard: [
      {
        id: "devops-h-001",
        title: "Design a production deployment architecture for a React and Node.js application that needs high availability and horizontal scaling.",
      },
      {
        id: "devops-h-002",
        title: "A new deployment causes errors for production users. How would you detect, mitigate, roll back, and investigate the incident?",
      },
      {
        id: "devops-h-003",
        title: "How would you design a zero-downtime deployment strategy when multiple versions of the backend may temporarily run at the same time?",
      },
      {
        id: "devops-h-004",
        title: "How would you design a CI/CD pipeline that includes automated tests, security checks, image builds, staging deployment, approval, and production release?",
      },
      {
        id: "devops-h-005",
        title: "A containerized Node.js application keeps restarting in production. How would you investigate the root cause?",
      },
      {
        id: "devops-h-006",
        title: "How would you design monitoring and alerting for a production API so that the team can detect errors, latency, resource exhaustion, and availability problems?",
      },
      {
        id: "devops-h-007",
        title: "How would you safely deploy a database schema change when old and new application versions need to run simultaneously?",
      },
      {
        id: "devops-h-008",
        title: "A production server is running out of CPU and memory. How would you determine whether the problem is caused by traffic, application behavior, infrastructure configuration, or a memory leak?",
      },
      {
        id: "devops-h-009",
        title: "How would you design a secure production environment so that application secrets, databases, internal services, and public APIs are properly isolated?",
      },
      {
        id: "devops-h-010",
        title: "Design a production operations strategy covering deployments, rollback, observability, backups, disaster recovery, incident response, and capacity planning.",
      },
    ],
  },
},
];
