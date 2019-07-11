let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

// moving circle
let mouse = {
	x: undefined,
	y: undefined
}

const MAX_RADIUS = 80;
const colorArray = [
	'#696969',
	'#FFFE94',
	'#FF7A7A',
	'#4E9BCC',
	'#4D8BB3'
];

window.addEventListener("mousemove", e => {
	mouse.x = e.x;
	mouse.y = e.y;
	console.log(mouse)
})

function Circle(x, y, radius, dx, dy) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.MIN_RADIUS = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
	
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;
		
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
			mouse.y - this.y < 50 && mouse.y - this.y > -50
		) {
			if (this.radius < MAX_RADIUS) {
				this.radius += 2;
			}
		} else if (this.radius > this.MIN_RADIUS) {
			this.radius--;
		}

		this.draw();
	}
}

let circleArray = [];
for (let i = 0; i < 1000; i++) {
	const radius = Math.random() * 2 + 1;
	const x = Math.random() * (innerWidth - radius * 2) + radius;
	const y = Math.random() * (innerHeight -radius * 2) + radius;
	const dx = (Math.random() - 0.5) * 3;
	const dy = (Math.random() - 0.5) * 3;
	const circle = new Circle(x, y, radius, dx, dy);
	circleArray.push(circle);
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	
	circleArray.map(circle => circle.update())
}

animate();

// let img = new Image();
// img.src= canvas.toDataURL('image/png');

// console.log(img.src)
// // rectangle
// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100); // 绘制矩形

// // line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300,100);
// c.lineTo(400, 300);
// c.strokeStyle = "#fa34a3";
// c.stroke();

// // arc / circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

// for (let i = 0; i < 200; i++) {
// 	const x = Math.random() * window.innerWidth;
// 	const y = Math.random() * window.innerHeight;
// 	const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, ${Math.random()})`;
// 	c.beginPath();
// 	c.arc(x, y, 30, 0, Math.PI * 2, false);
// 	c.strokeStyle = color;
// 	c.stroke();
// }