import Globe from "@/components/ui/globe";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import "./styles.css";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="hero w-full">
      <div className="flex flex-col justify-center relative h-full overflow-hidden py-5 md:py-14 pt-28 w-full">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 py-16 max-w-[1240px] w-[80vw] mx-auto">
          <div className="left flex flex-col justify-start">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: 0.5,
              }}
              className="div"
            >
              <Label className="text-5xl font-bold">
                The first decentralized off-ramp USD with zkVM
              </Label>
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                delay: 1.4,
              }}
              className="div mt-4"
            >
              <Label className="text-lg font-medium max-w-4xl text-gray-400">
                With a focus on security, speed, and simplicity, our platform
                empowers you to seamlessly convert digital assets to USD, all in
                a fully decentralized environment. Experience true financial
                freedom—no intermediaries, just direct access to your funds.
              </Label>
            </motion.div>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
              delay: 2.1,
            }}
            className="div"
          >
            <div className="right relative">
              <div className="relative flex min-h-80 w-full flex-col items-center justify-center overflow-hidden rounded-lg glass">
                <GlobeRight />
                <Link to="/mint">
                  <Button className="glass text-white hover:bg-red mt-4">
                    Get Started Now!
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const GlobeRight = () => {
  return (
    <>
      <h4 className="block text-center w-full text-5xl font-bold ps-4 z-10">
        Cash Out Instantly
      </h4>
      <div className="absolute w-full -bottom-10 left-48 h-[100%] md:h-full z-1">
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
      </div>
    </>
  );
};
