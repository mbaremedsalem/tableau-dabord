import { Component, HostListener, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tabarou',
  templateUrl: './tabarou.component.html',
  styleUrls: ['./tabarou.component.scss']
})
export class TabarouComponent implements OnInit {
  isSidebarOpen: boolean = true;
  isSmallScreen: boolean = false;
  today!: string;

  chartOptions: any;

  chartOptions1: any;

  chartOptions2: any;

  chartOptions3: any;

  total_posdev: string = '';

  tableData: any[] = []; // Table rows
  tableDataDepot: any[] = [];
  tableDataIntern: any[] = [];
  selectedAgency: string = '00001'; // Default agency filter
  totalAmount: number = 0; // Total amount
  count: number = 0; // Total number of accounts
  countcli: number = 0; // Total number of accounts
  countVI: number = 0;
  nextPage: string | null = null; // URL for the next page
  previousPage: string | null = null; // URL for the previous page
  totalCount: number = 0; // Total number of records
  
  currentView: string = ''; // Tracks the current view ('comptes' or 'clients')
  constructor(private http: HttpClient) {
    // Enregistrer les contrôleurs nécessaires
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.initializeTodayDate();
    this.checkScreenSize();
    this.fetchData();
    this.fetchDepotData();
    this.fetchClientData();
    this.fetchOperationData();
    this.fetchDataClient();
    this.fetchDataVirementIntern();
    this.fetchDataClient();
    this.fetchDataDepot();
  }


  fetchDataOperation(url?: string) {
    // Use the provided URL or default to the initial API URL
    let apiUrl = url || 'http://127.0.0.1:8000/api/guichet/';
    if (!url && this.selectedAgency !== 'Tous') {
      apiUrl += `?AGENCE=${this.selectedAgency}`;
    }
  
    // Fetch data from the API
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        this.tableData = response.results.map((item: any) => ({
          oper: item.oper,
          type_operation: item.type_operation,
          date_transaction: item.date_transaction,
          Compte_Don: item.Compte_Don,
          Compte_benef: item.Compte_benef,
          devise_debit: item.devise_debit,
          devise_credit: item.devise_credit,
          nomlib: item.nomlib,
          montant_debeit: item.montant_debeit,
          montant_credit: item.montant_credit,
        }
      )
    );
  
        // Update pagination controls
        this.nextPage = response.next;
        this.previousPage = response.previous;
  
        // Update stats
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  // ------- depot --------
  fetchDataDepot(url?: string) {
    // Use the provided URL or default to the initial API URL
    let apiUrl = url || 'http://127.0.0.1:8000/api/compte_depot/';
    if (!url && this.selectedAgency !== 'Tous') {
      apiUrl += `?AGENCE=${this.selectedAgency}`;
    }
  
    // Fetch data from the API
    this.http.get<any>(apiUrl).subscribe(
      (response) => {

  
        // Update stats
        this.totalAmount = response.total_posdev || 0;
        this.count = response.count || 0;
        this.currentView = 'comptes'; // Set the view to 'comptes'
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
  fetchDataDepot1(url?: string) {
    // Use the provided URL or default to the initial API URL
    let apiUrl = url || 'http://127.0.0.1:8000/api/compte_depot/';
    if (!url && this.selectedAgency !== 'Tous') {
      apiUrl += `?AGENCE=${this.selectedAgency}`;
    }
  
    // Fetch data from the API
    this.http.get<any>(apiUrl).subscribe(
      (response) => {

        this.tableDataDepot = response.results.map((item: any) => ({
          COMPTE: item.COMPTE,
          CLIENT: item.CLIENT,
          NOM: item.NOM,
          NCG: item.NCG,
          TYP: item.TYP,
          DATOUV: item.DATOUV,
          DATFRM: item.DATFRM,
          EXPL: item.EXPL,
          AGENCE: item.AGENCE,
          DATVAL: item.DATVAL,

        }));
  
        // Update pagination controls
        this.nextPage = response.next;
        this.previousPage = response.previous;
  
        // Update stats
        this.currentView = 'comptes'; // Set the view to 'comptes'
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  fetchDataVirementIntern(url?: string) {
    // Use the provided URL or default to the initial API URL
    let apiUrl = url || 'http://127.0.0.1:8000/api/virement_intern/';
    if (!url && this.selectedAgency !== 'Tous') {
      apiUrl += `?AGENCE=${this.selectedAgency}`;
    }
  
    // Fetch data from the API
    this.http.get<any>(apiUrl).subscribe(
      (response) => {

  
        // Update pagination controls
        this.nextPage = response.next;
        this.previousPage = response.previous;
  
        // Update stats
        this.countVI = response.count || 0;
        this.currentView = 'comptes'; // Set the view to 'comptes'
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


  fetchDataVirementIntern1(url?: string) {
    // Use the provided URL or default to the initial API URL
    let apiUrl = url || 'http://127.0.0.1:8000/api/virement_intern/';
    if (!url && this.selectedAgency !== 'Tous') {
      apiUrl += `?AGENCE=${this.selectedAgency}`;
    }
  
    // Fetch data from the API
    this.http.get<any>(apiUrl).subscribe(
      (response) => {

        this.tableDataIntern = response.results.map((item: any) => ({
          date_operation: item.date_operation,
          montant_debit: item.montant_debit,
          montant_credit: item.montant_credit,
          client: item.client,
          compte_debit: item.compte_debit,
          compte_credit: item.compte_credit,
          status: item.status,

        }));
  
        // Update pagination controls
        this.nextPage = response.next;
        this.previousPage = response.previous;
  
        // Update stats
        this.countVI = response.count || 0;
        this.currentView = 'virementIE'; // Set the view to 'comptes'
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
// ------- client --------
  fetchDataClient(url?: string) {
    // Use the provided URL or default to the initial API URL
    let apiUrl = url || '';
    if (!url && this.selectedAgency !== 'Tous') {
      apiUrl += `?AGENCE=${this.selectedAgency}`;
    }
  
    // Fetch data from the API
    this.http.get<any>(apiUrl).subscribe(
      (response) => {

        // Update pagination controls
        this.nextPage = response.next;
        this.previousPage = response.previous;
  
        // Update stats

        this.countcli = response.count || 0;
        this.currentView = 'clients'; // Set the view to 'comptes'
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
  fetchDataClient1(url?: string) {
    // Use the provided URL or default to the initial API URL
    let apiUrl = url || '';
    if (!url && this.selectedAgency !== 'Tous') {
      apiUrl += `?AGENCE=${this.selectedAgency}`;
    }
  
    // Fetch data from the API
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        this.tableDataDepot = response.results.map((item: any) => ({
          CLIENT: item.CLIENT,
          DATOUV: item.DATOUV,
          DATFRM: item.DATFRM,
          EXPL: item.EXPL,
          AGENCE: item.AGENCE,
          TYPE: item.TYPE,

        }));
  
        // Update pagination controls
        this.nextPage = response.next;
        this.previousPage = response.previous;
  
        // Update stats
        this.countcli = response.count || 0;
        this.currentView = 'clients'; // Set the view to 'comptes'
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }  

  
  goToNextPage() {
    if (this.nextPage) {
      this.fetchDataOperation(this.nextPage);
    }
  }
  
  goToPreviousPage() {
    if (this.previousPage) {
      this.fetchDataOperation(this.previousPage);
    }
  }

  onFilterChange(event: any) {
    this.selectedAgency = event.target.value; // Update selected agency
    this.fetchDataOperation(); // Refetch data with the new filter
  }

  exportData() {
    const csvData = this.tableData.map((row) =>
      `${row.oper},${row.type_operation},${row.date_transaction},${row.date_transaction},${row.Compte_Don},${row.devise_debit},${row.devise_credit},${row.nomlib},${row.montant_debeit},${row.montant_credit}`
    );
    const csvContent =
      'Date,Type,Montant,Compte Debitaire,Compte Crediteur,Client\n' +
      csvData.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    link.click();
  }

  fetchCompteDepotData() {
    this.http.get<any>('http://127.0.0.1:8000/api/compte_depot/').subscribe(
      (response) => {
        this.count = response.count; // Total count of comptes
        this.total_posdev = response.total_posdev; // Total POSDEV
      },
      (error) => {
        console.error('Error fetching compte depot data:', error);
      }
    );
  }
  fetchData() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/parque_count/').subscribe(
      (response) => {
        // Transform API response to match CanvasJS dataPoints structure
        const dataPoints = response.map((item) => ({
          y: item.count,
          name: item.libelle,
        }));

        // Set chart options
        this.chartOptions = {
          animationEnabled: true,
          title: {
            text: 'Évolution Par Type Comptes',
          },
          data: [
            {
              type: 'pie',
              startAngle: -90,
              indexLabel: '{name}: {y}',
              dataPoints: dataPoints,
            },
          ],
        };
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  fetchDepotData() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/parque_depot/').subscribe(
      (response) => {
        // Transform the API response to match CanvasJS dataPoints
        const dataPoints = response.map((item) => ({
          y: item.Depot, // Use the "Depot" value for the pie chart
          name: item.Produit, // Use the "Produit" value as the label
        }));

        // Set chart options dynamically
        this.chartOptions1 = {
          animationEnabled: true,
          title: {
            text: 'Évolution Par Depot',
          },
          data: [
            {
              type: 'pie',
              startAngle: -90,
              indexLabel: '{name}: {y}',
              yValueFormatString: '#,###.##',
              dataPoints: dataPoints,
            },
          ],
        };
      },
      (error) => {
        console.error('Error fetching depot data:', error);
      }
    );
  }

  fetchClientData() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/parque_client/').subscribe(
      (response) => {
        // Transform API response into CanvasJS dataPoints
        const dataPoints = response.map((item) => ({
          y: item.count, // Use the count value for the chart
          name: item.ageclib, // Use the ageclib value as the label
        }));

        // Set chart options dynamically
        this.chartOptions2 = {
          animationEnabled: true,
          title: {
            text: 'Évolution Par Type Clients',
          },
          data: [
            {
              type: 'doughnut',
              yValueFormatString: '#,###',
              indexLabel: '{name}: {y}',
              dataPoints: dataPoints,
            },
          ],
        };
      },
      (error) => {
        console.error('Error fetching client data:', error);
      }
    );
  }

  fetchOperationData() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/parque_guichet/').subscribe(
      (response) => {
        // Transform API response into CanvasJS dataPoints
        const dataPoints = response
          .filter((item) => item.type_operation) // Exclude entries with null `type_operation`
          .map((item) => ({
            y: item.Nombre,
            name: item.type_operation,
          }));

        // Set chart options dynamically
        this.chartOptions3 = {
          animationEnabled: true,
          theme: 'dark2',
          colorSet: 'customColorSet',
          title: {
            text: 'Operation par Type',
          },
          data: [
            {
              type: 'doughnut',
              indexLabel: '{name}: {y}',
              innerRadius: '90%',
              yValueFormatString: '#,##0',
              dataPoints: dataPoints,
            },
          ],
        };
      },
      (error) => {
        console.error('Error fetching operation data:', error);
      }
    );
  }
  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 992;
    this.isSidebarOpen = !this.isSmallScreen;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

    // *** MÉTHODES D'INITIALISATION ***
    initializeTodayDate(): void {
      const currentDate = new Date();
      this.today = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${currentDate.getFullYear()}`;
    }
}
