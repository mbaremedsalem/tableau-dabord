type Props = {
    label: string;
    value: string | number;
    valueDepot?:string | number,
    desc?:string
  };
  
  function StatBox({ label, value, valueDepot, desc }: Props) {
    return (
      <div className="bg-[#f3f6f5] min-h-[100px] flex flex-col items-center justify-center gap-y-1 w-full transition-transform transform hover:scale-105 hover:bg-[#e1e5e3] hover:shadow-lg  py-[11px] px-[31px] rounded-[12px]">
        <span className="text-[17px] text-black">{label}</span>
        <span className="text-[17px] font-semibold text-black">{value} {label === "Parc Comptes" ? "Comptes" : ""}</span>
        <div>
        <span className="text-[13px] text-black"> {desc} </span>
        <span className="text[13px] text-black"> {valueDepot} </span>

        </div>
      </div>
    );
  }
  
  export default StatBox;
  