import React, { useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import ChartContainer from './ChartContainer';
import { DashBlank } from './DashBlank';

interface DashboardProps {
  clusterIP: string;
  clusterIPArray: Array<object>;
  snapshotObj: any;
  setSnapshotObj: any;
  dashNum: number;
}

const Dashboard: React.FC<DashboardProps> = ({ clusterIP, clusterIPArray, snapshotObj, setSnapshotObj, dashNum }) => {
  const [currentTimeStamp, setCurrentTimeStamp] = useState('now');
  const { data: sessionData } = useSession();
  // const [tabIP, setTabIP] = useState('')
  console.log(typeof setSnapshotObj)
  const [currentClusterIP, setCurrentClusterIP] = useState();

  const handleTabClick = (ip: string) => {
    setCurrentClusterIP(ip);
  };

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
      {/* {dashNum === 1 ? <div className="tabs flex justify-center"> */}

        {/* // iterate over array if object.userId matches sessionData.user.id  */}
        {/* {clusterIPArray.filter(el => {
          let userInfo = el.userId
          return (userInfo == sessionData.user.id);
        }).map((obj) => {
          let ip = obj.ipAddress;
          <a
            key={ip}
            className={`tab tab-lg tab-lifted ${ip === currentClusterIP ? 'tab-active' : ''}`}
            onClick={() => handleTabClick(ip)}
          >
            {ip}
          </a>
        })} */}
      {/* </div> : ''} */}

      {console.log(currentClusterIP, "DFHSLKDFJHDSF")}

      <div className="bg-accent/20 rounded-xl p-2 mb-6">
        <div className="flex justify-between ">
          <div className="dropdown dropdown-right ml-2">
            <label tabIndex={0} className="btn bg-info/10 m-1 ">Select Dashboard</label>
            <select
              tabIndex={0}
              className="dropdown-content w-52 h-8 ml-1 mt-3 "
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
          <ChartContainer currentClusterIP={currentClusterIP} currentTimeStamp={currentTimeStamp} />
        ) : (dashNum === 1 ? (
          <ChartContainer currentClusterIP={currentClusterIP} currentTimeStamp={currentTimeStamp} />
        ) : (
          <DashBlank />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
