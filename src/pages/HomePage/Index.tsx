import { Suspense } from 'react'

export const HomePage = () => {
    return (
        <div className="flex flex-col w-screen h-screen z-10 items-center justify-center overflow-y-auto overflow-x-hidden">
            <Suspense fallback={<div>Loading...</div>}>
                <div className='z-10'>
                    Jackramp
                </div>
            </Suspense>
        </div>
    )
}