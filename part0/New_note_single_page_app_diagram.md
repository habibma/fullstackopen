sequenceDiagram
    participant server
    participant browser

    browser->>server: POST /exampleapp/new_note_spa
    activate server
    server-->>browser: JSON response {"message":"note created"}
    deactivate server

    browser->>browser: Update UI dynamically (add note to list)