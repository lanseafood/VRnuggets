from operator import sub, div, add
import sys


input_file = sys.argv[1]
output_file = sys.argv[2]

print 'you inputed this file ' + input_file
print 'your output file is ' + output_file

def xyz_place(first, second, value):
	if value < first:
		pass
# LEFT-1
# RGIHT-1
f = open(input_file +'.txt', 'r')
flex = []
# xyz = []

i = 0
# time = []

record = []
lx = 0
ly = 0
lz = 0
# getting input 
for l in f:
	s = l.strip().split(',')
	fx = int(s[1])
	ax = int(s[2])*100
	ay = int(s[3])*100
	az = int(s[4])*100
	# change = False
	# flex.append(fx)
	# xyz.append((ax, ay, az))
	# t = int(s[0])

	if i == 0:
		# acc.append((ax,ay,az))
		record.append((fx, 0,0,0))
		flex.append(fx)
		lx = ax
		ly = ay
		lz = az
		i = i+1
	else:
		if ax == lx and ay == ly and az == lz:
			pass
		else:
			# change = True
			x = 0
			y = 0
			z = 0
			if ax < lx:
				x = -1
				lx = ax
			elif ax > lx:
				x = 1
				lx = ax

			if ay < ly:
				y = -1
				ly = ay
			elif ay > ly:
				y = 1
				ly = ay
			if az < lz:
				z = -1
				lz = az
			elif az > lz:
				z = 1
				lz = az

			flex.append(fx)
			record.append((fx,x,y,z))

f.close()
# flex values range
minf = min(flex)
maxf = max(flex)
print minf
print maxf

thirds_f = (maxf-minf)/3
firstThird = minf+thirds_f
secondThird = firstThird+ thirds_f
print thirds_f
print firstThird
print secondThird
# output file 
results = open(output_file + '.txt', 'r+')
results.write('[')
for l in record:
	flx = l[0]
	rest = list(l[1:4])
	a = []
	# a = [flx]+rest
	# print a
	# print s
	if flx < firstThird:
		a = [.3] + rest
		# results.write('.3\n')
		# print a
	elif flx < secondThird:
		a = [3] + rest
		# print a
		# results.write('3\n')
	else:
		a = [9] + rest #most condense
	# print a
	results.write(',' + str(a))
results.write(']')

results.close()
