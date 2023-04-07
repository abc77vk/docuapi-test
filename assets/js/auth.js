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
                console.log(user);
                const authBtn = document.getElementById("auth-btn");
                if (!user) {
                    authBtn.addEventListener("click", () => {
                        netlifyIdentity.open();
                    });
                } else {
                    document.location.pathname = "/logged";
                    authBtn.innerText = "Logout";
                    document.getElementById("user-name").innerHTML = `Authenticated as: <b>${user.full_name}</b>`
                    authBtn.addEventListener("click", () => {
                        netlifyIdentity.logout().then(() => document.location.pathname = "/");
                    });
                }
            } finally {
                resolve();
            }

        });
    })

    netlifyIdentity.on("login", () => document.location.pathname = "/logged")
}
