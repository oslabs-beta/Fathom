import React, { useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import ChartContainer from './ChartContainer';
import { DashBlank } from './DashBlank';

interface DashboardProps {
  clusterIP: any;
  snapshotObj: any;
  setSnapshotObj: any;
  dashNum: number;
}

const Dashboard: React.FC<DashboardProps> = ({ clusterIP, snapshotObj, setSnapshotObj, dashNum }) => {
  const [currentTimeStamp, setCurrentTimeStamp] = useState('now');
  const { data: sessionData } = useSession();

  const handleSnapshotSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const unixTimeStamp = Date.now();
    const date = new Date(unixTimeStamp);
    const formattedDate = date.toLocaleString();
    const obj = { ...snapshotObj };
    obj[formattedDate] = unixTimeStamp;
    setSnapshotObj(obj);
    console.log('new snapshotObj', snapshotObj);
  };

  const handleDashboardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const changedTimeStamp = event.target.value;
    setCurrentTimeStamp(changedTimeStamp);
  };

  return (
    <>
      <div className="bg-accent/20 rounded-xl p-2 mb-6">
        <div className="flex justify-between">
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

        {(dashNum === 2 && Object.keys(snapshotObj).length > 1) ? (
          <ChartContainer clusterIP={clusterIP} currentTimeStamp={currentTimeStamp} />
        ) : (dashNum === 1 ? (
          <ChartContainer clusterIP={clusterIP} currentTimeStamp={currentTimeStamp} />
        ) : (
          <DashBlank />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
