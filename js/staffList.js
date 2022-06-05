function StaffList() {
    this.staffL = [];

    // add staff
    this.addST = function (st) {
        this.staffL.push(st);
    }

    this.findIndex = function (id) {
        var i = -1;
        this.staffL.map(function (st, index) {
            if (st.account == id) {
                i = index;
            }
        });
        return i;
    }
    // remove staff
    this.removeST = function (id) {
        var removeI = this.findIndex(id);
        if (removeI > -1) {
            this.staffL.splice(removeI, 1);
        }
    }

    // update
    this.update = function (st) {
        var i = this.findIndex(st.account);
        if (i > -1) {
            this.staffL[i] = st;
        }
    }

    // search
    this.searchST = function (ratingST) {
        var searchList = [];
        var lowercase = ratingST.toLowerCase();
        this.staffL.map(function (st) {
            if (st.rating.indexOf(lowercase)>-1) {
                searchList.push(st);
            }
        })
        return searchList;
    }

}
