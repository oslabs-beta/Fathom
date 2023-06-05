// add a context provider for state management
import {useState, createContext, ReactNode, useContext} from "react"
import { api } from '~/utils/api';
// define the type of the AppContext object
type clusterContextType = {
    // current clusterIP
    currentClusterIP: string;
    // set current cluster IP
    setCIP: (arg:string)=>void;

    // array of cluster IPS
    clusterIPArray: {}[]|undefined; //array of objects
    // get cluster IP array
    refetchCIPArray: ()=>void;

    // snapshots for that IP
    currentCIPSnaps: {}[]; //

    // method to update the current IP snapshots
    refreshSnapsArray: ()=>void;
}

// to instantiate the context
const clusterContextDefaults: clusterContextType = {
    currentClusterIP:'',
    setCIP: ()=>{},
    clusterIPArray: [{}], //array of objects
    refetchCIPArray: ()=>{}, // get cluster IP array
    currentCIPSnaps: [{}],
    refreshSnapsArray: ()=>{}
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

export const AppContext = createContext<clusterContextType>(clusterContextDefaults)

export function useClusterContext() {
    return useContext(AppContext)
}

type Props = {
    children: ReactNode;
};

function filterByIp (notFiltered:Array<snapshotProps>, ip:string) : Array<snapshotProps>{
    if(notFiltered){
      const results = notFiltered.filter(el=>{
        return el.clusterIP === ip ? true : false
      });
      // console.log('filtered',results)
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

export function ClusterContext({ children }: Props) {
    // states and functions to pass
    
    // state and update state (refetch from API)
    const { data: clusterIPArray, refetch: refetchClusterIPArray } = api.clusterIP.getAll.useQuery();
    const refetchCIPArray = () =>{
        refetchClusterIPArray()
    }

    const[currentClusterIP, setCurrentClusterIP] = useState(
        // call for the clusters and get the first one
        clusterIPArray ? clusterIPArray[0]?.ipAddress : ''

    )
    const setCIP = (ip:string) =>{
        setCurrentClusterIP(ip)

        // fetch the snapshots needed for this IP

        // modify the hook ?for `filterered api call?
    }
    
    // snapshot fetching using the API
    const [currentCIPSnaps, setcurrentCIPSnaps] = useState([{}])
    const { data: unfilteredSnapshots, refetch: refetchunfilteredSnapshots } = api.snapshot.getAll.useQuery() 
    const [filteredByIPSnaps, setfilteredByIPSnaps] = useState(filterByIp(unfilteredSnapshots, currentClusterIP))

    const refreshSnapsArray = async()=>{
        await refetchunfilteredSnapshots()
        console.log('currentCIP unfiltered', unfilteredSnapshots)
        setfilteredByIPSnaps(filterByIp(unfilteredSnapshots, currentClusterIP))
        console.log('currentCIParray',currentClusterIP,filteredByIPSnaps, )

    }

    // value object to provide to children
    const value= {
        currentClusterIP,
        setCIP,
        clusterIPArray,
        refetchCIPArray,
        currentCIPSnaps,
        refreshSnapsArray

    }
    return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
    )
}