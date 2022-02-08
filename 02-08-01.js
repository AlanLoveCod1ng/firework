/**
 * Starter file for 02-08-01.js - the only exercise of page 8 of Workbook 2
 */

// @ts-check

// Find the canvas and start!
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("box2canvas"));
// @ts-ignore
let context = canvas.getContext('2d');

let fireworks = []
let colors = ["red", "purple", "blue", "green", "darkred","yellow","lightred","gold"]

canvas.onclick = function(event){
    let box = /** @type {HTMLCanvasElement} */ (event.target).getBoundingClientRect();
    let X = box.left;
    let Y = box.top;
    let mouseX = event.clientX - X;
    let mouseY = event.clientY - Y;
    fireworks.push({
        "currentX" : mouseX,
        "currentY" : canvas.height - Y,
        "targetX" : mouseX,
        "targetY" : mouseY,
        "color" : colors[parseInt(Math.random()*7+"",10)],
        "MoveSpeed": Math.random()*3+1,
        "exploded" : false,
        "particles": [],
    });
}
function explode(firework){
    for(let i = 0; i<20; i++){
        firework.particles.push({
            "color" : colors[parseInt(Math.random()*7+"",10)],
            "XSpeed": (Math.random()-0.5)*5,
            "YSpeed": (Math.random()-0.5)*5,
            "currentX":firework.currentX,
            "currentY":firework.currentY
        })
    }
    firework.exploded = true;
}
function animate(){
    context.clearRect(0,0,canvas.width,canvas.height);
    fireworks.forEach(function(firework){
        
        if(firework.currentY>firework.targetY){
            firework.currentY-=firework.MoveSpeed;
            context.save();
            context.fillStyle = firework.color;
            context.beginPath();
            context.arc(firework.currentX,firework.currentY,6,0,Math.PI*2,false);
            context.fill();
            context.restore();
        }
        else{
            if(!firework.exploded){
                explode(firework);
            }
            firework.particles.forEach(function(particle){
                particle.currentX += particle.XSpeed;
                particle.currentY += particle.YSpeed;
                context.save();
                context.fillStyle = particle.color;
                context.beginPath();
                context.arc(particle.currentX,particle.currentY,3,0,Math.PI*2,false);
                context.fill();
                context.restore();
            })
        }
    })
    window.requestAnimationFrame(animate);
}
animate();