import { Card, CardContent } from "@/components/ui/card";
import { MintForm } from "./MintForm";
import FinancialChart from "./FinancialChart";
import TableMint from "./TableMint";
import { Label } from "@/components/ui/label";

export const MintComponent = () => {
    return (
        <div className="mt-[120px] z-10 px-10">
            <div className="w-full flex flex-col gap-10">
                <div className="flex flex-col-reverse md:flex-row md:justify-between w-full gap-5 h-auto">
                    <div className="flex w-full">
                        <FinancialChart />
                    </div>
                    <div>
                        <Card className="sm:min-w-[300px] border-none outline-none">
                            <CardContent className="p-10">
                                <MintForm />
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full justify-center items-center">
                    <Label className="flex text-3xl">Your Transaction</Label>
                    <TableMint/>
                </div>
            </div>
        </div>
    );
};
