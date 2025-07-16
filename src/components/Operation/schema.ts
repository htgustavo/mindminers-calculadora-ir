import { z } from "zod";

export const operationSchema = z.object({
  date: z.string().min(1, "Data é obrigatória"),
  ticker: z
    .string()
    .min(1, "Ticker obrigatório")
    .transform((v) => v.toUpperCase()),
  type: z.enum(["BUY", "SELL"], {
    message: "Tipo inválido",
  }),
  price: z.coerce.number().positive("Preço deve ser positivo"),
  quantity: z.coerce.number().int().positive("Quantidade deve ser positiva"),
  brokerage: z.coerce.number().min(0, "Corretagem inválida"),
});
