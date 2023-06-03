// add a context provider for state management
import {useState, createContext, ReactNode, useContext} from "react"

// define the type of the AppContext object
type clusterContextType = {
    // current clusterIP
    currentClusterIP: string;
    // set current cluster IP
    setCIP: (arg:string)=>void;

    // array of cluster IPS
    // clusterIPArray: {}[]; //array of objects
    // // get cluster IP array
    // getClusterIPArray: ()=>void;
}

// to instantiate the context
const clusterContextDefaults: clusterContextType = {
    currentClusterIP:'',
    setCIP: ()=>{},
    // clusterIPArray: [{}], //array of objects
    // getClusterIPArray: ()=>{}, // get cluster IP array
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

    // value object to provide to children
    const value= {
        currentClusterIP,
        setCIP,

    }
    return (
    <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
    )
}