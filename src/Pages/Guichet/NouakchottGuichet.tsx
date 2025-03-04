import { CheckboxProps, DatePicker, Dropdown, Input, MenuProps, Table, TableProps } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useGetGuichet } from "../../Services/Guichet/useGetGuichet";
import { Guichet } from "../../Services/types/Guiche";
import CustomCheckbox from "../../ui/CustomCheckbox";
// import { getRowClassName } from "../../Services/types/Herpers";

import filterIcon from "../../assets/images/style-stroke.svg";


const NouakchottGuichet =() => {

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(14);
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

    // const [currentPage, setCurrentPage] = useState(1);
    // const [pageSize, setPageSize] = useState(8);
    // const handleTableChange = (pagination: any) => {
    //   setCurrentPage(pagination.current);
    //   setPageSize(pagination.pageSize);
    // };
      const {data, isPending} = useGetGuichet(currentPage)
  
  console.log("searchValue : ", searchValue)
    const columns: TableProps<Guichet>["columns"] = [
        {
          title: ("oper"),
          dataIndex: "oper",
          key: "oper",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.oper}</span>
            </div>
          ),
          onFilter: (_, record) => {
            return record?.oper?.toLowerCase().includes(searchValue.toLowerCase());
          },
          
        },
        {
          title: ("type_operation"),
          dataIndex: "type_operation",
          key: "type_operation",
    
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.type_operation}</span>
              </div>
            );
          },
        },
        {
          title: ("date_transaction"),
          dataIndex: "date_transaction",
          key: "date_transaction",
        //   onFilter: (_, record) => {
        //     return record?.nom?.toLowerCase().includes(searchValue.toLowerCase());
        //   },
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.date_transaction}</span>
            </div>
          ),
        },
        {
          title: ("Compte_Don"),
          dataIndex: "Compte_Don",
          key: "Compte_Don",
        //   onFilter: (_, record) => {
        //     return record?.agec?.toLowerCase().includes(searchValue.toLowerCase());
        //   },
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.Compte_Don}</span>
            </div>
          ),
        },
        {
            title: ("Compte_benef"),
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
          title: ("devise_debit"),
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
          title: ("devise_credit "),
          dataIndex: "DATOUV",
          key: "DATOUV",
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.devise_credit}</span>
              </div>
            );
          },
        },
        {
          title: ("montant_debeit"),
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
          title: ("montant_credit"),
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
        // const { value } = e.target;
    
        if (e.target.checked) {
          // setSelectedCategory(value); // Set the category when checked
        } else {
          // setSelectedCategory(""); // Clear the category when unchecked
        }
      };

      const items: MenuProps["items"] =  [
        {
          label: <span>Show</span>,
          key: "-1",
        },
        {
          label: (
            <CustomCheckbox
              onChange={onChange}
              label="Coach"
              // checked={""}
              value="Coach booking"
            />
          ),
          key: "1",
        },
      ]

    return(
        <div className="mt-5">
  <div className="flex items-center gap-x-[13px] justify-between">
    <div className="flex flex-col">
        <span>Registred Guichet</span>
        <span> {data?.count} </span>
    </div>
    <div className="flex items-center space-x-4">
  
      <DatePicker
    className="w-[173px] border border-[#e7e7e7] rounded-[10px] h-[42px] "
    
    format={"ddd, Do MMM YYYY"}
    />
<Input
   value={searchValue ?? ""}
   className="custom-input !w-[189px] !h-[41px] gap-2 rounded-xl"
   prefix={<CiSearch className="" />}
   onChange={(e) => setSearchValue(e.target.value)}
   aria-label="search input"
   placeholder="Search..."
   
 />
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

