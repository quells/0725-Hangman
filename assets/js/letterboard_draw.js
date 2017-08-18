var LetterBoard = function(charWidth, charHeight, padding) {
	this.charWidth = charWidth;
	this.charHeight = charHeight;
	this.padding = padding;
	this.bw = 2; // border width
	this.phrase = [];

	this.bgCanvas = document.createElement("canvas");
	this.bgCanvas.width = 14*charWidth + 2*padding + this.bw;
	this.bgCanvas.height = 4*charHeight + 2*padding + this.bw;

	var ctx = this.bgCanvas.getContext("2d");
	ctx.fillStyle = "#6df"; // Light blue
	ctx.fillRect(this.charWidth, 0, 12*this.charWidth+this.bw+2*this.padding, 4*this.charHeight+this.bw+2*this.padding);
	ctx.fillRect(0, this.charHeight, 14*this.charWidth+this.bw+2*this.padding, 2*this.charHeight+this.bw+2*this.padding);
	ctx.fillStyle = "#13f"; // Blue
	ctx.fillRect(this.charWidth+0.5*this.padding, 0.5*this.padding, 12*this.charWidth+this.bw+this.padding, 4*this.charHeight+this.bw+this.padding);
	ctx.fillRect(0.5*this.padding, this.charHeight+0.5*this.padding, 14*this.charWidth+this.bw+this.padding, 2*this.charHeight+this.bw+this.padding);
	ctx.fillStyle = "#000"; // Black
	ctx.fillRect(this.padding+this.charWidth, this.padding, 12*this.charWidth+this.bw, 4*this.charHeight+this.bw);
	ctx.fillRect(this.padding, this.padding+this.charHeight, 14*this.charWidth+this.bw, 2*this.charHeight+this.bw);
	ctx.fillStyle = "#184"; // Green
	var x, y;
	var w = this.charWidth-this.bw;
	var h = this.charHeight-this.bw;
	for (var j = 0; j < 4; j++) {
		var nx = (j == 1 || j == 2) ? 14 : 12;
		var ox = (j == 1 || j == 2) ? 0 : this.charWidth;
		y = this.padding + this.charHeight*j + this.bw;
		for (var i = 0; i < nx; i++) {
			x = this.padding + ox + this.charWidth*i + this.bw;
			ctx.fillRect(x, y, w, h);
		}
	}

	this.fgCanvas = document.createElement("canvas");
	this.fgCanvas.width = 14*charWidth;
	this.fgCanvas.height = 4*charHeight;

	this.canvas = document.createElement("canvas");
	this.canvas.width = this.bgCanvas.width;
	this.canvas.height = this.bgCanvas.height;

	this.update = function() {
		// Draw letters from phrase
		if (this.phrase.length > 0) {
			var ctx = this.fgCanvas.getContext("2d");
			ctx.fillStyle = "#eee";
			for (var i = 0; i < this.phrase.length; i++) {
				var chunk = this.phrase[i];
				var offsetX = this.padding + this.bw;
				var offsetY = this.padding + i*this.charHeight + this.bw;
				if (i == 0 || i == 3) {
					offsetX += this.charWidth;
				}
				for (var j = 0; j < chunk.length; j++) {
					var char = chunk[j];
					if (char != " ") {
						ctx.fillRect(offsetX + j*this.charWidth, offsetY, charWidth-this.bw, charHeight-this.bw);
					}
				}
			}

			ctx.fillStyle = "#000";
			ctx.font = this.charWidth + "px sans-serif";
			ctx.textAlign = "center";
			for (var i = 0; i < this.phrase.length; i++) {
				var chunk = this.phrase[i];
				var offsetX = this.padding + this.bw - 1;
				var offsetY = this.padding + (i+1)*this.charHeight + this.bw - 5;
				if (i == 0 || i == 3) {
					offsetX += this.charWidth;
				}
				for (var j = 0; j < chunk.length; j++) {
					var char = chunk[j];
					if (char != " " && char != "_") {
						ctx.fillText(char.toUpperCase(), offsetX + (j+0.5)*this.charWidth, offsetY);
					}
				}
			}
		}

		var ctx = this.canvas.getContext("2d");
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		ctx.drawImage(this.bgCanvas, 0, 0);
		ctx.drawImage(this.fgCanvas, 0, 0);
	};
};
