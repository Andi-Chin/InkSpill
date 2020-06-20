var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.font = "50px Arial";
ctx.textAlign = 'center';
canvas.width = 500;
canvas.height = 500;
var canvasX = canvas.getBoundingClientRect().left;
var canvasY = canvas.getBoundingClientRect().top;

function drawCircle(x, y, r, color) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI * 2);
	ctx.fillStyle = color;
	ctx.fill();
}

function rd(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

var drs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
var MN = 20, MC = 5, MM = 20;
var mb = [], cc;
var vis = [];
for (var i = 0; i < MN; i ++) {
	var row = [];
	var v = [];
	for (var j = 0; j < MN; j ++) {
		row.push(rd(1, MC));
		v.push(false);
	}
	mb.push(row);
	vis.push(v);
}
mb[0][0] = cc = 1;

function rgbToHex(r, g, b) {
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function can(u) {
	return 0 <= u[0] && u[0] < MN && 0 <= u[1] && u[1] < MN;
}
function drawBorder(xPos, yPos, width, height, thickness = 1) {
	ctx.fillStyle='#888888';
	ctx.fillRect(xPos - (thickness), yPos - (thickness), 
	width + (thickness * 2), height + (thickness * 2));
}

var mp = {
	1: "#0000FF",
	2: "#FF0000",
	3: "#00FF00",
	4: "#FFFF00",
	5: rgbToHex(150, 30, 30),
};
function pt() {
	var gridSize = 25;
	for (var i = 0; i < MN; i ++) {
		for (var j = 0; j < MN; j ++) {
			ctx.fillStyle = '#333333';
			drawBorder(j * gridSize, i * gridSize, gridSize, gridSize, 
				thickness = 10);
			ctx.fillStyle = mp[mb[i][j]];
			ctx.fillRect(j * gridSize, i * gridSize, gridSize, gridSize);
		}
	}
}

pt();
var mv = 0;
function act(nc) {
	mv ++;
	document.getElementsByTagName("h3")[0].innerHTML = "Moves: " + mv;
	var que = [];
	que.push([0, 0]);
	for (var i = 0; i < MN; i ++) {
		for (var j = 0; j < MN; j ++) {
			vis[i][j] = false;
		}
	}
	vis[0][0] = true;
	mb[0][0] = nc;
	var ct = 1;
	while (que.length != 0) {
		var fr = que[0];
		que.shift(0);
		for (var d = 0; d < 4; d ++) {
			var ne = [fr[0] + drs[d][0], fr[1] + drs[d][1]];
			if (can(ne) && !vis[ne[0]][ne[1]]) {
				vis[ne[0]][ne[1]] = true;
				if (mb[ne[0]][ne[1]] === cc) {
					mb[ne[0]][ne[1]] = nc;
					que.splice(que.length - 1, 0, ne);
				}
			}
		}
	}
	cc = nc;
	pt();
	var ct = 0;
	for (var i = 0; i < MN; i ++) {
		for (var j = 0; j < MN; j ++) {
			if (mb[i][j] === nc) {
				ct ++;
			}
		}
	}
	if (ct == MN * MN) {
		document.getElementsByTagName("h3")[0].innerHTML = "You Win!";
	}
}