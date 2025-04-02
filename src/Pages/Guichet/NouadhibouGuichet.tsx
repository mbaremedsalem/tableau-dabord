import { Button, CheckboxProps, DatePicker, Dropdown, Input, MenuProps, message, Modal, Skeleton, Space, Spin, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useGetGuichet } from "../../Services/Guichet/useGetGuichet";
import { Guichet, GuichetResponse } from "../../Services/types/Guiche";
import CustomCheckbox from "../../ui/CustomCheckbox";
import logoBanque from "../../assets/images/image.png"
import dayjs from "dayjs";
import "dayjs/locale/fr"
import { CopyFilled, FileExcelFilled, FilePdfFilled,DownOutlined } from '@ant-design/icons'
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import filterIcon from "../../assets/images/style-stroke.svg";
import axios from "axios";
const { RangePicker } = DatePicker;
import { FaFileCsv } from "react-icons/fa";

dayjs.locale("fr")
const NouadhibouGuichet =() => {
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [dates, setDates] = useState<[string | null, string | null]>([null, null]);
  console.log("dates : ", selectedDate)
  const [filterDate, setFilterDate] = useState("Date")
  const [rechercherPar, setRechercherPar] = useState("")

  const handleDateChange = (values: any, dateStrings: [string, string]) => {
    console.log(values)
    setDates(dateStrings);
    setSelectedDate(null)
    setCurrentPage(1)

  };
    
      const {data, isPending} = useGetGuichet(currentPage, 
        filterDate === "Date" ?  (selectedDate ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "") : (dates[0]! ? dates[0]! : ""), 
        filterDate === "Date" ?  (selectedDate ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "") : (dates[1]! ? dates[1]! : ""), 
        
        "00002", type,
        rechercherPar?rechercherPar:"", searchValue)
      const onChangeDate = (date:Date | null) => {
        setSelectedDate(date)
      }
  
  console.log("searchValue : ", searchValue)
    const columns: TableProps<Guichet>["columns"] = [
        
        {
          title: ("Type Operation"),
          dataIndex: "type_operation",
          key: "type_operation",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record?.type_operation === "+" ? "" : record?.type_operation}</span>
            </div>
          ),
          filteredValue:[searchValue],
          // onFilter:(_, record)=>{
          //   return (
          //     record?.type_operation?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          //     record?.date_transaction?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          //     record?.Compte_Don?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          //     record?.Compte_benef?.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
          //     record?.montant_credit?.toString().includes(searchValue.toLocaleLowerCase()) ||
          //     record?.montant_debeit?.toString().includes(searchValue.toLocaleLowerCase()) 

              
          //   )
          // },
    
        
        },
        {
          title: ("Date Transaction"),
          dataIndex: "Date Transacation",
          key: "date_transaction",
        
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record?.date_transaction?.slice(0,10)}</span>
            </div>
          ),
        },
        {
          title: ("Compte Donneur d'ordre"),
          dataIndex: "Compte_Don",
          key: "Compte_Don",
       
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record?.Compte_Don}</span>
            </div>
          ),
        },
        {
            title: ("Compte Beneficiaire"),
            dataIndex: "Compte_benef",
            key: "Compte_benef",
           
            render: (_, record) => (
              <div className="flex items-center gap-x-2">
                <span>{record?.Compte_benef}</span>
              </div>
            ),
          },
        {
          title: ("Devise Debit"),
          dataIndex: "devise_debit",
          key: "devise_debit",
       
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record?.devise_debit}</span>
            </div>
          ),
        },
        {
          title: ("Devise Credit "),
          dataIndex: "devise_credit",
          key: "devise_credit",
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.devise_credit}</span>
              </div>
            );
          },
        },
        {
          title: ("Montant Debit"),
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
       
        {
          title: ("Montant Credit"),
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
      console.log("rechercherPar : ", rechercherPar)

  const onChange: CheckboxProps["onChange"] = (e) => {
    const { value } = e.target;
  
  
    if (e.target.checked) {
      if (value === "Date" || value === "deuxdate") {
        setFilterDate(value);
        // setRechercherPar(""); 
      } else {
        setRechercherPar(value);
        // setFilterDate(""); 
      }
      setCurrentPage(1);
      setSelectedDate(null);
    } else {
      // If the checkbox is unchecked
      if (value === "Date" || value === "deuxdate") {
        setFilterDate(""); 
      } else {
        setRechercherPar(""); 
      }
      setCurrentPage(1);
      setSelectedDate(null); 
    }
  };
      const items: MenuProps["items"] =  [
        {
          label: <span>Filter</span>,
          key: "-1",
        },
        {
          label: (
            <CustomCheckbox
              onChange={onChange}
              label="Date"
              checked={filterDate === "Date"}
              value="Date"
            />
          ),
          key: "1",
        },
        {
          label: (
            <CustomCheckbox
              onChange={onChange}
              label="Enter deux date"
              checked={filterDate === "deuxdate"}

              value="deuxdate"
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
              label="Type Operation"
              checked={rechercherPar === "type_operation"}

              value="type_operation"
            />
          ),
          key: "3",
        },
        // {
        //   label: (
        //     <CustomCheckbox
        //       onChange={onChange}
        //       label="Nom Lib"
        //       checked={rechercherPar === "nomlib"}

        //       value="nomlib"
        //     />
        //   ),
        //   key: "4",
        // },
        {
          label: (
            <CustomCheckbox
              onChange={onChange}
              label="Compte beneficaire"
              checked={rechercherPar === "Compte_benef"}

              value="Compte_benef"
            />
          ),
          key: "5",
        },
      ]
      console.log(" selectedDate : ", dayjs(selectedDate).format("YYYY-MM-DD"))
      const fetchGuichet = async (
        page: number,
        // size: number,
        start_date: string,
        end_date: string,
        agence: string,
        type_operation:string
      ) => {
        
        const response = await axios.get(
          `http://127.0.0.1:8000/api/guichet/?agence=${agence}&page=${page}&start_date=${start_date}&end_date=${end_date}&type_operation=${type_operation}&${rechercherPar}=${searchValue}`,

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
              console.log("Fetching data for page: ", p);
           
            const responseData = await fetchGuichet(
              p, 
        filterDate === "Date" ?  (selectedDate ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "") : (dates[0]! ? dates[0]! : ""), 
        filterDate === "Date" ?  (selectedDate ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "") : (dates[1]! ? dates[1]! : ""), 
        
        "00002", type);
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
        const logo = logoBanque; 
        doc.addImage(logo, "PNG", 10, 5, 70, 14);

      // doc.addImage(logo, "PNG", 10, 5, 14.4, 12.4); 
      doc.setFontSize(16);
        // doc.text("Banque Algerienne", 30, 15);
        doc.text("List de Guichet - Agence Nouadhibou", 10, 25);
        if (dates[0] && dates[1]) {
          doc.text("Entre  le " + dates[0]+ " et " +dates[1], 10, 32);
      } if (selectedDate) {
        doc.text("de  " + String(dayjs(selectedDate).format("YYYY-MM-DD")), 10, 32);
    }
        autoTable(doc, {
          startY: 35,
          head: [columns.map(col => col.title as string)],
        
          body: allData.map(row =>
            columns.map(col => 
              'dataIndex' in col ? row[col.dataIndex as keyof GuichetResponse] : null
            )
          ),
          theme: "grid", 
     
      headStyles: { fillColor: "#1C8244", textColor: [255, 255, 255] }, 
     
        });
      
        doc.save("Guichet-ndb.pdf");
        message.success("Fichier PDF exporté avec succès !");
       } catch (error) {
          console.error("Erreur lors de la récupération des guichet :", error);
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
            const responseData = await fetchGuichet(
              p, 
        filterDate === "Date" ?  (selectedDate ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "") : (dates[0]! ? dates[0]! : ""), 
        filterDate === "Date" ?  (selectedDate ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "") : (dates[1]! ? dates[1]! : ""), 
        
        "00002", type);
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
              newRow[col.title as string] = row[col.dataIndex as keyof GuichetResponse];
            }
          });
          return newRow;
        });
        
      
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Guichet");
       
        XLSX.writeFile(workbook, "Guichet-ndb.xlsx");
        message.success("Fichier Excel exporté avec succès !");
      }catch (error) {
        console.error("Erreur lors de la récupération des guichet :", error);
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

            const responseData = await fetchGuichet(
              p, 
              filterDate === "Date" ?  (selectedDate ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "") : (dates[0]! ? dates[0]! : ""), 
              filterDate === "Date" ?  (selectedDate ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "") : (dates[1]! ? dates[1]! : ""), 
              
              "00002", type );
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
          columns.map(col => ('dataIndex' in col ? `"${row[col.dataIndex as keyof GuichetResponse]}"` : "")).join(",")
        );
      
        const csvContent = [headers, ...rows].join("\n");
      
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "Guichet-ndb.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      
        message.success("Exportation CSV réussie !");
      }catch (error) {
        console.error("Erreur lors de la récupération des Guichet :", error);
        message.error("Erreur lors de l'exportation des données !");
        return;
      } finally{
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
            const responseData = await fetchGuichet(
              p, 
              filterDate === "Date" ?  (selectedDate ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "") : (dates[0]! ? dates[0]! : ""), 
              filterDate === "Date" ?  (selectedDate ? String(dayjs(selectedDate).format("YYYY-MM-DD")) : "") : (dates[1]! ? dates[1]! : ""), 
              
              "00002", type);
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
          columns.map(col => ("dataIndex" in col ? row[col.dataIndex as keyof GuichetResponse] : "")).join("\t")
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
        console.error("Erreur lors de la récupération des Guichet :", error);
        message.error("Erreur lors de la copie des données !");
        return;
      } finally{
        setLoading(false)
      }};
   
      const itemsExportGuichet: MenuProps['items'] = [
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
        <span>Registred Guichet</span>
        <span> {data?.count} </span>
    </div>
    
    <div className="flex items-center space-x-4">
    {loading && (
    <Modal open={loading} footer={null} closable={false}>
        <div style={{ textAlign: "center", padding: "20px" }}>
            <img src={logoBanque} alt="Logo Banque" width={100} />
            <Spin size="large" style={{ marginTop: 20 }} />
            <p style={{ marginTop: 10 }}>Exportation en cours...</p>
        </div>
    </Modal>
)}
    <Dropdown menu={{items: itemsExportGuichet,
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
      {filterDate === "deuxdate" && (
    <RangePicker className="w-[] border border-[#e7e7e7] rounded-[10px] h-[42px] "
    onChange={handleDateChange} />

      )}
  {filterDate === "Date" && (
 <DatePicker
//  locale={dayjs.locale("fr")}
 className="w-[173px] border border-[#e7e7e7] rounded-[10px] h-[42px] "
//  value={selectedDate}
//  onChange={onChangeDate}
 onChange={onChangeDate}
 format={"dddd, DD MMMM YYYY"}
 />
  )}
     
{rechercherPar && <Input
   value={searchValue ?? ""}
   className="custom-input !w-[189px] !h-[41px] gap-2 rounded-xl"
   prefix={<CiSearch className="" />}
   onChange={(e) => setSearchValue(e.target.value)}
   aria-label="search input"
   placeholder="Search..."
   
 />}
  
</div>
              {/* <FilterDropdown
                valueSearch={"users"}
                filtersUsers={filtersusers}
                handleCheckboxChange={handleCheckboxChange}
              /> */}

             
              
            </div>
            <div className="!max-w-full mt-4 md:!max-w-full overflow-x-auto">
            {/* <Table
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
            /> */}
            {isPending? (
                <Skeleton active paragraph={{rows:18}}/>
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


export default NouadhibouGuichet

