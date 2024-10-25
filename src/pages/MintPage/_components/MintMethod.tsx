import { Button } from "@/components/ui/button";

interface MintMethodProps {
  value: string;
  title: string;
  duration: string;
  rate: string;
}

export const MintMethod = ({
  value,
  title,
  duration,
  rate,
}: MintMethodProps) => (
  <Button
    type="button"
    variant={value === "jackramp" ? "active" : "secondary"}
    className={"w-full h-auto p-4 justify-start space-x-4 rounded-[20px] border " + (value ? "jackramp" : " border-slate-600")}
  >
    <div className="text-left">
      <p className="font-semibold">{title}</p>
      <p className="text-xs text-muted-foreground">{duration}</p>
      <p className="text-xs text-muted-foreground">Rate {rate}</p>
    </div>
  </Button>
);
