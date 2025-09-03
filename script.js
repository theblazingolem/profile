function getStatusByTime() {
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

    if (hour >= 0 && hour < 6) {
        return "Sleeping 😴";
    } else if (hour >= 6 && hour < 8) {
        return "Eating 🍳";
    } else if (hour >= 8 && hour < 14) {
        return "In Class 📚";
    } else if (hour >= 14 && hour < 20) {
        return "Online 💻";
    } else {
        return "Relaxing 🎧";
    }
}

function updateStatus() {
    const statusElement = document.getElementById("status");
    if (statusElement) {
        statusElement.textContent = getStatusByTime();
    }
}

updateStatus();
setInterval(updateStatus, 60000);
