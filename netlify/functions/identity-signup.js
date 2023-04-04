exports.handler = function(event, context, callback) {
  const data = JSON.parse(event.body);
  const { user } = data;
    
  const responseBody = {
    app_metadata: {
      roles: ["user"],
      my_user_info: "Invited site visitor"
    },
    user_metadata: {
      ...user.user_metadata, // append current user metadata
      custom_data_from_function: "Automatically added to user group on sign-up."
    }
  };
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(responseBody)
  });
};