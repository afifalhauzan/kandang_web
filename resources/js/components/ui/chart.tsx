import * as React from "react";
import { cn } from "../../lib/utils";

export type ChartConfig = Record<
    string,
    {
        label: string;
        color: string;
    }
>;

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null);

export function useChart() {
    const context = React.useContext(ChartContext);
    if (!context) {
        throw new Error("useChart must be used within a ChartContainer.");
    }
    return context;
}

type ChartContainerProps = React.ComponentProps<"div"> & {
    config: ChartConfig;
};

export function ChartContainer({ id, className, children, config, ...props }: ChartContainerProps) {
    const chartId = React.useId();
    const containerId = `chart-${id || chartId.replace(/:/g, "")}`;

    return (
        <ChartContext.Provider value={{ config }}>
            <div
                data-chart={containerId}
                className={cn(
                    "flex aspect-video items-center justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-grid_line[stroke='#ccc']]:stroke-border/50",
                    className
                )}
                {...props}
            >
                <style
                    dangerouslySetInnerHTML={{
                        __html: Object.entries(config)
                            .map(([key, value]) => `[data-chart=${containerId}] { --color-${key}: ${value.color}; }`)
                            .join("\n"),
                    }}
                />
                {children}
            </div>
        </ChartContext.Provider>
    );
}

type ChartTooltipContentProps = {
    active?: boolean;
    payload?: Array<{
        dataKey?: string | number;
        name?: string;
        value?: string | number;
    }>;
    className?: string;
};

export function ChartTooltipContent({ active, payload, className }: ChartTooltipContentProps) {
    if (!active || !payload?.length) return null;

    return (
        <div className={cn("rounded-lg border bg-background px-3 py-2 shadow-sm", className)}>
            {payload.map((item) => (
                <div key={item.dataKey} className="flex items-center justify-between gap-3 text-xs">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="font-medium text-foreground">{item.value}</span>
                </div>
            ))}
        </div>
    );
}
