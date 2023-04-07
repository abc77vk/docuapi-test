export async function setupAuth() {
    await new Promise(resolve => {
        if (document.readyState !== "complete") {
            document.onload = resolve;
        }
        resolve();
    });

    netlifyIdentity.on("init", async (...args) => {
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
                document.location.reload();
            });
        }
    });

    netlifyIdentity.on("login", () => window.location.reload())
    netlifyIdentity.on("logout", () => window.location.reload())

    //netlifyIdentity.init();
}
