import { Chart } from 'src/pages/components/Chart'

export default function ChartContainer({ currentClusterIP, currentTimeStamp }: any) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-10">
        {/* grid layout - 1 column, gap size, columns, responsive settings */}
        <Chart source={`http://${currentClusterIP}/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=1`} />
        <Chart source={`http://${currentClusterIP}/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=3`} />
        <Chart source={`http://${currentClusterIP}/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=10`} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-10">
        {/* grid layout - 1 column, gap size, columns, responsive settings */}
        <Chart source={`http://${currentClusterIP}/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&var-resolution=5m&var-interval=4h&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=4`} />
        <Chart source={`http://${currentClusterIP}/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&var-resolution=5m&var-interval=4h&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=3`} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:gap-10">
        {/* grid layout - 1 column, gap size, columns, responsive settings */}
        <Chart source={`http://${currentClusterIP}/d-solo/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&refresh=10s&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=17`} />
      </div>
    </div>
  )
}