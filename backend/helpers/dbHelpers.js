module.exports = knex => {
  const getUsers = () => {
    return knex.select("*").from("users");
  };

  const registerUser = function (email, username, password) {
    return knex("users")
      .insert({ email: email, username: username, password: password })
      .returning("*")
      .then(res => res[0]);
    // will return the id for login / cookie session 
  };

  // const getUserInfo = userID => {
  //   return knex("users")
  //     .select("*")
  //     .where("users.id", "=", userID);
  // };

  //ys-fixed
  const getUserInfo = id => {
    return knex
      .select("*")
      .from("users")
      .where("users.id", "=", id);
  };

  //ys-fixed
  const getAllWatchLogs = () => {
    return knex("watch_logs")
      .select("*")
      .from("watch_logs");
  };

  // FIXME

  const getWatchLogsForUser = userID => {
    return knex("watch_logs")
      .select("*")
      .where("users_id", "=", userID)
      .innerJoin("log_entries")
      .where("watch_logs.id", "=", "watch_logs_id")
      // .orderBy();
  };

  //ys-fixed
  const getWatchLogByID = id => {
    return (
      knex
        .select("*")
        .from("watch_logs")
        .where("watch_logs.user_id", "=", id)
        // .innerJoin("log_entries", "watch_logs.id", "log_entries.watch_log_id")
        // .where("log_entries.watch_log_id", "=","watch_logs.id")
        // .orderBy("watch_logs.created_at", "desc")
    );
  };

  // const getWatchLogByID = id => {
  //   return (
  //     knex
  //       .select("*")
  //       .from("watch_logs")
  //       // .innerJoin("log_entries", "watch_logs.id", "log_entries.watch_log_id")
  //       .where("watch_logs.user_id", "=", id)
  //   );
  // };

  //ys-fixed
  const getLogEntryByWatchlogId = id => {
    return knex
      .select("*")
      .from("watch_logs")
      .innerJoin("log_entries", "watch_logs.id", "log_entries.watch_log_id")
      .where("log_entries.watch_log_id", "=", id)
      .orderBy('log_entries.created_at', 'desc')
  };

  // FIXME ENDS
  const getVideos = () => {
    return knex.select("*").from("videos");
  };

  //ys:
  const getSingleVideo = id => {
    return knex
      .select("*")
      .from("videos")
      .where("videos.id", "=", id);
  };

  //ys:
  const getEmotions = () => {
    return knex
      .select("*")
      .from("emotions")
      .then(res => res);
  };

  const getEmotionID = mood => {
    let id;

    return emotions.find(emotion => (emotion.emoji = mood));
  };

  //ys:
  const getVideosForEmotion = id => {
    return knex
      .select("*")
      .from("emotions")
      .innerJoin("videos", "emotions.id", "videos.emotion_id")
      .where("videos.emotion_id", "=", id);
  };

  const getRandomVideoFromEmotion = () => {
    return knex
      .select("*")
      .from("emotions")
      .innerJoin("videos", "emotions.id", "videos.emotion_id")
      .where("videos.emotion_id", "=", id);
  };
  //ys:
  const getUser = () => {
    return knex.select("*").from("users");
  };


  const createWatchLogEntry = (surprised_percent,
    disgusted_percent,
    neutral_percent,
    sad_percent,
    fearful_percent,
    angry_percent,
    happy_percent,
    watchLogID,
    videoID) => {
    // FIXME
    return knex("log_entries")
    .insert({
      video_id: videoID,
      watch_log_id: watchLogID,
      surprised_percent: surprised_percent,
      disgusted_percent: disgusted_percent,
      neutral_percent: neutral_percent,
      sad_percent: sad_percent,
      fearful_percent: fearful_percent,
      angry_percent: angry_percent,
      happy_percent: happy_percent
    })
    .returning("*")
    .then(res => res[0]);
};
  //ys:
  const getVideosFromWatchLog = id => {
    console.log("id from getVideosFromWathcLog", id);
    return knex
      .select("*")
      .from("watch_logs")
      .innerJoin("log_entries", "watch_logs.id", "log_entries.watch_log_id")
      .innerJoin("videos", "videos.id", "=", "log_entries.video_id")
      .where("log_entries.watch_log_id", "=", id);
    // .then(result => console.log("Result from getVideosFromWatchLog", result));
    // .innerJoin("videos", "log_entries.video_id", "videos.id");
    // .where("log_entries.video_id", "videos.id");
  };

 

  const createWatchLog = userId => {
    return knex("watch_logs")
      .insert({ user_id: userId, is_public: true })
      .returning("*")
      .then(res => res[0]);
  };

  const getUserHistory = function (id) {
    return knex("users");
  };

  const getUserbyUserName = function (username) {
    return knex("users")
      .select("*")
      .where("user_name", "=", username)
      .returning("*")
      .then(res => console.log(res));
  };

  const validateUserLogin = function (email, password) {
    return knex("users")
      .select("*")
      .where({
        email: email,
        password: password
      })
      .then(res => res[0])
      .catch(e => "There was an error logging in")
  }


  const getAllLogEntries = userID => {
    return knex("log_entries")
    .select("*")
    .where("id", "=", userID)
  }
  return {
    getUsers,
    registerUser,
    getUserbyUserName,
    registerUser,
    getVideos,
    getEmotions,
    getVideosForEmotion,
    getUser,
    createWatchLog,
    createWatchLogEntry,
    getUserInfo,
    getWatchLogsForUser,
    getAllWatchLogs,
    getWatchLogByID,
    getSingleVideo,
    getRandomVideoFromEmotion,
    getVideosFromWatchLog,
    getLogEntryByWatchlogId,
    validateUserLogin,
    getAllLogEntries
  };
};
