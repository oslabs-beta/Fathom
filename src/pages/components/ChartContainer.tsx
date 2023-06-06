import  Chart  from 'src/pages/components/Chart'
type ChartContainer = {
  currentClusterIP: string;
  currentTimeStamp: string;
}

export default function ChartContainer({ currentClusterIP, currentTimeStamp }: ChartContainer) {
  return (
    <div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 md:gap-2">
        {/* grid layout - 1 column, gap size, columns, responsive settings */}
        <Chart key={`chart1-${currentClusterIP}`} source={`http://${currentClusterIP}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=10s&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=1`} />
        <Chart key={`chart2-${currentClusterIP}`} source={`http://${currentClusterIP}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=10s&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=3`} />
        <Chart key={`chart3-${currentClusterIP}`} source={`http://${currentClusterIP}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=10s&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=4`} />
        <Chart key={`chart4-${currentClusterIP}`} source={`http://${currentClusterIP}/d-solo/efa86fd1d0c121a26444b636a3f509a8/kubernetes-compute-resources-cluster?orgId=1&refresh=10s&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=6`} />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-2">
        {/* grid layout - 1 column, gap size, columns, responsive settings */}
        <Chart key={`chart5-${currentClusterIP}`} source={`http://${currentClusterIP}/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=1`} />
        <Chart key={`chart6-${currentClusterIP}`} source={`http://${currentClusterIP}/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=3`} />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-2">
        {/* grid layout - 1 column, gap size, columns, responsive settings */}
        <Chart key={`chart7-${currentClusterIP}`} source={`http://${currentClusterIP}/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&var-resolution=5m&var-interval=4h&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=4`} />
        <Chart key={`chart8-${currentClusterIP}`} source={`http://${currentClusterIP}/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&var-resolution=5m&var-interval=4h&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=3`} />
      </div>

      {/* <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-2"> */}
{/* grid layout - 1 column, gap size, columns, responsive settings */}
{/* <Chart key={`chart9-${currentClusterIP}`} source={`http://${currentClusterIP}/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=10`} /> */}
{/* <Chart key={`chart10-${currentClusterIP}`} source={`http://${currentClusterIP}/d-solo/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&refresh=10s&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=17`} /> */}
{/* </div> */}

    </div>
  )
}


