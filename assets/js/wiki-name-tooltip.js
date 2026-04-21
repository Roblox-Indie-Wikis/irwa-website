import {computePosition, offset, flip, shift} from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.7.5/+esm';
const floating = document.getElementById("floating");

if (floating) {
    document.addEventListener("mousemove", (event) => {
        const { clientX, clientY, target } = event;

        const logoSlide = target.closest(".logo-slide");

        if (logoSlide) {
            floating.textContent = logoSlide.dataset.wikiName || "No Name";
            
            floating.classList.add("visible");

            const virtualEl = {
                getBoundingClientRect: () => ({
                    width: 0, height: 0,
                    x: clientX, y: clientY,
                    top: clientY, left: clientX,
                    right: clientX, bottom: clientY,
                }),
            };

            computePosition(virtualEl, floating, {
                placement: "right-start",
                middleware: [offset(10), flip(), shift()]
            }).then(({ x, y }) => {
                Object.assign(floating.style, {
                    top: `${y}px`,
                    left: `${x}px`,
                    position: 'absolute'
                });
            });
        } else {
            floating.classList.remove("visible");
        }
    });
}
});