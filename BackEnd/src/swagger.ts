import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import YAML from "yaml";

const filePath = path.join(__dirname, "docs", "openapi.yaml");
const file = fs.readFileSync(filePath, "utf8");
const swaggerDocument = YAML.parse(file);

export { swaggerUi, swaggerDocument };
