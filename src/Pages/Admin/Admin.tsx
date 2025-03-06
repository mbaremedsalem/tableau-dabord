import StatBox from "../../ui/StatBox";



const Admin =() => {
    
    const stats = [
        {
          label: "Comptes",
          value: 34,
        },
        {
          label: 'Clients',
          value: 55
        },
        {
          label: "Virements Internes",
          value: 72,
        },
        {
          label: ("Virement Externe"),
          value: 340
        },
        {
            label: ("Guichet"),
            value: 210
          },
      ];

    return (
        
        <div>
            <div>
            <div className="mt-[29px] mb-[18px] flex items-center justify-between gap-x-[27px] pb-[21px] border-b border-[#eeeeee]">
        {stats.map((el) => {
          return <StatBox key={el.label} label={el.label} value={el.value!} />;
        })}
      </div>
            </div>
        </div>
        
    )
}

export default Admin