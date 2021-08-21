export type Statistic = { amount: number; name: string; [key: string]: any };

export interface CommonChartComponentProps<T = Statistic> {
  data: T[];
  title?: string;
  category?: string;
  children?: HTMLElement;
}

export interface LineChartProps {
  data: {
    [key: string]: Statistic[];
  };
}
