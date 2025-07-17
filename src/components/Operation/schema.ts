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
  quantity: z.coerce.number().int().positive("Quantidade deve ser positiva"),
  price: z.number().min(1, {
    message: "Valor da ação deve ser maior que 0",
  }),
  brokerage: z.number().min(1, {
    message: "Valor da corrretagem deve ser maior que 0",
  }),
});
