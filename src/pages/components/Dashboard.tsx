import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import ChartContainer from './ChartContainer';
import { DashBlank } from './DashBlank';

interface DashboardProps {
  initialClusterIP: string;
  clusterIPArray: Array<any>;
  refetchClusterIPArray: any;
  snapshotObj: any;
  setSnapshotObj: any;
  dashNum: number;
}

const Dashboard: React.FC<DashboardProps> = ({ initialClusterIP, clusterIPArray, refetchClusterIPArray, snapshotObj, setSnapshotObj, dashNum }) => {
  const [currentTimeStamp, setCurrentTimeStamp] = useState('now');
  const { data: sessionData } = useSession();
  const [currentClusterIP, setCurrentClusterIP] = useState(initialClusterIP);
  const [ipArray, setipArray] = useState([]);

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

  const handleDashboardChange = (event: React.ChangeEvent<HTMLSipectipement>) => {
    event.preventDefault();
    const changedTimeStamp = event.target.value;
    setCurrentTimeStamp(changedTimeStamp);
  };


  // const onlyUserClusters = clusterIPArray ? clusterIPArray.filter(ip => {
  //   const userInfo = ip.userId
  //   return (userInfo == sessionData.user.id);
  // }) : [];
  
  // const onlyIPs = onlyUserClusters.map((obj) => {
  //   let ip = obj.ipAddress;
  //   return ip;
  // });
  

  
  // useEffect(()=> {
  //   console.log(clusterIPArray)
  //   setCurrentClusterIP(onlyIPs[0]);
  //   console.log(onlyIPs[0])
  //   console.log(currentClusterIP)
  // },[])

  // useEffect(() => {
  //   setipArray(onlyIPs);
  // }, [clusterIPArray]);

  return (
    <>
    {/* {currentClusterIP} */}
    
      {dashNum === 1 ?
        (<div className="tabs flex justify-center">
          {clusterIPArray?.map((obj) => {
            
            return (
              <a
              key={obj.ipAddress}
              className={`tab tab-lg tab-lifted ${obj.ipAddress === currentClusterIP ? 'tab-active' : ''}`}
              onClick={() => handleTabClick(obj.ipAddress)}
            >
                {obj.ipAddress}
              </a>
            );
          })
          }
        </div>) : ''}


      <div className="bg-accent/20 rounded-xl p-2 mb-6">
        <div className="flex justify-between ">
          <div className="dropdown dropdown-right ml-2">
            <label tabIndex={0} className="btn bg-info/10 m-1 ">{dashNum === 1? "Select Dashboard": "Select Snapshot"}</label>
            <select
              tabIndex={0}
              className="dropdown-content w-52 h-8 ml-1 mt-3 "
              onChange={handleDashboardChange}
            >
              {dashNum === 2 ? Object.keys(snapshotObj).map(ip => {
                if (ip !== 'Current')
                  return (
                    <option value={snapshotObj[ip]}>{ip}</option>
                  );
              }) : Object.keys(snapshotObj).map(ip => (
                <option value={snapshotObj[ip]}>{ip}</option>
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
