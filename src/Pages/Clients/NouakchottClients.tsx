import { Input, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useGetClients } from "../../Services/Clients/useGetClients";
import { Client } from "../../Services/types/Client";

const NouakchottClients =() => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(14);
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
 
   const [type, setType] = useState("")
   const TypeFomatted = type === "PARTICULIERS" ? "COMPTES ORD- PARTICULIERS" : ""
useEffect(()=>{
  const params = new URLSearchParams(window.location.search)
  const codeParam = params.get("type")
  if(codeParam){
    setType(codeParam)
  }
}, [])

console.log("type est : ", type)



  console.log("searchValue : ", searchValue)
    const columns: TableProps<Client>["columns"] = [
        {
          title: ("CLIENT"),
          dataIndex: "CLIENT",
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
       
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.NOM}</span>
            </div>
          ),
        },
        {
            title: ("DATE OUVERTURE"),
            dataIndex: "DATOUV",
            key: "DATOUV",
            
            render: (_, record) => (
              <div className="flex items-center gap-x-2">
                <span>{record.DATOUV.slice(0,10)}</span>
              </div>
            ),
          },
        {
          title: ("DATE FERMETURE"),
          dataIndex: "DATFRM",
          key: "DATFRM",
       
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.DATFRM}</span>
            </div>
          ),
        },
        {
          title: ("TYPE"),
          dataIndex: "TYPE",
          key: "TYPE",
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.TYPE}</span>
              </div>
            );
          },
        },
        
        
        
      ];
      const {data, isPending} = useGetClients(currentPage, "00001", type?TypeFomatted:"")
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
              
            </div>
            <div className="!max-w-full mt-4 md:!max-w-full overflow-x-auto">
            <Table
              loading={isPending}
              columns={columns}
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

export default NouakchottClients