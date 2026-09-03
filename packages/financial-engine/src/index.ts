// Financial Engine - Deterministic Underwriting Calculations

export interface UnderwritingAssumptions {
  purchasePrice: number;
  closingCostsPercent: number;
  financing: {
    downPaymentPercent: number;
    interestRate: number;
    loanTermYears: number;
  };
  property: {
    currentCondition: string;
    expectedRent?: number;
    annualTaxes: number;
    annualInsurance: number;
  };
  renovation: {
    scope: string;
    laborCost: number;
    materialsCost: number;
    contingencyPercent: number;
  };
  exit: {
    afterRepairValue: number;
    sellingCostsPercent: number;
    brokerFeePercent: number;
  };
  carrying: {
    expectedHoldPeriodMonths: number;
    monthlyInterest: number;
    monthlyUtilities: number;
    monthlyInsurance: number;
    monthlyTaxes: number;
  };
}

export interface UnderwritingResults {
  // Acquisition costs
  totalAcquisitionCost: number;
  cashRequired: number;
  loanAmount: number;
  
  // Renovation costs
  totalRenovationCost: number;
  
  // Carrying costs
  totalCarryingCost: number;
  
  // Exit costs
  totalExitCost: number;
  
  // Returns
  grossProfit: number;
  netProfit: number;
  returnOnInvestment: number;
  annualizedReturn: number;
  profitMargin: number;
  
  // Monthly payments
  monthlyPrincipalInterest: number;
  monthlyTotalPayment: number;
  
  // Breakdown
  costBreakdown: {
    acquisition: number;
    renovation: number;
    carrying: number;
    exit: number;
    total: number;
  };
}

export interface ComparableProperty {
  id: string;
  address: string;
  distance: number;
  salePrice: number;
  pricePerSqft: number;
  saleDate: Date;
  bedrooms: number;
  bathrooms: number;
  buildingSqft: number;
  propertyType: string;
  similarityScore: number;
}

export interface ValuationResult {
  estimatedValue: number;
  confidence: number;
  comparableCount: number;
  comparables: ComparableProperty[];
  methodology: string;
  assumptions: {
    radiusMiles: number;
    propertyType: string;
    saleRecencyDays: number;
    minComparables: number;
  };
}

export class FinancialEngine {
  /**
   * Calculate fix-and-flip underwriting returns
   */
  static calculateFixAndFlip(assumptions: UnderwritingAssumptions): UnderwritingResults {
    const { purchasePrice, closingCostsPercent, financing, renovation, exit, carrying } = assumptions;

    // Acquisition costs
    const closingCosts = purchasePrice * (closingCostsPercent / 100);
    const totalAcquisitionCost = purchasePrice + closingCosts;
    
    // Financing
    const downPayment = purchasePrice * (financing.downPaymentPercent / 100);
    const loanAmount = purchasePrice - downPayment;
    const cashRequired = downPayment + closingCosts;

    // Renovation costs
    const renovationSubtotal = renovation.laborCost + renovation.materialsCost;
    const contingency = renovationSubtotal * (renovation.contingencyPercent / 100);
    const totalRenovationCost = renovationSubtotal + contingency;

    // Carrying costs
    const monthlyCarrying = carrying.monthlyInterest + carrying.monthlyUtilities + 
                           carrying.monthlyInsurance + carrying.monthlyTaxes;
    const totalCarryingCost = monthlyCarrying * carrying.expectedHoldPeriodMonths;

    // Exit costs
    const sellingCosts = exit.afterRepairValue * (exit.sellingCostsPercent / 100);
    const brokerFee = exit.afterRepairValue * (exit.brokerFeePercent / 100);
    const totalExitCost = sellingCosts + brokerFee;

    // Total investment
    const totalInvestment = cashRequired + totalRenovationCost + totalCarryingCost;

    // Returns
    const grossProfit = exit.afterRepairValue - totalAcquisitionCost - totalRenovationCost - totalCarryingCost;
    const netProfit = grossProfit - totalExitCost;
    const returnOnInvestment = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0;
    const annualizedReturn = this.calculateAnnualizedReturn(
      netProfit, 
      totalInvestment, 
      carrying.expectedHoldPeriodMonths
    );
    const profitMargin = exit.afterRepairValue > 0 ? (netProfit / exit.afterRepairValue) * 100 : 0;

    // Monthly mortgage payment
    const monthlyPI = this.calculateMonthlyPayment(loanAmount, financing.interestRate, financing.loanTermYears);
    const monthlyTotal = monthlyPI + carrying.monthlyTaxes + carrying.monthlyInsurance;

    return {
      totalAcquisitionCost,
      cashRequired,
      loanAmount,
      totalRenovationCost,
      totalCarryingCost,
      totalExitCost,
      grossProfit,
      netProfit,
      returnOnInvestment,
      annualizedReturn,
      profitMargin,
      monthlyPrincipalInterest: monthlyPI,
      monthlyTotalPayment: monthlyTotal,
      costBreakdown: {
        acquisition: totalAcquisitionCost,
        renovation: totalRenovationCost,
        carrying: totalCarryingCost,
        exit: totalExitCost,
        total: totalInvestment,
      },
    };
  }

  /**
   * Calculate buy-and-hold rental returns
   */
  static calculateBuyAndHold(assumptions: UnderwritingAssumptions): UnderwritingResults {
    const { purchasePrice, closingCostsPercent, financing, property, renovation, carrying } = assumptions;

    // Acquisition costs
    const closingCosts = purchasePrice * (closingCostsPercent / 100);
    const totalAcquisitionCost = purchasePrice + closingCosts;
    
    // Financing
    const downPayment = purchasePrice * (financing.downPaymentPercent / 100);
    const loanAmount = purchasePrice - downPayment;
    const cashRequired = downPayment + closingCosts;

    // Renovation costs (initial setup)
    const renovationSubtotal = renovation.laborCost + renovation.materialsCost;
    const contingency = renovationSubtotal * (renovation.contingencyPercent / 100);
    const totalRenovationCost = renovationSubtotal + contingency;

    // Monthly calculations
    const monthlyPI = this.calculateMonthlyPayment(loanAmount, financing.interestRate, financing.loanTermYears);
    const monthlyTotal = monthlyPI + property.annualTaxes / 12 + property.annualInsurance / 12;
    
    // Annual rental income
    const annualGrossIncome = (property.expectedRent || 0) * 12;
    const annualOperatingExpenses = (property.annualTaxes + property.annualInsurance) + 
                                   (monthlyTotal * 12 - monthlyPI * 12); // Non-mortgage expenses
    const annualNetOperatingIncome = annualGrossIncome - annualOperatingExpenses;
    
    // Cash on cash return
    const totalCashInvested = cashRequired + totalRenovationCost;
    const cashOnCashReturn = totalCashInvested > 0 ? (annualNetOperatingIncome / totalCashInvested) * 100 : 0;

    // Cap rate
    const capRate = purchasePrice > 0 ? (annualNetOperatingIncome / purchasePrice) * 100 : 0;

    return {
      totalAcquisitionCost,
      cashRequired,
      loanAmount,
      totalRenovationCost,
      totalCarryingCost: 0,
      totalExitCost: 0,
      grossProfit: annualNetOperatingIncome,
      netProfit: annualNetOperatingIncome,
      returnOnInvestment: cashOnCashReturn,
      annualizedReturn: cashOnCashReturn,
      profitMargin: capRate,
      monthlyPrincipalInterest: monthlyPI,
      monthlyTotalPayment: monthlyTotal,
      costBreakdown: {
        acquisition: totalAcquisitionCost,
        renovation: totalRenovationCost,
        carrying: 0,
        exit: 0,
        total: totalCashInvested,
      },
    };
  }

  /**
   * Calculate monthly mortgage payment
   */
  private static calculateMonthlyPayment(
    principal: number,
    annualRate: number,
    years: number
  ): number {
    if (principal <= 0 || annualRate <= 0 || years <= 0) return 0;
    
    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;
    
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    return monthlyPayment;
  }

  /**
   * Calculate annualized return
   */
  private static calculateAnnualizedReturn(
    profit: number,
    investment: number,
    holdPeriodMonths: number
  ): number {
    if (investment <= 0 || holdPeriodMonths <= 0) return 0;
    
    const totalReturn = profit / investment;
    const years = holdPeriodMonths / 12;
    
    if (years <= 0) return 0;
    
    const annualizedReturn = (Math.pow(1 + totalReturn, 1 / years) - 1) * 100;
    return annualizedReturn;
  }

  /**
   * Calculate property valuation using comparable sales
   */
  static calculateValuation(
    subjectProperty: any,
    comparables: any[],
    assumptions: {
      radiusMiles: number;
      propertyType: string;
      saleRecencyDays: number;
      minComparables: number;
    }
  ): ValuationResult {
    // Filter and score comparables
    const filteredComparables = this.filterAndScoreComparables(
      subjectProperty,
      comparables,
      assumptions
    );

    if (filteredComparables.length < assumptions.minComparables) {
      throw new Error(`Insufficient comparables. Found ${filteredComparables.length}, required ${assumptions.minComparables}`);
    }

    // Calculate weighted average price per sqft
    const weightedPricePerSqft = this.calculateWeightedPricePerSqft(filteredComparables);
    const estimatedValue = weightedPricePerSqft * subjectProperty.buildingSqft;

    // Calculate confidence based on comparable quality and quantity
    const confidence = this.calculateConfidence(filteredComparables);

    return {
      estimatedValue,
      confidence,
      comparableCount: filteredComparables.length,
      comparables: filteredComparables,
      methodology: 'weighted_comparable_sales',
      assumptions,
    };
  }

  /**
   * Filter and score comparable properties
   */
  private static filterAndScoreComparables(
    subjectProperty: any,
    comparables: any[],
    assumptions: any
  ): ComparableProperty[] {
    const now = new Date();
    const recencyCutoff = new Date(now.getTime() - assumptions.saleRecencyDays * 24 * 60 * 60 * 1000);

    return comparables
      .filter(comp => {
        // Apply filters
        if (comp.distance > assumptions.radiusMiles) return false;
        if (comp.propertyType !== assumptions.propertyType) return false;
        if (new Date(comp.saleDate) < recencyCutoff) return false;
        return true;
      })
      .map(comp => ({
        ...comp,
        similarityScore: this.calculateSimilarityScore(subjectProperty, comp),
      }))
      .sort((a, b) => b.similarityScore - a.similarityScore);
  }

  /**
   * Calculate similarity score between subject and comparable
   */
  private static calculateSimilarityScore(subject: any, comparable: any): number {
    let score = 100;
    
    // Penalize for distance
    score -= comparable.distance * 10;
    
    // Penalize for size difference
    const sizeDiff = Math.abs(subject.buildingSqft - comparable.buildingSqft) / subject.buildingSqft;
    score -= sizeDiff * 20;
    
    // Penalize for bedroom difference
    const bedDiff = Math.abs(subject.bedrooms - comparable.bedrooms);
    score -= bedDiff * 5;
    
    // Penalize for bathroom difference
    const bathDiff = Math.abs(subject.bathrooms - comparable.bathrooms);
    score -= bathDiff * 5;
    
    // Penalize for age difference
    const ageDiff = Math.abs(subject.yearBuilt - comparable.yearBuilt) / 10;
    score -= ageDiff * 2;
    
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Calculate weighted average price per sqft
   */
  private static calculateWeightedPricePerSqft(comparables: ComparableProperty[]): number {
    const totalWeight = comparables.reduce((sum, comp) => sum + comp.similarityScore, 0);
    
    if (totalWeight === 0) {
      return comparables.reduce((sum, comp) => sum + comp.pricePerSqft, 0) / comparables.length;
    }
    
    const weightedSum = comparables.reduce(
      (sum, comp) => sum + comp.pricePerSqft * comp.similarityScore,
      0
    );
    
    return weightedSum / totalWeight;
  }

  /**
   * Calculate confidence score for valuation
   */
  private static calculateConfidence(comparables: ComparableProperty[]): number {
    if (comparables.length === 0) return 0;
    
    // More comparables = higher confidence
    const countScore = Math.min(100, comparables.length * 10);
    
    // Higher average similarity = higher confidence
    const avgSimilarity = comparables.reduce((sum, comp) => sum + comp.similarityScore, 0) / comparables.length;
    
    // Lower price variance = higher confidence
    const prices = comparables.map(c => c.pricePerSqft);
    const avgPrice = prices.reduce((sum, p) => sum + p, 0) / prices.length;
    const variance = prices.reduce((sum, p) => sum + Math.pow(p - avgPrice, 2), 0) / prices.length;
    const varianceScore = Math.max(0, 100 - variance / avgPrice * 100);
    
    return (countScore * 0.3 + avgSimilarity * 0.4 + varianceScore * 0.3) / 100;
  }

  /**
   * Calculate investment score for property matching
   */
  static calculateInvestmentScore(
    property: any,
    analysis: UnderwritingResults,
    investorCriteria: {
      capitalRange: { min: number; max: number };
      targetReturn: number;
      strategy: string;
      riskTolerance: string;
    }
  ): { score: number; reasons: string[] } {
    const reasons: string[] = [];
    let score = 0;

    // Check capital requirements
    if (analysis.cashRequired >= investorCriteria.capitalRange.min && 
        analysis.cashRequired <= investorCriteria.capitalRange.max) {
      score += 30;
      reasons.push('Required capital is within investor range');
    } else if (analysis.cashRequired < investorCriteria.capitalRange.min) {
      score += 15;
      reasons.push('Required capital is below minimum (consider multiple deals)');
    } else {
      reasons.push('Required capital exceeds maximum');
    }

    // Check return expectations
    if (analysis.returnOnInvestment >= investorCriteria.targetReturn) {
      score += 40;
      reasons.push(`ROI (${analysis.returnOnInvestment.toFixed(1)}%) meets or exceeds target (${investorCriteria.targetReturn}%)`);
    } else {
      const roiDiff = investorCriteria.targetReturn - analysis.returnOnInvestment;
      score += Math.max(0, 40 - roiDiff * 2);
      reasons.push(`ROI (${analysis.returnOnInvestment.toFixed(1)}%) is below target (${investorCriteria.targetReturn}%)`);
    }

    // Check risk tolerance
    const riskScore = this.assessRisk(analysis, investorCriteria.riskTolerance);
    score += riskScore.points;
    reasons.push(...riskScore.reasons);

    // Normalize score to 0-100
    score = Math.min(100, Math.max(0, score));

    return { score, reasons };
  }

  /**
   * Assess investment risk
   */
  private static assessRisk(
    analysis: UnderwritingResults,
    riskTolerance: string
  ): { points: number; reasons: string[] } {
    const reasons: string[] = [];
    let points = 30; // Base score

    const profitMargin = analysis.profitMargin;
    
    if (riskTolerance === 'low') {
      if (profitMargin >= 25) {
        points += 20;
        reasons.push('High profit margin suitable for low-risk tolerance');
      } else if (profitMargin >= 15) {
        points += 10;
        reasons.push('Moderate profit margin acceptable for low-risk tolerance');
      } else {
        points -= 10;
        reasons.push('Low profit margin may not meet low-risk criteria');
      }
    } else if (riskTolerance === 'medium') {
      if (profitMargin >= 15) {
        points += 15;
        reasons.push('Good profit margin for medium-risk tolerance');
      } else if (profitMargin >= 10) {
        points += 5;
        reasons.push('Acceptable profit margin for medium-risk tolerance');
      }
    } else { // high
      if (profitMargin >= 10) {
        points += 10;
        reasons.push('Profit margin acceptable for high-risk tolerance');
      }
      points += 10; // High risk tolerance gets bonus
      reasons.push('High-risk tolerance allows for more opportunities');
    }

    return { points: Math.max(0, points), reasons };
  }
}
