//FAISAL:
  //This is the second dashboard
  // Shows metrics to compare with the first dashboard
  // It's initiated from the index.txs file
import React from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { DashContent } from './DashContent';
import { DashBlank } from './DashBlank';
import { LongChart, TallChart, BoxChart } from './Chart';
import { useState } from "react";

// pass in src here?
const Dashboard = ({clusterIP, snapshotObj, setSnapshotObj}:any) => {

  const [currentTimeStamp, setCurrentTimeStamp] = useState('')
  const { data: sessionData } = useSession();

  // Faisal: added this state here to control the display of the dashboard
  const [dashDisplay, setDashDisplay] = useState('none')
  if (!clusterIP) {
    return <DashBlank />;
  }
  // eventHandlers 


//  ****snapshot submit function and button removed because don't need it in seconddashboard***

  const handleDashboardChange = (event: any) => {
    event.preventDefault()
    const changedTimeStamp = event.target.value;
    // console.log('snapshotObj', snapshotObj, 'event value', event.target.value)
    // console.log('changedTimeStamp', changedTimeStamp)
    
    //**Faisal: setting the display to initial or visible, because a snapshot was chosen from the dropdown menu
    setDashDisplay('initial');

    setCurrentTimeStamp(changedTimeStamp);
    // console.log('currentTimeStamp', currentTimeStamp)
  }
  return (
    
    <div className=" bg-accent/20 gap-4 rounded-xl p-2 top-44">

      
        {/* Faisal: removed flex styling (that was in the first dashboard) */}

        {/* dropdown menu   */}
        <div className="dropdown dropdown-right ml-2">
          <label tabIndex={0} className="btn m-1 bg-info/10">Compare Metrics</label>
          <select
            tabIndex={0}
            className="dropdown-content menu shadow bg-base-100 rounded-box w-52 text-primary text-sm bg-opacity-70"
            onChange={handleDashboardChange}
          >
            {Object.keys(snapshotObj).map(el => {
              return (
                <option value={snapshotObj[el]}>{el}</option>
              )
            })} 
          </select>
        </div>


      {/* old ul dropdown  */}
        {/* <div className="dropdown dropdown-right ml-2 " >
          <label tabIndex={0} className="btn m-1 bg-info/10">Select Dashboard</label>
          <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100 rounded-box w-52 text-primary text-sm bg-opacity-70">
            {snapshotObj.map(el => {
              return (
                <li><a>{Object.keys(el)[0]}</a></li>
              )
            })}
          </ul>
        </div> */}

        
          
      <div  style={{ display: dashDisplay }}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-10">

            <BoxChart source={`http://${clusterIP}/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=1`}/>
            <BoxChart source={`http://${clusterIP}/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=3`}/>
            <BoxChart source={`http://${clusterIP}/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=10`}/>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-10">
            <TallChart source={`http://${clusterIP}/d-solo/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&refresh=10s&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=17`}/>
            <LongChart source={`http://${clusterIP}/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&var-resolution=5m&var-interval=4h&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=3`}/>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:gap-10">
            <TallChart source={`http://${clusterIP}/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&var-resolution=5m&var-interval=4h&from=${currentTimeStamp}-1h&to=${currentTimeStamp}&panelId=4`}/>



            {/* <div className="flex flex-auto justify-between align-items-center">
            <div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-10">
                <BoxChart source={`http://${clusterIP}/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=now-1h&to=now&panelId=1`} />
                <BoxChart source={`http://${clusterIP}/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=now-1h&to=now&panelId=3`} />
                <TallChart source={`http://${clusterIP}/d-solo/85a562078cdf77779eaa1add43ccec1e/kubernetes-compute-resources-namespace-pods?orgId=1&refresh=10s&from=now-1h&to=now&panelId=17`} />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-10">
                <TallChart source={`http://${clusterIP}/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&var-resolution=5m&var-interval=4h&from=now-1h&to=now&panelId=4`} />
                <LongChart source={`http://${clusterIP}/d-solo/bbb2a765a623ae38130206c7d94a160f/kubernetes-networking-namespace-workload?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&var-resolution=5m&var-interval=4h&from=now-1h&to=now&panelId=3`} />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:gap-10">
                <BoxChart source={`http://${clusterIP}/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=now-1h&to=now&panelId=10`} />
              </div>
            </div>
            </div> */}
          </div>
      </div>
      
    </div>
  );
};




export default Dashboard;

{/* <iframe src="http://34.70.193.242/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=now-1h&to=now&panelId=1" width="450" height="200" frameborder="0"></iframe> */ }





