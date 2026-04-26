const panels = [...document.querySelectorAll('.panel')];
const tabs = [...document.querySelectorAll('.tab')];
let current = 0;
let locked = false;

function showPanel(next) {
    if (next === current || locked) return;
    locked = true;

    const direction = next > current ? 'right' : 'left';
    const currentPanel = panels[current];
    const nextPanel = panels[next];

    tabs[current].classList.remove('active');
    tabs[next].classList.add('active');

    nextPanel.classList.add(direction === 'right' ? 'enter-right' : 'enter-left');
    requestAnimationFrame(() => {
        currentPanel.classList.add(direction === 'right' ? 'exit-left' : 'exit-right');
        currentPanel.classList.remove('active');

        nextPanel.classList.add('active');
        nextPanel.classList.remove('enter-right', 'enter-left');
    });

    setTimeout(() => {
        currentPanel.classList.remove('exit-left', 'exit-right');
        current = next;
        locked = false;
    }, 460);
}

tabs.forEach((tab, index) => tab.addEventListener('click', () => showPanel(index)));

document.getElementById('prev').addEventListener('click', () => {
    showPanel((current - 1 + panels.length) % panels.length);
});

document.getElementById('next').addEventListener('click', () => {
    showPanel((current + 1) % panels.length);
});