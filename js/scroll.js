/* ==========================================================
   NovaDynamics Scroll Interaction
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const progressBar =
        document.querySelector(".scroll-progress-bar");

    const backToTop =
        document.querySelector(".back-to-top");

    const sections =
        [...document.querySelectorAll("section[id]")];

    const navigationLinks =
        [...document.querySelectorAll('.nav-links a[href^="#"]')];

    const interactiveCards =
        document.querySelectorAll(
            [
                ".card",
                ".project-card",
                ".portfolio-item",
                ".research-topic",
                ".technology-item",
                ".timeline-card"
            ].join(",")
        );

    /* ---------- Scroll Progress ---------- */

    const updateScrollProgress = () => {

        const scrollTop =
            window.scrollY;

        const scrollableHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            scrollableHeight > 0
                ? (scrollTop / scrollableHeight) * 100
                : 0;

        if (progressBar) {

            progressBar.style.width =
                `${Math.min(100, Math.max(0, percentage))}%`;

        }

        if (backToTop) {

            backToTop.classList.toggle(
                "visible",
                scrollTop > 700
            );

        }

    };

    /* ---------- Active Navigation ---------- */

    const updateActiveNavigation = () => {

        let activeSectionId = "";

        const marker =
            window.innerHeight * 0.35;

        sections.forEach((section) => {

            const bounds =
                section.getBoundingClientRect();

            if (
                bounds.top <= marker &&
                bounds.bottom > marker
            ) {

                activeSectionId =
                    section.id;

            }

        });

        navigationLinks.forEach((link) => {

            const linkTarget =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                linkTarget === `#${activeSectionId}`
            );

        });

    };

    /* ---------- Back to Top ---------- */

    backToTop?.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

    /* ---------- Pointer Highlights ---------- */

    interactiveCards.forEach((card) => {

        const highlight =
            document.createElement("span");

        highlight.className =
            "pointer-highlight";

        card.appendChild(highlight);

        card.addEventListener("pointermove", (event) => {

            const bounds =
                card.getBoundingClientRect();

            const x =
                event.clientX - bounds.left;

            const y =
                event.clientY - bounds.top;

            card.style.setProperty(
                "--pointer-x",
                `${x}px`
            );

            card.style.setProperty(
                "--pointer-y",
                `${y}px`
            );

        });

    });

    /* ---------- Scroll Listener ---------- */

    const updateScrollEffects = () => {

        updateScrollProgress();
        updateActiveNavigation();

    };

    updateScrollEffects();

    let scrollUpdateRequested = false;

window.addEventListener(
    "scroll",
    () => {

        if (scrollUpdateRequested) return;

        scrollUpdateRequested = true;

        window.requestAnimationFrame(() => {

            updateScrollEffects();

            scrollUpdateRequested = false;

        });

    },
    { passive: true }
);

    window.addEventListener(
        "resize",
        updateScrollEffects
    );

});