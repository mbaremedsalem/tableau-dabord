import { Input, Table, TableProps } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import {  VirementExterne } from "../../../Services/types/Virement";
import { useGetVirementExterne } from "../../../Services/Virements/viremementExterne/useGetVirementExterne";


const NouadhibouExterne =() => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
    const {data, isPending} = useGetVirementExterne(currentPage)
  console.log("searchValue : ", searchValue)
    const columns: TableProps<VirementExterne>["columns"] = [
        {
          title: ("Oper"),
          dataIndex: "oper",
          key: "oper",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.oper}</span>
            </div>
          ),
          onFilter: (_, record) => {
            return record?.oper?.toLowerCase().includes(searchValue.toLowerCase());
          },
          
        },
        {
          title: ("Montant Debit"),
          dataIndex: "compte_benef",
          key: "compte_benef",
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.compte_benef}</span>
            </div>
          ),
        },
        {
            title: ("beneficiaire"),
            dataIndex: "beneficiaire",
            key: "beneficiaire",
            render: (_, record) => (
              <div className="flex items-center gap-x-2">
                <span>{record.beneficiaire}</span>
              </div>
            ),
          },
        {
          title: ("date_transaction"),
          dataIndex: "date_transaction",
          key: "date_transaction",
        //   onFilter: (_, record) => {
        //     return record?.agec?.toLowerCase().includes(searchValue.toLowerCase());
        //   },
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.date_transaction}</span>
            </div>
          ),
        },
        {
            title: ("devise"),
            dataIndex: "devise",
            key: "devise",
           
            render: (_, record) => (
              <div className="flex items-center gap-x-2">
                <span>{record.devise}</span>
              </div>
            ),
          },
        {
          title: ("mode_reglement"),
          dataIndex: "mode_reglement",
          key: "mode_reglement",
        
          render: (_, record) => (
            <div className="flex items-center gap-x-2">
              <span>{record.mode_reglement}</span>
            </div>
          ),
        },
        {
          title: ("montant_transaction"),
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
          title: ("nif_nni"),
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
          title: ("compte_don"),
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
          title: ("nom_donneur_ordre"),
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
          title: ("pays"),
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
          title: ("produit"),
          dataIndex: "produit",
          key: "produit",
          render: (_, record) => {
            return (
              <div className="flex flex-col gap-y-1">
                <span>{record?.produit}</span>
              </div>
            );
          },
        },
        {
          title: ("reference_transaction"),
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
          title: ("taux_change"),
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
          title: ("devisd_debit"),
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
          title: ("devise_credit"),
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
          title: ("montant_debit"),
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
          title: ("montant_credit"),
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
        <span> {data?.count} virement Externe </span>
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