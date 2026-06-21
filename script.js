const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let flowers = [];

// Array para guardar nuestras imágenes
const flowerImages = [];
const numImages = 8; // Cantidad de imágenes que tienes

// Cargar las imágenes desde la carpeta 'assets'
for (let i = 1; i <= numImages; i++) {
    const img = new Image();
    // Asumimos que tus imágenes son .png (si son .jpg, cámbialo aquí)
    img.src = `assets/flor${i}.png`; 
    flowerImages.push(img);
}

// Ajustar el tamaño del canvas a la pantalla
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
        
        // Aumenté un poco el tamaño para que las imágenes se vean bien (entre 20px y 50px)
        this.size = Math.random() * 30 + 20; 
        
        this.speedY = Math.random() * 0.5 + 0.2; // Velocidad de subida
        this.speedX = (Math.random() - 0.5) * 0.3; // Balanceo horizontal
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.02; // Velocidad de giro
        
        // Elegir una imagen al azar de nuestro array
        this.img = flowerImages[Math.floor(Math.random() * flowerImages.length)];
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotSpeed;

        // Si la flor sale por arriba, se reinicia abajo
        if (this.y < -this.size - 50) {
            this.reset();
        }
    }

    draw() {
        // Si la imagen todavía no terminó de cargar en el navegador, no hacemos nada
        if (!this.img.complete) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Dibujar la imagen centrada
        // Los parámetros son: imagen, posición X, posición Y, ancho, alto
        ctx.drawImage(this.img, -this.size / 2, -this.size / 2, this.size, this.size);
        
        ctx.restore();
    }
}

// Crear las flores (puedes ajustar el 25 si quieres más o menos cantidad)
for (let i = 0; i < 25; i++) {
    flowers.push(new Flower());
}

// Función que anima todo cuadro por cuadro
function animate() {
    ctx.clearRect(0, 0, width, height);

    flowers.forEach(flower => {
        flower.update();
        flower.draw();
    });

    requestAnimationFrame(animate);
}

// Iniciar la animación
animate();