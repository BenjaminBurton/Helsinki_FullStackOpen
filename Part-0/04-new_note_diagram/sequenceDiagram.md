# Sequence Diagram

sequenceDiagram
    participant browser
    participant server

    Note right of browser: User types note in text field and clicks save
    Note right of browser: Browser operation: Captures input and triggers form submission

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    Note left of server: Request includesnot data (e.g., {"content": "New note", "date": "2025-03-13"})
    Note left of server: Server operation: Receives request, validates data, save note to database
    server->>browser: 201 Created (with updated note list or success response)
    decativate server

    Note right of browser: Browser operation: Receives response, processes success status

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    Note left of server: Server operation: Retrieves updated note list from database
    server->>browser: [{ "content": "New note", "date": "2025-03-13" }, ... ]
    deacivate server

    Note right of browser: Browser operation: Parses JSON and re-renders the note list
    