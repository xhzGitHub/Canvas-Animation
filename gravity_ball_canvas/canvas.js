let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

// moving circle
let mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
}

const colorArray = [
	'#2185C5',
	'#7ecefd',
	'#fff6e5',
	'#ff7f66'
];

const gravity = 1;
const firction = 0.8;

function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}

function Ball(x, y, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;
	
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); // 绘制圆形
		c.fillStyle = this.color;
		c.fill(); // 填充
		c.stroke(); // 描边
		c.closePath();
	}

	this.update = function() {
		// 当到达底边时改变 dy 方向, firction 与 gravity模拟重力
		if (this.y + this.radius > canvas.height) {
			this.dy = -this.dy * firction;
		} else {
			this.dy += gravity;
		}
		// 当到达侧边时改变 dx 方向
		if (this.x + this.radius + this.dx > canvas.width ||
			this.x - this.radius <= 0) 
		{
			this.dx = -this.dx;
		}
		// 实时改变 x 与 y 的值，使小球动起来
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	}
}

let ball = null;
let ballArray = [];

function init() {
	// 绘制 550 个小球
	for (let i = 0; i < 550; i++) {
		// 给予随机的x, y, dx, dy, color
		const radius = randomIntFromRange(12, 20);
		const x = randomIntFromRange(radius, canvas.width - radius);
		const y = randomIntFromRange(0, canvas.height - radius);
		const dx = randomIntFromRange(-2, 2);
		const dy = randomIntFromRange(-2, 2);
		const color = randomColor(colorArray);
		ball = new Ball(x, y, dx, dy, radius, color);
		ballArray.push(ball);
	}
}

function animate() {
	// 开启动画
	requestAnimationFrame(animate);
	// 每帧开始清除上一次的画布
	c.clearRect(0, 0, canvas.width, canvas.height);
	// 渲染小球
	ballArray.map(ball => ball.update());
}

init();
animate();