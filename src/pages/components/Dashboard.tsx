import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import ChartContainer from './ChartContainer';
import { DashBlank } from './DashBlank';
import { api } from "~/utils/api";
import { useClusterContext, defaultCluster } from '../components/ClusterContext';

import {ClusterIP, Snapshot} from '@prisma/client'

//type definition
interface DashboardProps {
  initialClusterIP: string;
  // clusterIPArray: Array<any>;
  // refetchClusterIPArray: any;
  snapshotObj: any;
  setSnapshotObj: any;
  dashNum: number;
}
//type definition
interface snapshotProps {
  clusterIP:string
  createdAt:any //datetime?
  id: string
  label: string
  unixtime:any
  updatedAt:any 
  userId:string

}
// helper to get snaps by IP
function filterByIp (notFiltered:Array<Snapshot>|undefined, ip:string) : Array<any>{
  if(notFiltered){
    const results = notFiltered.filter(el=>{
      return el.clusterIP === ip ? true : false
    });
    // correctly map to snapshot interface instead of returning raw results?
  return results
  } else {
    // returns an empty array of "snaps"
    return [{
      clusterIP:`${ip}`,
      createdAt:'', //datetime?
      id: '',
      label: 'Current',
      unixtime:'now',
      updatedAt:'', 
      userId:''
    }]
  }
}

// dashboard component
const Dashboard: React.FC<DashboardProps> = ({
  snapshotObj,
  setSnapshotObj,
  dashNum,
}) => {
  const [currentTimeStamp, setCurrentTimeStamp] = useState('now');
  const { data: sessionData } = useSession();
  
  // const [currentClusterIP, setCurrentClusterIP] = useState(initialClusterIP);
  
  const {
    currentClusterIP, 
    setCIP: setCurrentClusterIP, 
    clusterIPArray, 
    refetchCIPArray: refetchClusterIPArray,
  } = useClusterContext();

  // handleTabClick(currentClusterIP)
  // hooks for snapshot management
  const { data: unfilteredSnapshots, refetch: refetchunfilteredSnapshots } = api.snapshot.getAll.useQuery()
  // const { data: filteredSnapshots, refetch: refetchfilteredSnapshots } = api.snapshot.getByUserCluster.useQuery({clusterIP: initialClusterIP})
  // state containing filtered snaps by clusterIP
  const [filteredByIPSnaps, setfilteredByIPSnaps] = useState(filterByIp(unfilteredSnapshots, currentClusterIP))
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [ipToDelete, setIpToDelete] = useState('');

  const deleteIP = api.clusterIP.deleteIP.useMutation({
    onSuccess: () => {
      refetchClusterIPArray();
      console.log('successfully deleted clusterIP');
    },
  });

  const deleteSnapshotsByIP = api.snapshot.deleteSnapshotsByIP.useMutation({
    onSuccess: () => {
      console.log('successfully deleted snapshots');
      setCurrentTimeStamp('Now') // adjust the timestamp to now
    },
  });



  const handleDeleteIP = (ipAddress: string) => {
    setIpToDelete(ipAddress);
    setShowConfirmation(true);
  };

  // combines clusterIP and associated snapshots deletion
  const confirmDeleteIP = async() => {
    if (clusterIPArray) {
      // any types to avoid empty object property access
      const clusterIPToDelete:ClusterIP = clusterIPArray.find((obj:{ipAddress:string,[key:string]:any}) => obj.ipAddress === ipToDelete)??defaultCluster;
      // wait for the snapshots to be deleted before deleting IPs
      await deleteSnapshotsByIP.mutateAsync({ ipToDelete: clusterIPToDelete?.ipAddress });
      deleteIP.mutate({ id: clusterIPToDelete?.id });

      // set state to remove old snapshots
      setSnapshotObj({})
    }
    setShowConfirmation(false);
  };

  const cancelDeleteIP = () => {
    setShowConfirmation(false);
    setIpToDelete('');
  };  

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


  
  // hook to create snapshot in db
  const createNewSnapshot = api.snapshot.createNew.useMutation({
    onSuccess:()=>{
      refetchunfilteredSnapshots();
      console.log(`the snapshots, unfiltered`, unfilteredSnapshots)
      console.log(`the snapshots, filtered`, filterByIp(unfilteredSnapshots, currentClusterIP))
      // console.log(`the snapshots, filtered by ${currentClusterIP} and user`, unfilteredSnapshots)
    }
  })

  const [labelName, setLabelName] = useState('')  
  
  // eventHandlers 
  //handle tab click
  async function handleTabClick (ip: string){
    setCurrentClusterIP(ip);
    console.log('current cluster ip is:',  currentClusterIP)
    
    // refetch and rerender the available snaps
    // get the unfiltered check with console.log(unfilteredSnapshots)
    await refetchunfilteredSnapshots();
    
    //set the filtered filteredByIPSnaps
     setfilteredByIPSnaps(filterByIp(unfilteredSnapshots, currentClusterIP))

    // modify snapshotObj    
    // set snapshotObj to object with labels of labels, values
    const updatedSnapshotObj:{[key:string]:any} = {}
    
    filteredByIPSnaps.forEach((el:{label:string, unixtime:number})=>{updatedSnapshotObj[el.label] = el.unixtime})

    // update the snapshot object with the new object
    await setSnapshotObj({...updatedSnapshotObj  })
    console.log(snapshotObj)
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

  useEffect(() => {
  if (clusterIPArray.length > 0) {
    let a:any = clusterIPArray[clusterIPArray.length-1];

    setCurrentClusterIP(a.ipAddress);
    console.log('in the use effect with this clusterIP', a.ipAddress)
  } 
  // setCurrentClusterIP(currentClusterIP);

}, [clusterIPArray]);

  return (
    <>
      {/* {currentClusterIP} */}
      {dashNum === 1 ? (
        <div className="tabs flex justify-center mt-5 ">
          {/* //typescript issue with possibly empty objects */}
          {clusterIPArray?.map((obj:any) => (
            <div key={obj.ipAddress} className="tab-wrapper">
              <a
                className={`tab tab-lg tab-lifted ${obj.ipAddress === currentClusterIP ? 'bg-accent/30 text-current' : 'text-info/50'
                  }`}
                onClick={() => handleTabClick(obj.ipAddress)}
              >
                {obj.ipAddress}

                <button className={`btn btn-square btn-xs ml-3 btn-ghost ${obj.ipAddress === currentClusterIP ? 'text-current' : 'opacity-0'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleDeleteIP(obj.ipAddress)} className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </a>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}

      <div className="bg-accent/30 rounded-xl p-2 mb-8 ">
        <div className="flex justify-between ">
          <div className="dropdown dropdown-right ml-3 ">
            <label tabIndex={0} className="btn bg-info/10 mt-2 ">
              {dashNum === 1 ? 'Select Dashboard' : 'Select Snapshot'}
            </label>
            <select
              tabIndex={0}
              className="dropdown-content w-52 h-8 ml-1 mt-3 "
              onChange={handleDashboardChange}
            >
              {dashNum === 2 ? (
                Object.keys(snapshotObj).map((ip) => {
                  if (ip !== 'Current') return <option value={snapshotObj[ip]}>{ip}</option>;
                })
              ) : (
                Object.keys(snapshotObj).map((ip) => (
                  <option value={snapshotObj[ip]}>{ip}</option>
                ))
              )}
            </select>
          </div>



        {/* snapshot button */}
          {dashNum === 1 ? (
            <div className="mr-3 mt-2">
            <form action="">
              <input type="text"
              placeholder='Snapshot Label' 
              onChange={handleLabelChange}
              className="input input-bordered max-h-xs max-w-xs bg-info/10 rounded-xl mr-3"/>
                {/* right margin of 2 units */}
                <button className="btn bg-info/10" onClick={handleSnapshotSubmit}>Snapshot</button>
            </form>
              </div>

          ) : ''}
        </div>

        {dashNum === 2 && Object.keys(snapshotObj).length > 1 ? (
          <ChartContainer currentClusterIP={currentClusterIP} currentTimeStamp={currentTimeStamp} />
        ) : dashNum === 1 ? (
          <ChartContainer currentClusterIP={currentClusterIP} currentTimeStamp={currentTimeStamp} />
        ) : (
          <DashBlank />
        )}
      </div>

{/* confirm delete ip modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className=" p-8 bg-gray-900 text-xl p-4 rounded-lg w-100 h-40 ">
            <p className="mb-6 ">Are you sure you want to delete this IP?</p>
            <div className="flex justify-end">
              <button className="btn btn-ghost bg-accent/20 mr-2 " onClick={confirmDeleteIP}>
                Confirm
              </button>
              <button className="btn btn-ghost " onClick={cancelDeleteIP}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
