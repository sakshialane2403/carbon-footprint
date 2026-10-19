export function currentUser() {
  try {
    return JSON.parse(localStorage.getItem("cft_user") || "null");
  } catch {
    return null;
  }
}

export function currentUserId() {
  return currentUser()?.userId;
}
