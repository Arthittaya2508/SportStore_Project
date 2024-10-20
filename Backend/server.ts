import express from "express";
// import db from "./lib/db";
import typesRouter from "./routes/types/route";
import sizesRouter from "./routes/sizes/route";
import transportsRouter from "./routes/transports/route";
import addressesRouter from "./routes/addresses/route";
import bandsRouter from "./routes/bands/route";
import gendersRouter from "./routes/genders/route";
import colorsRouter from "./routes/colors/route";
import productsRouter from "./routes/products/route";
import product_detailsRouter from "./routes/product_details/route";
import registersRouter from "./routes/registers/route";
import employeesRouter from "./routes/employees/route";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

//  router
app.use("/api/types", typesRouter);
app.use("/api/sizes", sizesRouter);
app.use("/api/transports", transportsRouter);
app.use("/api/addresess", addressesRouter); //ยังไม่ได้
app.use("/api/bands", bandsRouter);
app.use("/api/genders", gendersRouter);
app.use("/api/colors", colorsRouter);
app.use("/api/products", productsRouter);
app.use("/api/product_details", product_detailsRouter);
app.use("/api/registers", registersRouter);
app.use("/api/employees", employeesRouter);

// เริ่มต้นเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
