import { Button, CheckboxProps, DatePicker, Dropdown, Input, MenuProps, message, Modal, Space, Spin, Table, TableProps } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import {  VirementExterne, VirmentExterneResponse } from "../../../Services/types/Virement";
import { useGetVirementExterne } from "../../../Services/Virements/viremementExterne/useGetVirementExterne";
const { RangePicker } = DatePicker;
import { CopyFilled, DownOutlined, FileExcelFilled, FilePdfFilled } from '@ant-design/icons'
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import logoBanque from "../../../assets/images/image.png"
import { FaFileCsv } from "react-icons/fa";
import filterIcon from "../../../assets/images/style-stroke.svg";
import CustomCheckbox from "../../../ui/CustomCheckbox";
import { BaseUrl } from "../../../api/BaseUrl";
// import { getRowClassName } from "../../../lib/helpers";

const NouakchottExterne =() => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
  const [dates, setDates] = useState<[string | null, string | null]>([null, null]);
  const [chercherPar, setChercherPar] = useState("")
  console.log("chercherPar : ", chercherPar)

      const handleDateChange = (values: any, dateStrings: [string, string]) => {
        console.log(values)
        setDates(dateStrings);
        setCurrentPage(1)
    
      };
  console.log("date 1 : ", dates[0])
  console.log("date 2 : ", dates[1])
  const onChange: CheckboxProps["onChange"] = (e) => {
      const { value } = e.target;
    
    
      if (e.target.checked) {
        setChercherPar(value)
      }else {
        setChercherPar("")
      }
    };
    const {data, isPending} = useGetVirementExterne(currentPage, "00001", dates[0]?dates[0]! : "", dates[1]?dates[1]!:"", chercherPar, searchValue)
  console.log("searchValue : ", searchValue)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    const columns: TableProps<VirementExterne>["columns"] = [
        
        {
          title: ("Compte"),
          dataIndex: "compte_benef",
          key: "compte_benef",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record?.compte_benef}</span>
            </div>
          ),
          
        },
        {
            title: ("Beneficiaire"),
            dataIndex: "beneficiaire",
            key: "beneficiaire",
            render: (_, record) => (
              <div className="flex items-center gap-x-2">
                <span>{record?.beneficiaire}</span>
              </div>
            ),
          },
        {
          title: ("DATE Transaction"),
          dataIndex: "date_transaction",
          key: "date_transaction",
       
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record?.date_transaction?.slice(0,10)}</span>
            </div>
          ),
        },
        {
            title: ("Devise"),
            dataIndex: "devise",
            key: "devise",
           
            render: (_, record) => (
              <div className="flex items-center gap-x-2">
                <span>{record?.devise}</span>
              </div>
            ),
          },
        {
          title: ("Montant Transaction"),
        
          dataIndex: "montant_transaction",
          key: "montant_transaction",
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.montant_transaction}</span>
              </div>
            );
          },
        },
        {
          title: ("NIF"),
          dataIndex: "nif_nni",
          key: "nif_nni",
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.nif_nni}</span>
              </div>
            );
          },
        },
        
        {
          title: ("Compte Donneur d'ordre"),
          dataIndex: "compte_don",
          key: "compte_don",
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.compte_don}</span>
              </div>
            );
          },
        },

        {
          title: ("Nom Donneur D'ordre"),
          dataIndex: "nom_donneur_ordre",
          key: "nom_donneur_ordre",
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.nom_donneur_ordre}</span>
              </div>
            );
          },
        },
        
        {
          title: ("Pays"),
          dataIndex: "pays",
          key: "pays",
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.pays}</span>
              </div>
            );
          },
        },
        
        {
          title: ("Reference Transaction"),
          dataIndex: "reference_transaction",
          key: "reference_transaction",
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.reference_transaction}</span>
              </div>
            );
          },
        },
        {
          title: ("Taux Change"),
          dataIndex: "taux_change",
          key: "taux_change",
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.taux_change}</span>
              </div>
            );
          },
        },
        {
          title: ("Devise Debit"),
          dataIndex: "devisd_debit",
          key: "devisd_debit",
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.devisd_debit}</span>
              </div>
            );
          },
        },
        {
          title: ("Devise Credit"),
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
          dataIndex: "montant_debit",
          key: "montant_debit",
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.montant_debit}</span>
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
       
      const fetchExterne = async (
        page: number,
        agence:string,
        date_debut:string,
        date_fin:string
      ) => {
        
        const response = await axios.get(
          `${BaseUrl}api/virement/?&page=${page}&agence=${agence}&date_debut=${date_debut}&date_fin=${date_fin}&${chercherPar}=${searchValue}`
        );
        return response.data;
      };
      
      const exportToPDF = async () => {
        let allData: any[] = [];
        let page = 1;
        const totalPages = Math.ceil(data!.count / pageSize);
        setLoading(true); // Active le spinner
    
        try {
            for (let p = page; p <= totalPages; p++) {
                console.log("Fetching data for page: ", p);
    
                const responseData = await fetchExterne(
                    p, "00001", dates[0]?dates[0]! : "", dates[1]?dates[1]!:""
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
            doc.text(`Liste des virements externes - Agence de Nouakchott`, 10, 25);
            if (dates[0] && dates[1]) {
                doc.text("Entre  le " + dates[0]+ " et " +dates[1], 10, 32);
            }

            const selectedColumns = [
              {title:'compte', dataIndex:"compte_benef"},
              {title:'Beneficiaire', dataIndex:"beneficiaire"},
              {title:'Date', dataIndex:"date_transaction"},
              {title:'Devise', dataIndex:"devise"},
              {title:'Montant', dataIndex:"montant_transaction"},
              {title:"Compte D d'ordre", dataIndex:"compte_don"},
              {title:"Nom D d'ordre", dataIndex:"nom_donneur_ordre"},
              {title:"Reference", dataIndex:"reference_transaction"},
            ]
    
            autoTable(doc, {
                startY: 35,
                head: [selectedColumns.map(col => col.title as string)],
                body: allData.map(row =>
                  selectedColumns.map(col =>
                        "dataIndex" in col ? row[col.dataIndex as keyof VirmentExterneResponse] : null
                    )
                ),
                theme: "grid",
                headStyles: { fillColor: "#1C8244", textColor: [255, 255, 255] },
            });
    
            doc.save("virement-externe-nktt.pdf");
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
          const responseData = await fetchExterne(
            p, "00001", dates[0]?dates[0]! : "", dates[1]?dates[1]!:"");
          if (responseData?.results) {
            allData = [...allData, ...responseData.results];
          }
        } 
      
    
      if (!allData.length) {
        message.error("Aucune donnée à exporter !");
        return;
      }
      // const selectedColumns = [
      //         {title:'compte', dataIndex:"compte_benef"},
      //         {title:'Beneficiaire', dataIndex:"beneficiaire"},
      //         {title:'Date', dataIndex:"date_transaction"},
      //         {title:'Devise', dataIndex:"devise"},
      //         {title:'Montant', dataIndex:"montant_transaction"},
      //         {title:"Compte D d'ordre", dataIndex:"compte_don"},
      //         {title:"Nom D d'ordre", dataIndex:"nom_donneur_ordre"},
      //         {title:"Reference", dataIndex:"reference_transaction"},
      //       ]
      
      const formattedData = allData.map(row => {
        const newRow: any = {};
        columns.forEach(col => {
          if ('dataIndex' in col) {
            newRow[col.title as string] = row[col.dataIndex as keyof VirmentExterneResponse];
          }
        });
        return newRow;
      });
      
    
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Virement");
     
      XLSX.writeFile(workbook, "Virement-externe-nouakchott.xlsx");
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
        
          const responseData = await fetchExterne(
            currentPage, "00001", dates[0]?dates[0]! : "", dates[1]?dates[1]!:"" );
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
        columns.map(col => ('dataIndex' in col ? `"${row[col.dataIndex as keyof VirmentExterneResponse]}"` : "")).join(",")
      );
    
      const csvContent = [headers, ...rows].join("\n");
    
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "Virement-Externe-nktt.csv");
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
       
          const responseData = await fetchExterne(
            p, "00001", dates[0]?dates[0]! : "", dates[1]?dates[1]!:"");;
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
        columns.map(col => ("dataIndex" in col ? row[col.dataIndex as keyof VirmentExterneResponse] : "")).join("\t")
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
    const items: MenuProps["items"] =  [
      {
        label: <span>Filter</span>,
        key: "-1",
      },
      {
        label: (
          <CustomCheckbox
            onChange={onChange}
            label="Compte Beneficiaire"
            checked={chercherPar === "compte_benef"}
            value="compte_benef"
          />
        ),
        key: "1",
      },
      {
        label: (
          <CustomCheckbox
            onChange={onChange}
            label="Beneficiaire"
            checked={chercherPar === "beneficiaire"}

            value="beneficiaire"
          />
        ),
        key: "2",
      },
      
    ]
 
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
        <span>Virement enregistrés </span>

        <span> {data?.count } Virement externe </span>
    </div>
              <div className="flex items-center gap-3">
              <Dropdown menu={{items: itemsExportVirement,
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
{chercherPar && <Input
                value={searchValue ?? ""}
                className="custom-input !w-[189px] !h-[41px] gap-2 rounded-xl"
                prefix={<CiSearch className="" />}
                onChange={(e) => setSearchValue(e.target.value)}
                aria-label="search input"
                placeholder="Search..."
                
              />
              }
              <RangePicker className="w-[] border border-[#e7e7e7] rounded-[10px] h-[42px] "
    onChange={handleDateChange} 
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
            
              
              </div>

             
              
            </div>
            <div className="!max-w-full mt-4 md:!max-w-full overflow-x-auto">
            <Table
              loading={isPending}
              columns={columns}
              // rowClassName={(record,index)=>{
              //   return index %2 === 0 ?"custom-small-row" : ""
              // }}
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

export default NouakchottExterne
