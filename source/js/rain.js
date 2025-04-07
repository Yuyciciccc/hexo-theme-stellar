
(function () {
    const rainIcons = [
        '<img src="/assets/icons/droplet.svg" style="width:20px;height:20px;" />'
    ];

    const config = {
        interval: 50,
        fallSpeed: 5,
        windRange: 0,
        rotateRange: 0,
        sizeMin: 30,
        sizeMax: 30,
        opacityMin: 0.2,
        opacityMax: 0.5
    };

    const canvas = document.createElement('div');
    canvas.setAttribute('data-rain-canvas', '');
    Object.assign(canvas.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 999,
        overflow: 'hidden'
    });
    document.body.appendChild(canvas);

    function createRainflake() {
        const rainflake = document.createElement('div');
        rainflake.innerHTML = rainIcons[rand(0, rainIcons.length - 1)];

        const startLeft = rand(0, 100);
        const endLeft = Math.min(Math.max(startLeft + rand(-config.windRange, config.windRange), 0), 100);

        const size = rand(config.sizeMin, config.sizeMax);
        const opacity = randFloat(config.opacityMin, config.opacityMax);
        const rotate = rand(-config.rotateRange, config.rotateRange);

        Object.assign(rainflake.style, {
            position: 'absolute',
            top: '-30px',
            left: `${startLeft}%`,
            fontSize: `${size}px`,
            opacity: opacity,
            transition: `transform ${config.fallSpeed}s linear, opacity ${config.fallSpeed}s linear`
        });

        setTimeout(() => {
            rainflake.style.transform = `translate(${endLeft - startLeft}vw, 100vh) rotate(${rotate}deg)`;
            rainflake.style.opacity = 0;
        }, 20);

        rainflake.addEventListener('transitionend', () => rainflake.remove());
        canvas.appendChild(rainflake);
    }

    const timer = setInterval(createRainflake, config.interval);

    window.__rain__ = {
        canvas: canvas,
        timer: timer
    };

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
})();
