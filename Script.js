let spacing = 32; 
let targetX = 0;  
let targetY = 0;
let easeX = 0;    
let easeY = 0;
let easingSpeed = 0.07; // التنعيم الفائق والانسيابي للحركة خلف الماوس

function setup() {
    let canvas = createCanvas(380, 680);
    canvas.parent('canvas-container');
    
    easeX = width / 2;
    easeY = height / 2 + 90;
}

function draw() {
    background(0); 

    // تتبع حركة الماوس أو اللمس بسلاسة
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        targetX = mouseX;
        targetY = mouseY;
    } else {
        targetX = width / 2;
        targetY = height / 2 + 110;
    }
    
    easeX += (targetX - easeX) * easingSpeed;
    easeY += (targetY - easeY) * easingSpeed;

    // رسم شبكة النقاط والخطوط التفاعلية
    for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = 180 + spacing / 2; y < height - 20; y += spacing) {
            
            let d = dist(easeX, easeY, x, y);

            if (d < 160) {
                let alpha = map(d, 0, 160, 240, 0);
                stroke(0, 210, 255, alpha * 0.35); 
                strokeWeight(1);
                line(easeX, easeY, x, y);

                let dotSize = map(d, 0, 160, 6, 2);
                fill(255, map(d, 0, 160, 255, 100));
                noStroke();
                ellipse(x, y, dotSize, dotSize);
            } else {
                fill(45);
                noStroke();
                ellipse(x, y, 2, 2);
            }
        }
    }

    noStroke();
    fill(0, 210, 255, 40);
    ellipse(easeX, easeY, 25, 25); 
    fill(255);
    ellipse(easeX, easeY, 9, 9);  
}
