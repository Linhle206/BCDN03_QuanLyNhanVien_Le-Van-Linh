var stl = new StaffList;
const validation = new Validation;

function getELE(id) {
    return document.getElementById(id);
}
// local storage
function setLocalStorage() {
    localStorage.setItem("STL", JSON.stringify(stl.staffL));
}

function getLocalStorage() {
    if (localStorage.getItem("STL") != null) {
        stl.staffL = JSON.parse(localStorage.getItem("STL"));
        showTable(stl.staffL);
    }
}

getLocalStorage();

// show table
function showTable(mang) {
    var content = "";
    mang.map(function (st, index) {
        var trELE = `<tr>  
            <td>${st.account}</td>
            <td>${st.name}</td>
            <td>${st.email}</td>
            <td>${st.dateOfWork}</td>
            <td>${st.position}</td>
            <td>${st.TSalary.toLocaleString()}</td>
            <td>${st.rating}</td>
            <td>
                <button class = "btn btn-danger" onclick="removeStaff('${st.account}')" >Xóa</button>
                <button class = "btn btn-info" onclick = "showDetails('${st.account}')" data-toggle="modal" data-target="#myModal" >Xem</button>
            </td>
        </tr>`
        content += trELE;
    });
    getELE("tableDanhSach").innerHTML = content;
}

// show details
function showDetails(id) {
    var i = stl.findIndex(id);
    if (i > -1) {
        getELE("tknv").value = stl.staffL[i].account;
        getELE("tknv").disabled = true;

        getELE("name").value = stl.staffL[i].name;
        getELE("email").value = stl.staffL[i].email;
        getELE("password").value = stl.staffL[i].password;
        getELE("datepicker").value = stl.staffL[i].dateOfWork;
        getELE("luongCB").value = stl.staffL[i].BSalary;
        getELE("chucvu").value = stl.staffL[i].position;
        getELE("gioLam").value = stl.staffL[i].workTime;
    }
}

// add new staff
function addStaff() {
    var acc = getELE("tknv").value.trim();
    var name = getELE("name").value.trim();
    var email = getELE("email").value.trim();
    var pass = getELE("password").value;
    var date = getELE("datepicker").value;
    var salary = getELE("luongCB").value.trim();
    var position = getELE("chucvu").value;
    var time = getELE("gioLam").value.trim();

    var isValid = true;
    var patternACC = /^[0-9]{4,6}$/;
    var patternName = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
    var patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var patternPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
    var patternDate = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;


    isValid &= validation.emptyCheck(acc, "tbTKNV", "Tài khoản không được để trống") && validation.duplicateCheck(acc, "tbTKNV", "Tài khoản đã tồn tại", stl.staffL) && validation.formatCheck(acc, "tbTKNV", "Tài khoản chỉ chứa từ 4 đến 6 ký số", patternACC);

    isValid &= validation.emptyCheck(name, "tbTen", "Tên không được để trống") && validation.formatCheck(name, "tbTen", "Tên nhập vào phải là chử", patternName);

    isValid &= validation.emptyCheck(email, "tbEmail", "Email không được để trống") && validation.formatCheck(email, "tbEmail", "Email không đúng định dạng", patternEmail);

    isValid &= validation.emptyCheck(pass, "tbMatKhau", "Mật khẩu không được để trống") && validation.formatCheck(pass, "tbMatKhau", "Mật khẩu chứa từ 6 đến 10 kí tự, chứa ít nhất 1 kí tự số, 1 kí tự in hoa, 1 kí tự đặc biệt", patternPass);

    isValid &= validation.emptyCheck(date, "tbNgay", "Ngày làm không được để trống");

    isValid &= validation.emptyCheck(salary, "tbLuongCB", "Lương cơ bản không được để trống") && validation.salaryCheck(salary, "tbLuongCB", "Lương cơ bản phải là số nằm trong khoảng từ 1.000.000 đến 20.000.000");

    isValid &= validation.positionCheck("chucvu", "tbChucVu", "Chưa chọn chức vụ!");

    isValid &= validation.emptyCheck(time, "tbGiolam", "Giờ làm không được để trống") && validation.timeCheck(time, "tbGiolam", "Giờ làm phải là số, nằm trong khoảng từ 80 đến 200");

    if (isValid) {
        var st = new Staff(acc, name, email, pass, date, salary, position, time);
        st.totalSalary();
        st.staffRating();

        stl.addST(st);

        setLocalStorage();
        getLocalStorage();
    }
}

// remove staff
function removeStaff(id) {
    stl.removeST(id);
    setLocalStorage();
    getLocalStorage();
}

// update info
function updateST() {
    var acc = getELE("tknv").value.trim();
    var name = getELE("name").value.trim();
    var email = getELE("email").value.trim();
    var pass = getELE("password").value;
    var date = getELE("datepicker").value;
    var salary = getELE("luongCB").value.trim();
    var position = getELE("chucvu").value;
    var time = getELE("gioLam").value.trim();

    var isValid = true;
    var patternACC = /^[0-9]{4,6}$/;
    var patternName = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
    var patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var patternPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
    var patternDate = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;

    isValid &= validation.emptyCheck(name, "tbTen", "Tên không được để trống") && validation.formatCheck(name, "tbTen", "Tên nhập vào phải là chử", patternName);

    isValid &= validation.emptyCheck(email, "tbEmail", "Email không được để trống") && validation.formatCheck(email, "tbEmail", "Email không đúng định dạng", patternEmail);

    isValid &= validation.emptyCheck(pass, "tbMatKhau", "Mật khẩu không được để trống") && validation.formatCheck(pass, "tbMatKhau", "Mật khẩu chứa từ 6 đến 10 kí tự, chứa ít nhất 1 kí tự số, 1 kí tự in hoa, 1 kí tự đặc biệt", patternPass);

    isValid &= validation.emptyCheck(date, "tbNgay", "Ngày làm không được để trống");

    isValid &= validation.emptyCheck(salary, "tbLuongCB", "Lương cơ bản không được để trống") && validation.salaryCheck(salary, "tbLuongCB", "Lương cơ bản phải là số nằm trong khoảng từ 1.000.000 đến 20.000.000");

    isValid &= validation.positionCheck("chucvu", "tbChucVu", "Chưa chọn chức vụ!");

    isValid &= validation.emptyCheck(time, "tbGiolam", "Giờ làm không được để trống") && validation.timeCheck(time, "tbGiolam", "Giờ làm phải là số, nằm trong khoảng từ 80 đến 200");

    if (isValid) {
        var st = new Staff(acc, name, email, pass, date, salary, position, time);
        st.totalSalary();
        st.staffRating();
        stl.update(st);

        setLocalStorage();

        getLocalStorage();
    }

    var st = new Staff(acc, name, email, pass, date, salary, position, time);
    st.totalSalary();
    st.staffRating();
    stl.update(st);

    setLocalStorage();

    getLocalStorage();
}

// reset form
function resetSpan(spanID) {
    document.getElementById(spanID).innerHTML = "";
    document.getElementById(spanID).style.display = "none";
}

function resetForm() {
    getELE("formManager").reset();
    getELE("tknv").disabled = false;
    resetSpan("tbTKNV");
    resetSpan("tbTen");
    resetSpan("tbEmail");
    resetSpan("tbMatKhau");
    resetSpan("tbNgay");
    resetSpan("tbLuongCB");
    resetSpan("tbGiolam");
    resetSpan("tbChucVu");
}

// search
getELE("btnTimNV").onclick = function (){
    var ratingST =getELE("searchName").value;
    var searchList = [];

    searchList = stl.searchST(ratingST);
    showTable(searchList);
}

getELE("searchName").onkeyup = function (){
    var ratingST =getELE("searchName").value;
    var searchList = [];

    searchList = stl.searchST(ratingST);
    showTable(searchList);
}