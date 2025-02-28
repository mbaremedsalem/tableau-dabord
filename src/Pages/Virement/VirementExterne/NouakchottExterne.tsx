import { Input, Table, TableProps } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Virement } from "../../../Services/types/Virement";


const Nouakchott =() => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
  
  console.log("searchValue : ", searchValue)
    const columns: TableProps<Virement>["columns"] = [
        {
          title: ("Date"),
          dataIndex: "date_operation",
          key: "date_operation",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.date_operation}</span>
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
        //   onFilter: (_, record) => {
        //     return record?.agec?.toLowerCase().includes(searchValue.toLowerCase());
        //   },
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

    return(
        <div className="mt-5">
  <div className="flex items-center gap-x-[13px] justify-between">
    <div className="flex flex-col">
        <span>Registred Comptes</span>
        <span> 24 virement interne </span>
    </div>
              <Input
                value={searchValue ?? ""}
                className="custom-input !w-[189px] !h-[41px] gap-2 rounded-xl"
                prefix={<CiSearch className="" />}
                onChange={(e) => setSearchValue(e.target.value)}
                aria-label="search input"
                placeholder="Search..."
                
              />
              {/* <FilterDropdown
                valueSearch={"users"}
                filtersUsers={filtersusers}
                handleCheckboxChange={handleCheckboxChange}
              /> */}

             
              
            </div>
            <div className="!max-w-full mt-4 md:!max-w-full overflow-x-auto">
            <Table
            //   loading={isPending}
              columns={columns}
            //   rowClassName={getRowClassName}
              pagination={{
                current: currentPage,
                pageSize,
                // total: data?.length,
              }}
              onChange={handleTableChange}
            //   dataSource={data}
            />
          </div>
        </div>
    )
}

export default Nouakchott