import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import ChartContainer from './ChartContainer';
import { DashBlank } from './DashBlank';
import { api } from "~/utils/api";
import { useClusterContext } from '../components/ClusterContext';



//type definition
interface DashboardProps {
  initialClusterIP: string;
  clusterIPArray: Array<any>;
  refetchClusterIPArray: any;
  dashNum: number;
  currClusterId: string;
}

// dashboard component
const Dashboard: React.FC<DashboardProps> = ({
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
    currentCIPSnaps: filteredByIPSnaps,
    refreshSnapsArray,
    snapshotObj,
    setSnapshotObj
  } = useClusterContext();
  
  console.log('FIRST CLUSERTIP', currentClusterIP)



  //startup tab selection
  //initialize currentIP IF THE ARRAY IS POPULATED and there's no current clusterip
  if(clusterIPArray)(clusterIPArray[0] && !currentClusterIP)?setCurrentClusterIP(clusterIPArray[0].ipAddress):null

  // hooks for snapshot management
  // const { data: unfilteredSnapshots, refetch: refetchunfilteredSnapshots } =api.snapshot.getAll.useQuery() 
  
  console.log('snapshots filtered by IP',filteredByIPSnaps)
  
  // hooks for tab deletion
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [ipToDelete, setIpToDelete] = useState('');

  const deleteIP = api.clusterIP.deleteIP.useMutation({
    onSuccess: () => {
      refetchClusterIPArray();
      console.log('successfully deleted clusterIP');

    // select the next tab --bugs out when deleting the first
    clusterIPArray ? handleTabClick(clusterIPArray[0].ipAddress):''
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
    const clusterIPToDelete = clusterIPArray.find((obj) => obj.ipAddress === ipToDelete);
    if (clusterIPToDelete) {
      // wait for the snapshots to be deleted before deleting IPs
      await deleteSnapshotsByIP.mutateAsync({ ipToDelete: clusterIPToDelete.ipAddress });
      deleteIP.mutate({ id: clusterIPToDelete.id });

      // set state to remove old snapshots modify after moving state here
      // setSnapshotObj({Current:'now'})
      setSnapshotObj() // using new version
    }
    setShowConfirmation(false);
  };

  const cancelDeleteIP = () => {
    setShowConfirmation(false);
    setIpToDelete('');
  };  

  // add a property in snapshotObj 
  const handleSnapshotSubmit = async(event: React.FormEvent) => {
    event.preventDefault()
    const unixTimeStamp = Date.now();
    const date = new Date(unixTimeStamp);
    const formattedDate = date.toLocaleString()
    const obj = { ...snapshotObj }
    // if labelName exists add a property into snapshotObj    labelName: Unix Time  otherwise add a property as    M/D/Y Time: Unix Time
    // console.log(labelName)
    // labelName ? obj[labelName] = unixTimeStamp : obj[formattedDate] = unixTimeStamp  
    // setSnapshotObj(obj)
    
    // trying to see if making async changes the executions
    const flag = await createNewSnapshot.mutateAsync({
      unixtime: unixTimeStamp,
      label: labelName?labelName:formattedDate,
      clusterIP: currentClusterIP ?currentClusterIP :''
    })
    
    // it does not -- but clicking on tabs DOES refresh the droptown
    // if(flag) handleUserClusterInteraction()

    console.log('new snapshotObj', snapshotObj)
  }


  
  // hook to create snapshot in db
  const createNewSnapshot = api.snapshot.createNew.useMutation({
    onSuccess:()=>{
      refreshSnapsArray();
      console.log(`the snapshots, filtered by ${currentClusterIP} and user`, filteredByIPSnaps)
    }
  })

  const [labelName, setLabelName] = useState('')  
  
  // eventHandlers 
  //handle tab click
  async function handleTabClick (ip: string){
    console.log('tab clicked')

    setCurrentClusterIP(ip);
    console.log('current cluster ip is:',  currentClusterIP)
    handleUserClusterInteraction()
  };

  async function handleUserClusterInteraction() {
    // lget the snapshots for the currently selected tab
    const blah = await refreshSnapsArray() //<-needs to be async and trigger the remainder ofthe code
    // AFTER snaps fetched, THEN trigger the update below

    if (blah) {
      // modify snapshotObj    
      // set snapshotObj to object with labels of labels, values
      const updatedSnapshotObj:any = {}
      filteredByIPSnaps.forEach(el=>{updatedSnapshotObj[el.label] = el.unixtime})
  
      // update the snapshot object with the new object
      setSnapshotObj()
      console.log(snapshotObj)

    }
  }


  // set currentTimeStamp state to option we choose on the dropbown
  const handleDashboardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    const changedTimeStamp = event.target.value
    // console.log('snapshotObj', snapshotObj, 'event value', event.target.value)
    // console.log('changedTimeStamp', changedTimeStamp)
    setCurrentTimeStamp(changedTimeStamp)
    // console.log('currentTimeStamp', currentTimeStamp)

    refreshSnapsArray()
    console.log()
  }


  // set labelName to our input 
  const handleLabelChange = (event: any) => {
    event.preventDefault()
    setLabelName(event.target.value)
  }

  

  return (
    <>
      {/* {currentClusterIP} */}
      {dashNum === 1 ? (
        <div className="tabs flex justify-center mt-5 ">
          {clusterIPArray?.map((obj) => (
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


        {Object.keys(snapshotObj).length }

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
        { dashNum === 1 ? (
            <ChartContainer currentClusterIP={currentClusterIP} currentTimeStamp={currentTimeStamp} />
            ) : dashNum === 2 && Object.keys(snapshotObj).length > 1 ? 
            <ChartContainer currentClusterIP={currentClusterIP} currentTimeStamp={currentTimeStamp} />

                : (
              <DashBlank />
          )


          // dashNum === 2 && Object.keys(snapshotObj).length >= 1 ? (
          //   <ChartContainer currentClusterIP={currentClusterIP} currentTimeStamp={currentTimeStamp} />
          // ) : dashNum === 1 ? (
          //   <ChartContainer currentClusterIP={currentClusterIP} currentTimeStamp={currentTimeStamp} />
          // ) : (
          //   <DashBlank />
          // )
        }
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
