import { prisma } from "@repo/db";
import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
const jwt_secret = "bankApi"; // Ideally use process.env.JWT_SECRET

app.post("/bank_handler", async (req, res) => {
  const token: string = req.body.token;

  if (!token) {
    res.status(400).json({ msg: "Token missing" });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwt_secret) as JwtPayload;

    if (!decoded || !decoded.userid || !decoded.amount) {
      res.status(400).json({ msg: "Invalid token payload" });
      return;
    }

    await prisma.$transaction(async (tx) => {
      await tx.balance.update({
        where: {
          userid: decoded.userid,
        },
        data: {
          amount: {
            increment: decoded.amount*100,
          },
        },
      });

      await tx.onRampTransactions.updateMany({
        where: {
          token: token,
        },
        data: {
          status: "Success",
        },
      });
    });

    res.json({ msg: "Captured" });
    return;
  } catch (err) {
    // Update the transaction status to failed
    await prisma.onRampTransactions.updateMany({
      where: {
        token: token,
      },
      data: {
        status: "Failed",
      },
    });

    res.status(400).json({ msg: "Transaction failed",});
    return;
  }
});

app.listen(4001, () => {
  console.log("listening on port 4001");
});
