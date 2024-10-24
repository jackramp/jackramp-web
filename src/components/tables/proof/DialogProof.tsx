import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
export default function DialogProof({ trigger }: { trigger: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger onClick={() => setIsOpen(true)}>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-w-[90vw] rounded-lg">
                <DialogHeader>
                    <DialogTitle>Generate Proof</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col w-full gap-3">
                    <div className="w-full h-auto relative flex flex-col justify-center">
                        <img
                            src={"/api/placeholder/200/200"}
                            alt="image"
                            className="rounded-lg w-full h-[100px] object-cover"
                            height={200}
                            width={200}
                        />
                        <DialogDescription className='text-sm relative text-right pt-1 text-gray-500'>
                            Source: Sumber
                        </DialogDescription>
                    </div>
                    <div className="flex flex-col gap-2">
                        <DetailRow label="Item Name" value="Nama Item" />
                        <DetailRow label="Reward" value={`0,1 USDC`} />
                    </div>
                    <Separator />
                </div>
                <Input placeholder="Invoice" type='number' />
                <Button
                >
                    Proof
                </Button>
            </DialogContent>
        </Dialog>
    )
}

const DetailRow: React.FC<{ label: string; value: string }> = function DetailRow({ label, value }) {
    return (
        <div className="grid grid-cols-[90px_1fr] gap-2 items-center">
            <Label className="font-bold text-sm">{label}</Label>
            <Label className="text-md font-bold text-right line-clamp-1">{value}</Label>
        </div>
    );
};