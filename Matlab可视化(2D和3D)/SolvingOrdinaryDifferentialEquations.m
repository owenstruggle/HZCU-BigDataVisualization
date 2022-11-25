y = dsolve('x^2*Dy+y^2=0', 'x');
y = simplify(y); %化简: y = -x/(C1*x + 1)

x = linspace(-10, 10, 100);
y1 = -x./(-2*x+1);
y2 = -x;
y3 = -x./(2*x+1);
y4 = -x./(4*x+1);

subplot(2,2,1);
plot(x, y1)
title('C=-2时微分方程的解')
xlabel('x')
ylabel('y')

subplot(2,2,2);
plot(x, y2)
title('C=0时微分方程的解')
xlabel('x')
ylabel('y')

subplot(2,2,3);
plot(x, y3)
title('C=2时微分方程的解')
xlabel('x')
ylabel('y')

subplot(2,2,4);
plot(x, y4)
title('C=4时微分方程的解')
xlabel('x')
ylabel('y')