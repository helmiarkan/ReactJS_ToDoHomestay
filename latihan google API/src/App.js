import React, { Component } from "react";
import PENGINAPAN from "./component/penginapan";
import GoogleMapReact from "google-map-react";
import Marker from "./component/marker";
import "./App.css";

class App extends Component {
  constructor (props) { /* [2]sebuah penyimpanan tapi nggak bisa di manipulasi datanya, jadi 
                              itu hanya menyimpan data saja */
  /* ^[1]               supaya diakses pertama kali, kan ini datanya kosong to, jadi pas web nya
                        jalan pertama kali dicek, datanya kosong apa nggak, kalo ada isinya dicek, data ini ada
                        isinya apa ndak, jadi ini yang dijalankan pertama kali, karena nggak pakai database to,
                        jadi dicek, pokoknya yang diakses pertama kali */ 
    super (props);          /* [4] trus props yang dibawah nya itu gimana pak? ya props yang merujuk kesini, 
                            cobak ada ndak. supaya props ini itu, bisa digunakan di lain tempat. */
    /* ^[3]             untuk menandakan bahwa props ini itu yang dijadikan sebagai acuan buat props
                        dibawah-bawahnya, kayak ibuknya gitu lho, super itu kan menandakan bahwa ini itu props 
                        yang teratas -> *merujuk ke (props) setelah super* */
    this.state = {          /* [5] state itu penyimpanan tempat, tapi bisa dimanipulasi datanya, yaitu CRUD
                            kan bisa dimanipulasi datanya. Kalo yang nggak bisa dimanipulasi itu apa pak? 
                            Props, props.. itu untuk menambah dan menampilkan, sedangkan state, itu kan 
                            bisa diisi datanya, darimana datanya? dari sinikan? *merujuk ke fetch()* */
      penginapane: [],
      pilihPenginapan: null,  /* Kalo null ini pak? Null itu sama kayak [], sama kaya " ", kan artinya kosong. */
      semuaPenginapan: [],    /* ketiga ini apa harus dikosongin atau bisa diisi langsung pak? Bisa diisi langsung. 
                              contoh ["satu", "dua"]*/
      cari: " "               /* tapi kalau yang " " itu cuman buat satu data saja, kalau array kan bisa muat banyak */
    };
  }

  componentDidMount() {       /* [8] kalo ini pak? Inikan function, bawaannya react, fungsinya untuk mengekstrak
                              file .json yang dionline ini, diambil datanya terus ditaruh di state */
    fetch(              /* [6] inikan ngambil data dari json online kan? ketika diambil, nah ditaruh
                        dimana ini *merujuk ke .then(data)* */
                              /* [9] fetch itu? Ngambil data, ngambil data terus kalo responnya bener json,
                              datanya bener json apa ndak, kalau dia json, yaudah, taruh di data.
                              Nah kalau sudah ditampung sementara di data, sekarang taruh lagi di state, di state
                              Penginapane, yang isinya adalah data. data kan menampung isinya json. */
      "https://raw.githubusercontent.com/algosigma/js-reactjs/master/homestays.json"
    )
      .then(response => response.json())
      .then(data => {                 /* [7] disimpen sementara di data kan? kemudian dilempar ke mana? */
        this.setState({               /* ke sini pak. Itu apa? state. Berarti sama dengan Add to? Berarti 
                                      ditambahin ke state Penginapane sama semuaPenginapan ya pak? Berarti 
                                      ditambahin ke array */
          penginapane: data,          /* ini to? Ini berarti sebuah proses create to, Add to? */
          semuaPenginapan: data       /* Nah itu kalau pakai props nggak bisa, harus pakai state. */
        });
      });
  }
  pilihPenginapan = (inap) => {         /* Ini itu fungsi to pak? iya fungsi biasa, terus (inap) itu parameternya. 
                                        Bedanya pakai kurung sama nggak itu gimana pak? Nggak ada bedanya..*/
    this.setState({
      pilihPenginapan: inap             /* inap ini sebuah props,sebuah property, yang ada di penginapan.js */
    });
  };
  cariPenginapan = (event) => {           /* event ini paramater buat apa yang kamu inputkan */
    this.setState({
      cari: event.target.value,                                   /* kalo ngetik malioboro, nanti disimpen di
                                                                  cari kan? Jadi setelah kita ngetik malioboro,
                                                                  bakal sementara disimpen dulu di event, lalu
                                                                  dicari ada nggak yang sesuai dengan nama malioboro,
                                                                  kalo ada, yang lainnya ilangono, yang sama saja
                                                                  yang ditampilin.  */
      penginapane: this.state.semuaPenginapan.filter((inap) =>    /*  */
      new RegExp(event.target.value, "i").exec(inap.nama))         
    })
  }
  render() {
    let center = {
      lat: -7.9768247, /* latitude */
      lng: 112.6567693 /* longitude */
    };
    if (this.state.pilihPenginapan) {
      center = {
        lat: this.state.pilihPenginapan.lat,
        lng: this.state.pilihPenginapan.lng
      };
    }
    return (
      <div className="app">
        <div className="main">
          <div className="cari">
            <input type="text" placeholder="Pencarian.." value={this.state.cari} /* Inikan buat mencari to
                                                                                 setelah kamu ngetik, masuk
                                                                                 ke mana? State cari toh? */
            onChange={this.cariPenginapan}>
            </input>
          </div>
          <div className="Penginapan">
            {this.state.penginapane.map(inapin => {
              return (
                <PENGINAPAN
                key={inapin.id} /* key, inap, pilih, itu variable, ya.. kita buat aja sendiri terserah.. */
                inap={inapin}
                pilih={this.pilihPenginapan}
                />
              );
            })}
          </div>
        </div>
        <div className="peta">
          <GoogleMapReact center={center} zoom={15}>
            {this.state.penginapane.map(inapin => {
              return (
                <Marker
                key={inapin.id}
                lat={inapin.lat}
                lng={inapin.lng}
                text={inapin.harga}
                dipilih={inapin === this.state.pilihPenginapan}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;