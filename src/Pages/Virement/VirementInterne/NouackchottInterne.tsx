import {  Button, DatePicker, Input, Table, TableProps } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Virement } from "../../../Services/types/Virement";
import { useGetVirementInterne } from "../../../Services/Virements/VirementInterne/useGetVirementInterne";
import dayjs from "dayjs";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

const NouakchottInterne =() => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
const [selectedDate, setSelectedDate] = useState<Date | null>();

const onChangeDate = (date:Date | null) => {
  setSelectedDate(date)
}
    const {data, isPending} = useGetVirementInterne(currentPage, "00001", selectedDate?String(dayjs(selectedDate).format("YYYY-MM-DD")) : "")
 
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
          filteredValue:[searchValue],
          onFilter:(_, record)=>{
            return (
              record?.agence?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
              record?.client?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
              record?.compte_credit?.toLowerCase().includes(searchValue.toLocaleLowerCase()) || 
              record?.compte_debit?.toLowerCase().includes(searchValue.toLocaleLowerCase()) || 
              record?.date_operation?.includes(searchValue.toLocaleLowerCase()) || 
              record?.montant_credit?.toString()?.includes(searchValue.toLocaleLowerCase()) ||
              record?.montant_debit?.toString()?.includes(searchValue.toLocaleLowerCase()) || 
              record?.status?.toLowerCase().includes(searchValue.toLocaleLowerCase()) 
              
            )
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
       
      const exportToExcel = () => {
        if (!data?.results) return;
    
        // Ajouter les numéros de ligne
        // const formattedData = data.results.map((row, index) => ({
        //   "N° Ligne": index + 1,
        //   "Date Operation": row.date_operation?.slice(0, 10),
        //   Agence: row.agence,
        //   "Montant Debit": row.montant_debit,
        //   "Montant Credit": row.montant_credit,
        //   Client: row.client,
        //   "Compte Debit": row.compte_debit,
        //   "Compte Credit": row.compte_credit,
        //   Status: row.status,
        // }));
    
        // const worksheet = XLSX.utils.json_to_sheet(formattedData);
        // const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
        // const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        // const dataBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    
        // Télécharger le fichier Excel
        // saveAs(dataBlob, "virement_data.xlsx");
      };
    return(
        <div className="mt-5">
  <div className="flex items-center gap-x-[13px] justify-between">
    <div className="flex flex-col">
        <span>Registred Virement</span>
        <span> {data?.count} virement interne </span>
    </div>
  <div className="flex items-center space-x-4">
  
  

 <DatePicker
 className="w-[180px] border border-[#e7e7e7] rounded-[10px] h-[42px] "
 onChange={onChangeDate}
 placeholder="Select date operation"
 format={"dddd, DD MMMM YYYY"}
 />
 <Button type="primary" onClick={exportToExcel}>
            Export Excel
          </Button>
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