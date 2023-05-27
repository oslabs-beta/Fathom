import React from 'react';
import { signIn, signOut, useSession } from "next-auth/react"
import ChartContainer from './ChartContainer'
import { Chart } from './Chart'
import { useState } from "react";
import { DashBlank } from './DashBlank'

// Component which displays Dashboard or DashBlank based on login and/or Cluster IP availability
const Dashboard = ({ clusterIP, snapshotObj, setSnapshotObj, dashNum }: any) => {

  // added timestamp state (defaults to 'now') to keep track of in individual dashboard components 
  const [currentTimeStamp, setCurrentTimeStamp] = useState('now')
  const { data: sessionData } = useSession();


  // eventHandlers 

  // event handler to add a property in snapshotObj with format:      M/D/Y Time: Unix Time
  const handleSnapshotSubmit = (event: any) => {
    event.preventDefault()
    const unixTimeStamp = Date.now();
    const date = new Date(unixTimeStamp);
    const formattedDate = date.toLocaleString()
    const obj = { ...snapshotObj }
    obj[formattedDate] = unixTimeStamp
    setSnapshotObj(obj)
    console.log('new snapshotObj', snapshotObj)
  }

  // event handler to set currentTimeStamp state to option we choose on the dropbown
  const handleDashboardChange = (event: any) => {
    event.preventDefault()
    const changedTimeStamp = event.target.value
    // console.log('snapshotObj', snapshotObj, 'event value', event.target.value)
    // console.log('changedTimeStamp', changedTimeStamp)
    setCurrentTimeStamp(changedTimeStamp)
    // console.log('currentTimeStamp', currentTimeStamp)
  }

  return (
    <>
      {/* tabs idea */}
      {/* <div className="tabs mt-5 flex flex-auto justify-end">
        <a className="tab tab-lifted tab-normal">Tab 1</a>
        <a className="tab tab-lifted tab-normal">Tab 2</a>
        <a className="tab tab-lifted tab-normal tab-active">Tab 3</a>
      </div> */}

      <div className=" bg-accent/20 rounded-xl p-2 mb-6">
        {/* sets background color, gap size, rounded corners, and padding */}
        <div className="flex justify-between">
          {/* changed dropdown from unordered list to select/options to add onChange event */}
          {/* applies flex layout and justifies content*/}
         
          {/* dropdown menu   */}
          <div className="dropdown dropdown-right ml-2">
            <label tabIndex={0} className="btn m-1 bg-info/10">Select Dashboard</label>
            <select
              tabIndex={0}
              className="dropdown-content menu shadow bg-base-100 rounded-box w-52 text-primary text-sm bg-opacity-70"
              onChange={handleDashboardChange}
            >

              {/* creates all the options in our dropdown from our snapshotObj */}
              {(dashNum === 2) ? Object.keys(snapshotObj).map(el => {
                if (el !== 'Current')
                  return (
                    <option value={snapshotObj[el]}>{el}</option>
                  )
              }) : Object.keys(snapshotObj).map(el => {
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

          {/* added onclick to update snapshotObj with current time to snapshot button  
    TODO: add snapshots to database */}
          {/* snapshot button */}
          {dashNum === 1 ? <div className="mr-2">
            {/* right margin of 2 units */}
            <button className="btn bg-info/10" onClick={handleSnapshotSubmit}>Snapshot</button>
          </div> : ''
          }

        </div>
        {/* refactored iframe links for clusterIP, timestamp inputs */}
        {(dashNum === 2 && Object.keys(snapshotObj).length > 1) ? <ChartContainer clusterIP={clusterIP} currentTimeStamp={currentTimeStamp} /> : (dashNum === 1 ? <ChartContainer clusterIP={clusterIP} currentTimeStamp={currentTimeStamp} /> : <DashBlank />
        )}

      </div>
    </>
  );
};




export default Dashboard;

{/* <iframe src="http://34.70.193.242/d-solo/a87fb0d919ec0ea5f6543124e16c42a5/kubernetes-compute-resources-namespace-workloads?orgId=1&refresh=10s&var-datasource=default&var-cluster=&var-namespace=default&var-type=deployment&from=now-1h&to=now&panelId=1" width="450" height="200" frameborder="0"></iframe> */ }



