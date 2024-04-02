import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // 导入 RouterModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule], // 添加 RouterModule 到 imports 数组中
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

}
