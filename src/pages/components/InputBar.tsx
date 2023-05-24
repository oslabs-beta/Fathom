import React from 'react';

// input field for cluster id
// button to take snapshot
// dropdown menu



export default function InputBar() {
    return (


<div className="navbar bg-base-100">

<div className="flex-none gap-2">

    {/* form */}
    <div className="form-control">
        <input type="text" placeholder="Cluster ID" className="input input-bordered" />   <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">Submit</a>
        </div>



        {/* snapshot button */}
        <button className="btn">Snapshot</button>


        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">

            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                <li>
                    <a className="justify-between">
                        Select Dashboard
                        <span className="badge">New</span>
                    </a>
                </li>
                <li><a>Current</a></li>
                <li><a>Snapshot 1</a></li>
                <li><a>Snapshot 2</a></li>
            </ul>
        </div>
    </div>
</div>
        {/* <div>
            <input type="text" placeholder='Cluster ID'></input>
        </div>


        <div className="dropdown dropdown-right p-4">
            <label tabIndex={0} className="btn m-1">Select Dashboard</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Current</a></li>
                <li><a>Snapshot</a></li>
            </ul>
        </div> */}
    {/* </> */}
    </div>)
}