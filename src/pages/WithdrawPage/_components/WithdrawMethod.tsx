import { Button } from "@/components/ui/button";
import { FormField, FormItem } from "@/components/ui/form";

interface WithdrawMethodProps {
    value: string;
    title: string;
    duration: string;
    rate: string;
    onClick: (value: string) => void;
}

export const WithdrawMethod = ({
    value,
    title,
    duration,
    rate,
    onClick
}: WithdrawMethodProps) => (
    <FormField
        name="method"
        render={({ field }) => (
            <FormItem>
                <Button
                    type="button"
                    variant={field.value === value ? "active" : "secondary"}
                    className={"w-full h-auto p-4 justify-start space-x-4 rounded-[20px] border " + (field.value === value ? "" : " border-slate-600")}
                    onClick={() => onClick(value)}
                >
                    <div className="text-left">
                        <p className="font-semibold">{title}</p>
                        <p className="text-xs text-muted-foreground">{duration}</p>
                        <p className="text-xs text-muted-foreground">Rate {rate}</p>
                    </div>
                </Button>
            </FormItem>
        )}
    />
);