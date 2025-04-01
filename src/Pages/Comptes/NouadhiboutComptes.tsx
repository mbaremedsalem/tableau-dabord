import { Button, CheckboxProps, DatePicker, Dropdown, Input, MenuProps, message, Skeleton, Space, Table, TableProps } from "antd";
import { Compte, CompteResponse } from "../../Services/types/Compte";
import {  useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useGetComptes } from "../../Services/comptes/useGetComptes";
import CustomCheckbox from "../../ui/CustomCheckbox";
import filterIcon from "../../assets/images/style-stroke.svg";
import dayjs from "dayjs";
import logo1 from "../../assets/images/AUB.png"
import { FaFileCsv } from "react-icons/fa";
import { CopyFilled, DownOutlined, FileExcelFilled, FilePdfFilled } from '@ant-design/icons'
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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
              <span>{record?.CLIENT}</span>
            </div>
          ),
          // filteredValue:[searchValue],
          // onFilter:(_, record)=>{
          //   return (
          //     record?.CLIENT?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          //     record?.COMPTE?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          //     record?.NOM?.toLowerCase().includes(searchValue.toLocaleLowerCase()) || 
          //     record?.NCG?.toLowerCase().includes(searchValue.toLocaleLowerCase()) || 
          //     record?.TYP?.toLowerCase().includes(searchValue.toLocaleLowerCase()) || 
          //     record?.DATOUV?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          //     record?.DATFRM?.toLowerCase().includes(searchValue.toLocaleLowerCase()) || 
          //     record?.POSDEV?.toString().includes(searchValue.toLocaleLowerCase()) || 
          //     record?.DATVAL?.toLowerCase().includes(searchValue.toLocaleLowerCase()) 
              
          //   )
          // },
          
        },
        {
          title: ("COMPTE"),
          dataIndex: "COMPTE",
          key: "COMPTE",
       
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record?.COMPTE}</span>
            </div>
          ),
        },
        {
          title: ("NOM"),
          dataIndex: "NOM",
          key: "NOM",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record?.NOM}</span>
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
                <span>{record?.NCG}</span>
              </div>
            ),
          },
        {
          title: ("TYPE"),
          dataIndex: "TYP",
          key: "TYP",
        
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record?.TYP}</span>
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
  const [rechercherPar, setRechercherPar] = useState("")
 console.log("filter date : ", filterDate)
 console.log("rechercherPar : ", rechercherPar)
 const ExistRechercher = rechercherPar ? rechercherPar : ""
  const [selectedDate, setSelectedDate] = useState<Date | null>();
      const {data, isPending} = useGetComptes(currentPage, "00002", typeC,(filterDate=== "Dateo" && selectedDate) ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "",  
    (  filterDate=== "Datef" && selectedDate) ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "", ExistRechercher, searchValue)
      console.log("data : ", data)
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  console.log("|selectedDate : ", String(dayjs(selectedDate).format("YYYY-MM-DD")))
// Handle checkbox change for filterDate and rechercherPar
const onChange: CheckboxProps["onChange"] = (e) => {
  const { value } = e.target;


  // If the checkbox is checked
  if (e.target.checked) {
    if (value === "Dateo" || value === "Datef") {
      setFilterDate(value);
      // setRechercherPar(""); // Reset search filter when changing date filter
    } else {
      setRechercherPar(value);
      // setFilterDate(""); // Reset date filter when changing search filter
    }
    setCurrentPage(1);
    setSelectedDate(null); // Reset selected date when changing filter
  } else {
    // If the checkbox is unchecked
    if (value === "Dateo" || value === "Datef") {
      setFilterDate(""); // Reset date filter
    } else {
      setRechercherPar(""); // Reset search filter
    }
    setCurrentPage(1);
    setSelectedDate(null); // Reset selected date when clearing filter
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
        {
          label: <span>Rechercher Par</span>,
          key: "-2",
        },
        {
          label: (
            <CustomCheckbox
              onChange={onChange}
              label="Client"
              checked={rechercherPar === "client"}

              value="client"
            />
          ),
          key: "3",
        },
        {
          label: (
            <CustomCheckbox
              onChange={onChange}
              label="Compte"
              checked={rechercherPar === "compte"}

              value="compte"
            />
          ),
          key: "4",
        },
        {
          label: (
            <CustomCheckbox
              onChange={onChange}
              label="Type"
              checked={rechercherPar === "libelle"}

              value="libelle"
            />
          ),
          key: "4",
        },
      ]

      const fetchComptes = async (
        page: number,
        agence : string,
        type : string,
        dateouverture:string,
        datefermeture:string
      ) => {
        
        const response = await axios.get(
          `http://127.0.0.1:8000/api/compte_filter/?&page=${page}&agence=${agence}&libelle=${type}&datouv=${dateouverture}&datfrm=${datefermeture}&${ExistRechercher}=${searchValue}` 
        );
        return response.data;
      };
      
      const exportToPDF = async () => {
        let allData: any[] = [];
        let page = 1;
        const totalPages = Math.ceil(data!.count / pageSize);
      
        for (let p = page; p <= totalPages; p++) {
          console.log("Fetching data for page: ", p);
      
          try {
           
            const responseData = await fetchComptes(
              p,
              "00002", typeC,(filterDate=== "Dateo" && selectedDate) ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "",  
    (  filterDate=== "Datef" && selectedDate) ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : ""
            
            );
            if (responseData?.results) {
              allData = [...allData, ...responseData.results];
            }
      console.log("response : ", responseData)
    
          } catch (error) {
            console.error("Erreur lors de la récupération des comptes :", error);
            message.error("Erreur lors de l'exportation des données !");
            return;
          }
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
        doc.text("List des Comptes", 10, 25);
      
        autoTable(doc, {
          startY: 30,
          head: [columns.map(col => col.title as string)],
        
          body: allData.map(row =>
            columns.map(col => 
              'dataIndex' in col ? row[col.dataIndex as keyof CompteResponse] : null
            )
          ),
          theme: "grid", 
     
      headStyles: { fillColor: "#1C8244", textColor: [255, 255, 255] }, 
     
        });
      
        doc.save("comptes.pdf");
        message.success("Fichier PDF exporté avec succès !");
      };


      const exportToExcel = async () => {
        let allData: any[] = [];
        let page = 1;
        const totalPages = Math.ceil(data!.count / pageSize);
      
        for (let p = page; p <= totalPages; p++) {
          try {
            const responseData = await fetchComptes(
              p,
              "00002", typeC,(filterDate=== "Dateo" && selectedDate) ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "",  
    (  filterDate=== "Datef" && selectedDate) ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : ""
            
            );
            if (responseData?.results) {
              allData = [...allData, ...responseData.results];
            }
          } catch (error) {
            console.error("Erreur lors de la récupération des comptes :", error);
            message.error("Erreur lors de l'exportation des données !");
            return;
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
              newRow[col.title as string] = row[col.dataIndex as keyof CompteResponse];
            }
          });
          return newRow;
        });
        
      
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Comptes");
       
        XLSX.writeFile(workbook, "Comptes.xlsx");
        message.success("Fichier Excel exporté avec succès !");
      };

      const exportToCSV = async () => {
        let allData: any[] = [];
        let page = 1;
        const totalPages = Math.ceil(data!.count / pageSize);
      
        for (let p = page; p <= totalPages; p++) {
          try {
            const responseData = await fetchComptes(
              p,
              "00002", typeC,(filterDate=== "Dateo" && selectedDate) ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "",  
    (  filterDate=== "Datef" && selectedDate) ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : ""
            
             );
            if (responseData?.results) {
              allData = [...allData, ...responseData.results];
            }
          } catch (error) {
            console.error("Erreur lors de la récupération des Comptes :", error);
            message.error("Erreur lors de l'exportation des données !");
            return;
          }
        }
      
        if (!allData.length) {
          message.error("Aucune donnée à exporter !");
          return;
        }
      
        const headers = columns.map(col => col.title).join(",");
        const rows = allData.map(row =>
          columns.map(col => ('dataIndex' in col ? `"${row[col.dataIndex as keyof CompteResponse]}"` : "")).join(",")
        );
      
        const csvContent = [headers, ...rows].join("\n");
      
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "Comptes.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      
        message.success("Exportation CSV réussie !");
      };

      const copyToClipboard = async () => {
        let allData: any[] = [];
        let page = 1;
        const totalPages = Math.ceil(data!.count / pageSize);
      
        for (let p = page; p <= totalPages; p++) {
          try {
            const responseData = await fetchComptes(
              p,
              "00002", typeC,(filterDate=== "Dateo" && selectedDate) ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "",  
    (  filterDate=== "Datef" && selectedDate) ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : ""
            
            
            );
            if (responseData?.results) {
              allData = [...allData, ...responseData.results];
            }
          } catch (error) {
            console.error("Erreur lors de la récupération des comptes :", error);
            message.error("Erreur lors de la copie des données !");
            return;
          }
        }
      
        if (!allData.length) {
          message.error("Aucune donnée à copier !");
          return;
        }
      
        const headers = columns.map(col => col.title).join("\t"); 
        const rows = allData.map(row =>
          columns.map(col => ("dataIndex" in col ? row[col.dataIndex as keyof CompteResponse] : "")).join("\t")
        );
        const textToCopy = [headers, ...rows].join("\n"); 
        try {
          await navigator.clipboard.writeText(textToCopy);
          message.success("Données copiées dans le presse-papiers !");
        } catch (error) {
          console.error("Erreur lors de la copie :", error);
          message.error("Impossible de copier les données !");
        }
      };
   
      const itemsExportComptes: MenuProps['items'] = [
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


      if(isPending){
        <Skeleton active />;
      }
    return(
        <div className="mt-5">
  <div className="flex items-center gap-x-[13px] justify-between">
    <div className="flex flex-col">
        <span>Registred Comptes</span>
        <span> {data?.count} </span>
    </div>
             <div className="flex items-center justify-center space-x-3">
             <Dropdown menu={{items: itemsExportComptes,
}}>
      <Button className="export-button">
        <Space>
          Export
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
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
              {isPending? (
                <Skeleton active paragraph={{rows:10}}/>
              ) : <Table
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
            }
            
          </div>
        </div>
    )
}

export default NouadhibouComptes