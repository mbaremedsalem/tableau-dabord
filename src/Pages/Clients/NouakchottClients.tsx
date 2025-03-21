import { CheckboxProps, Dropdown, Input, MenuProps, message, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useGetClients } from "../../Services/Clients/useGetClients";
import { Client } from "../../Services/types/Client";
import CustomCheckbox from "../../ui/CustomCheckbox";
import filterIcon from "../../assets/images/style-stroke.svg";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
const NouakchottClients =() => {
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



// Fonction pour exporter en Excel




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
          // onFilter: (_, record) => {
          //   return record?.CLIENT?.toLowerCase().includes(searchValue.toLowerCase());
          // },
          
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
   
      
      
      // Fonction pour exporter en PDF
     
      
      
      const [Filtertype, setFiltertype] = useState("")
      const [FilterPar, setFilterPar] = useState("")
console.log("type est : ", type)
console.log("Filtertype est : ", Filtertype)
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
    //             const params = new URLSearchParams(window.location.search);
    // params.set("type", value);
    // window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);

                // setSelectedDate(null)
              } else {
                setFilterPar("")
                setCurrentPage(1)
                // const params = new URLSearchParams(window.location.search);
                // params.delete("type"); 
                // window.history.replaceState(null, "", `${window.location.pathname}${params.toString() ? "?" + params.toString() : ""}`);
                // setSelectedDate(null)
      
      
              }
            };
            console.log("FilterPar : ", FilterPar)
            // const exits = FilterPar === "Cli"
      
      const {data, isPending} = useGetClients(currentPage, "00001", Filtertype?Filtertype:type,FilterPar, searchValue)

      
      const fetchClients = async (page: number, agency: string, type?: string) => {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/client/?page=${page}&pageSize=14&agence=${agency}${type ? `&type=${type}` : ""}`
        );
        // if (!response.ok) {
        //   throw new Error("Erreur lors de la récupération des clients");
        // }
        return response.data;
      };
      const exportToPDF = async () => {
        let allData: any[] = [];
        let page = 1;
        const totalPages = Math.ceil(data!.count / pageSize);
      
        for (let p = page; p <= totalPages; p++) {
          console.log("Fetching data for page: ", p);
      
          try {
            const responseData = await fetchClients(p, "00001", Filtertype ? Filtertype : type);
            if (responseData?.results) {
              allData = [...allData, ...responseData.results];
            }
      console.log("response : ", responseData)

          } catch (error) {
            console.error("Erreur lors de la récupération des clients :", error);
            message.error("Erreur lors de l'exportation des données !");
            return;
          }
        }
        if (!allData.length) {
          message.error("Aucune donnée à exporter !");
          return;
        }
      
        const doc = new jsPDF();
        doc.text("Liste des Clients", 14, 10);
      
        autoTable(doc, {
          head: [columns.map(col => col.title as string)],
          // body: allData.map(row => columns.map(col => row[col.dataIndex as keyof Client])),
          body: allData.map(row =>
            columns.map(col => 
              'dataIndex' in col ? row[col.dataIndex as keyof Client] : null
            )
          ),
        });
      
        doc.save("clients.pdf");
      };
      
      const exportToExcel = async () => {
        let allData: any[] = [];
        let page = 1;
        const totalPages = Math.ceil(data!.count / pageSize);
      
        for (let p = page; p <= totalPages; p++) {
          try {
            const responseData = await fetchClients(p, "00001", Filtertype ? Filtertype : type);
            if (responseData?.results) {
              allData = [...allData, ...responseData.results];
            }
          } catch (error) {
            console.error("Erreur lors de la récupération des clients :", error);
            message.error("Erreur lors de l'exportation des données !");
            return;
          }
        }
      
        if (!allData.length) {
          message.error("Aucune donnée à exporter !");
          return;
        }
      
        const worksheet = XLSX.utils.json_to_sheet(allData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
      
        XLSX.writeFile(workbook, "clients.xlsx");
      };
      
      
      
      
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
              label="PERSONNEL BANQUE"
              checked={Filtertype === "PERSONNEL BANQUE"}
              value="PERSONNEL BANQUE"
            />
          ),
          key: "2",
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
          key: "3",
        },
        {
          label: (
            <CustomCheckbox
              onChange={onChange}
              label="SOCIETES ASSURANCES"
              checked={Filtertype === "SOCIETES ASSURANCES"}
              value="SOCIETES ASSURANCES"
            />
          ),
          key: "4",
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
          key: "5",
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
          key: "6",
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
             <Input
                value={searchValue ?? ""}
                className="custom-input !w-[189px] !h-[41px] gap-2 rounded-xl"
                prefix={<CiSearch className="" />}
                onChange={(e) => setSearchValue(e.target.value)}
                aria-label="search input"
                placeholder="Search..."
              
              />
            
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
             <div className="flex gap-2 mt-4">
  <button
    className="bg-green-500 text-white px-4 py-2 rounded"
    onClick={exportToExcel}
  >
    Exporter Excel
  </button>
  <button
    className="bg-red-500 text-white px-4 py-2 rounded"
    onClick={exportToPDF}
  >
    Exporter PDF
  </button>
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

export default NouakchottClients