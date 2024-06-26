import { Card, CardBody, CardHeader, Flex, Heading } from "@chakra-ui/react";
import { LineChart as SaaSLineChart } from "@saas-ui/charts";

type LineChartProps = {
  data: Record<string, string | number>[];
};

const valueFormatter = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader pb="0">
        <Flex justify="center" align="center" width="100%">
          <Heading as="h4" fontWeight="medium" size="md">
            Balance over time in EUR
          </Heading>
        </Flex>
      </CardHeader>
      <CardBody>
        <SaaSLineChart
          data={data}
          categories={["balance"]}
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
