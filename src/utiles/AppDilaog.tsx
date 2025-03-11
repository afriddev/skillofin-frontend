import { X } from "lucide-react";
import { ReactNode } from "react";

interface AppdialogInterface {
  children: ReactNode;
  title: string;
  onClose: () => void;
  className?: string;
  startFromRight?: boolean;
}

function AppDialog({
  className,
  children,
  onClose,
  title,
  startFromRight,
}: AppdialogInterface) {
  return (
    <div
      className={`w-[100vw] h-[100vh] fixed inset-0 z-[1000] bg-foreground/40 backdrop-blur-md flex   ${
        startFromRight
          ? "lg:items-center  lg:justify-end"
          : "justify-center  items-center p-2 "
      }`}
    >
      <div
        className={` min-w-[90vw] lg:min-w-[25vw] min-h-[30vh] ${
          startFromRight && "h-full"
        } bg-background  rounded-lg fex flex-col gap-2 `}
      >
        <div className="bg-foreground/5 flex  py-2 items-center justify-between ">
          <h4 className="text-lg font-semibold pl-4">{title}</h4>
          <X
            onClick={onClose}
            className="w-8 h-8 bg-foreground/5 mr-2 cursor-pointer flex items-center justify-center p-2 rounded-full lg:hover:bg-foreground/10"
          />
        </div>
        <div className="p-4 overflow-auto max-h-[100vh] max-w-[100vw] ">
          {<div className={`${className}`}>{children}</div>}
        </div>
      </div>
    </div>
  );
}
export default AppDialog;
