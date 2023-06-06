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
    // typescript possible bugs here
    clusterIPArray: any[]; //array of any type of object
    // get cluster IP array
    refetchCIPArray: ()=>void;
}

// to instantiate the context
const clusterContextDefaults: clusterContextType = {
    currentClusterIP:'',
    setCIP: ()=>{null},
    clusterIPArray: [{}], //array of objects
    refetchCIPArray: ()=>{null}, // get cluster IP array
}

export const AppContext = createContext<clusterContextType>(clusterContextDefaults)

export function useClusterContext() {
    return useContext(AppContext)
}

type Props = {
    children: ReactNode;
};

export function ClusterContext({ children }: Props) {
    // states and functions to pass
    const[currentClusterIP, setCurrentClusterIP] = useState('')
    const setCIP = (ip:string) =>{
        setCurrentClusterIP(ip)
    }

    // state and update state (refetch from API)
    // const { data:  clusterIPArray, refetch: refetchClusterIPArray } = api.clusterIP.getAll.useQuery();
    const { data:  intermediateData, refetch: refetchClusterIPArray } = api.clusterIP.getAll.useQuery();
    const refetchCIPArray = async () =>{
        await refetchClusterIPArray()
    }

    // type crutch to allow conditional value in case the api fetch is empty
    const clusterIPArray = intermediateData ? intermediateData :[{}]

    // value object to provide to children
    const value= {
        currentClusterIP,
        setCIP,
        clusterIPArray,
        refetchCIPArray

    }
    return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
    )
}