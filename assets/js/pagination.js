const panels = [...document.querySelectorAll('.panel')];
const tabs = [...document.querySelectorAll('.tab')];
let current = 0;
let locked = false;

function showPanel(next, updateHash = true) {
    if (next === current || locked) return;
    locked = true;

    const currentPanel = panels[current];
    const nextPanel = panels[next];

    tabs[current].classList.remove('active');
    tabs[next].classList.add('active');

    requestAnimationFrame(() => {
        currentPanel.classList.remove('active');
        nextPanel.classList.add('active');
    });

    if (updateHash) {
        history.replaceState(null, "", "#" + tabs[next].dataset.tab);
    }

    setTimeout(() => {
        current = next;
        locked = false;
    }, 460);
}

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => showPanel(index));
});

// Open the correct tab on page load
function openHashTab() {
    const hash = location.hash.slice(1);
    if (!hash) return;

    const index = tabs.findIndex(tab => tab.dataset.tab === hash);
    if (index !== -1) {
        showPanel(index, false);
    }
}

window.addEventListener("hashchange", openHashTab);
window.addEventListener("DOMContentLoaded", openHashTab);