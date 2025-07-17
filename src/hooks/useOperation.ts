import { useCallback, useEffect, useState } from "react";

import { mockOperations } from "@/mock/mockOperations";
import type {
  Operation,
  OperationPosition,
  TaxCalculationResult,
} from "@/types/operations";

/**
 * Hook customizado:
 * - Registrar operações
 * - Calcular preço médio, posição e imposto
 * - Controlar prejuízo acumulado
 */
export function useOperation() {
  /**
   * Guarda todas as operações realizadas (compra ou venda)
   */
  const [operations, setOperations] = useState<Operation[]>([]);

  /**
   * Guarda a posição atual de cada ativo (ticker).
   * Usamos Map para facilitar consultas rápidas pelo símbolo da ação.
   */
  const [positions, setPositions] = useState<Map<string, OperationPosition>>(
    new Map(),
  );

  /**
   * Guarda o resultado do cálculo de imposto e lucro/prejuízo
   * para cada operação realizada.
   */
  const [taxResults, setTaxResults] = useState<TaxCalculationResult[]>([]);

  useEffect(() => {
    const currentPositions = new Map<string, OperationPosition>();
    const taxResultsTemp: TaxCalculationResult[] = [];

    mockOperations.forEach((op) => {
      const currentPos = currentPositions.get(op.ticker);

      const { position, result, tax } = calculatePosition(
        op.ticker,
        op,
        currentPos,
      );

      currentPositions.set(op.ticker, position);

      taxResultsTemp.push({
        operation: op,
        result,
        tax,
        position,
      });
    });

    setOperations(mockOperations);
    setPositions(currentPositions);
    setTaxResults(taxResultsTemp);
  }, []);

  /**
   * Função responsável por recalcular a posição de um ativo
   * após uma operação (compra ou venda).
   *
   * @param ticker - símbolo do ativo (ex.: PETR4)
   * @param operation - operação atual (compra ou venda)
   * @param currentPosition - posição atual do ativo (opcional)
   * @returns nova posição, resultado da operação e imposto devido
   */
  const calculatePosition = useCallback(
    (
      ticker: string,
      operation: Operation,
      currentPosition?: OperationPosition,
    ): { position: OperationPosition; result: number; tax: number } => {
      // Caso não exista posição ainda para este ativo, inicializamos com valores zerados
      const pos = currentPosition || {
        ticker,
        averagePrice: 0,
        quantity: 0,
        accumulatedLoss: 0,
      };

      if (operation.type === "BUY") {
        /**
         * OPERAÇÃO DE COMPRA
         *
         * Precisamos recalcular:
         * - preço médio (PM)
         * - quantidade total (QM)
         *
         * Fórmula:
         * PM = (PM * QM + PC * QC + TC) / (QM + QC)
         * QM = QM + QC
         */

        // Calcula o custo total considerando posição anterior + nova compra + corretagem
        const totalCost =
          pos.averagePrice * pos.quantity +
          operation.price * operation.quantity +
          operation.brokerage;

        const newQuantity = pos.quantity + operation.quantity;

        const newAveragePrice = totalCost / newQuantity;

        return {
          position: {
            ...pos,
            averagePrice: newAveragePrice,
            quantity: newQuantity,
          },
          result: 0, // Compra não gera lucro ou imposto imediatamente
          tax: 0,
        };
      } else {
        /**
         * OPERAÇÃO DE VENDA
         *
         * Precisamos calcular:
         * - resultado da operação (RA)
         * - atualizar prejuízo acumulado (PA)
         * - imposto devido, se houver lucro
         *
         * Fórmulas do desafio:
         * RA = (PV - PM) * QV - TV
         *
         * Se RA < 0:
         *    PA = PA + abs(RA)
         * Se RA > 0:
         *    IR = (RA - min(RA, PA)) * 15%
         *    PA = PA - min(RA, PA)
         */

        // Calcula o resultado bruto da venda
        const result =
          (operation.price - pos.averagePrice) * operation.quantity -
          operation.brokerage;

        const newQuantity = pos.quantity - operation.quantity;

        let tax = 0;
        let newAccumulatedLoss = pos.accumulatedLoss;

        if (result < 0) {
          // Caso seja prejuízo, soma ao prejuízo acumulado
          newAccumulatedLoss += Math.abs(result);
        } else {
          // Caso seja lucro, precisa descontar eventual prejuízo acumulado
          const offset = Math.min(result, pos.accumulatedLoss);
          const taxableAmount = result - offset;
          tax = taxableAmount * 0.15;
          newAccumulatedLoss = pos.accumulatedLoss - offset;
        }

        return {
          position: {
            ...pos,
            quantity: newQuantity,
            accumulatedLoss: newAccumulatedLoss,
          },
          result,
          tax,
        };
      }
    },
    [],
  );

  /**
   * Função para registrar uma nova operação,
   * atualizar a posição do ativo e salvar o resultado do imposto.
   *
   * @param operation - operação a ser adicionada
   * @returns resultado de imposto e lucro/prejuízo da operação
   */
  const addOperation = useCallback(
    (operation: Operation) => {
      // Busca posição atual do ativo (caso exista)
      const currentPosition = positions.get(operation.ticker);

      // Calcula nova posição e imposto
      const calculation = calculatePosition(
        operation.ticker,
        operation,
        currentPosition,
      );

      // Adiciona operação ao histórico
      const newOperations = [...operations, operation];
      setOperations(newOperations);

      // Atualiza posição do ativo no Map
      const newPositions = new Map(positions);
      newPositions.set(operation.ticker, calculation.position);
      setPositions(newPositions);

      // Salva resultado do cálculo (útil para gráficos e relatórios)
      const taxResult: TaxCalculationResult = {
        operation,
        result: calculation.result,
        tax: calculation.tax,
        position: { ...calculation.position },
      };

      setTaxResults((prev) => [...prev, taxResult]);

      return taxResult;
    },
    [operations, positions, calculatePosition],
  );

  /**
   * Retorna o total de imposto devido,
   * somando todas as operações de venda.
   */
  const getTotalTaxOwed = useCallback(() => {
    return taxResults.reduce((total, result) => total + result.tax, 0);
  }, [taxResults]);

  /**
   * Retorna o lucro total acumulado
   * considerando apenas operações com lucro.
   */
  const getTotalProfit = useCallback(() => {
    return taxResults.reduce(
      (total, result) => total + Math.max(0, result.result),
      0,
    );
  }, [taxResults]);

  /**
   * Retorna o prejuízo total acumulado
   * considerando apenas operações com prejuízo.
   */
  const getTotalLoss = useCallback(() => {
    return taxResults.reduce(
      (total, result) => total + Math.abs(Math.min(0, result.result)),
      0,
    );
  }, [taxResults]);

  return {
    operations, // histórico das operações realizadas
    positions: Array.from(positions.values()), // lista das posições por ativo
    taxResults, // resultados detalhados por operação
    addOperation, // função para registrar operação
    getTotalTaxOwed, // total de imposto devido
    getTotalProfit, // total de lucro
    getTotalLoss, // total de prejuízo
  };
}
