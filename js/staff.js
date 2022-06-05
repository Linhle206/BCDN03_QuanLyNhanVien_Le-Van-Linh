function Staff(acc, name, email, pass, date, salary, position, time) {
    this.account = acc;
    this.name = name;
    this.email = email;
    this.password = pass;
    this.dateOfWork = date;
    this.BSalary = salary;
    this.position = position;
    this.workTime = time;
    this.TSalary = 0;
    this.rating = "";

    this.totalSalary = function () {
        var optionIndex = document.getElementById("chucvu").selectedIndex;
        switch (optionIndex) {
            case 1:
                this.TSalary = this.BSalary * 3;
                break;
            case 2:
                this.TSalary = this.BSalary * 2;
                break;
            case 3:
                this.TSalary = this.BSalary;
                break;
        }
    }

    this.staffRating = function(){
        if (this.workTime >= 192){
            this.rating = "Nhân viên xuất sắc";
        } else if (this.workTime >= 176 && this.workTime < 192){
            this.rating = "Nhân viên giỏi";
        } else if (this.workTime >= 160 && this.workTime < 176){
            this.rating = "Nhân viên khá";
        } else {
            this.rating = "Nhân viên trung bình";   
        }
    }
}