import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  brands = [
    '120000_aci.jpg', '120000_det.jpg', '120000_rad.jpg', '120000_tan.jpg', '120000_man.jpg', '120000_sun.jpg',
    '120000_rin.jpg', '120000_tan.jpg', '120000_whe.jpg', '120000_sun.jpg', '120000_rin.jpg', '120000_gar.jpg',
    '120000_jui.jpg', '120000_mol.jpg', '120000_nat.jpg', '120000_orp.jpg', '120000_rfl.jpg', '120000_fro.jpg',
    '120000_fai.jpg', '120000_dan.jpg', '120000_com.jpg', '120000_col.jpg', '120000_coc.jpg', '120000_cle.jpg', 
    '120000_rup.jpg', '120000_niv.jpg'].map((n) => `../assets/img/product/brand/${n}`);
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor() { }

  ngOnInit() {
  }

}
