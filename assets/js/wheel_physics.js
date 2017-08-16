function rk4_step(R, V, dx, dv, F, h) {
	R += dx*h;
	V += dv*h;
	var A = F(R, V);
	return {"V": V, "A": A};
};

function rk4(R, V, F, h) {
	var a = rk4_step(R, V,   V,   0, F, 0);
	var b = rk4_step(R, V, a.V, a.A, F, 0.5*h);
	var c = rk4_step(R, V, b.V, b.A, F, 0.5*h);
	var d = rk4_step(R, V, c.V, c.A, F, h);

	var dxdt = (a.V + 2*(b.V + c.V) + d.V)/6;
	var dvdt = (a.A + 2*(b.A + c.A) + d.A)/6;

	return {
		"nR": R + dxdt*h,
		"nV": V + dvdt*h
	}
};

var WheelPhysics = function(omega) {
	this.theta = 0;
	this.omega = omega;

	this.friction = function(R, V) {
		return -0.1*(V*V + V + 1);
	};

	this.step = function(h) {
		for (var t = 0; t < 10; t++) {
			var n = rk4(this.theta, this.omega, this.friction, h);
			this.theta = n.nR;
			this.omega = n.nV;
		}
	};
}
