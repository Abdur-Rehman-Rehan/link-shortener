
# Link Shortener Application
## Video Demo
[Youtube video](https://youtu.be/flIA8Lhs9bk)

## Overview  
This application offers a straightforward way to shorten long URLs, making them more manageable and shareable. It consists of a Node.js server and a React client.
## Project Structure
**server:** Contains the Node.js server code.

**server/src:** Houses the TypeScript source files for the server.

**server/src/index.ts:** The main server entry point.

**server/dist:** Stores the compiled JavaScript files (generated during build).

**client**: Contains the React client code.

**client/src**: Houses the React components and source files.

**client/public**: Contains static assets like favicons and index.html.  

**client/dist:** Stores the built production-ready React application.
## Setup
Clone the repository:
```bash
git clone https://github.com/Abdur-Rehman-Rehan/link-shortener.git
``````

Install dependencies:
```bash
cd server
yarn 

cd ../client
yarn 
```

## Running the Application

### Development:
#### Start the server:
```bash
cd server
yarn run dev
```

#### Start the client:
```bash
cd ../client
yarn run dev
```

### Production:
#### Build the server:
```bash
cd server
yarn run build
```

#### Build the client:
```bash
cd ../client
yarn run build
```

#### Start the server:
```bash
cd server
yarn start
```

Access the server at http://localhost:3000 (or the specified port).  
Access the client at http://localhost:5173 (or the specified port).
## Additional Information    
**Technologies:** Node.js, Express, React, TypeScript, Vite  
**Database:** MongoDB  
**API Endpoints:**   
**Features:**
