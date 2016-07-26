import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  if (!Meteor.users.findOne()) {
        var userId = Accounts.createUser({
            username: "John",
            email: "jh_mcneill@yahoo.ca",
            password: "test123"
        });

        Meteor.users.update({
            _id: userId
        }, {
            $set: {
                roles: ["admin"]
            }
        });
      
        MyUsers.insert({
            userId: userId,
            username: "John",
            incomes: []
        });
        console.log("user created: " + userId);


    }
});

Meteor.methods({
    getIncomeData: function(userId){
       return MyUsers.findOne({userId: userId}).incomes;
    }
})
