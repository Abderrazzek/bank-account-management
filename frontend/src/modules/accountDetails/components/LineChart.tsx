import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { LineChart as SaaSLineChart } from "@saas-ui/charts";

type LineChartProps = {
  data: Record<string, string | number>[];
};

const valueFormatter = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader pb="0">
        <Heading as="h4" fontWeight="medium" size="md">
          Revenue over time in EUR
        </Heading>
      </CardHeader>
      <CardBody>
        <SaaSLineChart
          data={data}
          categories={["Revenue"]}
          valueFormatter={valueFormatter}
          yAxisWidth={80}
          colors={["blue"]}
          height="300px"
        />
      </CardBody>
    </Card>
  );
};

export default LineChart;
