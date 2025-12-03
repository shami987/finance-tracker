// This function takes your transactions and downloads them as a CSV file
export function exportTransactionsToCsv(transactions = []) {
  if (!transactions.length) return;
  const headers = ["Description","Category","Type","Amount","Date"];
  const rows = transactions.map(t => [
    `"${(t.description || "").replace(/"/g,'""')}"`,
    t.category || "",
    t.type || "",
    t.amount,
    t.date || ""
  ].join(","));

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `transactions_export_${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
