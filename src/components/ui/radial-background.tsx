export const RadialBackground = () => {
    return (
        <div className="fixed inset-0 z-0 bg-[#1c1c21]">
            <svg
                className="fixed z-[-1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-svh"
            >
                <defs>
                    <radialGradient id="background-gradient" cx="50%" cy="50%">
                        <stop offset="0%" stopColor="var(--jackramp-color-primary)" />
                        <stop offset="100%" stopColor="var(--jackramp-color-background)" />
                    </radialGradient>
                </defs>
                <rect opacity="0.1" fill="url(#background-gradient)" className="w-screen h-svh"/>
            </svg>
        </div>
    );
};