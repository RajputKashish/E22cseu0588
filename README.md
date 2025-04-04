# Average Calculator Microservice

A simple Express.js microservice that calculates averages from different number types (prime, fibonacci, even, random).

## Features

- Exposes a REST API endpoint for different number types
- Maintains a sliding window of size 10
- Calculates averages of stored numbers
- Returns both previous and current window states
- Simple and lightweight implementation

## Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on port 9876.

## API Endpoints

The server exposes the following endpoint:

- GET `/numbers/:numberid` - where numberid can be:
  - 'p' for prime numbers
  - 'f' for fibonacci numbers
  - 'e' for even numbers
  - 'r' for random numbers

## Response Format

```json
{
  "windowPrevState": [...],
  "windowCurrState": [...],
  "numbers": [...],
  "avg": number
}
```

## Example Usage

Using cURL:
```bash
curl http://localhost:9876/numbers/p
```

Using your browser, navigate to:
```
http://localhost:9876/numbers/p
http://localhost:9876/numbers/f
http://localhost:9876/numbers/e
http://localhost:9876/numbers/r
```

## Error Handling

- Requests timeout after 500ms
- Invalid number types return 400 Bad Request
- Network errors are handled gracefully
- Duplicate numbers are filtered out 