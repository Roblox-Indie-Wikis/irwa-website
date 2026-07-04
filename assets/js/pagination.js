const panels = [...document.querySelectorAll('.panel')];
const tabs = [...document.querySelectorAll('.tab')];
let current = 0;
let locked = false;

function showPanel(next) {
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

    setTimeout(() => {
        current = next;
        locked = false;
    }, 460);
}

tabs.forEach((tab, index) => tab.addEventListener('click', () => showPanel(index)));

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        showPanel((current - 1 + panels.length) % panels.length);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        showPanel((current + 1) % panels.length);
    });
}