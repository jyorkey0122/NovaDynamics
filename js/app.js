/* ==========================================================
   NovaDynamics Main JavaScript
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* Initial loading screen */

    document.body.classList.add("is-loading");

    window.addEventListener("load", () => {

        window.setTimeout(() => {

            document.body.classList.remove("is-loading");

            document.body.classList.add("site-ready");

        }, 450);

    });

    const navigation = document.querySelector("nav");

    const revealElements = document.querySelectorAll(
        "section h2, section > p, .card, footer"
    );

    /* Add reveal classes automatically */

    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });

    /* Navbar scroll appearance */

const updateNavigation = () => {

    if (!navigation) return;

    navigation.classList.toggle(
        "scrolled",
        window.scrollY > 40
    );

};

updateNavigation();

let navigationUpdateRequested = false;

window.addEventListener(
    "scroll",
    () => {

        if (navigationUpdateRequested) return;

        navigationUpdateRequested = true;

        window.requestAnimationFrame(() => {

            updateNavigation();

            navigationUpdateRequested = false;

        });

    },
    { passive: true }
); 



    /* Scroll reveal observer */

    const revealObserver = new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            });

        },

        {

            threshold:.15,

            rootMargin:"0px 0px -40px 0px"

        }

    );

    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

    /* Smooth scrolling for internal navigation links */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        });

    });
    /* Mouse-responsive ambient light */

    const mouseLight =
        document.querySelector(".mouse-light");

    if (mouseLight){

        window.addEventListener(
            "mousemove",
            (event) => {

                mouseLight.style.left =
                    `${event.clientX}px`;

                mouseLight.style.top =
                    `${event.clientY}px`;

                document.body.classList.add(
                    "mouse-active"
                );

            },

            { passive:true }
        );

        document.addEventListener(
            "mouseleave",
            () => {

                document.body.classList.remove(
                    "mouse-active"
                );

            }
        );

    }
    console.log("NovaDynamics initialized.");

});