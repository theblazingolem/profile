import { profileData } from "./assets/data.js";

const onlineIcon = "./assets/images/statusIcons/online border.svg";
const idleIcon = "./assets/images/statusIcons/idle border.svg";
const dndIcon = "./assets/images/statusIcons/dnd border.svg";

const avatarImg = document.getElementById("avatar-img");
const avatarDeco = document.getElementById("avatar-deco");
const banner = document.getElementById("banner");
const main = document.getElementById("main");
avatarImg.src = profileData.default.avatar;
avatarDeco.src = profileData.default.deco;
banner.style.backgroundImage = `url(${profileData.default.banner})`;
document.body.style.backgroundImage = `url(${profileData.default.bg})`;

const name = document.getElementById("name");
const username = document.getElementById("username");
const about = document.getElementById("about");
const interests = document.getElementById("interests");
name.textContent = profileData.name;
username.textContent = "@" + profileData.username;
about.innerHTML = profileData.about;
interests.innerHTML = Object.entries(profileData.interests)
    .map(
        (x) => `<span class='interest-item' id='${x[0]}'>${x[1].name}</span>`
        // (x) => console.log(x[0])
    )
    .join("");
interests.addEventListener("click", (e) => {
    const clickedElement = e.target;
    const clickedId = clickedElement.id;
    if (clickedId) {
        avatarImg.src = profileData.interests[clickedId].avatar;
        avatarDeco.src = profileData.interests[clickedId].deco;
        banner.style.backgroundImage = `url(${profileData.interests[clickedId].banner})`;
        document.body.style.backgroundImage = `url(${profileData.interests[clickedId].bg})`;
        main.style.background = `linear-gradient(to bottom, #${profileData.interests[clickedId].gradient.from} 30%, #${profileData.interests[clickedId].gradient.to} 100%)`;
        document.body.style.backgroundColor = `linear-gradient(to bottom, #${profileData.interests[clickedId].gradient.to} 0%, #${profileData.interests[clickedId].gradient.from} 100%)`;
    }
    if (clickedId == "twd") {
        avatarDeco.style.filter = "saturate(0%)";
    } else {
        avatarDeco.style.filter = "saturate(100%)";
    }
});

const social = document.getElementById("socials");
const socialLinks = profileData.socials;
social.innerHTML = Object.entries(socialLinks)
    .map(([key, url]) => {
        return `
            <a href="${url}" target="_blank">
                <img class='icons' src="./assets/images/socialIcons/${key}.svg" alt="${key}"/>
            </a>
        `;
    })
    .join("");

// console.log(profileData.name);
