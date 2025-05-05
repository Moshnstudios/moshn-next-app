import { cn } from "@nextui-org/react";

interface TitleProps extends React.HTMLAttributes<HTMLElement> {
  text: string;
}

export default function Title({ ...props }: TitleProps) {
  return (
    <h3
      className={cn(
        "py-2 font-title font-bold tracking-tighter",
        props.className,
      )}
    >
      {props.text}
    </h3>
  );
}
