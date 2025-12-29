const prisma = require("../config/db");

exports.updateApp = async (data) => {
  return prisma.appSetting.upsert({
    where: { id: 1 },
    update: data,
    create: data,
  });
};
