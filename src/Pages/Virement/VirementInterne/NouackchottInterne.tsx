import {  Button, DatePicker, Dropdown, Input, MenuProps, message, Modal, Space, Spin, Table, TableProps } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Virement, VirmentResponse } from "../../../Services/types/Virement";
import { useGetVirementInterne } from "../../../Services/Virements/VirementInterne/useGetVirementInterne";
import dayjs from "dayjs";
import logoBanque from "../../../assets/images/image.png"
import { CopyFilled, DownOutlined, FileExcelFilled, FilePdfFilled } from '@ant-design/icons'
import { FaFileCsv } from "react-icons/fa";

import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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
   console.log("selectedDate : ", selectedDate)
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
          // filteredValue:[searchValue],
          // onFilter:(_, record)=>{
          //   return (
          //     record?.agence?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          //     record?.client?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          //     record?.compte_credit?.toLowerCase().includes(searchValue.toLocaleLowerCase()) || 
          //     record?.compte_debit?.toLowerCase().includes(searchValue.toLocaleLowerCase()) || 
          //     record?.date_operation?.includes(searchValue.toLocaleLowerCase()) || 
          //     record?.montant_credit?.toString()?.includes(searchValue.toLocaleLowerCase()) ||
          //     record?.montant_debit?.toString()?.includes(searchValue.toLocaleLowerCase()) || 
          //     record?.status?.toLowerCase().includes(searchValue.toLocaleLowerCase()) 
              
          //   )
          // },
          
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
       
      const fetchInterne = async (
        page: number,
        agence: string,
        date_operation: string,
      ) => {
        
        const response = await axios.get(
          `http://127.0.0.1:8000/api/virement_intern/?&page=${page}&agence=${agence}&date_operation=${date_operation}`
        );
        return response.data;
      };
      
      // const exportToPDF = async () => {
      //   let allData: any[] = [];
      //   let page = 1;
      //   const totalPages = Math.ceil(data!.count / pageSize);
      //   setLoading(true)
      //   for (let p = page; p <= totalPages; p++) {
      //     console.log("Fetching data for page: ", p);
      
      //     try {
           
      //       const responseData = await fetchInterne(
      //         currentPage, "00001", selectedDate?String(dayjs(selectedDate).format("YYYY-MM-DD")) : "" );
      //       if (responseData?.results) {
      //         allData = [...allData, ...responseData.results];
      //       }
      // console.log("response : ", responseData)
    
      //     } catch (error) {
      //       console.error("Erreur lors de la récupération des Virements :", error);
      //       message.error("Erreur lors de l'exportation des données !");
      //       return;
      //     }
      //   }
      //   if (!allData.length) {
      //     message.error("Aucune donnée à exporter !");
      //     return;
      //   }
      
      //   const doc = new jsPDF();
      //   const logo = logoBanque; 
      // doc.addImage(logo, "PNG", 10, 5, 70, 14); 
      // doc.setFontSize(16);
      //   // doc.text("Banque Algerienne", 30, 15);
      //   // doc.text(`Liste des virements internes - Agence de Nouadhibou ${String(dayjs(selectedDate).format("YYYY-MM-DD")) ? " Pour le "+String(dayjs(selectedDate).format("YYYY-MM-DD")) : "" } `, 10, 25);
      //   doc.text(`Liste des virements internes - Agence de Nouadhibou  `, 10, 25);
      //   if(selectedDate){
      //   doc.text("Pour le "+String(dayjs(selectedDate).format("YYYY-MM-DD")), 10, 32);

      //   }
      
      //   autoTable(doc, {
      //     startY: 35,
      //     head: [columns.map(col => col.title as string)],
        
      //     body: allData.map(row =>
      //       columns.map(col => 
      //         'dataIndex' in col ? row[col.dataIndex as keyof VirmentResponse] : null
      //       )
      //     ),
      //     theme: "grid", 
     
      // headStyles: { fillColor: "#1C8244", textColor: [255, 255, 255] }, 
     
      //   });
      
      //   doc.save("virement-interne-ndb.pdf");
      //   message.success("Fichier PDF exporté avec succès !");
      // };
     
    
      
      const exportToPDF = async () => {
          let allData: any[] = [];
          let page = 1;
          const totalPages = Math.ceil(data!.count / pageSize);
          setLoading(true); // Active le spinner
      
          try {
              for (let p = page; p <= totalPages; p++) {
                  console.log("Fetching data for page: ", p);
      
                  const responseData = await fetchInterne(
                      currentPage,
                      "00001",
                      selectedDate ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : ""
                  );
      
                  if (responseData?.results) {
                      allData = [...allData, ...responseData.results];
                  }
                  console.log("response : ", responseData);
              }
      
              if (!allData.length) {
                  message.error("Aucune donnée à exporter !");
                  return;
              }
      
              const doc = new jsPDF();
              const logo = logoBanque;
              doc.addImage(logo, "PNG", 10, 5, 70, 14);
              doc.setFontSize(16);
              doc.text(`Liste des virements internes - Agence de Nouakchott`, 10, 25);
              if (selectedDate) {
                  doc.text("Pour le " + String(dayjs(selectedDate).format("YYYY-MM-DD")), 10, 32);
              }
      
              autoTable(doc, {
                  startY: 35,
                  head: [columns.map(col => col.title as string)],
                  body: allData.map(row =>
                      columns.map(col =>
                          "dataIndex" in col ? row[col.dataIndex as keyof VirmentResponse] : null
                      )
                  ),
                  theme: "grid",
                  headStyles: { fillColor: "#1C8244", textColor: [255, 255, 255] },
              });
      
              doc.save("virement-interne-nktt.pdf");
              message.success("Fichier PDF exporté avec succès !");
          } catch (error) {
              console.error("Erreur lors de l'exportation :", error);
              message.error("Erreur lors de l'exportation des données !");
          } finally {
              setLoading(false); 
          }
      };
      
      const [loading, setLoading] = useState(false);

      const exportToExcel = async () => {
        let allData: any[] = [];
        let page = 1;
        const totalPages = Math.ceil(data!.count / pageSize);
        setLoading(true)
        try {
      
        for (let p = page; p <= totalPages; p++) {
            const responseData = await fetchInterne(
              currentPage, "00001", selectedDate?String(dayjs(selectedDate).format("YYYY-MM-DD")) : "" );
            if (responseData?.results) {
              allData = [...allData, ...responseData.results];
            }
          } 
        
      
        if (!allData.length) {
          message.error("Aucune donnée à exporter !");
          return;
        }
        
        
        const formattedData = allData.map(row => {
          const newRow: any = {};
          columns.forEach(col => {
            if ('dataIndex' in col) {
              newRow[col.title as string] = row[col.dataIndex as keyof VirmentResponse];
            }
          });
          return newRow;
        });
        
      
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Virement");
       
        XLSX.writeFile(workbook, "Virement-interne-nouakchott.xlsx");
        message.success("Fichier Excel exporté avec succès !");
      } catch (error) {
          console.error("Erreur lors de la récupération des virement :", error);
          message.error("Erreur lors de l'exportation des données !");
          return;
        } finally{
          setLoading(false)
        }
      };

      const exportToCSV = async () => {
        let allData: any[] = [];
        let page = 1;
        const totalPages = Math.ceil(data!.count / pageSize);
        setLoading(true)
        try {
        for (let p = page; p <= totalPages; p++) {
          
            const responseData = await fetchInterne(
              currentPage, "00001", selectedDate?String(dayjs(selectedDate).format("YYYY-MM-DD")) : "" );
            if (responseData?.results) {
              allData = [...allData, ...responseData.results];
            }
          } 
        
      
        if (!allData.length) {
          message.error("Aucune donnée à exporter !");
          return;
        }
      
        const headers = columns.map(col => col.title).join(",");
        const rows = allData.map(row =>
          columns.map(col => ('dataIndex' in col ? `"${row[col.dataIndex as keyof VirmentResponse]}"` : "")).join(",")
        );
      
        const csvContent = [headers, ...rows].join("\n");
      
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "Virement-Interne-nktt.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      
        message.success("Exportation CSV réussie !");
      }catch (error) {
        console.error("Erreur lors de la récupération des Virement :", error);
        message.error("Erreur lors de l'exportation des données !");
        return;
      }finally{
        setLoading(false)
      }
      };

      const copyToClipboard = async () => {
        let allData: any[] = [];
        let page = 1;
        const totalPages = Math.ceil(data!.count / pageSize);
        setLoading(true)
        try {
        for (let p = page; p <= totalPages; p++) {
         
            const responseData = await fetchInterne(
              currentPage, "00001", selectedDate?String(dayjs(selectedDate).format("YYYY-MM-DD")) : "" );;
            if (responseData?.results) {
              allData = [...allData, ...responseData.results];
            }
          } 
        
      
        if (!allData.length) {
          message.error("Aucune donnée à copier !");
          return;
        }
      
        const headers = columns.map(col => col.title).join("\t"); 
        const rows = allData.map(row =>
          columns.map(col => ("dataIndex" in col ? row[col.dataIndex as keyof VirmentResponse] : "")).join("\t")
        );
        const textToCopy = [headers, ...rows].join("\n"); 
        try {
          await navigator.clipboard.writeText(textToCopy);
          message.success("Données copiées dans le presse-papiers !");
        } catch (error) {
          console.error("Erreur lors de la copie :", error);
          message.error("Impossible de copier les données !");
        }
     
       } catch (error) {
          console.error("Erreur lors de la récupération des virement :", error);
          message.error("Erreur lors de la copie des données !");
          return;
        } finally{
          setLoading(false)
        }
      };
   
      const itemsExportVirement: MenuProps['items'] = [
        {
          label: 'Exporter PDF',
          key: '1',
          icon: <FilePdfFilled/>,
          onClick : exportToPDF
    
        },
        {
          label: 'Exporter EXCEL',
          key: '2',
          icon: <FileExcelFilled />,
          onClick : exportToExcel
        },
        {
          label: 'Exporter CSV',
          key: '3',
          icon: <FaFileCsv />,
          onClick : exportToCSV
        },
        {
          label: 'Copier',
          key: '4',
          icon: <CopyFilled />,
          onClick : copyToClipboard
        },
      ]    

    return(
        <div className="mt-5">
  <div className="flex items-center gap-x-[13px] justify-between">
    <div className="flex flex-col">
        <span>Registred Virement</span>
        <span> {data?.count} virement interne </span>
    </div>
  <div className="flex items-center space-x-4">
  
  <Dropdown menu={{items: itemsExportVirement,
}}>
      <Button className="export-button">
        <Space>
          Export
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>

 <DatePicker
 className="w-[180px] border border-[#e7e7e7] rounded-[10px] h-[42px] "
 onChange={onChangeDate}
 placeholder="Select date operation"
 format={"dddd, DD MMMM YYYY"}
 />
 {loading && (
    <Modal open={loading} footer={null} closable={false}>
        <div style={{ textAlign: "center", padding: "20px" }}>
            <img src={logoBanque} alt="Logo Banque" width={100} />
            <Spin size="large" style={{ marginTop: 20 }} />
            <p style={{ marginTop: 10 }}>Exportation en cours...</p>
        </div>
    </Modal>
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