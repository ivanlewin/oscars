import { CheckCheck, FrownIcon, InfoIcon } from "lucide-react";
import { Toaster } from "sonner";

export function CustomToaster() {
  return (
    <Toaster
      position="top-center"
      className="pointer-events-none mt-10"
      visibleToasts={1}
      toastOptions={{
        classNames: {
          description: "text-muted-foreground",
          toast:
            "rounded-lg border-border bg-background dark:bg-background/90 text-foreground shadow-default min-h-10",
        },
        duration: 4000,
      }}
      icons={{
        info: <InfoIcon className="ml-1 h-3.5 w-3.5 text-muted-foreground" />,
        error: <FrownIcon className="ml-1 h-3.5 w-3.5 text-muted-foreground" />,
        success: (
          <CheckCheck className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
        ),
      }}
    />
  );
}
