import { Component, computed, effect, input, model, OnInit, output } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';

@Component({
  selector: 'app-stats',
  imports: [HighchartsChartComponent],
  templateUrl: './stats.html',
  styleUrl: './stats.scss'
})
export class Stats implements OnInit {

  stats = input.required<Pokemon["stats"]>();
  background = input.required<string>();
  total = computed(() => this.stats().reduce((acc, stat) => acc + stat.base_stat, 0));

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'bar',
        backgroundColor:  this.background(),

      },
      title: {
        text: 'Stats',
      },
      xAxis: {
        categories: this.stats()!.map((s) => s.stat.name.toUpperCase().replace('-', ' ')),
        labels: {
          align: 'left',  
          style: {
            color: 'black',
            fontWeight: 'bold',
          },
          x: 10,
         
        },
      },
      yAxis: {
        min: 0,
        labels: { enabled: false },
        gridLineWidth: 0,
        title: { 
          text: 'Total: '+ this.total(),
          x: -280,
          textAlign: 'left',
          style: {
            color: 'black',
            fontWeight: 'bold',
          }
            
        }
  
      },
      series: [
        {
          type: 'bar',
          name: 'Base Stat',
          pointPadding: 0.1,  
          groupPadding: 0, 
          data: this.stats().map((s) => {
            let color = '#4285F4'; // cor padrão

            switch (s.stat.name.toLowerCase()) {
              case 'hp':
                color = '#E53935'; // vermelho
                break;
              case 'attack':
                color = '#FB8C00'; // laranja
                break;
              case 'defense':
                color = '#1E88E5'; // azul
                break;
              case 'special-attack':
                color = '#8E24AA'; // roxo
                break;
              case 'special-defense':
                color = '#43A047'; // verde
                break;
              case 'speed':
                color = '#FDD835'; // amarelo
                break;
            }

            return {
              y: s.base_stat,
              color,
              name: s.stat.name.toLowerCase()
            };
          }),
          dataLabels: {
            enabled: true,
            align: 'left',
            inside: false,
            format: '{point.y}',
          },
          color: '#4285F4',
        },
      ],
      legend: { enabled: false },
      credits: { enabled: false },
    };
  }





}
