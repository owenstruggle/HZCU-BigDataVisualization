x = linspace(-1, 30, 100);
y = sqrt(x + 1);

area(x, y, 'FaceColor', [0.5 0.9 0.6], 'EdgeColor', [0 0.5 0.1]);

ax = gca; % current axes
ax.YLim = [3,5];
ax.XTick = linspace(-1, 29, 5);
ax.XGrid = 'on';
ax.Layer = 'top';

title('曲线面积图')
xlabel('x')
ylabel('y')