# Minh Dương & Linh Chi — Thiệp cưới

Website thiệp cưới của Minh Dương và Linh Chi, lưu giữ những khoảnh khắc và hành trình của chúng mình đến ngày chung một mái nhà.

**Xem thiệp:** [nmduong99.github.io/wedding-card](https://nmduong99.github.io/wedding-card/)

## Nội dung

- Thiệp mời, thời gian và địa điểm tổ chức tại nhà trai và nhà gái, kèm liên kết Google Maps.
- Album ảnh cưới với gallery cuộn ngang và trình xem ảnh phóng to.
- Câu chuyện của chúng mình qua các cột mốc trong mục **Our Journey**.
- Nhạc nền khi mở thiệp, bộ đếm đến ngày cưới và lời cảm ơn.
- Hộp mừng cưới với mã QR và thao tác sao chép số tài khoản.

## Công nghệ

Website tĩnh sử dụng HTML, CSS và JavaScript, cùng jQuery, Bootstrap và các thư viện hỗ trợ hiệu ứng, xem ảnh. Không cần cài Node.js, không có bước build hay backend riêng.

Một số thư viện và font được tải từ CDN, vì vậy cần kết nối Internet để xem đầy đủ giao diện.

## Chạy trên máy

Cần Python 3. Tại thư mục gốc của repository, chạy:

```bash
python3 -m http.server 8000 --directory docs
```

Mở [http://localhost:8000](http://localhost:8000) trong trình duyệt. Sửa các file trong `docs/` rồi tải lại trang để xem thay đổi.

## Cấu trúc

```text
docs/
├── index.html             # Nội dung thiệp, lịch tổ chức, gallery, hành trình và hộp mừng cưới
├── styles/main.css        # Giao diện chính và bố cục responsive
├── css/journey.css        # Giao diện phần Our Journey
├── css/custom-lightbox.css
├── scripts/main.js        # Bộ đếm, gallery, nhạc và tương tác trên trang
├── js/custom-lightbox.js  # Trình xem ảnh
├── images/
│   ├── DC/                # Album ảnh của chúng mình
│   ├── journey/           # Ảnh cho các cột mốc
│   └── gift/              # Mã QR mừng cưới
└── mus.mp3                # Nhạc nền
```

## Cập nhật nội dung

- **Tên, lời mời, lịch tổ chức, địa chỉ và câu chuyện:** sửa `docs/index.html`.
- **Ngày đếm ngược:** sửa `WEDDING_DATE` trong `docs/scripts/main.js`, đồng thời cập nhật ngày hiển thị trong `docs/index.html`.
- **Ảnh và mã QR:** thay file trong `docs/images/` và cập nhật đường dẫn tương ứng trong `docs/index.html`. Thông tin ngân hàng và giá trị sao chép số tài khoản cũng được khai báo tại đây.
- **Nhạc nền:** thay `docs/mus.mp3`, hoặc đổi thuộc tính `src` của phần tử audio trong `docs/index.html`.
- **Giao diện:** sửa `docs/styles/main.css`, `docs/css/journey.css` và `docs/css/custom-lightbox.css`.

## Triển khai

Website được xuất bản bằng **GitHub Pages** từ thư mục **`/docs`** trên branch **`main`**.

Trong **Settings → Pages → Build and deployment**, chọn **Deploy from a branch**, branch **`main`**, thư mục **`/docs`**. Các thay đổi được push lên `main` sẽ được GitHub Pages tự động triển khai tại:

**[https://nmduong99.github.io/wedding-card/](https://nmduong99.github.io/wedding-card/)**

## Nguồn gốc

Dự án bắt đầu từ [AndersonChoi/wedding-card](https://github.com/AndersonChoi/wedding-card). Phiên bản này đã được cá nhân hóa cho Minh Dương và Linh Chi với nội dung tiếng Việt, ảnh cưới, hành trình, gallery và hộp mừng cưới riêng.
