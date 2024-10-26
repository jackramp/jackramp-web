import { useState, useCallback, useEffect, useRef } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { Button } from "@/components/ui/button";
import { format, subDays, parseISO } from 'date-fns';

interface DataPoint {
    date: string;
    value: number;
    rez: number;
}

interface PayloadItem {
    value: number;
    payload: {
        date: string;
    };
}

interface TooltipProps {
    active?: boolean;
    payload?: Array<PayloadItem>;
}

const generateData = (): DataPoint[] => {
    const today = new Date();
    const data: DataPoint[] = [];

    for (let i = 180; i >= 0; i -= 7) {
        const date = subDays(today, i);
        const baseValue = 50 + Math.sin(i * 0.1) * 30;
        const randomVariation = Math.random() * 20 - 10;
        const value = Math.max(0, baseValue + randomVariation);

        data.push({
            date: date.toISOString(),
            value: Number(value.toFixed(2)),
            rez: Number(value.toFixed(2))
        });
    }

    return data;
};

const periods = [
    { label: '1W', days: 7 },
    { label: '1M', days: 30 },
    { label: '3M', days: 90 },
    { label: 'All', days: Infinity }
];

const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
        const date = parseISO(payload[0]?.payload?.date);
        return (
            <div className="bg-gray-800/90 p-3 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-xs mb-1">
                    {format(date, 'MMM d, yyyy')}
                </p>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <p className="text-white text-sm font-medium">
                        {payload[0]?.value?.toFixed(2)} M0
                    </p>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-3 h-3 rounded-full bg-gray-400" />
                    <p className="text-gray-400 text-sm">
                        {payload[1]?.value?.toFixed(2)} jackUSD
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

const FinancialChart = () => {
    const [selectedPeriod, setSelectedPeriod] = useState(periods[3]);
    const [yAxisWidth, setYAxisWidth] = useState(80);
    const [chartData, setChartData] = useState<DataPoint[]>([]);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initialData = generateData();
        setChartData(initialData);
    }, []);

    useEffect(() => {
        const updateDimensions = () => {
            if (chartRef.current) {
                setDimensions({
                    width: chartRef.current.offsetWidth,
                    height: chartRef.current.offsetHeight
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const updateYAxisWidth = useCallback((yAxisTicks: number[]) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
            context.font = '12px sans-serif';
            const maxWidth = Math.max(...yAxisTicks.map(tick =>
                context.measureText(`${tick.toFixed(2)} jackUSD`).width
            ));
            setYAxisWidth(Math.ceil(maxWidth) + 20);
        }
    }, []);

    const filteredData = chartData.filter(item => {
        if (selectedPeriod.days === Infinity) return true;
        const date = parseISO(item.date);
        const cutoffDate = subDays(new Date(), selectedPeriod.days);
        return date >= cutoffDate;
    });

    useEffect(() => {
        if (filteredData.length) {
            const yAxisTicks = filteredData.map(item => item.value);
            updateYAxisWidth(yAxisTicks);
        }
    }, [filteredData, updateYAxisWidth]);

    const formatXAxis = (dateStr: string) => {
        const date = parseISO(dateStr);
        return format(date, 'MMM d');
    };

    if (!chartData.length || dimensions.width === 0) {
        return <div ref={chartRef} className="w-full h-[450px]" />;
    }

    return (
        <div className="w-full space-y-4 bg-black/20 rounded-lg p-5">
            <div className="flex gap-2">
                {periods.map((period) => (
                    <Button
                        key={period.label}
                        onClick={() => setSelectedPeriod(period)}
                        variant={selectedPeriod.label === period.label ? "default" : "ghost"}
                        className="px-4 py-2"
                    >
                        {period.label}
                    </Button>
                ))}
            </div>

            <div ref={chartRef} className="w-screen md:w-full h-[450px] bg-transparent rounded-lg">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={filteredData}
                        margin={{ top: 20, right: yAxisWidth, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.01} />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#abb8d1', fontSize: 12 }}
                            padding={{ left: 20, right: 20 }}
                            tickFormatter={formatXAxis}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#abb8d1', fontSize: 12 }}
                            domain={['auto', 'auto']}
                            tickFormatter={(value) => `${value.toFixed(2)} jackUSD`}
                            tickCount={7}
                            width={yAxisWidth}
                        />
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: '#ffffff',
                                strokeWidth: 1,
                                strokeDasharray: '4 4'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#22c55e"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                            dot={false}
                            isAnimationActive={true}
                        />
                        <Area
                            type="monotone"
                            dataKey="rez"
                            stroke="transparent"
                            fill="transparent"
                            isAnimationActive={true}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default FinancialChart;