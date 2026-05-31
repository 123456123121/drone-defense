const menu = document.getElementById("menu");
const canvas = document.getElementById("game");

document.getElementById("droneBtn").onclick = () => {
    startGame("drone");
};

document.getElementById("airBtn").onclick = () => {
    startGame("air");
};

function startGame(team){

    menu.style.display = "none";
    canvas.style.display = "block";

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const keys = {};

    document.addEventListener("keydown",e=>{
        keys[e.key.toLowerCase()] = true;
    });

    document.addEventListener("keyup",e=>{
        keys[e.key.toLowerCase()] = false;
    });

    const drone = {
        x: canvas.width/2,
        y: canvas.height/2,
        speed: 4
    };

    function update(){

        if(team === "drone"){

            if(keys["w"]) drone.y -= drone.speed;
            if(keys["s"]) drone.y += drone.speed;
            if(keys["a"]) drone.x -= drone.speed;
            if(keys["d"]) drone.x += drone.speed;

        }

    }

    function draw(){

        ctx.clearRect(0,0,canvas.width,canvas.height);

        // Звезды
        ctx.fillStyle = "white";

        for(let i=0;i<200;i++){
            ctx.fillRect(
                (i*83)%canvas.width,
                (i*47)%canvas.height,
                2,
                2
            );
        }

        if(team === "drone"){

            ctx.fillStyle = "cyan";

            ctx.beginPath();
            ctx.arc(drone.x,drone.y,15,0,Math.PI*2);
            ctx.fill();

            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.fillText(
                `X:${Math.floor(drone.x)} Y:${Math.floor(drone.y)}`,
                20,
                40
            );

        }

        if(team === "air"){

            ctx.fillStyle = "lime";
            ctx.fillRect(
                canvas.width/2-25,
                canvas.height-100,
                50,
                50
            );

            ctx.fillStyle = "white";
            ctx.fillText("ПВО",canvas.width/2-15,canvas.height-110);

        }

    }

    function gameLoop(){

        update();
        draw();

        requestAnimationFrame(gameLoop);

    }

    gameLoop();

}