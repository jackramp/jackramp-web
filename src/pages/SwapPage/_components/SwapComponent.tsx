import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SwapForm } from "./SwapForm";

export interface SwapData {
    amount: string;
    coin: string;
    method: string;
}

export const SwapComponent = () => {
    const [selectedTab, setSelectedTab] = useState("request");

    const onSubmit = useCallback((data: SwapData) => {
        console.log(data);
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                className="max-w-xl mx-auto p-6 space-y-8 mt-[100px] z-10"
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold">Swap</h1>
                    <p className="text-muted-foreground">
                        Choose your preferred swap method and amount
                    </p>
                </div>

                <Tabs defaultValue="request" className="mb-6 flex justify-center w-full" onValueChange={setSelectedTab}>
                    <TabsList className="grid grid-cols-2 h-[60px] bg-gray-800 rounded-full">
                        <TabsTrigger
                            value="request"
                            className="data-[state=active]:bg-gray-700 h-full rounded-full px-10"
                        >
                            Swap
                        </TabsTrigger>
                        <TabsTrigger
                            value="claim"
                            className="data-[state=active]:bg-gray-700 h-full rounded-full px-10"
                        >
                            History
                        </TabsTrigger>
                    </TabsList>
                </Tabs>

                <AnimatePresence>
                    <motion.div
                        key={selectedTab}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="sm:min-w-[500px] rounded-[30px] border-none outline-none">
                            <CardContent className="p-10">
                                {selectedTab === "request" ? (
                                    <SwapForm onSubmit={onSubmit} />
                                ) : (
                                    <div>Your history content goes here.</div> // Replace this with your actual history content
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
};
