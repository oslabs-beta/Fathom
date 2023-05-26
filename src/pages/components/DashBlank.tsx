// component which displays when user is not logged in and/or the cluster IP has not been entered

export function DashBlank() {
    return (
        <div className="mt-80 flex-1 font-bold animated-gradient">
            {/* margin, flex, font style */}
            <div className="text-center">
                {/* centers all text */}          
                <div className="text-9xl bg-gradient-to-br from-info/50 bg-clip-text text-transparent bg-size-150%">
                    {/* sets text size to 9xl, gradient background */}
                    Fathom
                </div>
                <div className="text-xl text-info/20">
                    for Kubernetes
                </div>
            </div>
        </div>
    );
}

