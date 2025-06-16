# 🤖 Semble MCP Demo
Hello! 👋

If you're reading this, is because you are reviewing my application for Software Developer at Semble. I wanted to go a step beyond a traditional resume and make this POC to demonstrate my enthusiasm for Semble's mission and some of my technical skills.

This project was planned and developed from scratch in approximately 24 hours as a direct response to the job posting that I saw last week.

## 🔗 Demo & Repository
- [Semble MCP Demo](https://semble-mcp-demo-ui.vercel.app/)
- [GitHub Repository](https://github.com/facundotolosa/semble-mcp-demo)

## 💡 About the project
This project is a demonstration of how interaction with an existing API can be modernized. The core idea is to showcase a new capability that Semble could offer to its clients, enabling them to build next-gen features for their end-users.
The application allows searching a fictional patient database by typing natural language phrases, simulating how a clinician might want to retrieve information without complex filters:<br>
<code>"show me the first 5 patients"</code><br><br>
<code>"find all patients with the last name Garcia"</code><br><br>
<code>"can you give me all active patients named John?"</code>

### 🪄 The Key Factor: The MCP (Model Context Protocol) Server
The heart of this project is not just the use of natural language, but how the architecture could facilitate this for Semble's clients. 

#### 🔹 What problem does an MCP Server solve for Semble's clients?
A client like a large clinic, might want to offer its doctors an interface where they can query patient data using voice or text. The challenge is integrating their own preferred AI models with Semble's structured data API securely and consistently.

An MCP Server acts as an <b>intelligent abstraction layer</b> that solves this problem. Its responsibility is to translate a user's intent (natural language) into a standardized, secure action that the underlying system can understand (in this case, a GraphQL query).

#### 🔹 What strategic value would this bring to Semble?
- <b>Competitive advantage:</b> it would position Semble as an "AI ready" platform, attracting clients seeking for innovation.
- <b>Customer retention:</b> it would offer a new capability to existing clients, allowing them to build better products on top of Semble's platform.
- <b>Extensible ecosystem:</b> it would open the door to a new type of AI focused integrations and partners

## 🏗️ Architecture
The project is structured as a monorepo containing three independent services.<br>
<br><code><b>Frontend (Client)</b></code> -> <code><b>MCP Server (Translator)</b></code> -> <code><b>Backend API (GraphQL)</b></code>
<br>
1. 🎨 <b>Frontend (Client):</b> <i>React, Vite, Typescript, Chakra UI.</i><br>
The visible face of the application. Its only responsibility is to capture the user's text, send it to the MCP Server and display the returned data. The choice of Chakra UI was a deliberate decision to align with the technologies mentioned in the job offer.

2. 🧠 <b>MCP Server (Translator)</b> <i>Node.js, Express, Typescript.</i><br>
It acts like a proxy. It receives the client's request and uses the OpenAI SDK (gpt-4o) to translate the text into a GraphQL query, and then excecutes that query against the backend API.

3. 🗄️ <b>Backend API (GraphQL)</b> <i>Node.js, Express, Apollo Server, Typescript, MongoDB.</i><br>
A GraphQL service that exposes patient data. It has no knowledge of an LLM, its only function is to respond to valid GraphQL queries.

## 🗺️ Next Steps & Improvements
Given the 24 hour deadline, my focus was on getting a fully functional MVP up and rurnning. If this were a real world project, here are the immediate next steps I would take to improve it:
- <b>Dockerize the Local Environment:</b> The monorepo is already set up for this. The next logical step is to create a docker-compose.yml file. This would allow any developer to clone the repo and run the entire application (all three services + database) with a single command.
- <b>Add Integration & E2E Tests:</b> To ensure the system is robust, I'd prioritize tests that verify the entire flow. This means adding integration tests to confirm the MCP Server and the Backend API communicate correctly, and end-to-end (E2E) tests that simulate a user typing a query in the UI and getting a valid result.

## 🎓 Conclusions & Learnings
This project has been an incredibly rewarding personal challenge. It allowed me not only to apply my preferred tech stack (React, Node, TypeScript) but also to research and apply modern architectural patterns like the MCP.

I hope this project serves as a tangible demonstration of my passion for building quality products and my enthusiasm for the possibility of joining the Semble team.

Thank you very much for your time and consideration! 🙏
