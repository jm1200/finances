//init incomeDisplay Session variable
var incomeDisplay = {
    //Inputs
    date: new Date(),
    johnPay: 0,
    johnDed: 0,
    megPay: 0,
    megDed: 0,
    expenses: 0,
    johnAuto: 0,
    megAuto: 0,
    johnOwesMeg: 0,
    megOwesJohn: 0,
    savings: 0,

    //must calculate
    totalExpenses: 0,
    totalIncomeMinusDed: 0,
    jPercent: 0,
    mPercent: 0,
    johnOwesHouse: 0,
    megOwesHouse: 0,
    johnKeeps: 0,
    megKeeps: 0
};

Session.set("incomeDisplay", incomeDisplay);


Template.IncomeInput.helpers({
    exampleDoc: function () {
        return MyUsers.findOne();
    },
    incomeDisplayObject: function () {
        return Session.get("incomeDisplay");
    },
    formatDollars: function (num) {
        return formatDollars(parseFloat(num));
    },
    formatPercent: function (num) {
        return formatPercent(parseFloat(num));
    }

});

Template.IncomeInput.events({
    'change input': function (event) {
        //Set input in Session variable
        incomeDisplay[event.target.name] = event.target.name == "date" ? event.target.value : parseInt(event.target.value);
        Session.set("incomeDisplay", incomeDisplay);

        //calculate non-input variables
        incomeDisplay["totalExpenses"] = sg("expenses") + sg("johnAuto") + sg("megAuto") + sg("savings");
        incomeDisplay["totalIncomeMinusDed"] = sg("johnPay") - sg("johnDed") + sg("megPay") - sg("megDed");
        incomeDisplay["jPercent"] = (sg("johnPay") - sg("johnDed")) / incomeDisplay.totalIncomeMinusDed;
        incomeDisplay["mPercent"] = (sg("megPay") - sg("megDed")) / incomeDisplay.totalIncomeMinusDed;
        incomeDisplay["johnOwesHouse"] = incomeDisplay.totalExpenses * incomeDisplay.jPercent - sg("johnAuto");
        incomeDisplay["megOwesHouse"] = incomeDisplay.totalExpenses * incomeDisplay.mPercent - sg("megAuto");
        incomeDisplay["johnKeeps"] = sg("johnPay") - sg("johnDed") - incomeDisplay.johnOwesHouse + sg("megOwesJohn") - sg("johnOwesMeg");
        incomeDisplay["megKeeps"] = sg("megPay") - sg("megDed") - incomeDisplay.megOwesHouse - sg("megOwesJohn") + sg("johnOwesMeg");

        //Set full object in session variable
        Session.set("incomeDisplay", incomeDisplay);

    },
    'click a.deleteRow': function (event) {
        console.log("test");
    }
})

//Helpers

function checkZero(sessionVar) {
    if (!sessionVar) {
        return "0";
    } else {
        return sessionVar;
    }
}

function sg(sessionVar) {
    var a = Session.get("incomeDisplay");
    return a[sessionVar];
}


//TABLE
buildIncomeTable = function (res) {
    Meteor.call("getIncomeData", Meteor.userId(), function (err, res) {
        $(document).ready(function () {
            $('#incomeTable').DataTable({
                data: res,
                columns: [
                    {
                        data: 'date',
                        title: "Date",
                        render: function (val, type, doc) {
                            if (val instanceof Date) {
                                return moment.utc(val).format("LL");
                            } else {
                                return "";
                            }
                        }
                    },
                    {
                        data: 'johnPay',
                        title: "John's Pay",
                        render: function (val) {
                            return formatDollars(val);
                        }
                    },
                    {
                        data: 'megPay',
                        title: "Meg's Pay",
                        render: function (val) {
                            return formatDollars(val);
                        }
                    },
                    {
                        data: 'totalExpenses',
                        title: "Total Expenses",
                        render: function (val) {
                            return formatDollars(val);
                        }
                     },
                    {
                        data: 'savings',
                        title: "Additional Savings",
                        render: function (val) {
                            return formatDollars(val);
                        }
                     },
                    {
                        data: 'johnOwesHouse',
                        title: "John Paid",
                        render: function (val) {
                            return formatDollars(val);
                        }
                     },
                    {
                        data: 'megOwesHouse',
                        title: "Meghan Paid",
                        render: function (val) {
                            return formatDollars(val);
                        }
                     },
                    {
                        data: 'johnKeeps',
                        title: "John Kept",
                        render: function (val) {
                            return formatDollars(val);
                        }
                     },
                    {
                        data: 'megKeeps',
                        title: "Meg Kept",
                        render: function (val) {
                            return formatDollars(val);
                        }
                     },
                    {
                        data: 'docId',
                        title: "DocumentId"
                     },
                    {
                        data: null,
                        className: "center deleteIncomeRow",
                        defaultContent: '<a href="" class="deleteRow">delete</a>'
                    }
                ],
                "fnCreatedRow": function (nRow, aData, iDataIndex) {
                    console.log(aData.johnPay);
                    $(nRow).attr('id', "test");
                    console.log("created row");
                },
                "columnDefs": [
                    {
                        "targets": [3],
                        "visible": false
                    }
        ]
            });
        })
        $('#incomeTable').on('click', 'a.deleteRow', function (event) {
            event.preventDefault;
            console.log("works");
        })

    });
}

buildIncomeTable();