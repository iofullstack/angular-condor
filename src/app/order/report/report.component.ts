import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ReportService } from './report.service'
import { Report } from './report'
import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  dataSource: Report[]

  constructor(private reportService: ReportService) { }

  ngOnInit() {
  }

  getReportSales(date): void {
    this.reportService.getReportSales(date)
        .subscribe(response => {
          this.dataSource = response
          console.log(this.dataSource)
          this.exportExcel(date, this.dataSource)
        })
  }

  reportSales(form: NgForm) {
    let date = form.value.fecha.toISOString().substring(0,10)
    console.log(date)
    this.getReportSales(date)
  }

  s2ab(s) {
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF
    return buf
  }

  exportExcel(date, data) {
    let wb = XLSX.utils.book_new()
    let sales = this.toArrayData(data.sales)
    let extras = this.toArrayData(data.extras)
    console.log(sales)
    wb.Props = {
      Title: 'Condor-Report',
      Subject: 'Test file',
      Author: 'Condor'
    }
    wb.SheetNames.push('Reporte diario')
    let ws_data = [Array('NOMBRE MENÚ', 'CANTIDAD', 'PRECIO')]
    for(let i = 0; i < sales.length; i++) {
      ws_data.push(sales[i])
    }
    ws_data.push(Array('', '', 'TOTAL VENTAS'))
    ws_data.push(Array('', '', data.totalSales))
    ws_data.push(Array())
    ws_data.push(Array('NOMBRE EXTRA', 'CANTIDAD', 'PRECIO'))
    for(let i = 0; i < extras.length; i++) {
      ws_data.push(extras[i])
    }
    ws_data.push(Array('', '', 'TOTAL VENTAS'))
    ws_data.push(Array('', '', data.totalExtras))
    console.log(ws_data)
    let ws = XLSX.utils.aoa_to_sheet(ws_data)
    wb.Sheets['Reporte diario'] = ws
    let wbout = XLSX.write(wb, {bookType: 'xlsx', type: 'binary'})
    if (data.sales.length || data.extras.length)
      FileSaver.saveAs(new Blob([this.s2ab(wbout)],{type:"application/octet-stream"}), `${date}.xlsx`)
  }

  toArrayData(data) {
    let res = []
    for(let i = 0; i < data.length; i++) {
      res[i] = new Array(data[i].name, data[i].quantity, data[i].price)
    }

    return res
  }

}
