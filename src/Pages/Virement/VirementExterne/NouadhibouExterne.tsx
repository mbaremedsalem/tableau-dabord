import { DatePicker, Input, Table, TableProps } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import {  VirementExterne } from "../../../Services/types/Virement";
import { useGetVirementExterne } from "../../../Services/Virements/viremementExterne/useGetVirementExterne";
const { RangePicker } = DatePicker;



const NouadhibouExterne =() => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
  const [dates, setDates] = useState<[string | null, string | null]>([null, null]);

      const handleDateChange = (values: any, dateStrings: [string, string]) => {
        console.log(values)
        setDates(dateStrings);
        setCurrentPage(1)
    
      };
  console.log("date 1 : ", dates[0])
  console.log("date 2 : ", dates[1])
    const {data, isPending} = useGetVirementExterne(currentPage, "00002", dates[0]?dates[0]! : "", dates[1]?dates[1]!:"")
  console.log("searchValue : ", searchValue)
    const columns: TableProps<VirementExterne>["columns"] = [
        
        {
          title: ("Compte"),
          dataIndex: "compte_benef",
          key: "compte_benef",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.compte_benef}</span>
            </div>
          ),
        },
        {
            title: ("Beneficiaire"),
            dataIndex: "beneficiaire",
            key: "beneficiaire",
            render: (_, record) => (
              <div className="flex items-center gap-x-2">
                <span>{record.beneficiaire}</span>
              </div>
            ),
          },
        {
          title: ("DATE Transaction"),
          dataIndex: "date_transaction",
          key: "date_transaction",
       
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.date_transaction.slice(0,10)}</span>
            </div>
          ),
        },
        {
            title: ("Devise"),
            dataIndex: "devise",
            key: "devise",
           
            render: (_, record) => (
              <div className="flex items-center gap-x-2">
                <span>{record.devise}</span>
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
        // {
        //   title: ("produit"),
        //   dataIndex: "produit",
        //   key: "produit",
        //   render: (_, record) => {
        //     return (
        //       <div className="flex flex-col gap-y-1">
        //         <span>{record?.produit}</span>
        //       </div>
        //     );
        //   },
        // },
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
  
    return(
        <div className="mt-5">
  <div className="flex items-center gap-x-[13px] justify-between">
    <div className="flex flex-col">
        <span>Registred Virement</span>
        <span> {data?.count } virement Externe </span>
    </div>
              <div className="flex items-center gap-3">
              <RangePicker className="w-[] border border-[#e7e7e7] rounded-[10px] h-[42px] "
    onChange={handleDateChange} 
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

export default NouadhibouExterne
