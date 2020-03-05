function loginPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve("Success!");
    }, 500);
  });
}

export async function Login({ username, password }) {
  try {
    console.log(".. logging in with", username, password);
    return await loginPromise();
  } catch (e) {
    throw new Error(e);
  }
}
