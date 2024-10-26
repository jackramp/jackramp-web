import DialogProof from './DialogProof'
import { Button } from '@/components/ui/button';


export const ProofButton = ({ proveStatus }: { proveStatus: boolean }) => {
    return (
        <div className='max-w-[150px] flex justify-center'>
            {proveStatus ? (
                <Button
                    disabled
                    variant="outline"
                    className="w-full"
                >
                    Already Proved
                </Button>
            ) : (
                <DialogProof
                    trigger={
                        <Button>
                            Generate Proof
                        </Button>
                    }
                />
            )}
        </div>
    );
}