import { Component, HostListener, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-tabarou',
  templateUrl: './tabarou.component.html',
  styleUrls: ['./tabarou.component.scss']
})
export class TabarouComponent implements OnInit {
  isSidebarOpen: boolean = true;
  isSmallScreen: boolean = false;

  // Données pour le graphique des opérations guichet (barres)
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
    datasets: [{ data: [50, 75, 100, 125], label: 'Opérations Guichet' }]
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  };

  // Données pour le graphique des virements par type (camembert)
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Interne', 'Externe', 'International'],
    datasets: [{ data: [40, 35, 25] }]
  };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };

  constructor() {
    // Enregistrer les contrôleurs nécessaires
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.checkScreenSize();
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
}
