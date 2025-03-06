type Props = {
    label: string;
    value: string | number;
  };
  
  function StatBox({ label, value }: Props) {
    return (
      <div className="bg-[#f3f6f5] flex flex-col gap-y-1 w-full transition-transform transform hover:scale-105 hover:bg-[#e1e5e3] hover:shadow-lg  py-[11px] px-[31px] rounded-[12px]">
        <span className="text-[13px] text-black">{label}</span>
        <span className="text-[17px] font-semibold text-black">{value}</span>
      </div>
    );
  }
  
  export default StatBox;
  