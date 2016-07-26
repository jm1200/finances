MyUsers = new Mongo.Collection('myUsers');

IncomeInputsSchema = new SimpleSchema({
    date: {
        type: Date,
        label: "Pay Date"
    },
    johnPay: {
        type: Number,
        label: "John's Pay",
        optional: true,
        decimal: true
    },
    johnDed: {
        type: Number,
        label: "John's Deductions",
        optional: true,
        decimal: true
    },
    megPay: {
        type: Number,
        label: "Meg's Pay",
        optional: true,
        decimal: true
    },
    megDed: {
        type: Number,
        label: "Megs's Deductions",
        optional: true,
        decimal: true
    },
    expenses: {
        type: Number,
        label: "Expenses",
        optional: true,
        decimal: true
    },
    johnAuto: {
        type: Number,
        label: "John Auto-Withdrawl",
        optional: true,
        decimal: true
    },
    megAuto: {
        type: Number,
        label: "Meg Auto-Withdrawl",
        optional: true,
        decimal: true
    },
    johnOwesMeg: {
        type: Number,
        label: "John owes Meg",
        optional: true,
        decimal: true
    },
    megOwesJohn: {
        type: Number,
        label: "Meg Owes John",
        optional: true,
        decimal: true
    },
    savings: {
        type: Number,
        label: "Additional Savings",
        optional: true,
        decimal: true
    },
    totalExpenses: {
        type: Number,
        label: "Total Expenses",
        optional: true,
        decimal: true,
        autoform: {
            type: "hidden"
        }
    },
    totalIncomeMinusDed: {
        type: Number,
        label: "Total income minus deductions",
        optional: true,
        decimal: true,
        autoform: {
            type: "hidden"
        }
    },
    jPercent: {
        type: Number,
        label: "John's percentage of income",
        optional: true,
        decimal: true,
        autoform: {
            type: "hidden"
        }
    },
    mPercent: {
        type: Number,
        label: "Meg's percentage of income",
        optional: true,
        decimal: true,
        autoform: {
            type: "hidden"
        }
    },
    johnOwesHouse: {
        type: Number,
        label: "John owes the house",
        optional: true,
        decimal: true,
        autoform: {
            type: "hidden"
        }
    },
    megOwesHouse: {
        type: Number,
        label: "Meg owes the house",
        optional: true,
        decimal: true,
        autoform: {
            type: "hidden"
        }
    },
    johnKeeps: {
        type: Number,
        label: "John Keeps",
        optional: true,
        decimal: true,
        autoform: {
            type: "hidden"
        }
    },
    megKeeps: {
        type: Number,
        label: "Meg Keeps",
        optional: true,
        decimal: true,
        autoform: {
            type: "hidden"
        }
    }
})

MyUsersSchema = new SimpleSchema({
    userId: {
        type: String,
        label: "User Id",
        autoform: {
            hidden: true
        }
    },
    username: {
        type: String,
        label: "Username"
    },
    incomes: {
        type: [IncomeInputsSchema],
        optional: true
    }
});

MyUsers.attachSchema(MyUsersSchema);

TabularTables = {};

TabularTables.MyUsers = new Tabular.Table({
    name: "MyUsers",
    collection: MyUsers,
    columns: [
        {
            data: "userId",
            title: "Title"
        },
        {
            data: "username",
            title: "Author"
        },
        {
            data: "incomes",
            title: "Author"
        },
  ]
});