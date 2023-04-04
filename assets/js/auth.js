export async function setupAuth() {
    await new Promise(resolve => {
        if (document.readyState !== "complete") {
            document.onload = resolve;
        }
        resolve();
    });

    netlifyIdentity.on("init", async () => {
        const user = await netlifyIdentity.currentUser();
        const authBtn = document.getElementById("auth-btn");
        if (!user) {
            authBtn.addEventListener("click", () => {
                netlifyIdentity.open();
            });
        } else {
            authBtn.innerText = "Logout";
            authBtn.addEventListener("click", () => {
                netlifyIdentity.logout();
            });
        }
    });

    netlifyIdentity.on("login", (...args) => console.log("login", {args}))
    netlifyIdentity.on("logout", (...args) => console.log("logout", {args}))

    netlifyIdentity.init();
}
