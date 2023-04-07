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
                        netlifyIdentity.logout().then(() => document.location.href = "/");
                    });
                }
            } finally {
                resolve();
            }

        });
    })

    netlifyIdentity.on("login", () => document.location.href = "/logged")
    netlifyIdentity.on("close", () => document.location.reload());

    //netlifyIdentity.init();
}
