const inputUrl = document.querySelector(".url");
const fetchBtn = document.querySelector(".fetch");

inputUrl.value = "https://github.com/"

const profile = document.querySelector(".profile");

const avatar = document.querySelector(".avatar");
const username = document.querySelector(".username");
const header = document.querySelector(".header")

const info = {
    repos: document.querySelector(".repos"),
    followers: document.querySelector(".followers"),
    id: document.querySelector(".id")
}

async function fetchUser(url) {
    url = url.replace("//", "//api.")
        .replace("m/", "m/users/")

    console.log(url)

    return new Promise(async (resolve, reject) => {
        let fetchOut = await fetch(url);

        if (fetchOut.ok) {
            resolve(await fetchOut.json());
            profile.style.display = "flex"
        } else {
            reject(fetchOut.status)
        }
    })
}

fetchBtn.onclick = () => {
    let url = inputUrl.value;

    fetchUser(url)
        .then((result) => {
            username.textContent = result.login;
            avatar.src = result.avatar_url;
            info.repos.textContent = "repos: " + result.public_repos;
            info.followers.textContent = "followers: " + result.followers;
            info.id.textContent = "id: " + result.id;
        })

        .catch((error) => {
            console.log(error)
            header.style.top = header.style.height * 2 + "px";
            header.textContent = "Fetch error! Status: " + error;
            header.backgroundColor = "#dc3545"

            setTimeout(() => {
                header.style.top = header.style.height;
            }, 2000);

        })
}
