// Maps whatever string the backend sends back for risk_level / prediction
// into a consistent visual language, without assuming an exact casing or wording.

export function getRiskTone(riskLevel = "") {
  const value = riskLevel.toLowerCase();
  if (value.includes("high") || value.includes("critical")) {
    return { variant: "red", color: "#FF4757", label: riskLevel || "High" };
  }
  if (value.includes("medium") || value.includes("moderate")) {
    return { variant: "amber", color: "#FFB020", label: riskLevel || "Medium" };
  }
  if (value.includes("low")) {
    return { variant: "cyan", color: "#2BF3D6", label: riskLevel || "Low" };
  }
  return { variant: "neutral", color: "#7C8FA6", label: riskLevel || "Unknown" };
}

export function getPredictionTone(prediction = "") {
  const value = prediction.toLowerCase();
  if (value.includes("fake") || value.includes("false") || value.includes("misleading")) {
    return { variant: "red", color: "#FF4757" };
  }
  if (value.includes("real") || value.includes("true") || value.includes("credible") || value.includes("verified")) {
    return { variant: "cyan", color: "#2BF3D6" };
  }
  return { variant: "amber", color: "#FFB020" };
}

// Normalizes a confidence value that may arrive as 0-1 or 0-100 into a 0-100 number.
export function normalizeConfidence(confidence) {
  const num = Number(confidence) || 0;
  return num <= 1 ? Math.round(num * 100) : Math.round(num);
}

export function formatTimestamp(timestamp) {
  if (!timestamp) return null;
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return timestamp;
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
