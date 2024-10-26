import { Suspense } from 'react'
import Homepage from './_components/Homepage'

export const HomePage = () => {
    return (
        <div className="flex w-screen min-h-screen overflow-y-scroll z-10">
            <Suspense fallback={<div>Loading...</div>}>
                <Homepage />
            </Suspense>
        </div>
    )
}