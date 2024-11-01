import express from "express";
// import { createTransaction, deleteTransaction, getAllTransactions, getMatchedTransactions, updateTransaction } from "../Controllers/transactionController";
import transactionController from "../controllers/transactionController";
import { middleware } from "../middleware/middleware";
const router = express.Router();

router.use(middleware)

router.post('/add-transaction',middleware,transactionController.createTransaction);
router.put("/update-transaction/:id",middleware,transactionController.updateTransaction);
router.delete("/delete-transaction/:id",middleware,transactionController.deleteTransaction);
router.get("/get-all-transactions",middleware,transactionController.getAllTransactions);
router.get("/search-transactions",middleware,transactionController.getMatchedTransactions);
export default router;