/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

const danhSachTin = document.getElementById("list");
const oTimKiem = document.getElementById("o-tim-kiem");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const baoLoi = document.getElementById("bao-loi");

function locTin() {
    const tuKhoa = oTimKiem.value.toLowerCase();
    const cacTin = danhSachTin.querySelectorAll("li");
    let soTinHien = 0;

    for (const tin of cacTin) {
        const vanBan = tin.querySelector("h3").textContent + " " + tin.querySelector("p").textContent;
        const khop = vanBan.toLowerCase().includes(tuKhoa);
        tin.classList.toggle("an", !khop);
        if (khop) {
            soTinHien++;
        }
    }

    boDem.textContent = `Đang hiển thị ${soTinHien}/${cacTin.length} tin`;
    khongThay.classList.toggle("an", soTinHien > 0);
    khongThay.textContent = soTinHien === 0 ? `Không tìm thấy tin nào cho "${oTimKiem.value}"` : "";
}

oTimKiem.addEventListener("keyup", locTin);

danhSachTin.addEventListener("click", (e) => {
    if (!e.target.matches("button.more")) {
        return;
    }
    const doanVan = e.target.parentNode.querySelector("p");
    const moRong = doanVan.classList.toggle("day-du");
    e.target.textContent = moRong ? "Thu gọn <<" : "Read more >>";
});

document.getElementById("nut-dang").addEventListener("click", () => {
    const tieuDe = oTieuDe.value;
    const noiDung = oNoiDung.value;
    if (!tieuDe.trim() || !noiDung.trim()) {
        baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
        return;
    }

    const tin = document.createElement("li");
    const ngay = document.createElement("span");
    ngay.className = "time";
    ngay.textContent = homNay();

    const tieuDeTin = document.createElement("h3");
    tieuDeTin.textContent = tieuDe;

    const noiDungTin = document.createElement("p");
    noiDungTin.textContent = noiDung;

    const nutMoRong = document.createElement("button");
    nutMoRong.type = "button";
    nutMoRong.className = "more";
    nutMoRong.textContent = "Read more >>";

    tin.append(ngay, tieuDeTin, noiDungTin, nutMoRong);
    danhSachTin.prepend(tin);
    oTieuDe.value = "";
    oNoiDung.value = "";
    baoLoi.textContent = "";
    locTin();
});

locTin();
