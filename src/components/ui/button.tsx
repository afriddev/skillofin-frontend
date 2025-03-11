import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { FaSpinner } from "react-icons/fa";

const buttonVariants = cva(
  "inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:bg-gray-200 disabled:opacity-40 disabled:text-foreground disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow rounded-sm  hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
          
        constructive:
          "bg-constructive text-constructive-foreground shadow-sm hover:bg-constructive/90",

        outline:
          "border border-primary bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground bg-accent/20 lg:hover:scale-110",
        link: "text-primary underline-offset-4 hover:scale-105 underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isPending?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isPending, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <div className="flex items-center gap-3">
        <Comp
          disabled={isPending}
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          <div className="flex items-center gap-6 ">{props.children}</div>
        </Comp>
        {isPending && (
          <div>{isPending && <FaSpinner className=" animate-spin" />}</div>
        )}
      </div>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
