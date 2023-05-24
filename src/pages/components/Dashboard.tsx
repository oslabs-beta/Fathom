import React from 'react';
import {LongChart, TallChart, BoxChart} from './Chart'

// pass in src here?
const Dashboard = () => {
  return (

      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            {/* Nesting the Header component */}
            <BoxChart source="http://34.70.193.242/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=now-1h&to=now&panelId=1"/>
            <BoxChart source="http://34.70.193.242/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=now-1h&to=now&panelId=3"/>
            <BoxChart source="http://34.70.193.242/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=now-1h&to=now&panelId=10"/>
            <TallChart source="http://34.70.193.242/d-solo/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&refresh=10s&from=now-1h&to=now&panelId=17"/>
            <LongChart source="http://34.70.193.242/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&var-resolution=5m&var-interval=4h&from=now-1h&to=now&panelId=3"/>
            <TallChart source="http://34.70.193.242/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&var-resolution=5m&var-interval=4h&from=now-1h&to=now&panelId=4"/>
        </div>

  );
};

export default Dashboard;

{/* <iframe src="http://34.70.193.242/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=now-1h&to=now&panelId=1" width="450" height="200" frameborder="0"></iframe> */}