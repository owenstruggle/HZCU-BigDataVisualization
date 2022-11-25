[x,y] = meshgrid(-3:0.1:3);  % 快速生成网格所需的数据
z = x .* y .* exp(-x.^2-y.^2);

subplot(1, 2, 1)
surf(x, y, z)
view(45, 45);
title('网格曲面图形')
xlabel('x轴');  ylabel('y轴');  zlabel('z轴');

subplot(1, 2, 2)
mesh(x, y, z)
view(45, 45);
title('网线曲面图形')
xlabel('x轴');  ylabel('y轴');  zlabel('z轴');