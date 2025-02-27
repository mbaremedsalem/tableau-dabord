import { createPortal } from "react-dom";
import { CgSpinner } from "react-icons/cg";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  spinnerClassName?: string;
  center?: boolean;
};

function Spinner({ center, className, spinnerClassName }: Props) {
  const spinnerStyle = twMerge("h-5 w-5 animate-spin", spinnerClassName);
  if (center)
    return createPortal(
      <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className={className}>
          <CgSpinner className={spinnerStyle} />
        </div>
      </div>,
      document.body
    );
  return (
    <div className={className}>
      <CgSpinner className={spinnerStyle} />
    </div>
  );
}

export default Spinner;
