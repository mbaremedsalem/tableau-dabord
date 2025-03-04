import { Input, Table, TableProps } from "antd";
import { Compte } from "../../Services/types/Compte";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useGetComptes } from "../../Services/comptes/useGetComptes";
// import { getRowClassName } from "../../Services/types/Herpers";


const NouakchottComptes =() => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(14);
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
 
  console.log("searchValue : ", searchValue)
    const columns: TableProps<Compte>["columns"] = [
        {
          title: ("CLIENT"),
          dataIndex: "client",
          key: "client",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.CLIENT}</span>
            </div>
          ),
          onFilter: (_, record) => {
            return record?.CLIENT?.toLowerCase().includes(searchValue.toLowerCase());
          },
          
        },
        {
          title: ("AGENCE"),
          dataIndex: "AGENCE",
          key: "AGENCE",
        //   onFilter: (_, record) => {
        //     return record?.nom?.toLowerCase().includes(searchValue.toLowerCase());
        //   },
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
      const {data, isPending} = useGetComptes(pageSize, "00001")
      console.log("data : ", data)
    return(
        <div className="mt-5">
  <div className="flex items-center gap-x-[13px] justify-between">
    <div className="flex flex-col">
        <span>Registred Comptes</span>
        <span> {data?.count} </span>
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
              loading={isPending}
              columns={columns}
            //   rowClassName={getRowClassName}
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

export default NouakchottComptes