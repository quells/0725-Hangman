var Background = function(w, h) {
	this.canvas = document.createElement("canvas");
	this.canvas.width = w;
	this.canvas.height = h;

	var ctx = this.canvas.getContext("2d");
	ctx.fillStyle = "#107";
	ctx.fillRect(0, 0, w, h);

	ctx.strokeStyle = "#3ac";
	ctx.lineWidth = 4;

	ctx.beginPath();
	ctx.arc(w*0.4, w*0.75+10, w*0.75, 0, 2*Math.PI);
	ctx.arc(w*0.6, w*0.80+60, w*0.80, 0, 2*Math.PI);
	ctx.arc(w*0.35, w*1.18, w, 0, 2*Math.PI);
	ctx.stroke();

	ctx.strokeStyle = "#b8f";
	ctx.lineWidth = 2;

	ctx.beginPath();
	ctx.arc(w*0.4, w*0.75+10, w*0.73, 0, 2*Math.PI);
	ctx.arc(w*0.6, w*0.80+50, w*0.75, 0, 2*Math.PI);
	ctx.stroke();
}
