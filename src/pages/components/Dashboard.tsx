import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import ChartContainer from './ChartContainer';
import { DashBlank } from './DashBlank';
import { api } from '~/utils/api';

interface DashboardProps {
  initialClusterIP: string;
  clusterIPArray: Array<any>;
  refetchClusterIPArray: any;
  snapshotObj: any;
  setSnapshotObj: any;
  dashNum: number;
}

const Dashboard: React.FC<DashboardProps> = ({
  initialClusterIP,
  clusterIPArray,
  refetchClusterIPArray,
  snapshotObj,
  setSnapshotObj,
  dashNum,
}) => {
  const [currentTimeStamp, setCurrentTimeStamp] = useState('now');
  const { data: sessionData } = useSession();
  const [currentClusterIP, setCurrentClusterIP] = useState(initialClusterIP);
  const [ipArray, setipArray] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [ipToDelete, setIpToDelete] = useState('');

  const deleteIP = api.clusterIP.deleteIP.useMutation({
    onSuccess: () => {
      refetchClusterIPArray();
      console.log('successfully deleted clusterIP');
    },
  });

  const handleDeleteIP = (ipAddress: string) => {
    setIpToDelete(ipAddress);
    setShowConfirmation(true);
  };

  const confirmDeleteIP = () => {
    const clusterIPToDelete = clusterIPArray.find((obj) => obj.ipAddress === ipToDelete);
    if (clusterIPToDelete) {
      deleteIP.mutate({ id: clusterIPToDelete.id });
    }
    setShowConfirmation(false);
  };

  const cancelDeleteIP = () => {
    setShowConfirmation(false);
    setIpToDelete('');
  };

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

  useEffect(() => {
    if (!clusterIPArray.includes(currentClusterIP)) {
      setCurrentClusterIP(clusterIPArray[0].ipAddress);
    }
  }, [clusterIPArray]);

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
                  <option value={snapshotObj[ip]} key={snapshotObj[ip]}>{ip}</option>
                ))
              )}
            </select>
          </div>
          {dashNum === 1 ? (
            <div className="mr-3 mt-2">
              <button className="btn bg-info/10 " onClick={handleSnapshotSubmit}>
                Snapshot
              </button>
            </div>
          ) : (
            ''
          )}
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
