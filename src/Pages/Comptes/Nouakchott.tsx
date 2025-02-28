import { Input, Table, TableProps } from "antd";
import { Compte } from "../../Services/types/Compte";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
// import { getRowClassName } from "../../Services/types/Herpers";


const Nouakchott =() => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
  const data = [{
    client:"me",
    nom:"string",
    agec:"string",
    ageclib:"string",
    libelle:"string",
    compte:"string",
    devise:"devise 1"
  },
  {
    client:"sidine",
    nom:"string",
    agec:"string",
    ageclib:"string",
    libelle:"string",
    compte:"string",
    devise:"string"
  },
  {
    client:"brahim",
    nom:"string",
    agec:"string",
    ageclib:"string",
    libelle:"string",
    compte:"string",
    devise:"string"
  },
  {
    client:"ahmed",
    nom:"string",
    agec:"string",
    ageclib:"string",
    libelle:"string",
    compte:"string",
    devise:"string"
  },
  {
    client:"string",
    nom:"string",
    agec:"string",
    ageclib:"string",
    libelle:"string",
    compte:"string",
    devise:"string"
  },
  {
    client:"string",
    nom:"string",
    agec:"string",
    ageclib:"string",
    libelle:"string",
    compte:"string",
    devise:"string"
  },
  {
    client:"string",
    nom:"string",
    agec:"string",
    ageclib:"string",
    libelle:"string",
    compte:"string",
    devise:"string"
  }]
  console.log("searchValue : ", searchValue)
    const columns: TableProps<Compte>["columns"] = [
        {
          title: ("Client"),
          dataIndex: "client",
          key: "client",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.client}</span>
            </div>
          ),
          onFilter: (_, record) => {
            return record?.client?.toLowerCase().includes(searchValue.toLowerCase());
          },
          
        },
        {
          title: ("Nom"),
          dataIndex: "nom",
          key: "nom",
        //   onFilter: (_, record) => {
        //     return record?.nom?.toLowerCase().includes(searchValue.toLowerCase());
        //   },
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.nom}</span>
            </div>
          ),
        },
        {
          title: ("agec"),
          dataIndex: "agec",
          key: "agec",
        //   onFilter: (_, record) => {
        //     return record?.agec?.toLowerCase().includes(searchValue.toLowerCase());
        //   },
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.agec}</span>
            </div>
          ),
        },
        {
            title: ("ageclib"),
            dataIndex: "ageclib",
            key: "ageclib",
            // onFilter: (_, record) => {
            //   return record?.ageclib?.toLowerCase().includes(searchValue.toLowerCase());
            // },
            render: (_, record) => (
              <div className="flex items-center gap-x-2">
                <span>{record.ageclib}</span>
              </div>
            ),
          },
        {
          title: ("Libelle"),
          dataIndex: "libelle",
          key: "libelle",
        //   onFilter: (_, record) => {
        //     return record?.libelle?.toLowerCase().includes(searchValue.toLowerCase());
        //   },
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.libelle}</span>
            </div>
          ),
        },
        {
          title: ("compte"),
          dataIndex: "compte",
          key: "compte",
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.compte}</span>
              </div>
            );
          },
        },
        {
          title: ("devise"),
          dataIndex: "devise",
          key: "devise",
    
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.devise}</span>
              </div>
            );
          },
        },
        
      ];
      console.log("data : ", data)
    return(
        <div className="mt-5">
  <div className="flex items-center gap-x-[13px] justify-between">
    <div className="flex flex-col">
        <span>Registred Comptes</span>
        <span> {data.length} </span>
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
                total: data?.length,
              }}
              onChange={handleTableChange}
              dataSource={data}
            />
          </div>
        </div>
    )
}

export default Nouakchott