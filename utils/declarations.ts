import { DaftarPesanan, DataPengeluaran, DataPesanan } from "@/types/common";
import { LoginDataInput } from "@/types/input";
export class OrderData implements DataPesanan {
    id; nama_makanan; harga; description; is_karyawan; is_served; parent; jumlah;
    constructor() {
        this.id = ""
        this.nama_makanan = ""
        this.harga = 0
        this.description = ""
        this.is_karyawan = false
        this.is_served = false
        this.parent = ""
        this.jumlah = 0
    }
}

export class Order implements DaftarPesanan {
    id; added_by; added_date; modified_by; modified_date; pesanan; total_harga; metode_pembayaran;
    constructor(added_by: string, added_date: string) {
        this.id = "";
        this.added_by = added_by;
        this.added_date = added_date;
        this.modified_by = "";
        this.modified_date = "";
        this.pesanan = [] as DataPesanan[];
        this.total_harga = 0;
        this.metode_pembayaran = "Cash";
    }
}

export const dataBarangInit: DataPengeluaran = {
    nama_barang: "",
    harga: "",
    jumlah: 1,
    keterangan: ""
}

export const dataLoginInit: LoginDataInput = {
    username: "",
    password: ""
}