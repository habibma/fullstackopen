sequenceDiagram
    participant browser
    participant server

browser->>server: GET /exampleapp/spa
server activated
server->>browser: HTML Document
server deactivated

browser->>server: GET /exampleapp/main.css
server activated
server->>browser: CSS file
server deactivated

browser->>server: GET /exampleapp/spa.js
server activated
server->>browser: JS file
server deactivated

brwoser->>server: GET /exampleapp/data.json
server activated
server->>browser: JSON file
server deactivated