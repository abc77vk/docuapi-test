export async function setupAuth() {
    await new Promise(resolve => {
        if (document.readyState !== "complete") {
            document.onload = resolve;
        }
        resolve();
    });

    await new Promise(resolve => {
        netlifyIdentity.on("init", async (...args) => {
            try {
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
            } finally {
                resolve();
            }

        });
    })

    netlifyIdentity.on("login", (user) => console.log("login", user))
    netlifyIdentity.on("logout", (...args) => console.log("logout", {args}))
    netlifyIdentity.on("close", () => document.location.reload());

    //netlifyIdentity.init();
}
