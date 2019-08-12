import React, { Component } from "react";
import "./penginapan.css";

class penginapan extends Component {
    handleClick = () => {                   /* handleClick ini juga sebuah fungsi pak? Iya. Namanya buat sendiri
                                            apa dari react nya? Buat sendiri. Ini kok dikosongin juga bisa pak?
                                            Bisa, ini kan nanti dipanggil di sini to *line setelah ini* */
                                            /* kok parameter nya nggak dinamain leh pak? Nggak usah, nggak selalu
                                            perlu, kan kita nggak menampung data sementara.. Kan cuma milih,
                                            cuma diklik, yaudah dipilih. Datanya kan sudah ada di state, setelah
                                            memilih, dia cuma ngganti map.. */
        this.props.pilih(this.props.inap); 
    };
    render() {
     const judul = `${this.props.inap.nama} - Rp. ${this.props.inap.harga} rb ` ; /* const itu nilai tetap, jadi data-*/
     const style = { backgroundImage: `url('${this.props.inap.fotoUrl}')`};      /*-ini tidak bisa diubah-ubah, kan ini 
     dari data json online to? Trus ini emang harus dikasih petik atasnya tab y pak? Iya, petik ini
     itu menandakkan kalau dia itu string, jadi kedetek kalau ini itu string yang disimpen di variable $.
     $ itu kan untuk ketika kita ingin menyimpan sebuah data dalam string kan harus pakai dollar.
     Inikan buat nampilin nama to. */
        return (
            <div className="penginapan" onClick={this.handleClick}>
                <div className="penginapan-foto" style={style}>
                    {" "}                                           
                </div>
                <div className="penginapan-judul">{judul}
</div>
            </div>
        );
    }
}

export default penginapan;