import { Card, CardContent } from "@/components/ui/card";
import { MintForm } from "./MintForm";
import FinancialChart from "./FinancialChart";

export const MintComponent = () => {
    return (
        <div className="mt-[120px] z-10 px-10">
            <div className="flex flex-col w-full h-auto">
                <div className="flex justify-between w-full gap-5">
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
            </div>
        </div>
    );
};
