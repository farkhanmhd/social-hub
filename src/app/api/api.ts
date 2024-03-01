import { User } from "../states/authUser/slice";

const BASE_URL: string = "https://forum-api.dicoding.dev/v1";

function putAccessToken(token: string): void {
  localStorage.setItem("accessToken", token);
}

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

async function fetchWithAuth({
  url,
  options = {},
}: {
  url: string;
  options?: RequestInit;
}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function register({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const responseJson = await response.json();
  const { status, message } = responseJson;

  if (status !== "success") {
    return { status, message };
  }

  return { status, message };
}

async function login({ email, password }: { email: string; password: string }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") {
    throw new Error(message);
  }

  const {
    data: { token },
  } = responseJson;

  return token;
}

async function getAllUsers() {
  const response = await fetch(`${BASE_URL}/users`);

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") {
    throw new Error(message);
  }

  const {
    data: { users },
  } = responseJson;

  return users;
}

async function getSingleUser({ id }: { id: string }) {
  const response = await fetch(`${BASE_URL}/users`);
  const responseJson = await response.json();
  const { status, message } = responseJson;
  if (status !== "success") {
    throw new Error(message);
  }
  const {
    data: { users },
  } = responseJson;
  const userDetail = users.find((user: User) => user.id === id);
  return userDetail;
}

async function getOwnProfile() {
  const response = await fetchWithAuth({ url: `${BASE_URL}/users/me` });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") {
    throw new Error(message);
  }

  const {
    data: { user },
  } = responseJson;

  return user;
}

async function createThread({
  title,
  body,
  category,
}: {
  title: string;
  body: string;
  category: string;
}) {
  const response = await fetchWithAuth({
    url: `${BASE_URL}/threads`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    },
  });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") {
    throw new Error(message);
  }

  const {
    data: { thread },
  } = responseJson;

  return thread;
}

async function getAllThreads() {
  const response = await fetch(`${BASE_URL}/threads`);

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") {
    throw new Error(message);
  }

  const {
    data: { threads },
  } = responseJson;

  return threads;
}

async function getThreadDetail(id: string) {
  const response = await fetch(`${BASE_URL}/threads/${id}`);

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") {
    throw new Error(message);
  }

  const {
    data: { detailThread },
  } = responseJson;

  return detailThread;
}

async function getThreadOwner(id: string) {
  const data = await getThreadDetail(id);
  const ownerName = data.owner.name;
  const ownerProfilePicture = data.owner.profilePicture;
  const { avatar } = data.owner;
  const { comments } = data;

  return { ownerName, ownerProfilePicture, comments, avatar };
}

async function createComment({
  content,
  threadId,
}: {
  content: string;
  threadId: string;
}) {
  const response = await fetchWithAuth({
    url: `${BASE_URL}/threads/${threadId}/comments`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
      }),
    },
  });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") {
    throw new Error(message);
  }

  const {
    data: { comment },
  } = responseJson;

  return comment;
}

async function likeThread({ threadId }: { threadId: string }) {
  const response = await fetchWithAuth({
    url: `${BASE_URL}/threads/${threadId}/up-vote`,
    options: {
      method: "POST",
    },
  });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") {
    throw new Error(message);
  }
}

async function dislikeThread({ threadId }: { threadId: string }) {
  const response = await fetchWithAuth({
    url: `${BASE_URL}/threads/${threadId}/down-vote`,
    options: {
      method: "POST",
    },
  });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") {
    throw new Error(message);
  }
}

async function neutralizeThreadLike({ threadId }: { threadId: string }) {
  const response = await fetchWithAuth({
    url: `${BASE_URL}/threads/${threadId}/neutral-vote`,
    options: {
      method: "POST",
    },
  });

  const responseJson = await response.json();

  return {
    status: responseJson.status,
    message: responseJson.message,
  };
}

async function likeComment({
  threadId,
  commentId,
}: {
  threadId: string;
  commentId: string;
}) {
  const response = await fetchWithAuth({
    url: `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
    options: {
      method: "POST",
    },
  });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") {
    throw new Error(message);
  }
}

async function dislikeComment({
  threadId,
  commentId,
}: {
  threadId: string;
  commentId: string;
}) {
  const response = await fetchWithAuth({
    url: `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
    options: {
      method: "POST",
    },
  });

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") {
    throw new Error(message);
  }
}

async function getLeaderBoards() {
  const response = await fetch(`${BASE_URL}/leaderboards`);

  const responseJson = await response.json();

  const { status, message } = responseJson;

  if (status !== "success") {
    throw new Error(message);
  }

  const {
    data: { leaderboards },
  } = responseJson;

  return leaderboards;
}

async function neutralizeCommentLike({
  threadId,
  commentId,
}: {
  threadId: string;
  commentId: string;
}) {
  const response = await fetchWithAuth({
    url: `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
    options: {
      method: "POST",
    },
  });
  const responseJson = await response.json();

  return {
    status: responseJson.status,
    message: responseJson.message,
  };
}

export {
  putAccessToken,
  getAccessToken,
  login,
  register,
  getAllUsers,
  getOwnProfile,
  createThread,
  getAllThreads,
  getThreadDetail,
  getThreadOwner,
  createComment,
  likeThread,
  dislikeThread,
  likeComment,
  dislikeComment,
  getLeaderBoards,
  getSingleUser,
  neutralizeThreadLike,
  neutralizeCommentLike,
};
