var Wheel = function(wheelPhysics) {
	this.wheelPhysics = wheelPhysics;

	this.bgCanvas = document.createElement("canvas");
	this.bgCanvas.width = 200;
	this.bgCanvas.height = 200;

	var ctx = this.bgCanvas.getContext("2d");
	ctx.translate(100, 100);
	ctx.fillStyle = "#666";
	ctx.beginPath();
	ctx.arc(0, 0, 100, 0, 2*Math.PI);
	ctx.fill();

	var colors = ["#fdb827", "#f5821f", "#e03a3e", "#963d97", "#009ddc", "#57bb46", "#000", "#57bb46", "#009ddc", "#963d97", "#e03a3e", "#f5821f"];
	for (var i = 0; i < 12; i++) {
		ctx.fillStyle = colors[i];
		ctx.beginPath();
		ctx.arc(0, 0, 98, (-0.5-1/12)*Math.PI, (-0.5+1/12)*Math.PI);
		ctx.lineTo(0, 0);
		ctx.closePath();
		ctx.fill();
		ctx.rotate(Math.PI/6);
	}

	ctx.fillStyle = "#fff";
	ctx.font = "12px sans-serif";
	ctx.textAlign = "center";

	var numbers = ["1000", "750", "500", "250", "100", "900", "900", "100", "250", "500", "750"];
	var offset = -80;
	var dy = 12;
	for (var i = 0; i < 11; i++) {
		var deltaAngle = Math.PI/6;
		if (i == 0) { deltaAngle = 0; }
		if (i == 6) { deltaAngle = Math.PI/3; }
		ctx.rotate(deltaAngle);
		var number = numbers[i];
		for (var j = 0; j < number.length; j++) {
			ctx.fillText(number.charAt(j), 0, offset+dy*j);
		}
	}
	ctx.rotate(Math.PI*2/3);
	ctx.font = "10px sans-serif";
	ctx.fillText("BANKRUPT", 66, 3);

	ctx.fillStyle = "#999";
	ctx.beginPath();
	ctx.arc(0, 0, 35, 0, 2*Math.PI);
	ctx.fill();

	this.fgCanvas = document.createElement("canvas");
	this.fgCanvas.width = 250;
	this.fgCanvas.height = 250;
	ctx = this.fgCanvas.getContext("2d");

	ctx.fillStyle = "#ccc";
	ctx.strokeStyle = "#333";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(135, 15);
	ctx.lineTo(125, 35);
	ctx.lineTo(115, 15);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	this.canvas = document.createElement("canvas");
	this.canvas.width = 250;
	this.canvas.height = 250;

	this.update = function() {
		this.canvas.width = this.canvas.width;
		var ctx = this.canvas.getContext("2d");
		ctx.translate(this.canvas.width/2, this.canvas.width/2);
		ctx.rotate(this.wheelPhysics.theta);
		ctx.drawImage(this.bgCanvas, -this.bgCanvas.width/2, -this.bgCanvas.width/2);
		ctx.rotate(-this.wheelPhysics.theta);
		ctx.drawImage(this.fgCanvas, -125, -125);
	};
};
