# DevTinder API Contract

## 1. Auth Router

Handles user authentication and session management.

- **POST** `/auth/signup`

  - **Body:** `{ firstName, lastName, email, password, ... }`
  - **Description:** Registers a new user.

- **POST** `/auth/login`

  - **Body:** `{ email, password }`
  - **Description:** Authenticates user and sets JWT cookie.

- **POST** `/auth/logout`
  - **Description:** Expires the JWT cookie to end the session.

---

## 2. Profile Router

Handles viewing and updating the logged-in user's profile.

- **GET** `/profile/view`

  - **Description:** Returns the profile data of the logged-in user.

- **PATCH** `/profile/edit`

  - **Body:** `{ firstName, lastName, photoUrl, about, gender, age, skills }`
  - **Description:** Updates user details.
  - **Note:** Email and Password cannot be updated via this route.

- **PATCH** `/profile/password` (Homework)
  - **Body:** `{ existingPassword, newPassword }`
  - **Description:** specific route for password updates.

---

## 3. Connection Request Router

Handles the "Swiping" mechanism (sending requests) and responding to them.

- **POST** `/request/send/:status/:userId`

  - **Params:**
    - `status`: "interested" (Right Swipe) or "ignored" (Left Swipe).
    - `userId`: The `_id` of the user profile being swiped.
  - **Description:** Logs a connection request in the database.

- **POST** `/request/review/:status/:requestId`
  - **Params:**
    - `status`: "accepted" or "rejected".
    - `requestId`: The `_id` of the connection request being reviewed.
  - **Description:** Used to accept or reject a pending connection request.

---

## 4. User Router

Handles fetching lists of users for different UI views.

- **GET** `/user/connections`

  - **Description:** Returns a list of users who are a "Match" (status: accepted).

- **GET** `/user/requests/received`

  - **Description:** Returns a list of users who have sent a connection request (Pending).

- **GET** `/user/feed`
  - **Description:** Returns a dynamic list of users for the main feed card stack.
  - **Logic:** Should not show users who are already connected, ignored, or have sent requests.
