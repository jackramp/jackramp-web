import { Suspense } from 'react'

export const HomePage = () => {
    return (
        <div className="flex items-center justify-center w-svw h-svh">
            <Suspense fallback={<div>Loading...</div>}>
                <div className='z-10'>
                    Jackramp
                </div>
            </Suspense>
        </div>
    )
}