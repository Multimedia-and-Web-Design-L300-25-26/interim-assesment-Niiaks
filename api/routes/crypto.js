import { Router } from "express";
import { getAllCryptos, getTopGainers, getNewListings, addCrypto } from "../controllers/crypto.js";

const router = Router();

router.get("/", getAllCryptos);
router.get("/gainers", getTopGainers);
router.get("/new", getNewListings);
router.post("/", addCrypto);

export default router;
