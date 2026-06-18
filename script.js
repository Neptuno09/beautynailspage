const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let flowers = [];

// Paleta de colores inspirada en tu Instagram (rosas, lilas, blancos)
const colors = ['#ffb6c1', '#dda0dd', '#ff69b4', '#fff0f5', '#e6e6fa'];

// Ajustar el tamaño del canvas al tamaño de la pantalla
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

// Clase que representa cada flor
class Flower {
    constructor() {
        this.reset();
        // Distribuir las flores inicialmente por toda la pantalla
        this.y = Math.random() * height; 
    }

    reset() {
        this.x = Math.random() * width;
        this.y = height + 50; // Nacen abajo de la pantalla
        this.size = Math.random() * 8 + 6; // Tamaño entre 6 y 14
        this.speedY = Math.random() * 0.5 + 0.2; // Velocidad de subida
        this.speedX = (Math.random() - 0.5) * 0.3; // Balanceo horizontal
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02; // Velocidad de giro
        this.petals = Math.floor(Math.random() * 2) + 4; // 4 o 5 pétalos
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotSpeed;

        // Si la flor sale por arriba, se reinicia abajo
        if (this.y < -50) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Dibujar pétalos
        ctx.fillStyle = this.color;
        for (let i = 0; i < this.petals; i++) {
            ctx.beginPath();
            ctx.ellipse(0, this.size, this.size * 0.4, this.size, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.rotate((Math.PI * 2) / this.petals);
        }

        // Centro de la flor (dorado/blanco)
        ctx.fillStyle = '#ffecb3';
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
    }
}

// Crear las flores (puedes aumentar el número si quieres más)
for (let i = 0; i < 25; i++) {
    flowers.push(new Flower());
}

// Función que anima todo cuadro por cuadro
function animate() {
    // Borrar el frame anterior
    ctx.clearRect(0, 0, width, height);

    // Actualizar y dibujar cada flor
    flowers.forEach(flower => {
        flower.update();
        flower.draw();
    });

    requestAnimationFrame(animate);
}

// Iniciar la animación
animate();