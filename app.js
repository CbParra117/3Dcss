// Enable scene interaction

const scene = document.querySelector('.scene');

const rotation = [];
const startPos = [];
let scale = 1;

const start = event => {
	// get the rx and ry of scene
	let style = window.getComputedStyle(scene);
	rotation[0] = parseInt(style.getPropertyValue('--rx'));
	rotation[1] = parseInt(style.getPropertyValue('--ry'));
	// mouse starting position
	startPos[0] = event.clientX || event.touches[0].clientX;
	startPos[1] = event.clientY || event.touches[0].clientY;
};

const update = event => {
	if (startPos.length > 0) {
		// track changes to the x and y
		let x = (event.clientX || event.touches[0].clientX) - startPos[0];
		let y = (event.clientY || event.touches[0].clientY) - startPos[1];
		// update the scene
		scene.style.setProperty('--rx', rotation[0] - y + 'deg');
		scene.style.setProperty('--ry', rotation[1] + x + 'deg');
		// log output
		console.table({
			rx: `${rotation[0] - y}deg`,
			ry: `${rotation[1] - x}deg`
		});
	}
};

const end = event => {
	startPos.length = 0;
};

scene.addEventListener('touchstart', start, false);
scene.addEventListener('mousedown', start, false);
document.addEventListener('touchmove', update, false);
document.addEventListener('mousemove', update, false);
document.addEventListener('touchend', end, false);
document.addEventListener('mouseup', end, false);

// zoom in out on mouse wheel
scene.addEventListener('wheel', event => {
	event.preventDefault();
	scale += event.deltaY * -0.01;
	scale = scale > 3 ? 3 : scale < 0.25 ? 0.25 : scale;
	scene.style.setProperty('--scene-scale', scale);
}, { passive: false });