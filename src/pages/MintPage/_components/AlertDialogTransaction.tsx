import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Check, Clipboard } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AlertDialogTransactionProps {
    isOpen: boolean;
    transactionHash: string;
    onClose: () => void;
}

const AlertDialogTransactionComponent: React.FC<AlertDialogTransactionProps> = ({ isOpen, transactionHash, onClose }) => {
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(transactionHash);
            toast.success('Transaction hash copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                        <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <AlertDialogTitle className="text-center text-textSecondary">
                        Transaction Successful!
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        Your transaction has been processed successfully.
                        <Card className='bg-gray-900/50 mt-6'>
                            <CardContent className='relative flex flex-col w-auto h-auto'>
                                <CardHeader>
                                    <CardTitle>Transaction Hash</CardTitle>
                                </CardHeader>
                                <CardDescription>
                                    <Label className="font-mono break-all">{transactionHash}</Label>
                                </CardDescription>
                                <Button
                                    size={'sm'}
                                    className='absolute top-3 right-3'
                                    variant={"default"} onClick={copyToClipboard}
                                >
                                    <Clipboard className="h-4 w-4 mr-1" />
                                </Button>
                            </CardContent>
                        </Card>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={onClose}>Close</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export const AlertDialogTransaction = React.memo(AlertDialogTransactionComponent);
AlertDialogTransaction.displayName = 'AlertDialogTransaction';
