// services/auth.service.js
import prisma from "../config/db.js";
import { subHours } from "date-fns";

import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js"; // ensure jwt.js has a named export

export const createSupport = async (data,id) => {
console.log("usrt====>", id);
    const last24Hours = subHours(new Date(), 24);
    const recentSupport = await prisma.support.findFirst({
        where: {
            email: data.email,
            createdAt: {
                gte: last24Hours,
            },
        },
    });

    if (recentSupport) {
        throw new Error("You can raise another support request after 24 hours");
    }

    return await prisma.support.create({
        data: { ...data,
            userId: id
        },
    });
};


