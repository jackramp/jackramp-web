import { Label } from "@/components/ui/label";

export default function Homepage() {
    return (
        <div className="flex flex-col w-full items-center justify-center gap-6">
            <Label className="text-6xl font-black text-center max-w-4xl">The first decentralized USD off-ramp for crypto</Label>
            <Label className="text-lg text-center font-medium max-w-4xl text-gray-400">With a focus on security, speed, and simplicity, our platform empowers you to seamlessly convert digital assets to USD, all in a fully decentralized environment. Experience true financial freedom—no intermediaries, just direct access to your funds.</Label>
        </div>
    )
}
