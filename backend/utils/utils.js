const mongoUrl = ('mongodb://localhost:27017/mestodb');
const mongoConfig = ({
  useNewUrlParser: true,
  // useUnifiedTopology: true,
});

module.exports = {
  mongoUrl,
  mongoConfig,
};
