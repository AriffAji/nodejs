function cetakNama(nama) {
  return `Halo nama saya ${nama}`;
}
const PI = 3.14;
const mhs = {
  nama: "Arif Aji",
  umur: 20,
  cetakMhs() {
    return `Halo nama saya ${this.nama}, umur saya ${this.umur}`;
  },
};

// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mhs = mhs;

module.exports = { cetakNama, PI, mhs };

// module.exports = {
//   cetakNama: cetakNama,
//   PI: PI,
//   mhs: mhs,
// };
