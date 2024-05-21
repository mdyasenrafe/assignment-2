const z = require("zod");

const variantValidatioSchema = z.object({
  type: z.string().min(1, { message: "Variant type is required" }),
  value: z.string().min(1, { message: "Variant value is required" }),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().min(0, { message: "Inventory is required" }).int(),
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }),
  description: z
    .string()
    .min(1, { message: "Product description is required" }),
  price: z.number().min(0, { message: "Price is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  tags: z.array(z.string()),
  variants: z.array(variantValidatioSchema),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
