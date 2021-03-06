(function () {
    var canvas = document.createElement("canvas");
    document.querySelector("body").appendChild(canvas);
    canvas.className = "canv";
    var ctx = canvas.getContext("2d");
    var w = (canvas.width = innerWidth);
    var h = (canvas.height = innerHeight);
    var snowFlakes = [];
    var properties = {
        bgColor: "#000000",
        flakesColor: "#fffff",
        flakeRadius: [1, 2, 3, 4],
        flakesAmount: 2,
        flakesSpeed: 0.2,
        speedX: 0.01,
        speedY: 0.03
    };
    window.onresize = function () {
        (w = canvas.width = innerWidth), (h = canvas.height = innerHeight);
    };
    var Snowflake = /** @class */ (function () {
        function Snowflake() {
            this.x = Math.random() * w;
            this.y = 0;
            this.radius =
                properties.flakeRadius[Math.ceil(Math.random() * properties.flakeRadius.length - 1)];
            if (this.radius ===
                properties.flakeRadius[properties.flakeRadius.length - 1]) {
                this.speedX =
                    (Math.random() * (properties.flakesSpeed * 2) -
                        properties.flakesSpeed) *
                        10;
                this.speedY = 2;
            }
            else {
                this.speedX =
                    Math.random() * (properties.flakesSpeed * 2) - properties.flakesSpeed;
                this.speedY = 1;
            }
            this.blur = 1;
        }
        Snowflake.prototype.position = function () {
            if (this.willIncreese) {
                this.speedX = this.speedX + properties.speedX;
                this.speedY = this.speedY + properties.speedY;
            }
            this.x += this.speedX;
            this.y += this.speedY;
        };
        Snowflake.prototype.reDraw = function () {
            var radgrad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius < 7 && this.willIncreese
                ? (this.radius = this.radius + 0.04)
                : this.radius);
            radgrad.addColorStop(this.willIncreese
                ? this.blur > 0.1
                    ? (this.blur = this.blur - 0.005)
                    : (this.blur = 0)
                : (this.blur = 1), "rgb(255,255,255)");
            radgrad.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = radgrad;
            ctx.fillRect(0, 0, w, h);
        };
        return Snowflake;
    }());
    function reDrawBackGround() {
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, h);
    }
    function reDrawFlackes() {
        for (var i in snowFlakes) {
            snowFlakes[i].position();
            snowFlakes[i].reDraw();
        }
    }
    function clearFlacks() {
        snowFlakes = snowFlakes.filter(function (snowflake) { return snowflake.y < h && snowflake.x > 0 && snowflake.x < w; });
    }
    function createSnowFlakes() {
        for (var i = 0; i < properties.flakesAmount; i++) {
            var flake = new Snowflake();
            if (flake.radius == 1 && Math.random() < 0.3) {
                flake.willIncreese = true;
            }
            snowFlakes.push(flake);
        }
        return snowFlakes;
    }
    function loop() {
        reDrawBackGround();
        reDrawFlackes();
        requestAnimationFrame(loop);
        clearFlacks();
    }
    (function () {
        setInterval(createSnowFlakes, 100);
        loop();
    })();
})();
