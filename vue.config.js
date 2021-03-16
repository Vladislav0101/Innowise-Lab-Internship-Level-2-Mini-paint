module.exports = {
  productionSourceMap: false,
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/Innowise-Lab-Internship-Level-1-Clever-to-do-list/"
      : "/"
};
