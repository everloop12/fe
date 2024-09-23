import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#00C49F', '#FF8042']; // Green for correct, orange for incorrect

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize={14}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CorrectIncorrectPieChart = ({ correct, incorrect }) => {
  const data = [
    { name: 'Correct Answers', value: correct },
    { name: 'Incorrect Answers', value: incorrect },
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [value, name]}
          contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '10px', padding: '5px' }}
          cursor={{ fill: 'rgba(255,255,255,0.1)' }}
        />
        <Legend
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            paddingTop: '10px',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CorrectIncorrectPieChart;
