function wheelText(ctx, number, deltaAngle) {
	var offset = -80;
	var dy = 12
	ctx.rotate(deltaAngle);
	for (var i = 0; i < number.length; i++) {
		ctx.fillText(number.charAt(i), 0, offset+dy*i);
	}
}

function newWheelCanvas() {
	var wheelCanvas = document.createElement("canvas");
	wheelCanvas.width = 200;
	wheelCanvas.height = 200;
	var wheelCtx = wheelCanvas.getContext("2d");

	wheelCtx.translate(100, 100);
	// wheelCtx.fillRect(-100, -100, 200, 200);

	wheelCtx.fillStyle = "#666";
	wheelCtx.beginPath();
	wheelCtx.arc(0, 0, 100, 0, 2*Math.PI);
	wheelCtx.fill();

	var colors = ["#fdb827", "#f5821f", "#e03a3e", "#963d97", "#009ddc", "#57bb46", "#000", "#57bb46", "#009ddc", "#963d97", "#e03a3e", "#f5821f"];
	for (var i = 0; i < 12; i++) {
		wheelCtx.fillStyle = colors[i];
		wheelCtx.beginPath();
		wheelCtx.arc(0, 0, 98, (-0.5-1/12)*Math.PI, (-0.5+1/12)*Math.PI);
		wheelCtx.lineTo(0, 0);
		wheelCtx.closePath();
		wheelCtx.fill();
		wheelCtx.rotate(Math.PI/6);
	}

	wheelCtx.fillStyle = "#fff";
	wheelCtx.font = "12px Helvetica";
	wheelCtx.textAlign = "center";

	wheelText(wheelCtx, "1000", 0);
	wheelText(wheelCtx, "750", Math.PI/6);
	wheelText(wheelCtx, "500", Math.PI/6);
	wheelText(wheelCtx, "250", Math.PI/6);
	wheelText(wheelCtx, "100", Math.PI/6);
	wheelText(wheelCtx, "900", Math.PI/6);
	wheelText(wheelCtx, "900", Math.PI/3);
	wheelText(wheelCtx, "100", Math.PI/6);
	wheelText(wheelCtx, "250", Math.PI/6);
	wheelText(wheelCtx, "500", Math.PI/6);
	wheelText(wheelCtx, "750", Math.PI/6);
	wheelCtx.rotate(Math.PI*2/3);
	wheelCtx.font = "10px Helvetica";
	wheelCtx.fillText("BANKRUPT", 66, 3);

	wheelCtx.fillStyle = "#999";
	wheelCtx.beginPath();
	wheelCtx.arc(0, 0, 35, 0, 2*Math.PI);
	wheelCtx.fill();

	return wheelCanvas
}

function drawWheel(ctx, wheel, angle) {
	var x = -wheel.width/2;
	var y = -wheel.height/2;
	ctx.rotate(angle);
	ctx.drawImage(wheel, x, y);
	ctx.rotate(-angle);

	// Draw arrow
	ctx.fillStyle = "#ccc";
	ctx.strokeStyle = "#333";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(x+110, y-5);
	ctx.lineTo(x+100, y+15);
	ctx.lineTo(x+ 90, y-5);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}
