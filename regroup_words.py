with open("beforeAndAfter.txt") as file:
	lines = file.readlines()
	lines = [l.rstrip() for l in lines]

def regroup(p):
	p = p.split(" ")
	gs = []
	i, j = 0, 1
	g1 = " ".join(p[i:j])
	limits = [12, 14, 14, 12]
	while j < len(p)+1:
		g2 = " ".join(p[i:j+1])
		# print g1, ":", g2
		if g1 == g2:
			# print "commit", g2
			gs.append(g2)
			break
		if i+1 == len(p) and len(g1) == 0:
			# print "commit", p[i]
			gs.append(p[i])
			break
		if len(g2) <= limits[len(gs)]:
			g1 = g2
			j += 1
		else:
			# print "commit", g1
			gs.append(g1)
			i = j
			j = i
			g1 = ""

	return gs

# for l in lines:
	# rg = regroup(l)
	# for r in rg:
		# print r
	# print ""
	# print l, [len(r) for r in rg], len(rg)
	# if not l == " ".join(rg):
		# print "ERROR", rg
