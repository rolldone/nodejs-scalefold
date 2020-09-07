# webhook / job
  Deskripsi : 
  Lebih ke 
  - Basic fitur webhook pada umumnya
  - Bisa trigger ke link lebih dari satu http request
  - Bisa trigger lewat email
  - Bisa di set jeda waktu trigger
  - Bisa tampung data sementara dan ingin di ambil oleh device client secara loop
  - Bisa dengan authentikasi dan public

# schedule
  Deskripsi :
  Lebih ke background prosess target market 
  - Screenshot
  - Crawling data
  - Callback Trigger data
  Workflow :
  - Buat job
  - Ada konfigurasi berdasarkan durasi, waktu tertentu alias waktu mundur
  - Jika queue mati maka system bisa select semua job user terus di jalankan berdasarkan konfigurasinya
  - Bisa simpan data request dari loop job 

# socket
  Deskripsi :
  Jual service memudahkan komunikasi antar device
  Workflow :
  - Buat Channel
  - Bisa limit client
  - Bisa limit client berdasarkan identifikasi token "fixed client"


# Buat module product
  Deskripsi :
  Menjual produk berupa paket dan limitnya
  Skema : 
  - table product
    - nama paket
    - harga
  - table product item
    - deskripsi : Kumpulan barang yang di kemas untuk product
    - field :
      - app_category_id => bus_param
      - limit 