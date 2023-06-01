import React, { useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import ChartContainer from './ChartContainer';
import { DashBlank } from './DashBlank';

interface DashboardProps {
  clusterIP: string;
  snapshotObj: object;
  setSnapshotObj: any;
  dashNum: number;
}


const Dashboard: React.FC<DashboardProps> = ({ clusterIP, snapshotObj, setSnapshotObj, dashNum }) => {
  // added timestamp state (defaults to 'now') to keep track of in individual dashboard components 
  const [currentTimeStamp, setCurrentTimeStamp] = useState('now')
  // added labelName state 
  const [labelName, setLabelName] = useState('')
  const { data: sessionData } = useSession();

  
  // eventHandlers 

  // add a property in snapshotObj 
  const handleSnapshotSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const unixTimeStamp = Date.now();
    const date = new Date(unixTimeStamp);
    const formattedDate = date.toLocaleString()
    const obj = { ...snapshotObj }
  // if labelName exists add a property into snapshotObj    labelName: Unix Time  otherwise add a property as    M/D/Y Time: Unix Time
  console.log(labelName)
    labelName ? obj[labelName] = unixTimeStamp : obj[formattedDate] = unixTimeStamp  
    setSnapshotObj(obj)
    console.log('new snapshotObj', snapshotObj)
  }

  // set currentTimeStamp state to option we choose on the dropbown
  const handleDashboardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    const changedTimeStamp = event.target.value
    // console.log('snapshotObj', snapshotObj, 'event value', event.target.value)
    // console.log('changedTimeStamp', changedTimeStamp)
    setCurrentTimeStamp(changedTimeStamp)
    // console.log('currentTimeStamp', currentTimeStamp)
  }


  // set labelName to our input 
  const handleLabelChange = (event: any) => {
    event.preventDefault()
    setLabelName(event.target.value)
  }

  return (
    <>
      <div className="bg-accent/20 rounded-xl p-2 mb-6">
        <div className="flex justify-between ">
          <div className="dropdown dropdown-right ml-2">
            <label tabIndex={0} className="btn m-1 bg-info/10">Select Dashboard</label>
            <select
              tabIndex={0}
              className="dropdown-content menu shadow bg-base-100 rounded-box w-52 text-primary text-sm bg-opacity-70"
              onChange={handleDashboardChange}
            >
              {dashNum === 2 ? Object.keys(snapshotObj).map(el => {
                if (el !== 'Current')
                  return (
                    <option value={snapshotObj[el]}>{el}</option>
                  );
              }) : Object.keys(snapshotObj).map(el => (
                <option value={snapshotObj[el]}>{el}</option>
              ))}
            </select>
          </div>

          {dashNum === 1 ? (
            <div className="mr-2">
              <button className="btn bg-info/10" onClick={handleSnapshotSubmit}>Snapshot</button>
            </div>
          ) : ''}
        </div>


        <div>
          <p>Cluster IP: {clusterIP} {}</p>
        </div>
        {/* snapshot button */}
        <div className="mr-2">
        <form action="">
          <input type="text"
          placeholder='Snapshot Label' 
          onChange={handleLabelChange}
          className="input input-bordered max-h-xs max-w-xs bg-info/10 rounded-xl"/>
            {/* right margin of 2 units */}
            <button className="btn bg-info/10" onClick={handleSnapshotSubmit}>Snapshot</button>
        </form>
          </div>
          


        {(dashNum === 2 && Object.keys(snapshotObj).length > 1) ? (
          <ChartContainer clusterIP={clusterIP} currentTimeStamp={currentTimeStamp} />
        ) : (dashNum === 1 ? (
          <ChartContainer clusterIP={clusterIP} currentTimeStamp={currentTimeStamp} />
        ) : (
          <DashBlank/>
        ))}

      </div>
    </>
  );
};

export default Dashboard;
