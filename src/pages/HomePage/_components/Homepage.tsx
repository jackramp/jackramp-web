import { Globe } from "@/components/ui/globe";
import { Label } from "@/components/ui/label";

export default function Homepage() {
  return (
    <div className="hero w-full">
      <div className="flex flex-col justify-center relative h-full overflow-hidden py-5 md:py-14 pt-28 w-full">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 py-16 max-w-[1140px] mx-auto">
          <div className="left flex flex-col justify-start">
            <Label className="text-5xl font-black max-w-4xl">
              The first decentralized USD off-ramp for crypto with ZkVM
            </Label>
            <Label className="text-lg font-medium max-w-4xl text-gray-400 mt-4">
              With a focus on security, speed, and simplicity, our platform
              empowers you to seamlessly convert digital assets to USD, all in a
              fully decentralized environment. Experience true financial
              freedom—no intermediaries, just direct access to your funds.
            </Label>
          </div>

          <div className="right">
            <Globe />
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 pb-10 md:pb-40 max-w-[960px]">

<div className="left">
  <Label className="text-6xl font-black text-center max-w-4xl">
    The first decentralized USD off-ramp for crypto with ZkVM
  </Label>
  <Label className="text-lg text-center font-medium max-w-4xl text-gray-400">
    With a focus on security, speed, and simplicity, our platform
    empowers you to seamlessly convert digital assets to USD, all in
    a fully decentralized environment. Experience true financial
    freedom—no intermediaries, just direct access to your funds.
  </Label>
</div>

<div className="right">
  <h4>Righ</h4>
</div>

</div> */
}
