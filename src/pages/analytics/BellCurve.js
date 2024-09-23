import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// Bell curve data points for a near-normal distribution, slightly shifted to the right
const generateBellCurveData = () => {
  const data = [];
  for (let i = -3; i <= 3; i += 0.1) {
    const x = i;
    const y = Math.exp(-0.5 * Math.pow(x, 2)) / Math.sqrt(2 * Math.PI);
    data.push({ x: x * 15 + 60, y: y }); // Adjusting to 60% mean, 15% standard deviation
  }
  return data;
};

// BellCurve component
const BellCurve = ({ percentile }) => {
  const data = generateBellCurveData();

  // Check if percentile is a valid number before rendering the ReferenceLine
  const validPercentile = typeof percentile === 'number' && !isNaN(percentile);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 30, right: 30, left: 30, bottom: 10 }}>
        <XAxis dataKey="x" type="number" domain={[0, 100]} label={{ value: "Performance (%)", position: 'insideBottomRight', offset: -5 }} />
        <YAxis hide />
        <Tooltip formatter={(value) => [value.toFixed(2), "Probability"]} />
        <Line type="monotone" dataKey="y" stroke="#8884d8" dot={false} />

        {/* Draw a reference line only if percentile is valid */}
        {validPercentile && (
          <ReferenceLine x={percentile} stroke="red" strokeDasharray="3 3" label={`You: ${percentile}%`} />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BellCurve;
