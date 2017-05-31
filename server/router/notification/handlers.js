'use strict';

exports.fetchNotifications = function(req, res) {
  const NotificationModel = req.app.db.models.Notification;
  const userId = req.user._id;
  const companyId = req.user.currentCompany;
  const numberOfNotifications = 200;

  NotificationModel.find({userId, companyId}).sort({ _id: 1 })
    .limit(numberOfNotifications).exec((err, notifications) => {
      if(err){
        console.log(err);
        res.status(500).send('Server error');
        return false;
      }
      res.send(notifications);
    });
};

exports.markNotification = function(req, res) {
  const NotificationModel = req.app.db.models.Notification;
  const userId = req.user._id;
  const { _id } = req.params;

  NotificationModel.update(
    {_id, userId, new: true},
    {$set: {new: false}},
    (err) => {
      if(err){
        console.log(err);
        res.status(500).send('Server error');
        return false;
      }
      res.send();
    }
  );
};

exports.markAllNotifications = function(req, res) {
  const NotificationModel = req.app.db.models.Notification;
  const userId = req.user._id;
  const companyId = req.user.currentCompany;

  NotificationModel.update(
    {userId, companyId, new: true},
    {$set: {new: false}},
    {"multi": true},
    (err) => {
      if(err){
        console.log(err);
        res.status(500).send('Server error');
        return false;
      }
      res.send();
    }
  );
};
