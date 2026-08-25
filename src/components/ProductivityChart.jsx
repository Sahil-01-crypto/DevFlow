import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", tasks: 12 },
  { day: "Tue", tasks: 18 },
  { day: "Wed", tasks: 14 },
  { day: "Thu", tasks: 25 },
  { day: "Fri", tasks: 21 },
  { day: "Sat", tasks: 30 },
  { day: "Sun", tasks: 27 },
];

const ProductivityChart = () => {
  return (
    <div className="w-full h-60 mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.08)"
          />

          <XAxis
            dataKey="day"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
          />

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
            }}
          />

          <Line
            type="monotone"
            dataKey="tasks"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductivityChart;