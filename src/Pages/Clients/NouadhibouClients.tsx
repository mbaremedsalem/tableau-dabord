import { Button, CheckboxProps, Dropdown, Input, MenuProps, message, Modal, Space, Spin, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useGetClients } from "../../Services/Clients/useGetClients";
import { Client, ClientResponse } from "../../Services/types/Client";
import CustomCheckbox from "../../ui/CustomCheckbox";
import filterIcon from "../../assets/images/style-stroke.svg";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import logo1 from "../../assets/images/AUB.png"
import { FaFileCsv } from "react-icons/fa";
import { CopyFilled, DownOutlined, FileExcelFilled, FilePdfFilled } from '@ant-design/icons'
import logoBanque from "../../assets/images/image.png"

const NouadhibouClients =() => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(14);
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
   const [type, setType] = useState("")
useEffect(()=>{
  const params = new URLSearchParams(window.location.search)
  const codeParam = params.get("type")
  if(codeParam){
    setType(codeParam)
  }
}, [])



    const columns: TableProps<Client>["columns"] = [
        {
          title: ("CLIENT"),
          dataIndex: "CLIENT",
          key: "client",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record?.CLIENT}</span>
            </div>
          ),
          
        },
        {
          title: ("AGENCE"),
          dataIndex: "AGENCE",
          key: "AGENCE",
       
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record?.AGENCE}</span>
            </div>
          ),
        },
        {
          title: ("NOM"),
          dataIndex: "NOM",
          key: "NOM",
          filteredValue:[searchValue],
          // onFilter:(_, record)=>{
          //   return (
          //     record?.NOM?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          //     record?.AGENCE?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          //     record?.CLIENT?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          //     record?.DATFRM?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          //     record?.DATOUV?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          //     record?.TYPE?.toLowerCase().includes(searchValue.toLocaleLowerCase()) 

              
          //   )
          // },
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record?.NOM}</span>
            </div>
          ),
        },
        {
            title: ("DATE OUVERTURE"),
            dataIndex: "DATOUV",
            key: "DATOUV",
            
            render: (_, record) => (
              <div className="flex items-center gap-x-2">
                <span>{record?.DATOUV?.slice(0,10)}</span>
              </div>
            ),
          },
        {
          title: ("DATE FERMETURE"),
          dataIndex: "DATFRM",
          key: "DATFRM",
       
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record?.DATFRM}</span>
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
   
      
      
     
     
      
      
      const [Filtertype, setFiltertype] = useState("")
      const [FilterPar, setFilterPar] = useState("")
      const onChange: CheckboxProps["onChange"] = (e) => {
              const { value } = e.target;
          
              if (e.target.checked) {
                setFiltertype(value)
                setCurrentPage(1)
                const params = new URLSearchParams(window.location.search);
    params.set("type", value);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);

                // setSelectedDate(null)
              } else {
                setFiltertype("")
                setCurrentPage(1)
                const params = new URLSearchParams(window.location.search);
                params.delete("type"); 
                window.history.replaceState(null, "", `${window.location.pathname}${params.toString() ? "?" + params.toString() : ""}`);
                // setSelectedDate(null)
      
      
              }
            };

            const onChangeFilterPar: CheckboxProps["onChange"] = (e) => {
              const { value } = e.target;
          
              if (e.target.checked) {
                setFilterPar(value)
                setCurrentPage(1)
    
              } else {
                setFilterPar("")
                setCurrentPage(1)
              
      
      
              }
            };
      
      const {data, isPending} = useGetClients(currentPage, "00002", Filtertype?Filtertype:type,FilterPar, searchValue)

            
      const fetchClients = async (
        page: number,
        agence : string,
        type: string,
        FilterPar:string,
        search:string
      ) => {
        const params = new URLSearchParams()
        if(agence) params.append("agence", agence)
        if(type) params.append("type", type)
        params.append("page", page.toString())
        const response = await axios.get(
          `http://127.0.0.1:8000/api/client/?page=${page}&agence=${agence}&type=${type}` +
            `${FilterPar === "client" ? `&client=${search}` : ""}` +
            `${FilterPar === "nom" ? `&nom=${search}` : ""}`
        );
        return response.data;
      };
      const [loading, setLoading] = useState(false);

      
      const exportToPDF = async () => {
        let allData: any[] = [];
        let page = 1;
        const totalPages = Math.ceil(data!.count / pageSize);
        setLoading(true)
        
          try {
            for (let p = page; p <= totalPages; p++) {
          
            const responseData = await fetchClients(
              p,
             "00002", Filtertype?Filtertype:type, FilterPar,searchValue
            
            );
            if (responseData?.results) {
              allData = [...allData, ...responseData.results];
            }
      console.log("response : ", responseData)
    
          } 
        
        if (!allData.length) {
          message.error("Aucune donnée à exporter !");
          return;
        }
      
        const doc = new jsPDF();
        const logo = logo1; 
      doc.addImage(logo, "PNG", 10, 5, 14.4, 12.4); 
      doc.setFontSize(16);
        doc.text("Banque Algerienne", 30, 15);
        doc.text("List des Clients", 10, 25);
      
        autoTable(doc, {
          startY: 30,
          head: [columns.map(col => col.title as string)],
        
          body: allData.map(row =>
            columns.map(col => 
              'dataIndex' in col ? row[col.dataIndex as keyof ClientResponse] : null
            )
          ),
          theme: "grid", 
     
      headStyles: { fillColor: "#1C8244", textColor: [255, 255, 255] }, 
     
        });
      
        doc.save("clients.pdf");
        message.success("Fichier PDF exporté avec succès !");
      }catch (error) {
        console.error("Erreur lors de la récupération des clients :", error);
        message.error("Erreur lors de l'exportation des données !");
        return;
      } finally{
        setLoading(false)
      }
      };


      const exportToExcel = async () => {
        let allData: any[] = [];
        let page = 1;
        const totalPages = Math.ceil(data!.count / pageSize);
       setLoading(true)
          try {
        for (let p = page; p <= totalPages; p++) {

            const responseData = await fetchClients(
              p,
             "00002", Filtertype?Filtertype:type, FilterPar,searchValue
            
            );
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
              newRow[col.title as string] = row[col.dataIndex as keyof ClientResponse];
            }
          });
          return newRow;
        });
        
      
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
       
        XLSX.writeFile(workbook, "clients.xlsx");
        message.success("Fichier Excel exporté avec succès !");
       } catch (error) {
          console.error("Erreur lors de la récupération des clients :", error);
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

            const responseData = await fetchClients(
              p,
             "00002", Filtertype?Filtertype:type, FilterPar,searchValue
            
            );
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
          columns.map(col => ('dataIndex' in col ? `"${row[col.dataIndex as keyof ClientResponse]}"` : "")).join(",")
        );
      
        const csvContent = [headers, ...rows].join("\n");
      
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "clients.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      
        message.success("Exportation CSV réussie !");
      }catch (error) {
        console.error("Erreur lors de la récupération des clients :", error);
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

            const responseData = await fetchClients(
              p,
             "00002", Filtertype?Filtertype:type, FilterPar,searchValue
            
            );
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
          columns.map(col => ("dataIndex" in col ? row[col.dataIndex as keyof ClientResponse] : "")).join("\t")
        );
        const textToCopy = [headers, ...rows].join("\n"); 
        try {
          await navigator.clipboard.writeText(textToCopy);
          message.success("Données copiées dans le presse-papiers !");
        } catch (error) {
          console.error("Erreur lors de la copie :", error);
          message.error("Impossible de copier les données !");
        }
      }catch (error) {
        console.error("Erreur lors de la récupération des clients :", error);
        message.error("Erreur lors de la copie des données !");
        return;
      }finally{
        setLoading(false)
      }
      };
   
      const itemsExportClient: MenuProps['items'] = [
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



      
      
      
      const items: MenuProps["items"] =  [
        {
          label: <span>Filter Type Client</span>,
          key: "-1",
        },

        {
          label: (
            <CustomCheckbox
              onChange={onChange}
              label="PARTICULIERS"
              checked={Filtertype === "PARTICULIERS"}
              value="PARTICULIERS"
            />
          ),
          key: "1",
        },
        {
          label: (
            <CustomCheckbox
              onChange={onChange}
              label="SOCIETES PRIVEES"
              checked={Filtertype === "SOCIETES PRIVEES"}
              value="SOCIETES PRIVEES"
            />
          ),
          key: "2",
        },
        {
          label: (
            <CustomCheckbox
              onChange={onChange}
              label="Institutions Etatiques "
              checked={Filtertype === "Institutions Etatiques "}
              value="Institutions Etatiques "
            />
          ),
          key: "3",
        },
        {
          label: (
            <CustomCheckbox
              onChange={onChange}
              label="ENTREPRISES INDIVIDUELLES"
              checked={Filtertype === "ENTREPRISES INDIVIDUELLES"}
              value="ENTREPRISES INDIVIDUELLES"
            />
          ),
          key: "4",
        },
        {
          label: (
            <CustomCheckbox
              onChange={onChange}
              label="ADMINISTRATIONS PUBL. ET CENT."
              checked={Filtertype === "ADMINISTRATIONS PUBL. ET CENT."}
              value="ADMINISTRATIONS PUBL. ET CENT."
            />
          ),
          key: "5",
        },
        {
          label: <span>Filter Par</span>,
          key: "-2",
        },
        {
          label: (
            <CustomCheckbox
              onChange={onChangeFilterPar}
              label="nom"
              checked={FilterPar === "nom"}
              value="nom"
            />
          ),
          key: "11",
        },
        {
          label: (
            <CustomCheckbox
              onChange={onChangeFilterPar}
              label="client"
              checked={FilterPar === "client"}
              value="client"
            />
          ),
          key: "12",
        },
      ]

  const [isMenuOpen, setIsMenuOpen] = useState(false);

 
    return(
        <div className="mt-5">
  <div className="flex items-center gap-x-[13px] justify-between">
    <div className="flex flex-col">
        <span>Registred Clients</span>
        <span> {data?.count} </span>
    </div>
             <div className="flex items-center space-x-2">
             <Dropdown menu={{items: itemsExportClient,
}}>
      <Button className="export-button">
        <Space>
          Export
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
    {(FilterPar=== "client" || FilterPar === "nom") && 
             <Input
                value={searchValue ?? ""}
                className="custom-input !w-[189px] !h-[41px] gap-2 rounded-xl"
                prefix={<CiSearch className="" />}
                onChange={(e) => setSearchValue(e.target.value)}
                aria-label="search input"
                placeholder="Search..."
              
              />
    }
      
               
               {loading && (
    <Modal open={loading} footer={null} closable={false}>
        <div style={{ textAlign: "center", padding: "20px" }}>
            <img src={logoBanque} alt="Logo Banque" width={100} />
            <Spin size="large" style={{ marginTop: 20 }} />
            <p style={{ marginTop: 10 }}>Exportation en cours...</p>
        </div>
    </Modal>
)}
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

export default NouadhibouClients

