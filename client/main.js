import {
    Template
}
from 'meteor/templating';
import {
    ReactiveVar
}
from 'meteor/reactive-var';

import './main.html';




AutoForm.hooks({
    incomeInput: {
        before:{
             "update-pushArray": function(doc){
                 var obj = Session.get("incomeDisplay");
                 return obj;
             }
        },
        after: {
            "update-pushArray": function (doc) {
                var table = $('#example').DataTable();
                table.destroy();
                buildIncomeTable();
            }
        }
    }
})

