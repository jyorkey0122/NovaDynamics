/* ==========================================================
   NovaDynamics Easter Eggs
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const novaNotification =
        document.querySelector(".nova-notification");

    const launchNotification =
        document.querySelector(".launch-notification");

    const clickableLogos =
        document.querySelectorAll(".logo, .hero-logo, .footer-logo");

    let typedSequence = "";
    let novaNotificationTimeout;

    let logoClickCount = 0;
    let logoClickTimer;
    let launchActive = false;

    /* ---------- NOVA Night Mode ---------- */

    const activateNovaMode = () => {

        document.body.classList.toggle("nova-mode");

        const isActive =
            document.body.classList.contains("nova-mode");

        if (novaNotification) {

            novaNotification.textContent =
                isActive
                    ? "NOVA MODE ACTIVATED"
                    : "NOVA MODE DEACTIVATED";

            novaNotification.classList.add("visible");

            clearTimeout(novaNotificationTimeout);

            novaNotificationTimeout = setTimeout(() => {

                novaNotification.classList.remove("visible");

            }, 2200);

        }

    };

    document.addEventListener("keydown", (event) => {

        if (
            event.ctrlKey ||
            event.altKey ||
            event.metaKey
        ) {
            return;
        }

        typedSequence += event.key.toUpperCase();

        typedSequence = typedSequence.slice(-4);

        if (typedSequence === "NOVA") {

            activateNovaMode();

            typedSequence = "";

        }

    });

    /* ---------- Hidden Launch Sequence ---------- */

    const activateLaunchSequence = () => {

        if (launchActive) return;

        launchActive = true;

        document.body.classList.add("launch-sequence");

        launchNotification?.classList.add("visible");

        setTimeout(() => {

    document.body.classList.remove("launch-sequence");

    launchNotification?.classList.remove("visible");

    launchActive = false;

}, 4200);

    };

    clickableLogos.forEach((logo) => {

        logo.addEventListener("click", (event) => {

            logoClickCount += 1;

            clearTimeout(logoClickTimer);

            logoClickTimer = setTimeout(() => {

                logoClickCount = 0;

            }, 1800);

            if (logoClickCount >= 7) {

                event.preventDefault();

                logoClickCount = 0;

                activateLaunchSequence();

            }

        });

    });

});