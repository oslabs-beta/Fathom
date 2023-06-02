import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import ChartContainer from './ChartContainer';
import { DashBlank } from './DashBlank';
import { api } from "~/utils/api";


interface DashboardProps {
  initialClusterIP: string;
  clusterIPArray: Array<any>;
  refetchClusterIPArray: any;
  snapshotObj: any;
  setSnapshotObj: any;
  dashNum: number;
  currClusterId: string;
}

const Dashboard: React.FC<DashboardProps> = ({ initialClusterIP, clusterIPArray, refetchClusterIPArray, snapshotObj, setSnapshotObj, dashNum }) => {
  const [currentTimeStamp, setCurrentTimeStamp] = useState('now');
  const { data: sessionData } = useSession();
  
  const [currentClusterIP, setCurrentClusterIP] = useState(initialClusterIP);
  const { data: filteredSnapshots, refetch: refetchfilteredSnapshots } =api.snapshot.getByUserCluster.useQuery({clusterIP: ''})
  const [labelName, setLabelName] = useState('')
  
  const [ipArray, setipArray] = useState([]);

  const handleTabClick = (ip: string) => {
    setCurrentClusterIP(ip);
  };
  
  // hook to create snapshot in db
  const createNewSnapshot = api.snapshot.createNew.useMutation({
    onSuccess:()=>{
      refetchSnaps();
      refetchfilteredSnapshots({clusterIP: currentClusterIP});
    }
  })


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
    createNewSnapshot.mutate({
      unixtime: unixTimeStamp,
      label: labelName,
      clusterIP: currentClusterIP
    })
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



        {/* snapshot button */}
          {dashNum === 1 ? (
            <div className="mr-2">
            <form action="">
              <input type="text"
              placeholder='Snapshot Label' 
              onChange={handleLabelChange}
              className="input input-bordered max-h-xs max-w-xs bg-info/10 rounded-xl mr-3"/>
                {/* right margin of 2 units */}
                <button className="btn bg-info/10" onClick={handleSnapshotSubmit}>Snapshot</button>
            </form>
              </div>

            // other snapshot button
            // <div className="mr-2">
            //   <button className="btn bg-info/10" onClick={handleSnapshotSubmit}>Snapshot</button>
            // </div>
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
