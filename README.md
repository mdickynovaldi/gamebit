# GameBit

The **GameBit** provides access to a list of games, prices, descriptions, and more, allowing users to interact with a game marketplace programmatically. This documentation provides details about how to interact with the API.

## Base URL

All API requests should be made to the following base URL:

```
http://localhost:3000
```

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000

## API Specification

### Games

| Endpoint     | Method   | Description      |
| ------------ | -------- | ---------------- |
| `/games`     | `GET`    | Get all games    |
| `/games/:id` | `GET`    | Get a game by id |
| `/games`     | `POST`   | Create a game    |
| `/games/:id` | `PUT`    | Update a game    |
| `/games/:id` | `DELETE` | Delete a game    |

### Error Handling

The API returns standard HTTP error codes for invalid requests. Common errors include:

- 400 Bad Request: Invalid input or parameters.
- 401 Unauthorized: Missing or invalid API key.
- 404 Not Found: Game not found.
- 500 Internal Server Error: Something went wrong on the server.
