/* ==========================================================
   NovaDynamics Atmospheric Particles
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("particle-canvas");

    if (!canvas) return;

    const context = canvas.getContext("2d");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    let particles = [];
    let animationFrame;

    const pointer = {

        x:width / 2,
        y:height / 2,
        active:false

    };

    class Particle {

        constructor(){

            this.reset(true);

        }

        reset(initial = false){

            this.x = Math.random() * width;

            this.y = initial
                ? Math.random() * height
                : height + Math.random() * 80;

            this.radius = Math.random() * 1.7 + .4;

            this.speedY = Math.random() * .18 + .06;

            this.speedX = (Math.random() - .5) * .12;

            this.opacity = Math.random() * .4 + .12;

            this.phase = Math.random() * Math.PI * 2;

        }

        update(){

            this.phase += .008;

            this.x += this.speedX + Math.sin(this.phase) * .035;

            this.y -= this.speedY;

            if (pointer.active){

                const deltaX = this.x - pointer.x;
                const deltaY = this.y - pointer.y;

                const distanceSquared =
                    deltaX * deltaX +
                    deltaY * deltaY;

                const influenceRadius = 170;
                const influenceSquared =
                    influenceRadius * influenceRadius;

                if (
                    distanceSquared > 0 &&
                    distanceSquared < influenceSquared
                ){

                    const distance = Math.sqrt(distanceSquared);

                    const force =
                        (1 - distance / influenceRadius) * .18;

                    this.x +=
                        (deltaX / distance) * force;

                    this.y +=
                        (deltaY / distance) * force;

                }

            }

            if (
                this.y < -20 ||
                this.x < -30 ||
                this.x > width + 30
            ){

                this.reset();

            }

        }

        draw(){

            const glowRadius = this.radius * 5;

            const gradient = context.createRadialGradient(

                this.x,
                this.y,
                0,

                this.x,
                this.y,
                glowRadius

            );

            gradient.addColorStop(
                0,
                `rgba(255,255,255,${this.opacity})`
            );

            gradient.addColorStop(
                .3,
                `rgba(121,216,255,${this.opacity * .55})`
            );

            gradient.addColorStop(
                1,
                "rgba(121,216,255,0)"
            );

            context.beginPath();

            context.fillStyle = gradient;

            context.arc(

                this.x,
                this.y,
                glowRadius,
                0,
                Math.PI * 2

            );

            context.fill();

        }

    }

    function resizeCanvas(){

        width = window.innerWidth;
        height = window.innerHeight;

        pixelRatio = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        context.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0
        );

        createParticles();

    }

    function createParticles(){

        const density =
            width < 700
                ? 28
                : Math.min(
                    85,
                    Math.floor(width / 18)
                );

        particles = Array.from(

            { length:density },

            () => new Particle()

        );

    }

    function animate(){

        context.clearRect(
            0,
            0,
            width,
            height
        );

        particles.forEach((particle) => {

            particle.update();
            particle.draw();

        });

        animationFrame =
            requestAnimationFrame(animate);

    }

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    window.addEventListener(
        "mousemove",
        (event) => {

            pointer.x = event.clientX;
            pointer.y = event.clientY;
            pointer.active = true;

        }
    );

    document.addEventListener(
        "mouseleave",
        () => {

            pointer.active = false;

        }
    );

    resizeCanvas();

    if (!reducedMotion){

        animate();

    } else {

        particles.forEach((particle) => {

            particle.draw();

        });

    }

    window.addEventListener(
        "beforeunload",
        () => {

            cancelAnimationFrame(animationFrame);

        }
    );

});