import { CheckboxProps, DatePicker, Dropdown, Input, MenuProps, Table, TableProps } from "antd";
import { Compte } from "../../Services/types/Compte";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useGetComptes } from "../../Services/comptes/useGetComptes";
import CustomCheckbox from "../../ui/CustomCheckbox";
import filterIcon from "../../assets/images/style-stroke.svg";
import dayjs from "dayjs";
type props = {
  typeC:string
}

const NouadhibouComptes =({typeC}:props) => {
  dayjs.locale("fr")
  
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
 
  console.log("searchValue : ", searchValue)
    const columns: TableProps<Compte>["columns"] = [
        {
          title: ("CLIENT"),
          dataIndex: "CLIENT",
          key: "CLIENT",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.CLIENT}</span>
            </div>
          ),
          filteredValue:[searchValue],
          onFilter:(_, record)=>{
            return (
              record?.CLIENT?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
              record?.COMPTE?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
              record?.NOM?.toLowerCase().includes(searchValue.toLocaleLowerCase()) || 
              record?.NCG?.toLowerCase().includes(searchValue.toLocaleLowerCase()) || 
              record?.TYP?.toLowerCase().includes(searchValue.toLocaleLowerCase()) || 
              record?.DATOUV?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
              record?.DATFRM?.toLowerCase().includes(searchValue.toLocaleLowerCase()) || 
              record?.POSDEV?.toString().includes(searchValue.toLocaleLowerCase()) || 
              record?.DATVAL?.toLowerCase().includes(searchValue.toLocaleLowerCase()) 
              
            )
          },
          
        },
        {
          title: ("AGENCE"),
          dataIndex: "AGENCE",
          key: "AGENCE",
       
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.AGENCE}</span>
            </div>
          ),
        },
        {
          title: ("NOM"),
          dataIndex: "NOM",
          key: "NOM",
        //   onFilter: (_, record) => {
        //     return record?.agec?.toLowerCase().includes(searchValue.toLowerCase());
        //   },
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.NOM}</span>
            </div>
          ),
        },
        {
            title: ("CHAPITRE"),
            dataIndex: "NCG",
            key: "NCG",
            // onFilter: (_, record) => {
            //   return record?.ageclib?.toLowerCase().includes(searchValue.toLowerCase());
            // },
            render: (_, record) => (
              <div className="flex items-center gap-x-2">
                <span>{record.NCG}</span>
              </div>
            ),
          },
        {
          title: ("TYPE"),
          dataIndex: "TYP",
          key: "TYP",
        //   onFilter: (_, record) => {
        //     return record?.libelle?.toLowerCase().includes(searchValue.toLowerCase());
        //   },
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.TYP}</span>
            </div>
          ),
        },
        {
          title: ("DATE OUVERTURE"),
          dataIndex: "DATOUV",
          key: "DATOUV",
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.DATOUV}</span>
              </div>
            );
          },
        },
        {
          title: ("DATE FERMETURE"),
          dataIndex: "DATFRM",
          key: "DATFRM",
    
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.DATFRM}</span>
              </div>
            );
          },
        },
        
        {
          title: ("SOLDE"),
          dataIndex: "POSDEV",
          key: "POSDEV",
    
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.POSDEV}</span>
              </div>
            );
          },
        },
        {
          title: ("DATE VALEUR"),
          dataIndex: "DATVAL",
          key: "DATVAL",
    
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.DATVAL}</span>
              </div>
            );
          },
        },
        
        
      ];
  const [filterDate, setFilterDate] = useState("")

  const [selectedDate, setSelectedDate] = useState<Date | null>();
      const {data, isPending} = useGetComptes(currentPage, "00002", typeC,(filterDate=== "Dateo" && selectedDate) ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "",  
    (  filterDate=== "Datef" && selectedDate) ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "")
      console.log("data : ", data)
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  console.log("|selectedDate : ", String(dayjs(selectedDate).format("YYYY-MM-DD")))
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
      const onChangeDate = (date:Date | null) => {
        setSelectedDate(date)
      }

      const items: MenuProps["items"] =  [
        {
          label: <span>Filter Par Date</span>,
          key: "-1",
        },
        {
          label: (
            <CustomCheckbox
              onChange={onChange}
              label="Date Ouverture"
              checked={filterDate === "Dateo"}
              value="Dateo"
            />
          ),
          key: "1",
        },
        {
          label: (
            <CustomCheckbox
              onChange={onChange}
              label="Date Fermeture"
              checked={filterDate === "Datef"}

              value="Datef"
            />
          ),
          key: "2",
        },
      ]
    return(
        <div className="mt-5">
  <div className="flex items-center gap-x-[13px] justify-between">
    <div className="flex flex-col">
        <span>Registred Comptes</span>
        <span> {data?.count} </span>
    </div>
             <div className="flex items-center justify-center space-x-3">
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
<DatePicker
 className="w-[200px] border border-[#e7e7e7] rounded-[10px] h-[42px] "
 onChange={onChangeDate}
 placeholder={filterDate === "Dateo" ? "Select Date Ouverture" : (filterDate === "Datef" ? "Select Date Fermeture"  : "")}
 format={"dddd, DD MMMM YYYY"}
 />
             <Input
                value={searchValue ?? ""}
                className="custom-input !w-[189px] !h-[41px] gap-2 rounded-xl"
                prefix={<CiSearch className="" />}
                onChange={(e) => setSearchValue(e.target.value)}
                aria-label="search input"
                placeholder="Search..."
                
              />
              
               
             </div>
              
            </div>
            <div className="!max-w-full mt-4 md:!max-w-full overflow-x-auto">
            <Table
              loading={isPending}
              columns={columns}
              pagination={{
                current: currentPage,
                pageSize,
                total: data?.count,
              }}
              onChange={handleTableChange}
              dataSource={data?.results}
            />
          </div>
        </div>
    )
}

export default NouadhibouComptes