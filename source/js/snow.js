(function () {
    const snowIcons = [
      '<img src="/assets/icons/snow1.svg" style="width:20px;height:20px;" />',
      '<img src="/assets/icons/snow3.svg" style="width:20px;height:20px;" />',
      '<img src="/assets/icons/snow4.svg" style="width:20px;height:20px;" />',
      '<img src="/assets/icons/snowman.svg" style="width:20px;height:20px;" />'
    ];
  
    const config = {
      interval: 100,    //生成的时间间隔，越小生成的数量越多
      fallSpeed: 10,    //下落速度，越小越大
      windRange: 30,    //风的影响程度，越大风越大
      rotateRange: 90, //旋转角度
      sizeMin: 15,      //最小尺寸
      sizeMax: 50,
      opacityMin: 0.7,  //最小透明度
      opacityMax: 1.0
    };
  
    const canvas = document.createElement('div');
    canvas.setAttribute('data-snow-canvas', '');
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
  
    function createSnowflake() {
      const snowflake = document.createElement('div');
      snowflake.innerHTML = snowIcons[rand(0, snowIcons.length - 1)];
  
      const startLeft = rand(0, 100);
      const endLeft = Math.min(Math.max(startLeft + rand(-config.windRange, config.windRange), 0), 100);
  
      const size = rand(config.sizeMin, config.sizeMax);
      const opacity = randFloat(config.opacityMin, config.opacityMax);
      const rotate = rand(-config.rotateRange, config.rotateRange);
  
      Object.assign(snowflake.style, {
        position: 'absolute',
        top: '-30px',
        left: `${startLeft}%`,
        fontSize: `${size}px`,
        opacity: opacity,
        transition: `transform ${config.fallSpeed}s linear, opacity ${config.fallSpeed}s linear`
      });
  
      setTimeout(() => {
        snowflake.style.transform = `translate(${endLeft - startLeft}vw, 100vh) rotate(${rotate}deg)`;
        snowflake.style.opacity = 0;
      }, 20);
  
      snowflake.addEventListener('transitionend', () => snowflake.remove());
      canvas.appendChild(snowflake);
    }
  
    const timer = setInterval(createSnowflake, config.interval);
  
    window.__snow__ = {
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
  