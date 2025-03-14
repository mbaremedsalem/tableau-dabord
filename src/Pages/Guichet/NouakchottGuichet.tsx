import { CheckboxProps, DatePicker, Dropdown, Input, MenuProps, Table, TableProps } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useGetGuichet } from "../../Services/Guichet/useGetGuichet";
import { Guichet } from "../../Services/types/Guiche";
import CustomCheckbox from "../../ui/CustomCheckbox";
// import { getRowClassName } from "../../Services/types/Herpers";
import dayjs from "dayjs";
import "dayjs/locale/fr"

import filterIcon from "../../assets/images/style-stroke.svg";
const { RangePicker } = DatePicker;
dayjs.locale("fr")
const NouakchottGuichet =() => {
// const now = dayjs()
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(14);
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [dates, setDates] = useState<[string | null, string | null]>([null, null]);
  console.log("dates : ", selectedDate)
  const [filterDate, setFilterDate] = useState("Date")

  const handleDateChange = (values: any, dateStrings: [string, string]) => {
    console.log(values)
    setDates(dateStrings);
    setSelectedDate(null)
    setCurrentPage(1)

  };
    
      const {data, isPending} = useGetGuichet(currentPage, 
        filterDate === "Date" ?  (selectedDate ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "") : (dates[0]! ? dates[0]! : ""), 
        filterDate === "Date" ?  (selectedDate ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "") : (dates[1]! ? dates[1]! : ""), 
        
        "00001")
      const onChangeDate = (date:Date | null) => {
        setSelectedDate(date)
      }
  
  console.log("searchValue : ", searchValue)
    const columns: TableProps<Guichet>["columns"] = [
        
        {
          title: ("Type Operation"),
          dataIndex: "type_operation",
          key: "type_operation",
          filteredValue:[searchValue],
          onFilter:(_, record)=>{
            return (
              record?.type_operation?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
              record?.date_transaction?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
              record?.Compte_Don?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
              record?.Compte_benef?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
              record?.montant_credit?.toString().includes(searchValue.toLocaleLowerCase()) ||
              record?.montant_debeit?.toString().includes(searchValue.toLocaleLowerCase()) 

              
            )
          },
    
          // render: (_, record) => {
          //   return (
          //     <div className="flex flex-col gap-y-1">
          //       <span>{record?.type_operation}</span>
          //     </div>
          //   );
          // },
        },
        {
          title: ("Date Transaction"),
          dataIndex: "Date Transacation",
          key: "date_transaction",
        //   onFilter: (_, record) => {
        //     return record?.nom?.toLowerCase().includes(searchValue.toLowerCase());
        //   },
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.date_transaction.slice(0,10)}</span>
            </div>
          ),
        },
        {
          title: ("Compte Donneur d'ordre"),
          dataIndex: "Compte_Don",
          key: "Compte_Don",
       
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.Compte_Don}</span>
            </div>
          ),
        },
        {
            title: ("Compte Beneficiaire"),
            dataIndex: "Compte_benef",
            key: "Compte_benef",
            // onFilter: (_, record) => {
            //   return record?.ageclib?.toLowerCase().includes(searchValue.toLowerCase());
            // },
            render: (_, record) => (
              <div className="flex items-center gap-x-2">
                <span>{record.Compte_benef}</span>
              </div>
            ),
          },
        {
          title: ("Devise Debit"),
          dataIndex: "devise_debit",
          key: "devise_debit",
        //   onFilter: (_, record) => {
        //     return record?.libelle?.toLowerCase().includes(searchValue.toLowerCase());
        //   },
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.devise_debit}</span>
            </div>
          ),
        },
        {
          title: ("Devise Credit "),
          dataIndex: "devise_credit",
          key: "devise_credit",
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.devise_credit}</span>
              </div>
            );
          },
        },
        {
          title: ("Montant Debit"),
          dataIndex: "montant_debeit",
          key: "montant_debeit",
    
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.montant_debeit}</span>
              </div>
            );
          },
        },
        // {
        //   title: ("CODFRM"),
        //   dataIndex: "CODFRM",
        //   key: "CODFRM",
    
        //   render: (_, record) => {
        //     return (
        //       <div className="flex flex-col gap-y-1">
        //         <span>{record?.CODFRM}</span>
        //       </div>
        //     );
        //   },
        // },
        {
          title: ("Montant Credit"),
          dataIndex: "montant_credit",
          key: "montant_credit",
    
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.montant_credit}</span>
              </div>
            );
          },
        },
        
       
      ];
      console.log("data : ", data)
      const onChange: CheckboxProps["onChange"] = (e) => {
        const { value } = e.target;
    
        if (e.target.checked) {
          setFilterDate(value)
          setCurrentPage(1)
          setSelectedDate(null)
        } else {
          setFilterDate("")
          setCurrentPage(1)
          setSelectedDate(null)


        }
      };
      console.log("filterDate : ", filterDate)

      const items: MenuProps["items"] =  [
        {
          label: <span>Filter</span>,
          key: "-1",
        },
        {
          label: (
            <CustomCheckbox
              onChange={onChange}
              label="Date"
              checked={filterDate === "Date"}
              value="Date"
            />
          ),
          key: "1",
        },
        {
          label: (
            <CustomCheckbox
              onChange={onChange}
              label="Enter deux date"
              checked={filterDate === "deuxdate"}

              value="deuxdate"
            />
          ),
          key: "2",
        },
      ]
      console.log(" selectedDate : ", dayjs(selectedDate).format("YYYY-MM-DD"))

    return(
        <div className="mt-5">
  <div className="flex items-center gap-x-[13px] justify-between">
    <div className="flex flex-col">
        <span>Registred Guichet</span>
        <span> {data?.count} </span>
    </div>
    
    <div className="flex items-center space-x-4">
    <Dropdown
  onOpenChange={(e) => setIsMenuOpen(e)}
  menu={{ items }}
  trigger={["click"]}
  >
 <button
   className={` w-[42px] h-[42px] px-[13px] py-[14px] rounded-full flex items-center justify-center border 
    
    ${isMenuOpen &&"bg-[#fbce39]/[0.19] border-none duration-75 transition-all"}
     `}
 >
   <img src={filterIcon} alt="filter icon" />
 </button>
</Dropdown>
      {filterDate === "deuxdate" && (
    <RangePicker className="w-[] border border-[#e7e7e7] rounded-[10px] h-[42px] "
    onChange={handleDateChange} />

      )}
  {filterDate === "Date" && (
 <DatePicker
//  locale={dayjs.locale("fr")}
 className="w-[173px] border border-[#e7e7e7] rounded-[10px] h-[42px] "
//  value={selectedDate}
//  onChange={onChangeDate}
 onChange={onChangeDate}
 format={"dddd, DD MMMM YYYY"}
 />
  )}
     
<Input
   value={searchValue ?? ""}
   className="custom-input !w-[189px] !h-[41px] gap-2 rounded-xl"
   prefix={<CiSearch className="" />}
   onChange={(e) => setSearchValue(e.target.value)}
   aria-label="search input"
   placeholder="Search..."
   
 />
  
</div>
              {/* <FilterDropdown
                valueSearch={"users"}
                filtersUsers={filtersusers}
                handleCheckboxChange={handleCheckboxChange}
              /> */}

             
              
            </div>
            <div className="!max-w-full mt-4 md:!max-w-full overflow-x-auto">
            <Table
              loading={isPending}
              columns={columns}
            //   rowClassName={getRowClassName}
              pagination={{
                current: currentPage,
                pageSize,
                total: data?.count
              }}
              onChange={handleTableChange}
              dataSource={data?.results}
            />
          </div>
        </div>
    )
}


export default NouakchottGuichet

