import { CheckboxProps, DatePicker, Dropdown, Input, MenuProps, Table, TableProps } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Virement } from "../../../Services/types/Virement";
import { useGetVirementInterne } from "../../../Services/Virements/VirementInterne/useGetVirementInterne";
import CustomCheckbox from "../../../ui/CustomCheckbox";
import filterIcon from "../../../assets/images/style-stroke.svg";


const NouakchottInterne =() => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
const { RangePicker } = DatePicker;

    const {data, isPending} = useGetVirementInterne(currentPage, "00001")
  console.log("searchValue : ", searchValue)
    const columns: TableProps<Virement>["columns"] = [
        {
          title: ("Date Operation"),
          dataIndex: "date_operation",
          key: "date_operation",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record?.date_operation?.slice(0,10)}</span>
            </div>
          ),
          onFilter: (_, record) => {
            return record?.date_operation?.toLowerCase().includes(searchValue.toLowerCase());
          },
          
        },
        {
          title: ("Agence"),
          dataIndex: "agence",
          key: "agence",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record?.agence}</span>
            </div>
          ),
          onFilter: (_, record) => {
            return record?.date_operation?.toLowerCase().includes(searchValue.toLowerCase());
          },
          
        },
        {
          title: ("Montant Debit"),
          dataIndex: "montant_debit",
          key: "montant_debit",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.montant_debit}</span>
            </div>
          ),
        },
        {
            title: ("Montant Credit"),
            dataIndex: "montant_credit",
            key: "montant_credit",
            render: (_, record) => (
              <div className="flex items-center gap-x-2">
                <span>{record.montant_credit}</span>
              </div>
            ),
          },
        {
          title: ("Client"),
          dataIndex: "client",
          key: "client",
       
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.client}</span>
            </div>
          ),
        },
        {
            title: ("Compte Debit"),
            dataIndex: "compte_debit",
            key: "compte_debit",
           
            render: (_, record) => (
              <div className="flex items-center gap-x-2">
                <span>{record.compte_debit}</span>
              </div>
            ),
          },
        {
          title: ("Compte Credit"),
          dataIndex: "compte_credit",
          key: "compte_credit",
        
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.compte_credit}</span>
            </div>
          ),
        },
        {
          title: ("Status"),
          dataIndex: "status",
          key: "status",
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.status}</span>
              </div>
            );
          },
        },
        
        
      ];
       const onChange: CheckboxProps["onChange"] = (e) => {
              const { value } = e.target;
          
              if (e.target.checked) {
                setFilterDate(value)
                setCurrentPage(1)
                // setSelectedDate(null)
              } else {
                setFilterDate("")
                setCurrentPage(1)
                // setSelectedDate(null)
      
      
              }
            };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filterDate, setFilterDate] = useState("Date")

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

  // const [dates, setDates] = useState<[string | null, string | null]>([null, null]);

      // const handleDateChange = (values: any, dateStrings: [string, string]) => {
      //   console.log(values)
      //   // setDates(dateStrings);
      //   // setSelectedDate(null)
      //   setCurrentPage(1)
    
      // };
  // const [selectedDate, setSelectedDate] = useState<Date | null>();

      // const onChangeDate = (date:Date | null) => {
      //   setSelectedDate(date)
      // }


    return(
        <div className="mt-5">
  <div className="flex items-center gap-x-[13px] justify-between">
    <div className="flex flex-col">
        <span>Registred Virement</span>
        <span> {data?.count} virement interne </span>
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
    // onChange={handleDateChange} 
    />

      )}
  {filterDate === "Date" && (
 <DatePicker
//  locale={dayjs.locale("fr")}
 className="w-[173px] border border-[#e7e7e7] rounded-[10px] h-[42px] "
//  value={selectedDate}
//  onChange={onChangeDate}
//  onChange={onChangeDate}
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
              // rowClassName={getRowClassName}
              pagination={{
                current: currentPage,
                pageSize : pageSize,
                total: data?.count,
              }}
              onChange={handleTableChange}
              dataSource={data?.results}
            />
          </div>
        </div>
    )
}

export default NouakchottInterne