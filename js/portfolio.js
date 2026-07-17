/* ==========================================================
   NovaDynamics Portfolio Filtering and Modal
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const filterButtons =
        document.querySelectorAll(".filter-button");

    const portfolioItems =
        document.querySelectorAll(".portfolio-item");

    const modal =
        document.querySelector(".project-modal");

    const modalPanel =
        document.querySelector(".modal-panel");

    const modalClose =
        document.querySelector(".modal-close");

    const secondaryClose =
        document.querySelector("[data-modal-close-secondary]");

    const modalHero =
        document.querySelector(".modal-hero");

    const modalCategory =
        document.querySelector(".modal-category");

    const modalTitle =
        document.querySelector(".modal-title");

    const modalDescription =
        document.querySelector(".modal-description");

    const modalBodyCopy =
        document.querySelector(".modal-body-copy");

    const modalPrimaryLink =
        document.querySelector('[data-modal-link="primary"]');

    const detailFields = {
        discipline: document.querySelector(
            '[data-modal-field="discipline"]'
        ),
        software: document.querySelector(
            '[data-modal-field="software"]'
        ),
        status: document.querySelector(
            '[data-modal-field="status"]'
        )
    };

    let lastFocusedElement = null;

    /* ---------- Filtering ---------- */

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const selectedFilter =
                button.dataset.filter;

            filterButtons.forEach((item) => {

                item.classList.remove("active");

            });

            button.classList.add("active");

            portfolioItems.forEach((item) => {

                const category =
                    item.dataset.category;

                const shouldShow =
                    selectedFilter === "all" ||
                    selectedFilter === category;

                item.classList.toggle(
                    "hidden",
                    !shouldShow
                );

            });

        });

    });

    /* ---------- Modal ---------- */

    const openModal = (item) => {

        if (!modal) return;

        lastFocusedElement = item;

        const category =
            item.dataset.category || "robotics";

        modalHero.className =
            `modal-hero ${category}`;

        modalCategory.textContent =
            item.dataset.modalCategory || "";

        modalTitle.textContent =
            item.dataset.modalTitle || "";

        modalDescription.textContent =
            item.dataset.modalDescription || "";

        modalBodyCopy.textContent =
            item.dataset.modalBody ||
            "Additional project imagery, development notes, videos, and technical information will be added as this project progresses.";

        detailFields.discipline.textContent =
            item.dataset.modalDiscipline ||
            item.dataset.modalCategory ||
            "Engineering";

        detailFields.software.textContent =
            item.dataset.modalSoftware ||
            "Various tools";

        detailFields.status.textContent =
            item.dataset.modalStatus ||
            "In development";

        if (modalPrimaryLink) {

            const projectLink =
                item.dataset.modalLink || "#";

            modalPrimaryLink.href =
                projectLink;

            modalPrimaryLink.textContent =
                projectLink === "#"
                    ? "Full page coming soon"
                    : "View full project";

            modalPrimaryLink.setAttribute(
                "aria-disabled",
                projectLink === "#"
                    ? "true"
                    : "false"
            );

        }

        modal.classList.add("open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

        modalClose?.focus();

    };

    const closeModal = () => {

        if (!modal) return;

        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

        lastFocusedElement?.focus();

    };

    portfolioItems.forEach((item) => {

        item.addEventListener("click", () => {

            openModal(item);

        });

    });

    modalClose?.addEventListener(
        "click",
        closeModal
    );

    secondaryClose?.addEventListener(
        "click",
        closeModal
    );

    modal?.addEventListener("click", (event) => {

        if (event.target === modal) {

            closeModal();

        }

    });

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            modal?.classList.contains("open")
        ) {

            closeModal();

        }

    });

    modalPanel?.addEventListener(
        "keydown",
        (event) => {

            if (event.key !== "Tab") return;

            const focusable =
                modalPanel.querySelectorAll(
                    'button, a[href], [tabindex]:not([tabindex="-1"])'
                );

            if (!focusable.length) return;

            const first =
                focusable[0];

            const last =
                focusable[focusable.length - 1];

            if (
                event.shiftKey &&
                document.activeElement === first
            ) {

                event.preventDefault();

                last.focus();

            } else if (
                !event.shiftKey &&
                document.activeElement === last
            ) {

                event.preventDefault();

                first.focus();

            }

        }
    );

});