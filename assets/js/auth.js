export async function setupAuth() {
    await new Promise(resolve => {
        if (document.readyState !== "complete") {
            document.onload = resolve;
        }
        resolve();
    });

    const setPathName = pathName => {
        if (document.location.pathname !== pathName) {
            document.location.pathname = pathName;
        }
    }

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
                    setPathName("/logged")
                    authBtn.innerText = "Logout";
                    document.getElementById("user-name").innerHTML = `Authenticated as: <b>${user.full_name}</b>`
                    authBtn.addEventListener("click", () => {
                        netlifyIdentity.logout().then(() => setPathName("/"));
                    });
                }
            } finally {
                resolve();
            }

        });
    })

    netlifyIdentity.on("login", () => setPathName("/logged"))
}
