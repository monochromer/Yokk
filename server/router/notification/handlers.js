'use strict';

exports.fetchNotifications = function(req, res) {
  const NotificationModel = req.app.db.models.Notification;
  const userId = req.user._id;
  const numberOfNotifications = 200;

  NotificationModel.find({userId}).sort({ _id: 1 })
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

  NotificationModel.update(
    {userId, new: true},
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
