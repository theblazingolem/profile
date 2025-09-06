function getStatusType() {
    const offset = { hours: 5, minutes: 30 }; // GMT+5:30
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();

    let hour = utcHours + offset.hours;
    let minute = utcMinutes + offset.minutes;

    if (minute >= 60) {
        hour += 1;
        minute -= 60;
    }
    if (hour >= 24) {
        hour -= 24;
    }

    const currentMinutes = hour * 60 + minute;
    const idle1 = [22 * 60, 24 * 60]; // 2200–2400
    const idle2 = [0, 6 * 60]; // 0000–0600

    const online1 = [6 * 60, 8 * 60 + 30]; // 0600–0830
    const online2 = [13 * 60 + 30, 21 * 60]; // 1330–2100

    const dnd1 = [8 * 60 + 30, 13 * 60 + 30]; // 0830–1330
    const dnd2 = [21 * 60, 22 * 60]; // 2100–2200

    function inRange(min, max) {
        return currentMinutes >= min && currentMinutes < max;
    }

    if (inRange(idle1[0], idle1[1]) || inRange(idle2[0], idle2[1])) {
        return "idle";
    }
    if (inRange(online1[0], online1[1]) || inRange(online2[0], online2[1])) {
        return "online";
    }
    if (inRange(dnd1[0], dnd1[1]) || inRange(dnd2[0], dnd2[1])) {
        return "dnd";
    }
    return "idle";
}
function updateStatusIcon() {
    const statusType = getStatusType();
    const iconEl = document.getElementById("status-icon");
    if (!iconEl) return;

    if (statusType === "online") {
        iconEl.innerHTML = `<img src="${onlineIcon}" width="30" height="30" />`;
    } else if (statusType === "dnd") {
        iconEl.innerHTML = `<img src="${dndIcon}" width="30" height="30" />`;
    } else {
        iconEl.innerHTML = `<img src="${idleIcon}" width="30" height="30" />`;
    }
}
updateStatusIcon();
setInterval(updateStatusIcon, 900000);
